import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Expertise from "../components/sections/Expertise";
import Projects from "../components/sections/Projects";
import Experience from "../components/sections/Experience";
import ThingsILove from "../components/sections/ThingsILove";
import Testimonials from "../components/sections/Testimonials";
import CTA from "../components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Expertise />
      <Projects />
      <Experience />
      <ThingsILove />
      <Testimonials />
      <CTA />
    </>
  );
}
