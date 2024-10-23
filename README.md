# Tailwind Stepper Component

**Tailwind Stepper** is a customizable React component designed to create intuitive step-by-step user interfaces using Tailwind CSS.

## Installation

Install the package via npm or yarn or bun:

```
npm install tailwind-stepper
```


```
yarn add tailwind-stepper
```



```
bun add tailwind-stepper
```

## Configuration

add the path for tailwind in the `tailwind.config.ts`

```
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "...",
    "./node_modules/tailwind-stepper/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      "..."
    },
  },
  plugins: ["..."],
};

export default config;

```

## Usage Example

Integrate the stepper component into your React application:

```jsx
import React, { useState } from "react";
import { Stepper, Step } from "tailwind-stepper";

const steps: Step[] = [
  { step: 0, label: "Step 1", content: <div>Content for Step 1</div> },
  { step: 1, label: "Step 2", content: <div>Content for Step 2</div> },
  { step: 2, label: "Step 3", content: <div>Content for Step 3</div> },
  { step: 3, label: "Step 4", content: <div>Content for Step 4</div> },
];

const App = () => {
  const [selectedStep, setSelectedStep] = useState(0);

  return (
    <Stepper
      selectedStep={selectedStep}
      steps={steps}
      orientation="horizontal" // default
      hideLabel={false}
      classNames={{
        base: "...",
        divider: "...",
      }}
    />
  );
};

export default App;
```

## Component Props

### Stepper Component

| Prop           | Type                      | Description                                              |
| -------------- | ------------------------- | -------------------------------------------------------- |
| `selectedStep` | `number`                  | The currently selected step.                             |
| `steps`        | `Step[]`                  | Array of steps to display.                               |
| `orientation`  | `horizontal \| vertical`  | Orientation of the stepper. Defaults to `'horizontal'`.  |
| `hideLabel`    | `boolean`                 | Hides the labels of steps if `true`. Default is `false`. |
| `classNames`   | `StepperClassNames`       | Custom class names for various components.               |

### Step Object

| Property  | Type              | Description                                       |
| --------- | ----------------- | ------------------------------------------------- |
| `step`    | `number`          | Step number.                                      |
| `label`   | `string`          | Label for the step.                               |
| `icon`    | `React.ReactNode` | Optional icon for the step.                       |
| `content` | `React.ReactNode` | Optional content displayed when step is selected. |
| `onClick` | `() => void`      | Optional click handler for the step.              |

## Customization

Tailwind Stepper allows extensive customization through the `classNames` prop. You can style various elements:

- `wrapper`: Wrapper around each step item.
- `icon`: Icon inside each step item.
- `label`: Label inside each step item.
- `gradientBorder`: Gradient border for the selected step item.
- `base`: Base class for the stepper container.
- `divider`: Class for dividers between steps.

## Example with Custom Class Names

```jsx
<Stepper
  selectedStep={selectedStep}
  steps={steps}
  orientation="vertical"
  hideLabel={false}
  classNames={{
    base: "...",
    wrapper: "...",
    icon: "...",
    label: "...",
    gradientBorder: "...",
    divider: "...",
  }}
/>
```

## License

This project is licensed under the MIT License.
