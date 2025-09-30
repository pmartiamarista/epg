import { memo } from "react";

import Button from "../button/Button";
import Body from "../typography/body/Body";
import Heading from "../typography/heading/Heading";

/**
 * DesignSystemExample component showcasing gradients, radius, and color palette.
 *
 * Demonstrates all available design system utilities including
 * linear gradients, border radius, and color variants.
 *
 * @example
 * ```tsx
 * <DesignSystemExample />
 * ```
 */
const DesignSystemExample = memo(() => {
  return (
    <div className="flex flex-col gap-2 p-6">
      {/* Main Title */}
      <Heading as="h1" className="text-center">
        Design System Examples
      </Heading>

      {/* Typography */}
      <section>
        <Heading as="h2">Typography</Heading>

        <div className="space-y-6">
          {/* Heading Variants */}
          <div>
            <Body size="md" className="mb-3">
              Heading Variants (h1-h6)
            </Body>
            <div className="space-y-2">
              <Heading as="h1">H1 Heading - Main Title</Heading>
              <Heading as="h2">H2 Heading - Section Title</Heading>
              <Heading as="h3">H3 Heading - Subsection</Heading>
              <Heading as="h4">H4 Heading - Minor Heading</Heading>
              <Heading as="h5">H5 Heading - Small Heading</Heading>
              <Heading as="h6">H6 Heading - Smallest Heading</Heading>
            </div>
          </div>

          {/* Body Size Variants */}
          <div>
            <Body size="md" className="mb-3">
              Body Text Size Variants
            </Body>
            <div className="space-y-2">
              <Body size="xl">
                Extra Large Body Text (xl) - Important content
              </Body>
              <Body size="lg">Large Body Text (lg) - Emphasis content</Body>
              <Body size="md">Medium Body Text (md) - Default size</Body>
              <Body size="sm">Small Body Text (sm) - Secondary content</Body>
              <Body size="xs">Extra Small Body Text (xs) - Fine print</Body>
            </div>
          </div>

          {/* Weight Variants */}
          <div>
            <Body size="md" className="mb-3">
              Font Weight Variants
            </Body>
            <div className="space-y-2">
              <Heading as="h3" className="font-light">
                Light Weight Heading
              </Heading>
              <Heading as="h3" className="font-normal">
                Normal Weight Heading
              </Heading>
              <Heading as="h3" className="font-medium">
                Medium Weight Heading
              </Heading>
              <Heading as="h3" className="font-semibold">
                Semibold Weight Heading
              </Heading>
              <Heading as="h3" className="font-bold">
                Bold Weight Heading
              </Heading>
            </div>
            <div className="space-y-2 mt-4">
              <Body size="lg" className="font-light">
                Light Weight Body Text
              </Body>
              <Body size="lg" className="font-normal">
                Normal Weight Body Text
              </Body>
              <Body size="lg" className="font-medium">
                Medium Weight Body Text
              </Body>
              <Body size="lg" className="font-semibold">
                Semibold Weight Body Text
              </Body>
              <Body size="lg" className="font-bold">
                Bold Weight Body Text
              </Body>
            </div>
          </div>

          {/* Line Height Variants */}
          <div>
            <Body size="md" className="mb-3">
              Line Height Variants
            </Body>
            <div className="space-y-2">
              <Heading as="h3" className="leading-tight">
                Tight Line Height Heading
              </Heading>
              <Heading as="h3" className="leading-normal">
                Normal Line Height Heading
              </Heading>
              <Heading as="h3" className="leading-relaxed">
                Relaxed Line Height Heading
              </Heading>
              <Heading as="h3" className="leading-loose">
                Loose Line Height Heading
              </Heading>
            </div>
            <div className="space-y-2 mt-4">
              <Body size="lg" className="leading-tight">
                Tight line height body text for compact layouts
              </Body>
              <Body size="lg" className="leading-normal">
                Normal line height body text for standard reading
              </Body>
              <Body size="lg" className="leading-relaxed">
                Relaxed line height body text for comfortable reading
              </Body>
              <Body size="lg" className="leading-loose">
                Loose line height body text for maximum readability
              </Body>
            </div>
          </div>

          {/* Combined Variants */}
          <div>
            <Body size="md" className="mb-3">
              Combined Typography Variants
            </Body>
            <div className="space-y-3">
              <Heading as="h2" className="font-bold leading-tight">
                Bold Tight Heading
              </Heading>
              <Body size="lg" className="font-medium leading-relaxed">
                Medium weight, relaxed line height body text for enhanced
                readability
              </Body>
              <Heading as="h4" className="font-semibold leading-normal">
                Semibold Normal Heading
              </Heading>
              <Body size="md" className="font-light leading-loose">
                Light weight, loose line height for maximum comfort
              </Body>
            </div>
          </div>

          {/* Custom Styling Examples */}
          <div>
            <Body size="md" className="mb-3">
              Typography with Custom Classes
            </Body>
            <div className="space-y-3">
              <Heading as="h3" className="text-center !text-accent-green">
                Centered Green Heading
              </Heading>
              <Body size="lg" className="text-center !text-accent-blue">
                Centered Blue Body Text
              </Body>
              <Body size="md" className="text-right !text-accent-red">
                Right-aligned Red Text
              </Body>
              <Heading as="h4" className="font-bold !text-accent-purple">
                Purple Bold Heading
              </Heading>
              <Body size="sm" className="font-medium !text-accent-yellow">
                Yellow Medium Weight Text
              </Body>
            </div>
          </div>

          {/* Flexbox Examples */}
          <div>
            <Body size="md" className="mb-3">
              Flexbox Layout Examples
            </Body>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-bg-secondary rounded-lg">
                <Body size="sm">Left Content</Body>
                <Body size="sm">Right Content</Body>
              </div>
              <div className="flex items-center gap-4 p-4 bg-bg-tertiary rounded-lg">
                <Body size="sm">Item 1</Body>
                <Body size="sm">Item 2</Body>
                <Body size="sm">Item 3</Body>
              </div>
              <div className="flex flex-col space-y-2 p-4 bg-bg-hover rounded-lg">
                <Body size="sm">Vertical Item 1</Body>
                <Body size="sm">Vertical Item 2</Body>
                <Body size="sm">Vertical Item 3</Body>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Linear Gradients */}
      <section>
        <Heading as="h2">Linear Gradients</Heading>

        <div className="space-y-4">
          <div>
            <Body size="md" className="mb-2">
              Primary Gradients
            </Body>
            <div className="space-y-2">
              <div className="bg-gradient-primary p-4 rounded-lg">
                <Body size="sm" className="text-white">
                  Primary Gradient
                </Body>
              </div>
              <div className="bg-gradient-primary-light p-4 rounded-lg">
                <Body size="sm" className="text-white">
                  Primary Light Gradient
                </Body>
              </div>
              <div className="bg-gradient-primary-dark p-4 rounded-lg">
                <Body size="sm" className="text-white">
                  Primary Dark Gradient
                </Body>
              </div>
            </div>
          </div>

          <div>
            <Body size="md" className="mb-2">
              Gray Gradients
            </Body>
            <div className="space-y-2">
              <div className="bg-gradient-gray p-4 rounded-lg">
                <Body size="sm">Gray Gradient</Body>
              </div>
              <div className="bg-gradient-gray-light p-4 rounded-lg">
                <Body size="sm">Gray Light Gradient</Body>
              </div>
              <div className="bg-gradient-gray-dark p-4 rounded-lg">
                <Body size="sm">Gray Dark Gradient</Body>
              </div>
            </div>
          </div>

          <div>
            <Body size="md" className="mb-2">
              Dark Gradients
            </Body>
            <div className="space-y-2">
              <div className="bg-gradient-dark p-4 rounded-lg">
                <Body size="sm" className="text-white">
                  Dark Gradient
                </Body>
              </div>
              <div className="bg-gradient-dark-light p-4 rounded-lg">
                <Body size="sm" className="text-white">
                  Dark Light Gradient
                </Body>
              </div>
              <div className="bg-gradient-dark-dark p-4 rounded-lg">
                <Body size="sm" className="text-white">
                  Dark Dark Gradient
                </Body>
              </div>
            </div>
          </div>

          <div>
            <Body size="md" className="mb-2">
              Accent Gradients
            </Body>
            <div className="space-y-2">
              <div className="bg-gradient-accent-green p-4 rounded-lg">
                <Body size="sm" className="text-white">
                  Accent Green Gradient
                </Body>
              </div>
              <div className="bg-gradient-accent-red p-4 rounded-lg">
                <Body size="sm" className="text-white">
                  Accent Red Gradient
                </Body>
              </div>
              <div className="bg-gradient-accent-orange p-4 rounded-lg">
                <Body size="sm" className="text-white">
                  Accent Orange Gradient
                </Body>
              </div>
              <div className="bg-gradient-accent-yellow p-4 rounded-lg">
                <Body size="sm" className="text-white">
                  Accent Yellow Gradient
                </Body>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Border Radius */}
      <section>
        <Heading as="h2">Border Radius</Heading>

        <div className="space-y-4">
          <div>
            <Body size="md" className="mb-2">
              All Sides
            </Body>
            <div className="space-y-2">
              <div className="bg-primary-500 p-4 rounded-none border-2 border-gray-300">
                <Body size="sm" className="text-white">
                  rounded-none
                </Body>
              </div>
              <div className="bg-primary-500 p-4 rounded-sm border-2 border-gray-300">
                <Body size="sm" className="text-white">
                  rounded-sm
                </Body>
              </div>
              <div className="bg-primary-500 p-4 rounded-base border-2 border-gray-300">
                <Body size="sm" className="text-white">
                  rounded-base
                </Body>
              </div>
              <div className="bg-primary-500 p-4 rounded-md border-2 border-gray-300">
                <Body size="sm" className="text-white">
                  rounded-md
                </Body>
              </div>
              <div className="bg-primary-500 p-4 rounded-lg border-2 border-gray-300">
                <Body size="sm" className="text-white">
                  rounded-lg
                </Body>
              </div>
              <div className="bg-primary-500 p-4 rounded-xl border-2 border-gray-300">
                <Body size="sm" className="text-white">
                  rounded-xl
                </Body>
              </div>
              <div className="bg-primary-500 p-4 rounded-2xl border-2 border-gray-300">
                <Body size="sm" className="text-white">
                  rounded-2xl
                </Body>
              </div>
              <div className="bg-primary-500 p-4 rounded-3xl border-2 border-gray-300">
                <Body size="sm" className="text-white">
                  rounded-3xl
                </Body>
              </div>
              <div className="bg-primary-500 p-4 rounded-full border-2 border-gray-300">
                <Body size="sm" className="text-white">
                  rounded-full
                </Body>
              </div>
            </div>
          </div>

          <div>
            <Body size="md" weight="medium" className="mb-2">
              Directional
            </Body>
            <div className="space-y-2">
              <div className="bg-accent-green p-4 rounded-t-lg border-2 border-gray-300">
                <Body size="sm" weight="normal" className="text-white">
                  rounded-t-lg
                </Body>
              </div>
              <div className="bg-accent-red p-4 rounded-r-lg border-2 border-gray-300">
                <Body size="sm" weight="normal" className="text-white">
                  rounded-r-lg
                </Body>
              </div>
              <div className="bg-accent-orange p-4 rounded-b-lg border-2 border-gray-300">
                <Body size="sm" weight="normal" className="text-white">
                  rounded-b-lg
                </Body>
              </div>
              <div className="bg-accent-yellow p-4 rounded-l-lg border-2 border-gray-300">
                <Body size="sm" weight="normal" className="text-white">
                  rounded-l-lg
                </Body>
              </div>
            </div>
          </div>

          <div>
            <Body size="md" weight="medium" className="mb-2">
              Corners
            </Body>
            <div className="space-y-2">
              <div className="bg-gray-500 p-4 rounded-tl-lg border-2 border-gray-300">
                <Body size="sm" weight="normal" className="text-white">
                  rounded-tl-lg
                </Body>
              </div>
              <div className="bg-gray-500 p-4 rounded-tr-lg border-2 border-gray-300">
                <Body size="sm" weight="normal" className="text-white">
                  rounded-tr-lg
                </Body>
              </div>
              <div className="bg-gray-500 p-4 rounded-br-lg border-2 border-gray-300">
                <Body size="sm" weight="normal" className="text-white">
                  rounded-br-lg
                </Body>
              </div>
              <div className="bg-gray-500 p-4 rounded-bl-lg border-2 border-gray-300">
                <Body size="sm" weight="normal" className="text-white">
                  rounded-bl-lg
                </Body>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section>
        <Heading as="h2">Color Palette</Heading>

        <div className="space-y-6">
          {/* Background Colors */}
          <div>
            <Body size="md" className="mb-3">
              Background Colors (GitHub Dark Theme)
            </Body>
            <div className="space-y-2">
              <div className="p-4 rounded-lg bg-bg-primary">
                <Body size="sm" className="text-white">
                  bg-bg-primary (#0d1117)
                </Body>
              </div>
              <div className="p-4 rounded-lg bg-bg-secondary">
                <Body size="sm" className="text-white">
                  bg-bg-secondary (#161b22)
                </Body>
              </div>
              <div className="p-4 rounded-lg bg-bg-tertiary">
                <Body size="sm" className="text-white">
                  bg-bg-tertiary (#21262d)
                </Body>
              </div>
              <div className="p-4 rounded-lg bg-bg-hover">
                <Body size="sm" className="text-white">
                  bg-bg-hover (#30363d)
                </Body>
              </div>
            </div>
          </div>

          {/* Text Colors */}
          <div>
            <Body size="md" className="mb-3">
              Text Colors
            </Body>
            <div className="space-y-2">
              <div className="p-4 rounded-lg bg-bg-secondary">
                <Body size="sm" className="!text-text-primary">
                  text-text-primary (#f0f6fc)
                </Body>
              </div>
              <div className="p-4 rounded-lg bg-bg-secondary">
                <Body size="sm" className="!text-text-secondary">
                  text-text-secondary (#8b949e)
                </Body>
              </div>
              <div className="p-4 rounded-lg bg-bg-secondary">
                <Body size="sm" className="!text-text-tertiary">
                  text-text-tertiary (#6e7681)
                </Body>
              </div>
              <div className="p-4 rounded-lg bg-bg-secondary">
                <Body size="sm" className="!text-text-link">
                  text-text-link (#58a6ff)
                </Body>
              </div>
            </div>
          </div>

          {/* Accent Colors */}
          <div>
            <Body size="md" className="mb-3">
              Accent Colors
            </Body>
            <div className="space-y-2">
              <div className="p-4 rounded-lg bg-accent-blue">
                <Body size="sm" className="text-white">
                  bg-accent-blue (#1f6feb)
                </Body>
              </div>
              <div className="p-4 rounded-lg bg-accent-green">
                <Body size="sm" className="text-white">
                  bg-accent-green (#238636)
                </Body>
              </div>
              <div className="p-4 rounded-lg bg-accent-yellow">
                <Body size="sm" className="text-white">
                  bg-accent-yellow (#d29922)
                </Body>
              </div>
              <div className="p-4 rounded-lg bg-accent-red">
                <Body size="sm" className="text-white">
                  bg-accent-red (#da3633)
                </Body>
              </div>
              <div className="p-4 rounded-lg bg-accent-purple">
                <Body size="sm" className="text-white">
                  bg-accent-purple (#8957e5)
                </Body>
              </div>
            </div>
          </div>

          {/* Border Colors */}
          <div>
            <Body size="md" className="mb-3">
              Border Colors
            </Body>
            <div className="space-y-2">
              <div className="p-4 rounded-lg bg-bg-secondary border-2 border-border-primary">
                <Body size="sm" className="text-white">
                  border-border-primary (#30363d)
                </Body>
              </div>
              <div className="p-4 rounded-lg bg-bg-secondary border-2 border-border-secondary">
                <Body size="sm" className="text-white">
                  border-border-secondary (#21262d)
                </Body>
              </div>
              <div className="p-4 rounded-lg bg-bg-secondary border-2 border-border-focus">
                <Body size="sm" className="text-white">
                  border-border-focus (#1f6feb)
                </Body>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Combined Examples */}
      <section>
        <Heading as="h2" className="font-semibold leading-normal">
          Combined Examples
        </Heading>

        <div className="space-y-4">
          <div className="bg-gradient-primary p-6 rounded-xl">
            <Heading as="h3" className="font-bold text-white mb-2">
              Gradient + Radius
            </Heading>
            <Body size="md" className="font-normal text-white">
              This combines a primary gradient background with rounded-xl
              corners.
            </Body>
          </div>

          <div className="bg-accent-green p-6 rounded-2xl">
            <Heading as="h3" className="font-bold text-white mb-2">
              Accent + Large Radius
            </Heading>
            <Body size="md" className="font-normal text-white">
              This uses accent green with rounded-2xl for a modern look.
            </Body>
          </div>

          <div className="bg-bg-secondary p-6 rounded-lg border-2 border-border-primary">
            <Heading as="h3" className="font-bold !text-text-primary mb-2">
              Custom Background + Border
            </Heading>
            <Body size="md" className="font-normal !text-text-primary">
              This combines custom background with border and rounded corners.
            </Body>
          </div>

          <div className="bg-accent-blue p-6 rounded-lg">
            <Heading as="h3" className="font-bold text-blue-500 mb-2">
              Accent Blue + Typography
            </Heading>
            <Body size="md" className="font-normal text-white">
              This showcases accent blue with white text for contrast.
            </Body>
          </div>

          <div className="bg-bg-tertiary p-6 rounded-xl border border-border-secondary">
            <Heading as="h3" className="font-bold !text-text-secondary mb-2">
              Tertiary Background + Secondary Text
            </Heading>
            <Body size="md" className="font-normal !text-text-tertiary">
              This uses tertiary background with secondary and tertiary text
              colors.
            </Body>
          </div>
        </div>
      </section>

      {/* Button Variants and Sizes */}
      <section className="space-y-6">
        <Heading as="h2" className="font-bold text-text-primary">
          Button Components
        </Heading>

        {/* Button Variants */}
        <div className="space-y-4">
          <Heading as="h3" className="font-semibold text-text-secondary">
            Button Variants
          </Heading>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="md">
              Primary
            </Button>
            <Button variant="secondary" size="md">
              Secondary
            </Button>
            <Button variant="yellow" size="md">
              Yellow
            </Button>
            <Button variant="green" size="md">
              Green
            </Button>
            <Button variant="red" size="md">
              Red
            </Button>
            <Button variant="blue" size="md">
              Blue
            </Button>
          </div>
        </div>

        {/* Button Sizes */}
        <div className="space-y-4">
          <Heading as="h3" className="font-semibold text-text-secondary">
            Button Sizes
          </Heading>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" size="sm">
              Small
            </Button>
            <Button variant="primary" size="md">
              Medium
            </Button>
            <Button variant="primary" size="lg">
              Large
            </Button>
          </div>
        </div>

        {/* All Combinations */}
        <div className="space-y-4">
          <Heading as="h3" className="font-semibold text-text-secondary">
            All Variant & Size Combinations
          </Heading>
          <div className="space-y-6">
            {/* Small Buttons */}
            <div className="space-y-2">
              <Body size="sm" className="font-medium text-text-tertiary">
                Small Size
              </Body>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="sm">
                  Primary
                </Button>
                <Button variant="secondary" size="sm">
                  Secondary
                </Button>
                <Button variant="yellow" size="sm">
                  Yellow
                </Button>
                <Button variant="green" size="sm">
                  Green
                </Button>
                <Button variant="red" size="sm">
                  Red
                </Button>
                <Button variant="blue" size="sm">
                  Blue
                </Button>
              </div>
            </div>

            {/* Medium Buttons */}
            <div className="space-y-2">
              <Body size="sm" className="font-medium text-text-tertiary">
                Medium Size
              </Body>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="md">
                  Primary
                </Button>
                <Button variant="secondary" size="md">
                  Secondary
                </Button>
                <Button variant="yellow" size="md">
                  Yellow
                </Button>
                <Button variant="green" size="md">
                  Green
                </Button>
                <Button variant="red" size="md">
                  Red
                </Button>
                <Button variant="blue" size="md">
                  Blue
                </Button>
              </div>
            </div>

            {/* Large Buttons */}
            <div className="space-y-2">
              <Body size="sm" className="font-medium text-text-tertiary">
                Large Size
              </Body>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="lg">
                  Primary
                </Button>
                <Button variant="secondary" size="lg">
                  Secondary
                </Button>
                <Button variant="yellow" size="lg">
                  Yellow
                </Button>
                <Button variant="green" size="lg">
                  Green
                </Button>
                <Button variant="red" size="lg">
                  Red
                </Button>
                <Button variant="blue" size="lg">
                  Blue
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

DesignSystemExample.displayName = "DesignSystemExample";

export default DesignSystemExample;
