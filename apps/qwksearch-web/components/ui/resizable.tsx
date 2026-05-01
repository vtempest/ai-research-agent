"use client";

import * as React from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";

import { cn } from "../../lib/utils";

type ResizablePanelGroupProps = Omit<
  React.ComponentProps<typeof Allotment>,
  "vertical"
> & {
  direction?: "horizontal" | "vertical";
  className?: string;
};

function ResizablePanelGroup({
  className,
  direction = "horizontal",
  children,
  ...props
}: ResizablePanelGroupProps) {
  return (
    <div
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full",
        direction === "vertical" && "flex-col",
        className,
      )}
    >
      <Allotment vertical={direction === "vertical"} {...props}>
        {children}
      </Allotment>
    </div>
  );
}

const ResizablePanel = Allotment.Pane;

function ResizableHandle({
  withHandle: _withHandle,
  className: _className,
}: {
  withHandle?: boolean;
  className?: string;
}) {
  return null;
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
