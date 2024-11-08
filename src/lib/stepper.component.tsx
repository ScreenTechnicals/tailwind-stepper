import * as React from "react";
import { useCallback, useMemo } from "react";
import { twJoin, twMerge } from "tailwind-merge";
import { DividerProps, StepItemProps, StepperProps } from "./types";

  const renderSteps = useCallback(
    () =>
      steps.map(({ step, ...restStepProps }, index) => {
        // const isLastStep = steps.length - 1 === index;
        // const shouldShowSteps =
          selectedStep <= 2 ? step <= 2 || isLastStep : step <= 1 || isLastStep;

