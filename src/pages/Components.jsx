import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Download, ExternalLink, Mail,
  Heart, Sparkles, Code, Palette, Menu, X, Search, ChevronDown,
  Check, AlertCircle, AlertTriangle, Info, Monitor,
  Layout, Globe, Smartphone, Puzzle, Bug, Lightbulb, Rocket, Sprout,
  Target, Compass, Zap, BookOpen, Briefcase, Brain, Wrench, Star,
  GraduationCap, MapPin, Coffee, ClipboardList, Send, Hand
} from "lucide-react";
import { FiGithub, FiLinkedin, FiMail, FiArrowRight, FiExternalLink } from "react-icons/fi";

import { useActiveSection } from "../hooks/useActiveSection";
import { sidebarSections, colors, buttonExamples, buttonProps, badgeExamples, formExamples, spacingValues, radiusValues, shadowValues, sampleProject, sampleBlog, sampleTestimonial } from "../data/componentExamples";

import Button from "../components/ui/Button";
import IconButton from "../components/ui/IconButton";
import Badge from "../components/ui/Badge";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import Select from "../components/ui/Select";
import Checkbox from "../components/ui/Checkbox";
import Radio from "../components/ui/Radio";
import Toggle from "../components/ui/Toggle";
import Card from "../components/ui/Card";
import SectionTitle from "../components/ui/SectionTitle";
import Avatar, { AvatarGroup } from "../components/ui/Avatar";
import Tooltip from "../components/ui/Tooltip";
import Alert from "../components/ui/Alert";
import Modal from "../components/ui/Modal";
import { Spinner, DotsLoader, Skeleton, SkeletonCard, PageLoader, ButtonLoader } from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";
import Divider from "../components/ui/Divider";
import BackToTop from "../components/ui/BackToTop";

import ProjectCard from "../components/cards/ProjectCard";
import BlogCard from "../components/cards/BlogCard";
import SkillCard from "../components/cards/SkillCard";
import ExperienceCard from "../components/cards/ExperienceCard";
import TestimonialCard from "../components/cards/TestimonialCard";
import ProcessCard from "../components/cards/ProcessCard";
import StatCard from "../components/cards/StatCard";

import { PortfolioHero, PageHero, SplitHero, MinimalHero } from "../components/sections/HeroVariants";

import "./Components.css";

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="codeBlock">
      <button className="copyBtn" onClick={handleCopy}>{copied ? "Copied!" : "Copy"}</button>
      <pre className="codeContent">{code}</pre>
    </div>
  );
}

