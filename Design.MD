# Design System Inspired by Apple

## 1. Visual Theme & Atmosphere

Apple's design system embodies premium minimalism with a focus on clarity, precision, and sophisticated restraint. The aesthetic is characterized by deep, neutral backgrounds paired with vibrant accent colors that draw attention to key interactions and calls-to-action. The design philosophy prioritizes whitespace, allowing content and products to breathe while maintaining a sense of technological advancement and luxury. Typography is refined and measured, using carefully calibrated spacing to create visual rhythm. The overall mood is professional yet approachable, balancing innovation with accessibility through consistent, intuitive UI patterns that guide users seamlessly through product exploration and purchase experiences.

**Key Characteristics**
- Minimalist aesthetic with generous whitespace and breathing room
- Deep neutral backgrounds (charcoal to black) contrasted with bright accent blues
- Precision-focused typography with distinct hierarchy levels
- Sophisticated color transitions and subtle elevation effects
- Premium feel achieved through careful spacing and proportional relationships
- Clean, geometric component design with refined border radius treatments
- Product-centric layouts that celebrate visual showcase

## 2. Color Palette & Roles

### Primary

- **Primary Action Blue** (`#0071E3`): Primary call-to-action buttons, interactive links, and key engagement points across the interface
- **Primary Blue Hover** (`#006EDB`): Hover state for primary interactive elements, providing subtle visual feedback
- **Primary Blue Active** (`#0076DF`): Active/pressed state for primary buttons and links

### Accent Colors

- **Bright Action Blue** (`#0077ED`): Alternative accent for high-priority features and standout UI elements

### Interactive

- **Interactive Dark** (`#121214`): Deep interactive states and overlay elements requiring high contrast
- **Light Interactive** (`#F5F5F7`): Soft interactive surfaces and button backgrounds for secondary actions

### Neutral Scale

- **Charcoal Primary** (`#1D1D1F`): Primary text color for headings and main content on light backgrounds
- **Dark Slate** (`#272729`): Secondary text and muted content areas
- **Deep Black** (`#18181A`): Darkest neutral for maximum contrast and deep surface areas
- **Medium Gray** (`#86868B`): Tertiary text, disabled states, and subtle UI elements
- **True Black** (`#000000`): Pure black for critical contrast requirements and deep backgrounds
- **White** (`#FFFFFF`): Primary background and text on dark surfaces

### Surface & Borders

- **Light Gray Surface** (`#E8E8ED`): Secondary background surfaces, card backgrounds, and border dividers
- **Very Light Gray** (`#EDEDF2`): Subtle surface variation and light borders

## 3. Typography Rules

### Font Family

- **Primary Font**: SF Pro TH with fallback stack `'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` for Thai language support and system consistency
- **Secondary Font**: SF Pro Text with fallback stack `'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` for UI elements requiring clean, readable rendering

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|---------------|----|
| Display Large | SF Pro TH | 80px | 600 | 108px | 0px | Hero headlines and prominent titles |
| Display Medium | SF Pro TH | 56px | 600 | 75px | 0px | Section headers and feature titles |
| Heading Large | SF Pro TH | 34px | 600 | 46px | 0px | Primary page headings and major sections |
| Heading Medium | SF Pro TH | 24px | 600 | 24px | 0px | Subheadings and card titles |
| Heading Small | SF Pro TH | 17px | 600 | 23px | 0px | Minor headings and section labels |
| Body Large | SF Pro TH | 17px | 400 | 23px | 0px | Primary body text and descriptive content |
| Body | SF Pro Text | 17px | 400 | 41px | 0px | Body copy in content areas and descriptions |
| Body Medium | SF Pro TH | 14px | 500 | 19px | 0px | Secondary body text and metadata |
| Body Small | SF Pro TH | 12px | 400 | 16px | 0px | Captions, labels, and tertiary text |
| Button | SF Pro Text | 18px | 300 | 18px | 0px | Primary button text and interactive labels |
| Link | SF Pro Text | 14px | 400 | 18px | 0px | Inline links and auxiliary interactive text |
| Input | SF Pro Text | 12px | 600 | 12px | 0px | Form input placeholder and value text |

### Principles

- Hierarchy is established through size, weight, and color contrast rather than decorative elements
- Line height is consistently proportional to font size, typically 1.3–2.4x for readability
- SF Pro TH is preferred for Thai language content; SF Pro Text provides clean, modern rendering for UI labels
- Font weights are limited to three: 300 (light), 400 (regular), and 600 (bold) for visual clarity
- Letter spacing remains at 0px for tight, refined appearance; optical spacing is prioritized
- All typography maintains minimum contrast ratio of 4.5:1 against background surfaces

