# Design System Strategy: High-End Sustainability

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Kinetic Archive."** 

This system represents the intersection of high-precision technology and environmental stewardship. Unlike standard SaaS platforms that rely on rigid grids and heavy borders, this design system treats the interface as an editorial gallery. It prioritizes breathing room (whitespace), asymmetrical balance, and a "living" tactile feel. We achieve this through overlapping glassmorphic layers and high-contrast typography, creating an experience that feels as much like a premium digital publication as a technical platform. 

The aesthetic is characterized by:
*   **Intentional Asymmetry:** Overlapping elements and offset text blocks to break the "template" feel.
*   **Tonal Depth:** Replacing harsh lines with soft shifts in grey and white.
*   **Vibrant Kineticism:** Using high-energy greens (`primary-container`) only where human action is required.

---

## 2. Colors & Surface Philosophy

The palette is rooted in a sophisticated range of "cool" neutrals, punctuated by an electric, sustainable green.

### The "No-Line" Rule
Designers are prohibited from using 1px solid borders to define sections or cards. Hierarchy must be established through:
1.  **Tonal Transitions:** Moving from `surface` (#f7f9fc) to `surface-container-low` (#f2f4f7).
2.  **Negative Space:** Using the Spacing Scale (Scale 10–20) to separate conceptual groups.
3.  **Shadow Depth:** See Section 4 for ambient elevation.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of semi-transparent materials.
*   **Base Layer:** `surface` (#f7f9fc) for the main canvas.
*   **Secondary Sections:** `surface-container-low` (#f2f4f7) for large background blocks.
*   **Interactive Containers:** `surface-container-lowest` (#ffffff) for cards or inputs that need to "pop" against the background.

### The "Glass & Gradient" Rule
To mimic the premium 3D elements in our brand imagery, use Glassmorphism for floating UI (modals, navigation bars, tooltips).
*   **Glass Specs:** Background `on-surface` at 5% opacity + `backdrop-filter: blur(20px)`.
*   **Signature Gradients:** For primary CTAs, use a linear gradient from `primary` (#006d3c) to `primary-container` (#00df81) at a 135-degree angle to create a sense of glowing energy.

---

## 3. Typography: Editorial Authority

We use a "High-Contrast Pairing" to balance technical reliability with premium elegance.

*   **Display & Headlines (Newsreader):** This serif font is our editorial voice. It should be used for large, expressive headers. To achieve the signature look, use `italic` sparingly for secondary words in a headline to create visual rhythm.
*   **Interface & Body (Manrope):** This sans-serif provides the "tech" feel. It is high-legibility and modern. Use it for all functional data, labels, and long-form reading.

**Hierarchy Goal:** A `display-lg` headline (3.5rem) should feel significantly more authoritative than the `body-lg` text (1rem), creating a clear "entry point" for the user's eye.

---

## 4. Elevation & Depth

We avoid the "pasted on" look of standard shadows in favor of ambient light.

*   **The Layering Principle:** Depth is achieved by "stacking." A card using `surface-container-lowest` (#ffffff) sitting on a `surface-container-low` (#f2f4f7) background creates a natural lift.
*   **Ambient Shadows:** If a floating state is required, use a triple-layered shadow:
    *   *Layer 1:* 0px 4px 20px rgba(25, 28, 30, 0.04)
    *   *Layer 2:* 0px 8px 40px rgba(25, 28, 30, 0.06)
*   **The "Ghost Border" Fallback:** If a container requires definition against an identical background color, use `outline-variant` (#bacbbb) at **15% opacity**. Never use a 100% opaque border.
*   **Corner Radius:** Follow the Roundedness Scale religiously. Use `lg` (2rem) for main containers and `full` (9999px) for pill-shaped buttons and tags to maintain the "soft-tech" aesthetic.

---

## 5. Components

### Buttons (Pill-shaped, `full` radius)
*   **Primary:** Gradient from `primary` to `primary-container`. Text: `on-primary`. Includes a leading or trailing icon (e.g., `arrow_forward`) to denote momentum.
*   **Secondary:** `surface-container-highest` background with `on-surface` text. No border.
*   **Tertiary:** Ghost style. No background. `on-surface-variant` text with a subtle underline on hover.

### Inputs & Fields
*   **Styling:** Background `surface-container-lowest` (#ffffff).
*   **Interaction:** On focus, do not use a heavy border. Instead, use a 2px `primary-container` (#00df81) "glow" shadow.
*   **Error:** Use `error` (#ba1a1a) text for helper messages, but keep the input box subtle.

### Cards & Lists
*   **Rule:** Forbid divider lines. 
*   **Alternative:** Use `spacing-6` (2rem) between list items. For complex data tables, use alternating row fills of `surface-container-low` and `surface`.

### Battery Status Indicators (App Specific)
*   Custom glassmorphic progress bars. The "fill" should utilize the `primary-fixed-dim` (#13e384) token with a soft inner glow.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical margins (e.g., 10% left, 20% right) for hero sections to create a premium editorial feel.
*   **Do** let images and 3D assets overlap background container boundaries.
*   **Do** use `letter-spacing: -0.02em` for Newsreader headlines to increase visual density.

### Don't:
*   **Don't** use pure black (#000000). Always use `on-surface` (#191c1e) for text to maintain softness.
*   **Don't** use standard "Drop Shadows." If it doesn't look like ambient light, it's too heavy.
*   **Don't** use more than one vibrant green element per view. The green is a "signal," not a decoration.
*   **Don't** use right-angles. Every interactive element must have a minimum of `sm` (0.5rem) roundedness.