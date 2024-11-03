import { ComponentProps, ReactNode } from "react";

export type Step = Pick<ComponentProps<"button">, "onClick"> & {
  step: number;
  label: string;
  icon?: ReactNode;
  content?: ReactNode;
};

export type StepperClassNames = Record<
  "wrapper" | "icon" | "label" | "gradientBorder" | "base" | "divider",
  string
>;
  hideLabel?: boolean;
};

export type StepperProps = {
  selectedStep: number;
  steps: Step[];
  orientation?: "horizontal" | "vertical";
  hideLabel?: boolean;
  classNames?: Partial<StepperClassNames>;
};

export type DividerProps = {
  orientation?: StepperProps["orientation"];
  className?: string;
};