## 4. Component Stylings

### Buttons

#### Primary Action Button
- **Background**: `#0071E3`
- **Text Color**: `#FFFFFF`
- **Font**: SF Pro Text, 18px, weight 300
- **Padding**: `12px 24px`
- **Border Radius**: `8px`
- **Border**: `1px solid #0071E3`
- **Height**: `44px`
- **Hover State**: Background `#0066CC`, box-shadow `0px 4px 12px rgba(0, 113, 227, 0.3)`
- **Active State**: Background `#0050A0`, box-shadow `0px 2px 8px rgba(0, 50, 160, 0.2)`
- **Disabled State**: Background `#E8E8ED`, text color `#86868B`, cursor `not-allowed`

#### Secondary Button
- **Background**: `#F5F5F7`
- **Text Color**: `#1D1D1F`
- **Font**: SF Pro Text, 14px, weight 400
- **Padding**: `8px 15px`
- **Border Radius**: `8px`
- **Border**: `1px solid #E8E8ED`
- **Height**: `36px`
- **Hover State**: Background `#E8E8ED`, box-shadow `0px 2px 6px rgba(0, 0, 0, 0.08)`
- **Active State**: Background `#EDEDF2`
- **Disabled State**: Background `#EDEDF2`, text color `#86868B`

#### Ghost Button (Text Link Style)
- **Background**: `transparent`
- **Text Color**: `#0071E3`
- **Font**: SF Pro TH, 17px, weight 400
- **Padding**: `0px 0px`
- **Border Radius**: `0px`
- **Border**: `none`
- **Height**: `auto`
- **Hover State**: Text color `#0066CC`, text-decoration `underline`
- **Active State**: Text color `#0050A0`
- **Focus State**: Outline `2px solid #0071E3`

#### Icon Button
- **Background**: `transparent`
- **Text Color**: `rgba(255, 255, 255, 0.8)`
- **Font**: SF Pro Text, 18px, weight 400
- **Padding**: `0px 0px`
- **Border Radius**: `0px`
- **Border**: `none`
- **Height**: `44px`
- **Width**: `44px`
- **Hover State**: Opacity `1`, text color `#FFFFFF`
- **Active State**: Opacity `0.6`

### Cards & Containers

#### Feature Card (Light Background)
- **Background**: `#FFFFFF`
- **Border**: `1px solid #E8E8ED`
- **Border Radius**: `32px`
- **Padding**: `24px 32px`
- **Box Shadow**: `0px 4px 16px rgba(0, 0, 0, 0.08)`
- **Text Color**: `#1D1D1F`
- **Hover State**: Box-shadow `0px 8px 24px rgba(0, 0, 0, 0.12)`, transform `translateY(-2px)`

#### Dark Card (Product Showcase)
- **Background**: `#1D1D1F`
- **Border**: `1px solid #272729`
- **Border Radius**: `28px`
- **Padding**: `32px 40px`
- **Box Shadow**: `0px 4px 20px rgba(0, 0, 0, 0.4)`
- **Text Color**: `#FFFFFF`
- **Hover State**: Box-shadow `0px 8px 32px rgba(0, 0, 0, 0.6)`

#### Modal Container
- **Background**: `#F5F5F7`
- **Border Radius**: `50%` (circular for overlays) or `32px` (rectangular)
- **Padding**: `40px 52px`
- **Box Shadow**: `0px 12px 48px rgba(0, 0, 0, 0.25)`
- **Text Color**: `#1D1D1F`
- **Backdrop**: `rgba(0, 0, 0, 0.4)` blur `12px`

### Inputs & Forms

#### Text Input
- **Background**: `#FFFFFF`
- **Border**: `1px solid #E8E8ED`
- **Border Radius**: `26px`
- **Padding**: `12px 16px`
- **Font**: SF Pro Text, 16px, weight 400
- **Text Color**: `#1D1D1F`
- **Placeholder Color**: `#86868B`
- **Height**: `44px`
- **Focus State**: Border `2px solid #0071E3`, box-shadow `0px 0px 0px 4px rgba(0, 113, 227, 0.1)`
- **Error State**: Border `2px solid #FF3B30`, text color `#FF3B30`
- **Disabled State**: Background `#E8E8ED`, border `1px solid #EDEDF2`, color `#86868B`

#### Dropdown Select
- **Background**: `#FFFFFF`
- **Border**: `1px solid #E8E8ED`
- **Border Radius**: `8px`
- **Padding**: `10px 12px`
- **Font**: SF Pro Text, 14px, weight 400
- **Text Color**: `#1D1D1F`
- **Height**: `36px`
- **Hover State**: Border `1px solid #D0D0D5`, background `#F5F5F7`
- **Focus State**: Border `2px solid #0071E3`, box-shadow `0px 0px 0px 3px rgba(0, 113, 227, 0.1)`

