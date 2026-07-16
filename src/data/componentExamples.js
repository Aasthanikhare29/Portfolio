export const sidebarSections = [
  { id: "overview", label: "Overview" },
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "buttons", label: "Buttons" },
  { id: "icon-buttons", label: "Icon Buttons" },
  { id: "badges", label: "Badges" },
  { id: "forms", label: "Form Elements" },
  { id: "cards", label: "Cards" },
  { id: "hero-sections", label: "Hero Sections" },
  { id: "section-titles", label: "Section Titles" },
  { id: "alerts", label: "Alerts" },
  { id: "modals", label: "Modals" },
  { id: "loaders", label: "Loaders" },
  { id: "empty-states", label: "Empty States" },
  { id: "avatars", label: "Avatars" },
  { id: "tooltips", label: "Tooltips" },
  { id: "navigation", label: "Navigation" },
  { id: "spacing", label: "Spacing" },
  { id: "shadows", label: "Shadows" },
  { id: "border-radius", label: "Border Radius" },
  { id: "icons", label: "Icons" },
  { id: "animations", label: "Animations" },
];

export const colors = [
  { name: "Pink", hex: "#FFE4EF", var: "--pink" },
  { name: "Peach", hex: "#FFE0D4", var: "--peach" },
  { name: "Mint", hex: "#E0F7EB", var: "--mint" },
  { name: "Lavender", hex: "#EDE4FF", var: "--lavender" },
  { name: "Blue", hex: "#E3EEFF", var: "--blue" },
  { name: "Yellow", hex: "#FFF5CC", var: "--yellow" },
  { name: "Coral", hex: "#FFD6D0", var: "--coral" },
  { name: "Sage", hex: "#E4EDDB", var: "--sage" },
  { name: "Cream", hex: "#FAFAF8", var: "--cream" },
  { name: "White", hex: "#FFFFFF", var: "--white" },
  { name: "Pink Deep", hex: "#F0A9C9", var: "--pink-deep" },
  { name: "Peach Deep", hex: "#F0B99E", var: "--peach-deep" },
  { name: "Mint Deep", hex: "#8DD8AD", var: "--mint-deep" },
  { name: "Lavender Deep", hex: "#BFA6E8", var: "--lavender-deep" },
  { name: "Blue Deep", hex: "#A6C4F0", var: "--blue-deep" },
  { name: "Yellow Deep", hex: "#F0E07A", var: "--yellow-deep" },
  { name: "Dark", hex: "#1A1625", var: "--dark" },
  { name: "Muted", hex: "#6B6574", var: "--muted" },
];

export const buttonExamples = {
  primary: `<Button variant="primary" size="large">View My Projects</Button>`,
  secondary: `<Button variant="secondary">Download Resume</Button>`,
  outline: `<Button variant="outline">Learn More</Button>`,
  ghost: `<Button variant="ghost">Cancel</Button>`,
  softPink: `<Button variant="softPink">Soft Pink</Button>`,
  softMint: `<Button variant="softMint">Soft Mint</Button>`,
  softLavender: `<Button variant="softLavender">Soft Lavender</Button>`,
  dark: `<Button variant="dark">Dark Button</Button>`,
  danger: `<Button variant="danger">Delete</Button>`,
  textLink: `<Button variant="textLink">Read More</Button>`,
  withIcon: `<Button variant="primary" iconRight={<ArrowRight />}>View Projects</Button>`,
  loading: `<Button variant="primary" loading>Sending</Button>`,
  disabled: `<Button variant="primary" disabled>Disabled</Button>`,
};

export const buttonProps = [
  { prop: "variant", type: "string", default: "primary", description: "Button style variant" },
  { prop: "size", type: "string", default: "medium", description: "small | medium | large" },
  { prop: "iconLeft", type: "ReactNode", default: "—", description: "Icon before text" },
  { prop: "iconRight", type: "ReactNode", default: "—", description: "Icon after text" },
  { prop: "loading", type: "boolean", default: "false", description: "Show spinner" },
  { prop: "disabled", type: "boolean", default: "false", description: "Disabled state" },
  { prop: "onClick", type: "function", default: "—", description: "Click handler" },
];

