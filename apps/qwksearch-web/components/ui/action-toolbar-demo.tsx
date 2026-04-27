"use client";

import { AlignLeft, AlignCenter, AlignRight, Edit3, MoreHorizontal, Bold, Italic, Underline, Code } from "lucide-react";
import { ActionToolbar } from "@/components/ui/action-toolbar";

/**
 * Example usage of ActionToolbar for Lexical editor or any text formatting interface.
 *
 * To integrate with Lexical toolbar:
 * 1. Import this component in ToolbarPlugin/index.tsx
 * 2. Pass it as children to the ToolbarPlugin component:
 *    <ToolbarPlugin ...props>
 *      <ActionToolbarDemo />
 *    </ToolbarPlugin>
 *
 * Or create your own custom toolbar buttons with alignment, formatting, etc.
 */
export function ActionToolbarDemo() {
  return (
    <div className="p-2">
      <ActionToolbar
        buttons={[
          {
            label: "Bold",
            icon: <Bold className="size-4" />,
            onClick: () => console.log("Bold clicked")
          },
          {
            label: "Italic",
            icon: <Italic className="size-4" />,
            onClick: () => console.log("Italic clicked")
          },
          {
            label: "Underline",
            icon: <Underline className="size-4" />,
            onClick: () => console.log("Underline clicked")
          },
          {
            label: "Code",
            icon: <Code className="size-4" />,
            onClick: () => console.log("Code clicked")
          },
          {
            label: "Align",
            icon: <AlignLeft className="size-4" />,
            dropdownItems: ["Left", "Center", "Right", "Justify"],
          },
          {
            label: "More",
            icon: <MoreHorizontal className="size-4" />,
            dropdownItems: ["Clear Format", "Copy", "Paste", "Delete"],
          },
        ]}
      />
    </div>
  );
}

/**
 * Compact version for smaller screens or toolbars
 */
export function ActionToolbarCompact() {
  return (
    <ActionToolbar
      compact
      buttons={[
        { icon: <Bold className="size-4" />, label: "B" },
        { icon: <Italic className="size-4" />, label: "I" },
        { icon: <Underline className="size-4" />, label: "U" },
        {
          icon: <AlignLeft className="size-4" />,
          label: "Align",
          dropdownItems: ["Left", "Center", "Right"],
        },
      ]}
    />
  );
}

/**
 * Example with counts and active states
 */
export function ActionToolbarWithCounts() {
  return (
    <ActionToolbar
      buttons={[
        {
          label: "Comments",
          icon: <Edit3 className="size-4" />,
          count: 3,
          active: true,
        },
        {
          label: "Suggestions",
          icon: <MoreHorizontal className="size-4" />,
          count: 12,
        },
        {
          label: "Actions",
          icon: <MoreHorizontal className="size-4" />,
          dropdownItems: ["Accept All", "Reject All", "Review"],
          count: 5,
        },
      ]}
    />
  );
}

export default ActionToolbarDemo;