#### Checkbox
- **Size**: `20px × 20px`
- **Border Radius**: `4px`
- **Border**: `2px solid #E8E8ED`
- **Checked State**: Background `#0071E3`, border `2px solid #0071E3`, checkmark `#FFFFFF`
- **Hover State**: Border `2px solid #0071E3`
- **Focus State**: Box-shadow `0px 0px 0px 3px rgba(0, 113, 227, 0.2)`

### Navigation

#### Top Navigation Bar
- **Background**: `#FFFFFF`
- **Height**: `44px`
- **Padding**: `0px 20px`
- **Border Bottom**: `1px solid #E8E8ED`
- **Text Color**: `#1D1D1F`
- **Font**: SF Pro TH, 17px, weight 600
- **Display**: Flex, align-items center, justify-content space-between

#### Navigation Link
- **Background**: `transparent`
- **Text Color**: `#1D1D1F`
- **Font**: SF Pro TH, 17px, weight 400
- **Padding**: `8px 12px`
- **Border Radius**: `0px`
- **Height**: `44px`
- **Hover State**: Background `#F5F5F7`, text-decoration `none`
- **Active State**: Border-bottom `3px solid #0071E3`, text color `#0071E3`
- **Focus State**: Outline `2px solid #0071E3`

#### Breadcrumb Navigation
- **Font**: SF Pro Text, 12px, weight 400
- **Text Color**: `#86868B`
- **Separator**: `/` with margin `0px 8px`
- **Active Link**: Text color `#1D1D1F`, font-weight `600`
- **Hover Link**: Text color `#0071E3`

### Badges

#### Status Badge (Active)
- **Background**: `#0071E3`
- **Text Color**: `#FFFFFF`
- **Font**: SF Pro Text, 12px, weight 600
- **Padding**: `4px 12px`
- **Border Radius**: `12px`
- **Height**: `24px`

#### Status Badge (Inactive)
- **Background**: `#E8E8ED`
- **Text Color**: `#86868B`
- **Font**: SF Pro Text, 12px, weight 600
- **Padding**: `4px 12px`
- **Border Radius**: `12px`
- **Height**: `24px`

### Tabs

#### Tab Button (Inactive)
- **Background**: `transparent`
- **Text Color**: `#86868B`
- **Font**: SF Pro TH, 17px, weight 400
- **Padding**: `8px 16px`
- **Border Bottom**: `2px solid transparent`
- **Height**: `44px`
- **Hover State**: Text color `#1D1D1F`

#### Tab Button (Active)
- **Background**: `transparent`
- **Text Color**: `#1D1D1F`
- **Font**: SF Pro TH, 17px, weight 600
- **Padding**: `8px 16px`
- **Border Bottom**: `2px solid #0071E3`
- **Height**: `44px`

## 5. Layout Principles

### Spacing System

Base unit: `8px`

