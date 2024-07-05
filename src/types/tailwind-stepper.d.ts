// types/tailwind-stepper.d.ts

import { ComponentProps, ReactNode } from "react";

export type Step = Pick<ComponentProps<"button">, "onClick"> & {
  step: number;
  label: string;
  icon?: ReactNode;
  content?: ReactNode;
};

type Slots = {
  wrapper?: string;
  icon?: string;
  label?: string;
  gradientBorder?: string;
};

export type StepItemProps = {
  step: Step;
  isSelected: boolean;
  classNames?: Slots;
  hideLabel?: boolean;
};

export type StepperProps = {
  selectedStep: number;
  steps: Step[];
  orientation?: "horizontal" | "vertical";
  hideLabel?: boolean;
  classNames?: Slots & {
    base?: string;
    divider?: string;
  };
};

export const Stepper: React.FC<StepperProps>;
