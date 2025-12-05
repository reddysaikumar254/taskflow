import * as React from "react";
import * as Recharts from "recharts";

import { cn } from "@/lib/utils";

/**
 * Simple chart theming helper.
 * Accepts a config object like:
 * {
 *   seriesKey: { color: "#0ea5e9", theme: { light: "#0ea5e9", dark: "#0369a1" } },
 *   ...
 * }
 *
 * ChartStyle will inject CSS variables like --color-seriesKey
 * scoped to [data-chart="<id>"] so charts can be themed.
 */
export function ChartStyle({ id = "default", config = {} }) {
  // gather keys that have color or theme
  const colorConfig = Object.entries(config).filter(
    ([, c]) => c && (c.color || c.theme)
  );

  if (!colorConfig.length) return null;

  // create light/dark blocks
  const themes = [
    ["light", ""],
    ["dark", ".dark"],
  ];

  const css = themes
    .map(([themeName, prefix]) => {
      const body = colorConfig
        .map(([key, itemConfig]) => {
          const color =
            (itemConfig.theme && itemConfig.theme[themeName]) || itemConfig.color;
          return color ? `  --color-${key}: ${color};` : "";
        })
        .filter(Boolean)
        .join("\n");
      return `${prefix} [data-chart="${id}"] {\n${body}\n}`;
    })
    .join("\n");

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

/**
 * Chart context & container so tooltip/legend can access chart config.
 */
const ChartContext = React.createContext({ config: {} });

export function useChart() {
  return React.useContext(ChartContext);
}

/**
 * ChartContainer wraps chart markup and provides `config` and `id`.
 * Props:
 *  - id (string) optional
 *  - config (object) optional: mapping of series -> { color, theme? }
 *  - children
 */
export function ChartContainer({ id = "default", config = {}, children, className, ...props }) {
  return (
    <div data-chart={id} className={cn("relative", className)} {...props}>
      <ChartStyle id={id} config={config} />
      <ChartContext.Provider value={{ id, config }}>
        {children}
      </ChartContext.Provider>
    </div>
  );
}

/**
 * Helper: get payload config for an item.
 * The payload object from Recharts can be an object with .payload or top-level properties.
 * key is the canonical name to lookup in config (series key or custom name).
 */
export function getPayloadConfigFromPayload(config = {}, payload = {}, key = "value") {
  if (!payload || typeof payload !== "object") return undefined;

  // sometimes the useful values are nested under payload.payload
  const nested = payload.payload && typeof payload.payload === "object" ? payload.payload : null;

  // resolve label key: prefer payload[nameKey] then nested[nameKey]
  let resolvedKey = key;

  if (key in payload && typeof payload[key] === "string") {
    resolvedKey = payload[key];
  } else if (nested && key in nested && typeof nested[key] === "string") {
    resolvedKey = nested[key];
  }

  return config && resolvedKey in config ? config[resolvedKey] : undefined;
}

/**
 * Tooltip content for Recharts that uses chart config for colors/icons etc.
 *
 * Props mirror Recharts Tooltip content args:
 *  - active, payload, label
 *
 * This implementation is conservative: it renders the label (if present) and
 * each payload item (value & optional color/icon).
 */
export const ChartTooltipContent = React.forwardRef(function ChartTooltipContent(
  { active, payload = [], label, className, formatter, nameKey, labelKey, hideLabel = false, hideIndicator = false, indicator = "dot" },
  ref
) {
  const { config } = useChart();

  if (!active || !payload || !payload.length) return null;

  // label rendering (resolve a friendly label if labelKey not provided)
  const tooltipLabel = React.useMemo(() => {
    if (hideLabel) return null;
    if (!label && payload.length && payload[0]) {
      // try to discover human label from config
      const first = payload[0];
      const key = nameKey || first.name || first.dataKey || "value";
      const itemCfg = getPayloadConfigFromPayload(config, first, key);
      return itemCfg && itemCfg.label ? itemCfg.label : label || null;
    }
    return label || null;
  }, [hideLabel, label, payload, config, nameKey]);

  return (
    <div
      ref={ref}
      className={cn(
        "grid min-w-[10rem] gap-2 rounded-md border bg-background px-3 py-2 text-sm shadow-lg",
        className
      )}
    >
      {tooltipLabel && <div className="font-medium">{tooltipLabel}</div>}

      <div className="grid gap-1">
        {payload
          .filter((it) => it && it.type !== "none")
          .map((it, i) => {
            const key = `${nameKey || it.name || it.dataKey || "value"}`;
            const itemCfg = getPayloadConfigFromPayload(config, it, key);
            const color = (itemCfg && itemCfg.color) || it.color || (it.payload && it.payload.fill) || "#999";

            // indicator element
            const indicatorEl = !hideIndicator ? (
              <span
                aria-hidden
                className="inline-block shrink-0 rounded-sm"
                style={{
                  width: indicator === "dot" ? 10 : indicator === "line" ? 8 : 10,
                  height: indicator === "dot" ? 10 : 8,
                  background: indicator === "dashed" ? "transparent" : color,
                  border: indicator === "dashed" ? `2px dashed ${color}` : undefined,
                  marginRight: 8,
                }}
              />
            ) : null;

            const displayValue =
              typeof it.value === "number" && it.value.toLocaleString
                ? it.value.toLocaleString()
                : String(it.value ?? "");

            return (
              <div key={i} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  {indicatorEl}
                  <div className="truncate text-sm text-muted-foreground">
                    {itemCfg && itemCfg.label ? itemCfg.label : it.name || it.dataKey || key}
                  </div>
                </div>
                <div className="flex items-center">
                  {formatter ? formatter(it.value, it.name, it) : <span className="font-mono">{displayValue}</span>}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
});
ChartTooltipContent.displayName = "ChartTooltipContent";

/**
 * Legend content for Recharts.
 * Props: payload (array from Recharts), verticalAlign
 */
export const ChartLegendContent = React.forwardRef(function ChartLegendContent(
  { className, payload = [], verticalAlign = "bottom", hideIcon = false, nameKey },
  ref
) {
  const { config } = useChart();

  if (!payload || !payload.length) return null;

  return (
    <div
      ref={ref}
      className={cn("flex flex-wrap items-center gap-3", verticalAlign === "top" ? "pb-3" : "pt-3", className)}
    >
      {payload
        .filter((p) => p && p.type !== "none")
        .map((p, idx) => {
          const key = `${nameKey || p.dataKey || "value"}`;
          const itemCfg = getPayloadConfigFromPayload(config, p, key);
          const color = (itemCfg && itemCfg.color) || p.color || "#888";

          return (
            <div key={idx} className="flex items-center gap-2">
              {!hideIcon ? (
                itemCfg && itemCfg.icon ? (
                  <itemCfg.icon />
                ) : (
                  <span className="inline-block h-2 w-2 rounded-sm" style={{ background: color }} />
                )
              ) : null}
              <span className="text-sm">{(itemCfg && itemCfg.label) || p.value || p.dataKey || key}</span>
            </div>
          );
        })}
    </div>
  );
});
ChartLegendContent.displayName = "ChartLegendContent";

/**
 * Export shorthand for Recharts Tooltip/Legend so callers can use:
 * <Tooltip content={<ChartTooltipContent />} />
 */
export const ChartTooltip = Recharts.Tooltip;
export const ChartLegend = Recharts.Legend;

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
