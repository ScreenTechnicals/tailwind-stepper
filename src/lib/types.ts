import { ComponentProps, ReactNode } from "react";

export type Step = Pick<ComponentProps<"button">, "onClick"> & {

export type StepItemClassNames = Record<
  "wrapper" | "icon" | "label" | "gradientBorder",
  string
>;

export type StepItemProps = {
  step: Step;
  isSelected: boolean;
  classNames?: Partial<StepItemClassNames>;
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
