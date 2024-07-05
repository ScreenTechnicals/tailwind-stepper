import type { ComponentProps, ReactNode } from "react";
import * as React from "react";
import { useCallback, useMemo } from "react";
import { twJoin, twMerge } from "tailwind-merge";

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

type StepItemProps = {
  step: Step;
  isSelected: boolean;
  classNames?: Slots;
  hideLabel?: boolean;
};

type StepperProps = {
  selectedStep: number;
  steps: Step[];
  orientation?: "horizontal" | "vertical";
  hideLabel?: boolean;
  classNames?: Slots & {
    base?: string;
    divider?: string;
  };
};

type DividerProps = {
  orientation?: StepperProps["orientation"];
  className?: string;
};

const GradientDivider = ({ orientation, className }: DividerProps) => (
  <div
    className={twMerge(
      "w-5 md:min-w-20 h-px bg-gradient-to-r dark:from-white/50 dark:via-white/50 dark:to-white/50 light:from-black/50 light:via-black/50 light:to-black/50",
      orientation === "vertical" && "my-2 w-px md:min-w-px md:min-h-20 h-5",
      className
    )}
  />
);

const DashedDivider = ({ orientation, className }: DividerProps) => {
  const dividers = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, index) => (
        <GradientDivider
          key={index}
          className={twMerge(
            "!min-w-1",
            orientation === "vertical" && "rotate-90",
            className
          )}
        />
      )),
    [orientation, className]
  );

  return (
    <div
      className={twMerge(
        "w-5 md:min-w-20  overflow-hidden flex gap-2 justify-between"
      )}
    >
      {dividers}
    </div>
  );
};

const StepItem = ({
  step,
  isSelected,
  classNames,
  hideLabel,
}: StepItemProps) => (
  <button
    type="button"
    onClick={step.onClick}
    aria-current={isSelected ? "step" : undefined}
    className={twJoin(
      "relative rounded-full p-px overflow-hidden w-fit pointer-events-none select-none",
      isSelected ? "min-w-max mx-px" : "",
      isSelected && step.onClick ? "group pointer-events-auto" : ""
    )}
  >
    {isSelected && (
      <span
        className={twMerge(
          "absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_0deg,_rgba(35,47,80,1)_0%,_rgba(81,102,134,1)_35%,_rgba(122,158,255,1)_100%)]",
          classNames?.gradientBorder
        )}
      />
    )}
    <span
      className={twMerge(
        "flex items-center group-hover:bg-gray-900 transition-colors gap-2 relative pointer-events-none bg-slate-700 rounded-full overflow-hidden p-2",
        classNames?.wrapper || ""
      )}
    >
      <span
        className={twMerge(
          "bg-slate-900 ring-slate-800 md:text-base text-xs ring-4 rounded-full w-4 h-4 md:w-6 md:h-6 flex items-center justify-center",
          classNames?.icon || ""
        )}
      >
        {step.icon || step.step + 1}
      </span>
      {isSelected && (
        <span
          className={twMerge(
            "md:text-base text-xs",
            classNames?.label,
            hideLabel && "hidden"
          )}
        >
          {step.label}
        </span>
      )}
    </span>
  </button>
);

export const Stepper = ({
  selectedStep,
  steps = [],
  orientation = "horizontal",
  hideLabel,
  classNames,
}: StepperProps) => {
  const { divider, base, ...restClassName } = classNames || { divider: "" };

  const renderSteps = useCallback(
    () =>
      steps.map((step, index) => {
        const isLastStep = steps.length - 1 === index;
        const showSteps =
          selectedStep <= 2
            ? step.step <= 2 || isLastStep
            : step.step <= 1 || isLastStep;
        const showDivider =
          steps.length === 4 ? !isLastStep : step.step <= 1 && !isLastStep;

        return (
          <div
            key={step.step}
            className={twJoin(
              "flex items-center",
              orientation === "vertical" && "flex-col"
            )}
          >
            {steps.length > 4 && isLastStep && (
              <DashedDivider orientation={orientation} className={divider} />
            )}
            {showSteps && (
              <StepItem
                step={step}
                isSelected={step.step === selectedStep}
                classNames={restClassName}
                hideLabel={hideLabel}
              />
            )}
            {selectedStep === step.step && selectedStep > 2 && (
              <StepItem
                step={step}
                isSelected={step.step === selectedStep}
                classNames={restClassName}
                hideLabel={hideLabel}
              />
            )}
            {showDivider && (
              <GradientDivider orientation={orientation} className={divider} />
            )}
          </div>
        );
      }),
    [steps, selectedStep, orientation, divider, restClassName, hideLabel]
  );

  return (
    <div
      className={twMerge(
        "w-full flex flex-col place-content-center place-items-center gap-6",
        orientation === "vertical" && "flex-row items-start",
        base
      )}
    >
      <div
        className={twJoin(
          "flex items-center w-fit",
          orientation === "vertical" && "flex-col"
        )}
      >
        {renderSteps()}
      </div>
      {steps.find((step) => step.step === selectedStep)?.content || null}
    </div>
  );
};