Spacing scale: `4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `28px`, `32px`, `36px`, `40px`, `44px`, `52px`

- **4px**: Micro-adjustments between tightly grouped elements
- **8px**: Gap between inline items and tight component spacing
- **12px**: Small component margins and padding adjustments
- **16px**: Standard padding within components, gap between related sections
- **20px**: Comfortable padding for interactive elements
- **24px**: Standard card and container padding
- **28px**: Section spacing within grouped content
- **32px**: Large component padding and vertical section spacing
- **36px**: Gap between major content sections
- **40px**: Hero section padding and spacious layouts
- **44px**: Top-level margin and large spacing between distinct sections
- **52px**: Maximum padding for premium, spacious layouts

### Grid & Container

- **Max Container Width**: `1440px` for desktop layouts
- **Column Strategy**: 12-column grid with `16px` gutters for responsive scaling
- **Breakpoint Columns**: Desktop (12 cols), Tablet (8 cols), Mobile (4 cols)
- **Container Padding**: `20px` on mobile, `32px` on tablet, `40px` on desktop
- **Section Pattern**: Full-width hero sections alternate with constrained content zones at max width
- **Content Padding**: Minimum `16px` on all sides to prevent edge bleed

### Whitespace Philosophy

Apple's design prioritizes breathing room and visual clarity. Whitespace is not merely empty space but an active design element that guides visual hierarchy and creates focus. Sections are separated by generous vertical spacing (`36px` to `44px`) rather than visual dividers. Cards and components float within whitespace, creating a sense of premium quality and reduced cognitive load. Content density increases with importance; hero sections use maximum whitespace; product grids maintain consistent spacing throughout. Whitespace around interactive elements (buttons, links) helps them stand out without aggressive visual treatment.

### Border Radius Scale

- **4px**: Minimal rounding for inputs and subtle UI elements requiring definition
- **8px**: Standard rounding for buttons, smaller cards, and component containers
- **12px**: Medium rounding for form elements and secondary cards
- **26px**: Large rounding for input fields and form containers (approaching pill shape)
- **28px**: Product card containers and featured component surfaces
- **32px**: Premium card containers and modal dialogs
- **50%**: Circular elements including avatars, badge indicators, and perfect circles

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | No shadow, `box-shadow: none` | Base surfaces, neutral backgrounds, text-only content |
| Raised (+1) | `0px 2px 8px rgba(0, 0, 0, 0.08)` | Secondary buttons, subtle elevation, hover states on secondary elements |
| Elevated (+2) | `0px 4px 12px rgba(0, 0, 0, 0.12)` | Cards, containers, standard component hover states |
| Floating (+3) | `0px 4px 16px rgba(0, 0, 0, 0.15)` | Feature cards, product showcases, emphasized components |
| Overlay (+4) | `0px 8px 24px rgba(0, 0, 0, 0.2)` | Dropdowns, popovers, secondary modals |
| Modal (+5) | `0px 12px 48px rgba(0, 0, 0, 0.25)` | Primary modals, dialogs, full-screen overlays |
| Deep (+6) | `0px 16px 64px rgba(0, 0, 0, 0.3)` | Reserved for critical modals and full-page overlays |

**Shadow Philosophy**

Apple's shadow approach is restrained and purposeful. Shadows are used to establish depth hierarchy and spatial relationships, not for decorative effect. Primary shadows employ soft, diffused 8-24px blur radiuses with low opacity (8–15%) to create subtle elevation without visual weight. Shadows increase slightly on interactive hover states to provide tactile feedback. Dark mode surfaces use slightly higher shadow opacity (8–10% darker overlay) to maintain visibility against deep backgrounds. The shadow system works in concert with color and spacing to guide user attention through information hierarchy.

## 7. Do's and Don'ts

### Do

- **Use the primary blue (`#0071E3`) exclusively for primary actions** — consistency across CTAs builds user confidence in interaction patterns
- **Apply appropriate spacing scales consistently** — always use multiples of `8px` for margins and padding to maintain rhythmic alignment
- **Maintain minimum touch targets of 44×44px** — all interactive elements must accommodate comfortable finger and cursor interaction
- **Leverage SF Pro typography exclusively** — system fonts ensure rendering consistency across devices and languages
- **Implement hover states for all interactive elements** — subtle color shifts or shadows provide necessary visual feedback
- **Use the established color palette without modification** — custom colors dilute brand consistency and accessibility compliance
- **Apply subtle shadows for depth** — shadows at +1 to +2 elevation levels create visual hierarchy without distraction
- **Center-align content within max-width containers** — prevents awkward edge alignment on ultra-wide displays
- **Include focus states for keyboard navigation** — blue outline `2px solid #0071E3` ensures accessibility compliance
- **Group related components with 16px spacing** — visual clustering improves content scanability

### Don't

- **Don't use decorative shadows or glows** — shadows serve functional hierarchy only
- **Don't mix font families or vary from SF Pro** — brand consistency requires system-wide typographic adherence
- **Don't exceed border radius of 32px outside of special cases** — maintains design coherence and visual consistency
- **Don't create custom color variations** — the defined palette provides sufficient range for all states
- **Don't apply padding less than 8px** — breaks visual rhythm and spacing consistency
- **Don't use white text on light backgrounds or dark text on dark backgrounds** — minimum 4.5:1 contrast required
- **Don't nest modals more than two levels deep** — cognitive load increases with each overlay layer
- **Don't reduce interactive element sizes below 44px** — violates touch and accessibility standards
- **Don't animate transitions faster than 200ms or slower than 600ms** — maintains perceived responsiveness
- **Don't apply shadows to text elements** — reduces readability and creates visual noise
- **Don't use all caps for body copy** — limits readability; reserve caps for headings and labels only

## 8. Responsive Behavior

### Breakpoints

| Breakpoint Name | Width | Columns | Padding | Key Changes |
|-----------------|-------|---------|---------|------------|
| Mobile | 320px–767px | 4 | 16px | Single-column layout, stacked navigation, full-width cards, 16px bottom sheet margins |
| Tablet | 768px–1024px | 8 | 24px | Two-column grids, tablet navigation drawer, 24px section spacing, adjusted font sizes |
| Desktop | 1025px–1440px | 12 | 32px | Multi-column layouts, fixed navigation, max-width containers, full typography hierarchy |
| Large Desktop | 1441px+ | 12 | 40px | Centered max-width containers, generous whitespace, expanded feature displays, 40px padding |