function PropsTable({ props }) {
  return (
    <table className="propsTable">
      <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
      <tbody>
        {props.map((p) => (
          <tr key={p.prop}>
            <td><code>{p.prop}</code></td>
            <td><code>{p.type}</code></td>
            <td><code>{p.default}</code></td>
            <td>{p.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function ComponentsPage() {
  const sectionIds = useMemo(() => sidebarSections.map((s) => s.id), []);
  const activeSection = useActiveSection(sectionIds, 160);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedRadio, setSelectedRadio] = useState("free");
  const [toggles, setToggles] = useState({ dm: false, notif: true, auto: false });
  const [selectedNav, setSelectedNav] = useState("default");
  const [copiedColor, setCopiedColor] = useState(null);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const copyColor = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  return (
    <div className="page">
      {/* Mobile Nav */}
      <div className="mobileNav">
        <select className="mobileNavSelect" value={activeSection} onChange={(e) => scrollTo(e.target.value)}>
          {sidebarSections.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
      </div>

      {/* Sidebar */}
      <aside className="sidebar" aria-label="Component sections">
        <span className="sidebarLabel">Design System</span>
        {sidebarSections.map((s) => (
          <a key={s.id} className={`sidebarLink ${activeSection === s.id ? "sidebarLinkActive" : ""}`} onClick={() => scrollTo(s.id)}>{s.label}</a>
        ))}
        <span className="sidebarLabel" style={{ marginTop: "var(--space-xl)" }}>Quick Links</span>
        <Link to="/" className="sidebarLink">Portfolio Home</Link>
        <Link to="/about" className="sidebarLink">About Page</Link>
        <Link to="/projects" className="sidebarLink">Projects</Link>
      </aside>

      {/* Main Content */}
      <main className="main">
        {/* Header */}
        <header className="header" id="overview">
          <span className="headerLabel">🎨 My UI Toolkit</span>
          <h1 className="headerTitle">Portfolio Design System</h1>
          <p className="headerDesc">A collection of reusable components, styles and interaction patterns used across my portfolio.</p>
          <div className="headerButtons">
            <Button variant="primary" iconRight={<ArrowRight />} onClick={() => window.location.href = "/"}>View Portfolio</Button>
            <Button variant="secondary" iconLeft={<FiGithub />} onClick={() => window.open("https://github.com/", "_blank")}>View Source Code</Button>
          </div>
        </header>

        {/* ===== COLORS ===== */}
        <section className="section" id="colors">
          <h2 className="sectionTitle">Colors</h2>
          <p className="sectionDesc">The pastel palette used throughout the portfolio. Click any swatch to copy the hex value.</p>
          <div className="swatchGrid">
            {colors.map((c) => (
              <div key={c.var} className="swatch" onClick={() => copyColor(c.hex)}>
                <div className="swatchColor" style={{ background: c.hex }} />
                <div className="swatchInfo">
                  <span className="swatchName">{c.name}</span>
                  <span className="swatchHex">{copiedColor === c.hex ? "Copied!" : c.hex}</span>
                  <span className="swatchVar">{c.var}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== TYPOGRAPHY ===== */}
        <section className="section" id="typography">
          <h2 className="sectionTitle">Typography</h2>
          <p className="sectionDesc">Three font families: Sora for headings, Inter for body, Caveat for handwritten accents.</p>
          <div className="typeScale">
            <div className="typeRow">
              <span className="typeLabel">Display Heading</span>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05 }}>I design thoughtful interfaces.</span>
              <span className="typeMeta">Sora / 800 / clamp(2.5rem, 5vw, 3.5rem)</span>
            </div>
            <div className="typeRow">
              <span className="typeLabel">H2</span>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 4vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.03em" }}>Projects I'm Proud Of</span>
              <span className="typeMeta">Sora / 700 / clamp(2rem, 4vw, 2.5rem)</span>
            </div>
            <div className="typeRow">
              <span className="typeLabel">H3</span>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.02em" }}>E-Commerce Dashboard</span>
              <span className="typeMeta">Sora / 600 / 1.5rem</span>
            </div>
            <div className="typeRow">
              <span className="typeLabel">H4</span>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 600 }}>Section Subtitle</span>
              <span className="typeMeta">Sora / 600 / 1.2rem</span>
            </div>
            <div className="typeRow">
              <span className="typeLabel">Body Large</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", lineHeight: 1.7 }}>I create responsive and user-friendly web experiences with a balance of design and development.</span>
              <span className="typeMeta">Inter / 400 / 1.1rem</span>
            </div>
            <div className="typeRow">
              <span className="typeLabel">Body Regular</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.7 }}>I create responsive and user-friendly web experiences.</span>
              <span className="typeMeta">Inter / 400 / 1rem</span>
            </div>
            <div className="typeRow">
              <span className="typeLabel">Body Small</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", lineHeight: 1.6, color: "var(--muted)" }}>Supporting text for descriptions and helper content.</span>
              <span className="typeMeta">Inter / 400 / 0.88rem</span>
            </div>
            <div className="typeRow">
              <span className="typeLabel">Caption</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--light-muted)" }}>Metadata and timestamps</span>
              <span className="typeMeta">Inter / 400 / 0.78rem</span>
            </div>
            <div className="typeRow">
              <span className="typeLabel">Button Text</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 500 }}>View My Projects</span>
              <span className="typeMeta">Inter / 500 / 0.9rem</span>
            </div>
            <div className="typeRow">
              <span className="typeLabel">Handwritten Label</span>
              <span style={{ fontFamily: "var(--font-handwritten)", fontSize: "1.4rem", color: "var(--lavender-deep)" }}>Hello, I'm Aastha</span>
              <span className="typeMeta">Caveat / 600 / 1.4rem</span>
            </div>
          </div>
        </section>

        {/* ===== BUTTONS ===== */}
        <section className="section" id="buttons">
          <h2 className="sectionTitle">Buttons</h2>
          <p className="sectionDesc">All button variants, sizes and states for primary actions, navigation and form submissions.</p>

          <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "var(--space-md)" }}>Variants</h3>
          <div className="preview">
            <div className="previewRow">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="softPink">Soft Pink</Button>
              <Button variant="softMint">Soft Mint</Button>
              <Button variant="softLavender">Soft Lavender</Button>
              <Button variant="dark">Dark</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="textLink">Text Link</Button>
            </div>
            <CodeBlock code={`<Button variant="primary">Primary</Button>\n<Button variant="secondary">Secondary</Button>\n<Button variant="outline">Outline</Button>\n<Button variant="ghost">Ghost</Button>\n<Button variant="softPink">Soft Pink</Button>\n<Button variant="softMint">Soft Mint</Button>\n<Button variant="softLavender">Soft Lavender</Button>\n<Button variant="dark">Dark</Button>\n<Button variant="danger">Danger</Button>\n<Button variant="textLink">Text Link</Button>`} />
          </div>

          <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "var(--space-md)" }}>Sizes</h3>
          <div className="preview">
            <div className="previewRow">
              <Button variant="primary" size="small">Small</Button>
              <Button variant="primary" size="medium">Medium</Button>
              <Button variant="primary" size="large">Large</Button>
            </div>
          </div>

          <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "var(--space-md)" }}>With Icons</h3>
          <div className="preview">
            <div className="previewRow">
              <Button variant="primary" iconRight={<ArrowRight />}>View Projects</Button>
              <Button variant="secondary" iconLeft={<Download />}>Download Resume</Button>
              <Button variant="outline" iconRight={<ExternalLink />}>Live Demo</Button>
            </div>
            <CodeBlock code={`<Button variant="primary" iconRight={<ArrowRight />}>View Projects</Button>\n<Button variant="secondary" iconLeft={<Download />}>Download Resume</Button>`} />
          </div>

          <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "var(--space-md)" }}>States</h3>
          <div className="preview">
            <div className="previewRow">
              <Button variant="primary">Default</Button>
              <Button variant="primary" loading>Loading</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>
          </div>

          <PropsTable props={buttonProps} />
        </section>

        {/* ===== ICON BUTTONS ===== */}
        <section className="section" id="icon-buttons">
          <h2 className="sectionTitle">Icon Buttons</h2>
          <p className="sectionDesc">Compact buttons for actions that need no text label.</p>
          <div className="preview">
            <div className="previewRow">
              <Tooltip content="GitHub"><IconButton icon={<FiGithub size={18} />} label="GitHub" /></Tooltip>
              <Tooltip content="LinkedIn"><IconButton icon={<FiLinkedin size={18} />} label="LinkedIn" /></Tooltip>
              <Tooltip content="Email"><IconButton icon={<FiMail size={18} />} label="Email" /></Tooltip>
              <Tooltip content="Search"><IconButton icon={<Search size={18} />} label="Search" variant="soft" /></Tooltip>
              <Tooltip content="Close"><IconButton icon={<X size={18} />} label="Close" variant="outline" /></Tooltip>
              <Tooltip content="Menu"><IconButton icon={<Menu size={18} />} label="Menu" variant="dark" shape="square" /></Tooltip>
              <Tooltip content="Previous"><IconButton icon={<ArrowLeft size={18} />} label="Previous" variant="pink" /></Tooltip>
              <Tooltip content="Next"><IconButton icon={<ArrowRight size={18} />} label="Next" variant="mint" /></Tooltip>
            </div>
          </div>
          <CodeBlock code={`<IconButton icon={<Github size={18} />} label="GitHub" />\n<IconButton icon={<Mail size={18} />} label="Email" variant="soft" />\n<IconButton icon={<X size={18} />} label="Close" variant="outline" shape="square" />`} />
        </section>

        {/* ===== BADGES ===== */}
        <section className="section" id="badges">
          <h2 className="sectionTitle">Badges</h2>
          <p className="sectionDesc">Small labels for status, categories and tags.</p>
          <div className="preview">
            <div className="previewRow">
              {badgeExamples.map((b, i) => (
                <Badge key={i} variant={b.variant} color={b.color}>{b.label}</Badge>
              ))}
            </div>
          </div>
          <div className="preview" style={{ marginTop: "var(--space-md)" }}>
            <h4 style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "var(--space-md)" }}>With Dots</h4>
            <div className="previewRow">
              <Badge variant="soft" color="mint" dot>Available</Badge>
              <Badge variant="soft" color="coral" dot>Urgent</Badge>
              <Badge variant="soft" color="blue" dot>New</Badge>
            </div>
          </div>
          <CodeBlock code={`<Badge variant="soft" color="blue">React</Badge>\n<Badge variant="solid" color="mint">Available</Badge>\n<Badge variant="outline" color="lavender">Featured</Badge>\n<Badge variant="soft" color="mint" dot>With Dot</Badge>`} />
        </section>

        {/* ===== FORMS ===== */}
        <section className="section" id="forms">
          <h2 className="sectionTitle">Form Elements</h2>
          <p className="sectionDesc">Reusable form components with labels, validation and accessibility.</p>

          <div className="preview" style={{ maxWidth: 480 }}>
            <div className="previewCol">
              <Input label="Full Name" placeholder="Aastha Nikhare" required />
              <Input label="Email" type="email" placeholder="hello@example.com" helperText="I will never share your email." icon={<Mail size={16} />} />
              <Input label="Email with Error" type="email" value="invalid@" error="Please enter a valid email address" />
              <Input label="Disabled Input" placeholder="Cannot edit" disabled />
              <Select label="Role" placeholder="Select your role" options={[{ value: "dev", label: "Developer" }, { value: "design", label: "Designer" }, { value: "pm", label: "Product Manager" }]} />
              <Textarea label="Message" placeholder="Tell me about your project..." rows={3} maxLength={200} helperText="Be as detailed as possible." />
            </div>
            <CodeBlock code={formExamples.input} />
          </div>

          <div className="preview" style={{ marginTop: "var(--space-md)" }}>
            <h4 style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "var(--space-md)" }}>Checkbox, Radio & Toggle</h4>
            <div className="previewCol" style={{ gap: "var(--space-lg)" }}>
              <div className="previewRow">
                <Checkbox label="I agree to the terms" checked={true} onChange={() => {}} />
                <Checkbox label="Subscribe to newsletter" checked={false} onChange={() => {}} />
                <Checkbox label="Disabled option" disabled />
              </div>
              <div className="previewRow">
                <Radio name="plan" label="Free" value="free" checked={selectedRadio === "free"} onChange={() => setSelectedRadio("free")} />
                <Radio name="plan" label="Pro" value="pro" checked={selectedRadio === "pro"} onChange={() => setSelectedRadio("pro")} />
                <Radio name="plan" label="Enterprise" value="enterprise" checked={selectedRadio === "enterprise"} onChange={() => setSelectedRadio("enterprise")} />
              </div>
              <div className="previewRow">
                <Toggle label="Dark mode" checked={toggles.dm} onChange={() => setToggles(p => ({...p, dm: !p.dm}))} />
                <Toggle label="Notifications" checked={toggles.notif} onChange={() => setToggles(p => ({...p, notif: !p.notif}))} />
                <Toggle label="Auto-save" checked={toggles.auto} onChange={() => setToggles(p => ({...p, auto: !p.auto}))} />
              </div>
            </div>
            <CodeBlock code={`<Checkbox label="I agree" checked={true} />\n<Radio name="plan" label="Free" value="free" />\n<Toggle label="Dark mode" checked={false} />`} />
          </div>
        </section>

        {/* ===== CARDS ===== */}
        <section className="section" id="cards">
          <h2 className="sectionTitle">Cards</h2>
          <p className="sectionDesc">Content containers for projects, blog posts, skills and more.</p>

          <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "var(--space-md)" }}>Project Card</h3>
          <div className="previewGrid">
            <ProjectCard project={sampleProject} />
          </div>

          <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "var(--space-md)", marginTop: "var(--space-xl)" }}>Blog Card</h3>
          <div className="previewGrid">
            <BlogCard blog={sampleBlog} />
          </div>

          <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "var(--space-md)", marginTop: "var(--space-xl)" }}>Skill Card</h3>
          <div className="previewGrid">
            <SkillCard icon={Code} title="Frontend Development" skills={["React", "JavaScript", "CSS", "HTML"]} tools={["VS Code", "Figma"]} />
            <SkillCard icon={Palette} title="UI Design" skills={["Figma", "Adobe XD", "Prototyping"]} tools={["Figma", "Photoshop"]} />
          </div>

          <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "var(--space-md)", marginTop: "var(--space-xl)" }}>Experience Card</h3>
          <div className="previewGrid">
            <ExperienceCard role="UI/Frontend Developer" company="TechCorp" date="2024 - Present" description="Building responsive web interfaces with React and modern CSS." technologies={["React", "TypeScript", "Tailwind"]} />
          </div>

          <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "var(--space-md)", marginTop: "var(--space-xl)" }}>Testimonial Card</h3>
          <div className="previewGrid">
            <TestimonialCard {...sampleTestimonial} />
          </div>

          <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "var(--space-md)", marginTop: "var(--space-xl)" }}>Process Card</h3>
          <div className="previewGrid">
            <ProcessCard step={1} icon={Lightbulb} title="Discovery" description="Understanding the problem and user needs." />
            <ProcessCard step={2} icon={Palette} title="Design" description="Creating wireframes and visual mockups." />
            <ProcessCard step={3} icon={Code} title="Development" description="Building with clean, maintainable code." />
          </div>

          <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "var(--space-md)", marginTop: "var(--space-xl)" }}>Stat Card</h3>
          <div className="previewGrid">
            <StatCard number="15+" label="Projects" description="Completed projects" />
            <StatCard number="3+" label="Years" description="Experience" />
            <StatCard number="50+" label="Components" description="In design system" />
          </div>

          <Card padding="default" hover background="lavender" style={{ marginTop: "var(--space-xl)" }}>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)" }}>This is a generic Card component with lavender background and hover effect.</p>
          </Card>
        </section>

        {/* ===== HERO SECTIONS ===== */}
        <section className="section" id="hero-sections">
          <h2 className="sectionTitle">Hero Sections</h2>
          <p className="sectionDesc">Four reusable hero variants for different page contexts.</p>

          <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "var(--space-md)" }}>Variant 1 — Portfolio Hero</h3>
          <div className="preview" style={{ padding: 0, overflow: "hidden" }}>
            <PortfolioHero />
          </div>

          <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "var(--space-md)", marginTop: "var(--space-xl)" }}>Variant 2 — Page Hero</h3>
          <div className="preview" style={{ padding: 0, overflow: "hidden" }}>
            <PageHero title="About Me" subtitle="The story behind the pixels." icon={Heart} />
          </div>

          <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "var(--space-md)", marginTop: "var(--space-xl)" }}>Variant 3 — Split Screen Hero</h3>
          <div className="preview" style={{ padding: 0, overflow: "hidden" }}>
            <SplitHero eyebrow="👋 Hello" title="Let's build something amazing together." description="I'm always open to new opportunities and creative projects." primaryAction="Get in Touch" />
          </div>

          <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "var(--space-md)", marginTop: "var(--space-xl)" }}>Variant 4 — Minimal Editorial Hero</h3>
          <div className="preview" style={{ padding: 0, overflow: "hidden" }}>
            <MinimalHero eyebrow="✨ Welcome" title="Thoughtful design, purposeful code." description="Creating digital experiences that delight and perform." />
          </div>

          <CodeBlock code={`<PortfolioHero eyebrow="Available" title="I design thoughtful interfaces." />\n<PageHero title="About Me" icon={Heart} />\n<SplitHero eyebrow="Hello" title="Let's build together." />\n<MinimalHero eyebrow="Welcome" title="Thoughtful design." />`} />
        </section>

        {/* ===== SECTION TITLES ===== */}
        <section className="section" id="section-titles">
          <h2 className="sectionTitle">Section Titles</h2>
          <p className="sectionDesc">Reusable headers for page sections.</p>
          <div className="preview">
            <SectionTitle eyebrow="🚀 Selected Work" title="Projects I'm Proud Of" description="A collection of interfaces I designed and developed." align="center" />
          </div>
          <div className="preview" style={{ marginTop: "var(--space-md)" }}>
            <SectionTitle eyebrow="📝 Latest" title="From My Blog" description="Thoughts on design, development and the creative process." />
          </div>
          <CodeBlock code={`<SectionTitle\n  eyebrow="🚀 Selected Work"\n  title="Projects I'm Proud Of"\n  description="A collection of interfaces."\n  align="center"\n/>`} />
        </section>

        {/* ===== ALERTS ===== */}
        <section className="section" id="alerts">
          <h2 className="sectionTitle">Alerts</h2>
          <p className="sectionDesc">Feedback messages for user actions.</p>
          <div className="previewCol" style={{ gap: "var(--space-md)" }}>
            <Alert type="success" title="Success!">Your message has been sent successfully.</Alert>
            <Alert type="error" title="Error">Something went wrong. Please try again.</Alert>
            <Alert type="warning" title="Warning">Your session will expire in 5 minutes.</Alert>
            <Alert type="info" title="Information">New updates are available for your account.</Alert>
            <Alert type="success" title="Closable" closable onClose={() => {}}>Click the X to dismiss this alert.</Alert>
          </div>
          <CodeBlock code={`<Alert type="success" title="Success!">Message sent.</Alert>\n<Alert type="error" title="Error">Try again.</Alert>\n<Alert type="warning" title="Warning" closable>Session expiring.</Alert>\n<Alert type="info" title="Info">New updates.</Alert>`} />
        </section>

        {/* ===== MODALS ===== */}
        <section className="section" id="modals">
          <h2 className="sectionTitle">Modals</h2>
          <p className="sectionDesc">Accessible overlay dialogs with focus trapping and ESC support.</p>
          <div className="previewRow">
            <Button variant="primary" onClick={() => setModalOpen(true)}>Open Modal</Button>
          </div>
          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Contact Sent!"
            description="Thank you for reaching out. I'll get back to you soon."
            actions={<><Button variant="ghost" onClick={() => setModalOpen(false)}>Close</Button><Button variant="primary" onClick={() => setModalOpen(false)}>Done</Button></>}
          >
            <p style={{ fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.7 }}>Your message has been delivered to my inbox. I typically respond within 24-48 hours on business days.</p>
          </Modal>
          <CodeBlock code={`<Modal isOpen={open} onClose={() => setOpen(false)} title="Title" description="Desc">\n  <p>Modal body content</p>\n</Modal>`} />
        </section>

        {/* ===== LOADERS ===== */}
        <section className="section" id="loaders">
          <h2 className="sectionTitle">Loaders</h2>
          <p className="sectionDesc">Soft and subtle loading indicators.</p>
          <div className="preview">
            <div className="previewRow" style={{ gap: "var(--space-2xl)" }}>
              <div style={{ textAlign: "center" }}><Spinner size={32} /><p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: 8 }}>Spinner</p></div>
              <div style={{ textAlign: "center" }}><DotsLoader /><p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: 8 }}>Dots</p></div>
              <div style={{ textAlign: "center" }}><Button variant="primary" loading>Loading</Button><p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: 8 }}>Button</p></div>
            </div>
          </div>
          <h4 style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "var(--space-md)" }}>Skeleton</h4>
          <div className="preview">
            <SkeletonCard />
          </div>
          <CodeBlock code={`<Spinner size={32} />\n<DotsLoader />\n<Button loading>Loading</Button>\n<SkeletonCard />`} />
        </section>

        {/* ===== EMPTY STATES ===== */}
        <section className="section" id="empty-states">
          <h2 className="sectionTitle">Empty States</h2>
          <p className="sectionDesc">Placeholder content when data is unavailable.</p>
          <div className="preview">
            <EmptyState icon={<Search size={28} />} title="No search results" description="Try a different keyword or browse all projects." action actionLabel="Clear Search" onAction={() => {}} />
          </div>
          <div className="preview" style={{ marginTop: "var(--space-md)" }}>
            <EmptyState icon={<Rocket size={28} />} title="Coming Soon" description="This section is under development. Check back later!" />
          </div>
        </section>

        {/* ===== AVATARS ===== */}
        <section className="section" id="avatars">
          <h2 className="sectionTitle">Avatars</h2>
          <p className="sectionDesc">User representation in different sizes and styles.</p>
          <div className="preview">
            <div className="previewRow" style={{ alignItems: "flex-end", gap: "var(--space-xl)" }}>
              <div style={{ textAlign: "center" }}><Avatar size="small" src="https://picsum.photos/seed/av1/100/100" /><p style={{ fontSize: "0.72rem", marginTop: 6 }}>Small</p></div>
              <div style={{ textAlign: "center" }}><Avatar size="medium" src="https://picsum.photos/seed/av2/100/100" /><p style={{ fontSize: "0.72rem", marginTop: 6 }}>Medium</p></div>
              <div style={{ textAlign: "center" }}><Avatar size="large" src="https://picsum.photos/seed/av3/100/100" /><p style={{ fontSize: "0.72rem", marginTop: 6 }}>Large</p></div>
              <div style={{ textAlign: "center" }}><Avatar size="xl" src="https://picsum.photos/seed/av4/100/100" /><p style={{ fontSize: "0.72rem", marginTop: 6 }}>XL</p></div>
              <div style={{ textAlign: "center" }}><Avatar size="large" name="Aastha Nikhare" /><p style={{ fontSize: "0.72rem", marginTop: 6 }}>Initials</p></div>
              <div style={{ textAlign: "center" }}><Avatar size="large" src="https://picsum.photos/seed/av5/100/100" status="online" border /><p style={{ fontSize: "0.72rem", marginTop: 6 }}>With Status</p></div>
            </div>
          </div>
          <div className="preview" style={{ marginTop: "var(--space-md)" }}>
            <h4 style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "var(--space-md)" }}>Stacked Avatars</h4>
            <AvatarGroup max={4}>
              <Avatar size="medium" src="https://picsum.photos/seed/av6/100/100" />
              <Avatar size="medium" src="https://picsum.photos/seed/av7/100/100" />
              <Avatar size="medium" src="https://picsum.photos/seed/av8/100/100" />
              <Avatar size="medium" name="Priya S" />
              <Avatar size="medium" name="Rahul K" />
            </AvatarGroup>
          </div>
        </section>

        {/* ===== TOOLTIPS ===== */}
        <section className="section" id="tooltips">
          <h2 className="sectionTitle">Tooltips</h2>
          <p className="sectionDesc">Accessible hover and focus tooltips.</p>
          <div className="preview">
            <div className="previewRow" style={{ gap: "var(--space-2xl)" }}>
              <Tooltip content="GitHub Profile"><IconButton icon={<FiGithub size={18} />} label="GitHub" /></Tooltip>
              <Tooltip content="LinkedIn" position="bottom"><IconButton icon={<FiLinkedin size={18} />} label="LinkedIn" /></Tooltip>
              <Tooltip content="Send Email" position="left"><IconButton icon={<FiMail size={18} />} label="Email" /></Tooltip>
              <Tooltip content="External Link" position="right"><IconButton icon={<ExternalLink size={18} />} label="Link" /></Tooltip>
            </div>
          </div>
        </section>

        {/* ===== NAVIGATION ===== */}
        <section className="section" id="navigation">
          <h2 className="sectionTitle">Navigation</h2>
          <p className="sectionDesc">Navbar, breadcrumbs, tabs and pagination patterns.</p>

          <h4 style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "var(--space-md)" }}>Desktop Navbar</h4>
          <div className="navDemo">
            <div className="navDemoBar">
              <span style={{ fontFamily: "var(--font-handwritten)", fontSize: "1.3rem", fontWeight: 700 }}>✨ Aastha</span>
              <div className="navDemoLinks">
                <span className="navDemoLink navDemoLinkActive">Home</span>
                <span className="navDemoLink">About</span>
                <span className="navDemoLink">Projects</span>
                <span className="navDemoLink">Skills</span>
                <span className="navDemoLink">Contact</span>
              </div>
              <Button variant="dark" size="small">Resume</Button>
            </div>
          </div>

          <h4 style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "var(--space-md)", marginTop: "var(--space-xl)" }}>Tabs</h4>
          <div className="preview">
            <div className="tabsDemo">
              {["Overview", "Projects", "Blog", "Contact"].map((tab) => (
                <button key={tab} className={`tabItem ${selectedTab === tab.toLowerCase() ? "tabItemActive" : ""}`} onClick={() => setSelectedTab(tab.toLowerCase())}>{tab}</button>
              ))}
            </div>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)" }}>Tab content for "{selectedTab}" would appear here.</p>
          </div>

          <h4 style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "var(--space-md)", marginTop: "var(--space-xl)" }}>Breadcrumb</h4>
          <div className="preview">
            <nav className="breadcrumbDemo" aria-label="Breadcrumb">
              <a href="#">Home</a>
              <span>/</span>
              <a href="#">Projects</a>
              <span>/</span>
              <span style={{ color: "var(--dark)" }}>E-Commerce Dashboard</span>
            </nav>
          </div>
        </section>

        {/* ===== SPACING ===== */}
        <section className="section" id="spacing">
          <h2 className="sectionTitle">Spacing</h2>
          <p className="sectionDesc">Consistent spacing scale used across all components.</p>
          <div className="preview">
            <div className="spacingGrid">
              {spacingValues.map((s) => (
                <div key={s.name} className="spacingRow">
                  <span className="spacingLabel">--space-{s.name}</span>
                  <div className="spacingBar" style={{ width: s.value }} />
                  <span className="spacingValue">{s.px}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SHADOWS ===== */}
        <section className="section" id="shadows">
          <h2 className="sectionTitle">Shadows</h2>
          <p className="sectionDesc">Elevation levels for depth and hierarchy.</p>
          <div className="shadowGrid">
            {shadowValues.map((s) => (
              <div key={s.var} className="shadowBox" style={{ boxShadow: s.value }}>{s.name}</div>
            ))}
          </div>
        </section>

        {/* ===== BORDER RADIUS ===== */}
        <section className="section" id="border-radius">
          <h2 className="sectionTitle">Border Radius</h2>
          <p className="sectionDesc">Rounded corners for cards, buttons and form controls.</p>
          <div className="radiusGrid">
            {radiusValues.map((r) => (
              <div key={r.var} className="radiusItem">
                <div className="radiusBox" style={{ borderRadius: r.value }} />
                <span className="radiusLabel">{r.name}: {r.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ===== ICONS ===== */}
        <section className="section" id="icons">
          <h2 className="sectionTitle">Icons</h2>
          <p className="sectionDesc">Icon library from lucide-react and react-icons.</p>
          <div className="iconGrid">
            {[
              { icon: <ArrowRight size={20} />, name: "ArrowRight" },
              { icon: <ArrowLeft size={20} />, name: "ArrowLeft" },
              { icon: <Download size={20} />, name: "Download" },
              { icon: <ExternalLink size={20} />, name: "ExternalLink" },
              { icon: <FiGithub size={20} />, name: "Github" },
              { icon: <FiLinkedin size={20} />, name: "Linkedin" },
              { icon: <FiMail size={20} />, name: "Mail" },
              { icon: <Heart size={20} />, name: "Heart" },
              { icon: <Sparkles size={20} />, name: "Sparkles" },
              { icon: <Code size={20} />, name: "Code" },
              { icon: <Palette size={20} />, name: "Palette" },
              { icon: <Layout size={20} />, name: "Layout" },
              { icon: <Menu size={20} />, name: "Menu" },
              { icon: <X size={20} />, name: "X" },
              { icon: <Search size={20} />, name: "Search" },
              { icon: <ChevronDown size={20} />, name: "ChevronDown" },
              { icon: <Check size={20} />, name: "Check" },
              { icon: <AlertCircle size={20} />, name: "AlertCircle" },
              { icon: <Rocket size={20} />, name: "Rocket" },
              { icon: <Star size={20} />, name: "Star" },
              { icon: <Zap size={20} />, name: "Zap" },
              { icon: <Target size={20} />, name: "Target" },
              { icon: <Compass size={20} />, name: "Compass" },
              { icon: <Lightbulb size={20} />, name: "Lightbulb" },
            ].map((item) => (
              <div key={item.name} className="iconItem">
                {item.icon}
                <span className="iconName">{item.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ===== ANIMATIONS ===== */}
        <section className="section" id="animations">
          <h2 className="sectionTitle">Animations</h2>
          <p className="sectionDesc">Reusable animation classes. Hover each box to preview.</p>
          <div className="animGrid">
            {[
              { name: "Fade Up", class: "fadeUp" },
              { name: "Fade In", class: "fadeIn" },
              { name: "Slide Left", class: "slideLeft" },
              { name: "Slide Right", class: "slideRight" },
              { name: "Scale In", class: "scaleIn" },
              { name: "Float", class: "float" },
            ].map((a) => (
              <div key={a.class} className={`animBox ${a.class}`}>
                <div className="animTarget" />
                <span className="animLabel">{a.name}</span>
              </div>
            ))}
          </div>
        </section>

        <Divider text="End of Design System" emoji="🎨" />

        <div style={{ textAlign: "center", padding: "var(--space-2xl) 0" }}>
          <Button variant="primary" size="large" iconLeft={<ArrowLeft />} onClick={() => window.location.href = "/"}>Back to Portfolio</Button>
        </div>
      </main>

      <BackToTop />
    </div>
  );
}
