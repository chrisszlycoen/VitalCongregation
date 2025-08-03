// Simple chart placeholder component to avoid TypeScript issues
import React from "react";

export const ChartContainer = ({ children, ...props }: React.PropsWithChildren<any>) => (
  <div {...props}>{children}</div>
);

export const ChartTooltip = ({ children, ...props }: React.PropsWithChildren<any>) => (
  <div {...props}>{children}</div>
);

export const ChartTooltipContent = ({ children, ...props }: React.PropsWithChildren<any>) => (
  <div {...props}>{children}</div>
);

export const ChartLegend = ({ children, ...props }: React.PropsWithChildren<any>) => (
  <div {...props}>{children}</div>
);

export const ChartLegendContent = ({ children, ...props }: React.PropsWithChildren<any>) => (
  <div {...props}>{children}</div>
);

export const useChart = () => ({ config: {} });