### Touch Targets

- **Minimum Interactive Size**: 44×44px for all buttons, links, and tap targets
- **Recommended Interactive Size**: 48×48px for improved usability on mobile devices
- **Spacing Between Targets**: Minimum 8px separation to prevent accidental taps
- **Icon Buttons**: 44×44px bounding box with centered icon (18–24px)
- **Text Links**: Minimum 44px vertical touch area with padding around text
- **Form Controls**: 44px minimum height for inputs, checkboxes, radio buttons

### Collapsing Strategy

- **Desktop to Tablet**: Navigation collapses to hamburger menu at 1024px; multi-column grids collapse to 2 columns; large whitespace reduces to standard spacing; typography reduces by 10–15%
- **Tablet to Mobile**: Two-column layouts become single-column stacks; horizontal scrolling lists collapse to vertical cards; modals become full-screen bottom sheets; padding reduces to 16px minimum
- **Button Sizing**: Full-width buttons below 768px; side-by-side buttons at 768px+
- **Image Scaling**: Images maintain aspect ratio; full-width on mobile, constrained to column width on tablet/desktop
- **Navigation Transformation**: Sticky top nav → hamburger drawer (768px) → full horizontal nav (1025px)
- **Font Size Adjustments**: Display headings reduce from 80px (desktop) to 56px (tablet) to 34px (mobile)
- **Spacing Collapse**: 44px section spacing → 32px (tablet) → 20px (mobile) for tighter information density

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA**: Primary Action Blue (`#0071E3`)
- **Background**: White (`#FFFFFF`) for light theme, Charcoal (`#1D1D1F`) for dark theme
- **Heading Text**: Charcoal Primary (`#1D1D1F`) on light, White (`#FFFFFF`) on dark
- **Body Text**: Charcoal Primary (`#1D1D1F`) on light, White with 80% opacity on dark
- **Secondary Text**: Medium Gray (`#86868B`) on light, Medium Gray on dark
- **Borders**: Light Gray Surface (`#E8E8ED`) on light, Dark Slate (`#272729`) on dark
- **Hover State**: Primary Blue Hover (`#006EDB`)
- **Active State**: Primary Blue Active (`#0076DF`)
- **Disabled State**: Light Gray Surface (`#F5F5F7`) with Medium Gray text
- **Accent Surface**: Light Gray Surface (`#E8E8ED`)
- **Deep Background**: Deep Black (`#18181A`)
- **Modal Overlay**: Very Light Gray (`#EDEDF2`)

### Iteration Guide

1. **All interactive elements must include three states**: default, hover (color shift + subtle shadow), and active/pressed (deeper color change). Icon buttons require opacity changes instead of color shifts.

2. **Spacing follows the 8px base unit system strictly** — all margins and padding must be multiples of 8px. Never use arbitrary spacing values.

3. **Typography hierarchy uses exactly three weights**: 300 (light for button text), 400 (regular for body copy), 600 (bold for headings). No other weights permitted.

4. **Border radius follows the defined scale** — use 8px for buttons, 26px for inputs, 28px–32px for cards, and 50% only for circular elements. Never create intermediate values.

5. **Shadow system must follow elevation levels (+1 through +6)** — shadows increase in blur and offset with each level. Do not create custom shadow values.

6. **Every color must use uppercase hex format** (e.g., `#0071E3`) in all code and documentation. Maintain color consistency across all components.

7. **All text on colored backgrounds must maintain minimum 4.5:1 contrast ratio** — verify WCAG AA compliance before finalizing color combinations.

8. **Button minimum height is 44px** — this ensures touch accessibility. Secondary buttons may use 36px only in dense UI zones.

9. **Modal and overlay components use blue focus outline** `2px solid #0071E3` — this indicates keyboard focus state and is mandatory for accessibility.

10. **Responsive collapsing prioritizes content legibility** — font sizes reduce proportionally (not arbitrarily), spacing maintains minimum 8px gaps, and interactive targets never fall below 44px on any breakpoint.

11. **Dark mode surfaces reverse primary colors** while maintaining contrast — text shifts to white, borders to dark slate, backgrounds to charcoal; blue accent remains `#0071E3` for consistency.

12. **Animation timing ranges from 200ms (micro-interactions) to 600ms (page transitions)** — never exceed 600ms as this creates perceived sluggishness.