export const badgeExamples = [
  { label: "React", variant: "soft", color: "blue" },
  { label: "UI Design", variant: "soft", color: "pink" },
  { label: "Frontend", variant: "soft", color: "lavender" },
  { label: "Available", variant: "solid", color: "mint" },
  { label: "Featured", variant: "solid", color: "lavender" },
  { label: "New", variant: "solid", color: "coral" },
  { label: "In Progress", variant: "outline", color: "yellow" },
  { label: "Completed", variant: "soft", color: "mint" },
  { label: "Case Study", variant: "outline", color: "blue" },
  { label: "Blog", variant: "soft", color: "peach" },
];

export const formExamples = {
  input: `<Input label="Email" type="email" placeholder="hello@example.com" helperText="I will never share your email." />`,
  inputError: `<Input label="Email" type="email" error="Please enter a valid email" />`,
  textarea: `<Textarea label="Message" placeholder="Tell me about your project..." rows={4} />`,
  select: `<Select label="Role" options={[{value:"dev",label:"Developer"},{value:"design",label:"Designer"}]} />`,
  checkbox: `<Checkbox label="I agree to the terms" checked={true} />`,
  radio: `<Radio name="plan" label="Free" value="free" />`,
  toggle: `<Toggle label="Dark mode" checked={false} />`,
};

export const sampleProject = {
  id: "sample",
  title: "E-Commerce Dashboard",
  description: "A modern analytics dashboard for tracking sales, inventory and customer insights.",
  category: "Web App",
  image: "https://picsum.photos/seed/proj1/600/400",
  technologies: ["React", "TypeScript", "Tailwind", "Chart.js"],
  liveUrl: "#",
  githubUrl: "#",
};

export const sampleBlog = {
  title: "Building Accessible React Components",
  excerpt: "Learn how to create inclusive UI components that work for everyone, with proper ARIA labels and keyboard navigation.",
  category: "Accessibility",
  date: "Mar 15, 2026",
  readingTime: "5 min",
  coverImage: "https://picsum.photos/seed/blog1/600/340",
};

export const sampleTestimonial = {
  quote: "Aastha brought incredible attention to detail and a creative perspective that elevated our entire product experience.",
  name: "Priya Sharma",
  role: "Product Manager",
  company: "TechCorp",
  avatar: "https://picsum.photos/seed/person1/100/100",
};

export const spacingValues = [
  { name: "xs", value: "0.25rem", px: "4px" },
  { name: "sm", value: "0.5rem", px: "8px" },
  { name: "md", value: "1rem", px: "16px" },
  { name: "lg", value: "1.5rem", px: "24px" },
  { name: "xl", value: "2rem", px: "32px" },
  { name: "2xl", value: "3rem", px: "48px" },
  { name: "3xl", value: "4rem", px: "64px" },
  { name: "4xl", value: "6rem", px: "96px" },
  { name: "5xl", value: "8rem", px: "128px" },
];

export const radiusValues = [
  { name: "small", value: "8px", var: "--radius-sm" },
  { name: "medium", value: "12px", var: "--radius-md" },
  { name: "large", value: "20px", var: "--radius-lg" },
  { name: "extra-large", value: "28px", var: "--radius-xl" },
  { name: "pill", value: "999px", var: "--radius-pill" },
];

export const shadowValues = [
  { name: "Small", var: "--shadow-sm", value: "0 1px 3px rgba(0,0,0,0.04)" },
  { name: "Medium", var: "--shadow-md", value: "0 4px 24px rgba(0,0,0,0.06)" },
  { name: "Large", var: "--shadow-lg", value: "0 12px 48px rgba(0,0,0,0.08)" },
  { name: "Hover", var: "--shadow-hover", value: "0 20px 64px rgba(0,0,0,0.1)" },
];
