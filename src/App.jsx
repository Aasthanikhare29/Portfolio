import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import SkillsPage from "./pages/SkillsPage";
import JourneyPage from "./pages/JourneyPage";
import ContactPage from "./pages/ContactPage";
import ThingsILovePage from "./pages/ThingsILovePage";
import TestimonialsPage from "./pages/TestimonialsPage";
import ComponentsPage from "./pages/Components";
import Challenges from "./pages/Challenges";
import ChallengeDetails from "./pages/ChallengeDetails";

import ProtectedAdminRoute from "./admin/components/ProtectedAdminRoute";
import AdminLayout from "./admin/components/AdminLayout";
import AdminLogin from "./admin/pages/Login";
import AdminDashboard from "./admin/pages/Dashboard";
import AdminProjects from "./admin/pages/Projects";
import AdminProjectForm from "./admin/pages/ProjectForm";
import AdminBlogs from "./admin/pages/Blogs";
import AdminBlogForm from "./admin/pages/BlogForm";
import AdminSkills from "./admin/pages/Skills";
import AdminExperience from "./admin/pages/Experience";
import AdminEducation from "./admin/pages/Education";
import AdminTestimonials from "./admin/pages/Testimonials";
import AdminServices from "./admin/pages/Services";
import AdminMessages from "./admin/pages/Messages";
import AdminProfile from "./admin/pages/Profile";
import AdminResume from "./admin/pages/Resume";
import AdminSocialLinks from "./admin/pages/SocialLinks";
import AdminSettings from "./admin/pages/Settings";
import AdminCaseStudies from "./admin/pages/CaseStudies";
import AdminCaseStudyForm from "./admin/pages/CaseStudyForm";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

function PageLoader() {
  return (
    <motion.div
      style={{
        position: "fixed",
        inset: 0,
        background: "#1a1625",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <motion.div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.1)",
          borderTopColor: "#BFA6E8",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedAdminRoute><AdminLayout><AdminDashboard /></AdminLayout></ProtectedAdminRoute>} />
      <Route path="/admin/projects" element={<ProtectedAdminRoute><AdminLayout><AdminProjects /></AdminLayout></ProtectedAdminRoute>} />
      <Route path="/admin/projects/new" element={<ProtectedAdminRoute><AdminLayout><AdminProjectForm /></AdminLayout></ProtectedAdminRoute>} />
      <Route path="/admin/projects/edit/:id" element={<ProtectedAdminRoute><AdminLayout><AdminProjectForm /></AdminLayout></ProtectedAdminRoute>} />
      <Route path="/admin/case-studies" element={<ProtectedAdminRoute><AdminLayout><AdminCaseStudies /></AdminLayout></ProtectedAdminRoute>} />
      <Route path="/admin/case-studies/new" element={<ProtectedAdminRoute><AdminLayout><AdminCaseStudyForm /></AdminLayout></ProtectedAdminRoute>} />
      <Route path="/admin/case-studies/edit/:id" element={<ProtectedAdminRoute><AdminLayout><AdminCaseStudyForm /></AdminLayout></ProtectedAdminRoute>} />
      <Route path="/admin/blogs" element={<ProtectedAdminRoute><AdminLayout><AdminBlogs /></AdminLayout></ProtectedAdminRoute>} />
      <Route path="/admin/blogs/new" element={<ProtectedAdminRoute><AdminLayout><AdminBlogForm /></AdminLayout></ProtectedAdminRoute>} />
      <Route path="/admin/blogs/edit/:id" element={<ProtectedAdminRoute><AdminLayout><AdminBlogForm /></AdminLayout></ProtectedAdminRoute>} />
      <Route path="/admin/skills" element={<ProtectedAdminRoute><AdminLayout><AdminSkills /></AdminLayout></ProtectedAdminRoute>} />
      <Route path="/admin/experience" element={<ProtectedAdminRoute><AdminLayout><AdminExperience /></AdminLayout></ProtectedAdminRoute>} />
      <Route path="/admin/education" element={<ProtectedAdminRoute><AdminLayout><AdminEducation /></AdminLayout></ProtectedAdminRoute>} />
      <Route path="/admin/testimonials" element={<ProtectedAdminRoute><AdminLayout><AdminTestimonials /></AdminLayout></ProtectedAdminRoute>} />
      <Route path="/admin/services" element={<ProtectedAdminRoute><AdminLayout><AdminServices /></AdminLayout></ProtectedAdminRoute>} />
      <Route path="/admin/messages" element={<ProtectedAdminRoute><AdminLayout><AdminMessages /></AdminLayout></ProtectedAdminRoute>} />
      <Route path="/admin/profile" element={<ProtectedAdminRoute><AdminLayout><AdminProfile /></AdminLayout></ProtectedAdminRoute>} />
      <Route path="/admin/resume" element={<ProtectedAdminRoute><AdminLayout><AdminResume /></AdminLayout></ProtectedAdminRoute>} />
      <Route path="/admin/social-links" element={<ProtectedAdminRoute><AdminLayout><AdminSocialLinks /></AdminLayout></ProtectedAdminRoute>} />
      <Route path="/admin/settings" element={<ProtectedAdminRoute><AdminLayout><AdminSettings /></AdminLayout></ProtectedAdminRoute>} />
    </Routes>
  );
}

function PublicRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/things-i-love" element={<ThingsILovePage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/blog" element={<Challenges />} />
          <Route path="/blog/:slug" element={<ChallengeDetails />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/components" element={<ComponentsPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <PageLoader />}
      </AnimatePresence>
      {!isAdmin && <Navbar />}
      <ScrollToTop />
      <main>
        {isAdmin ? <AdminRoutes /> : <PublicRoutes />}
      </main>
      {!isAdmin && <Footer />}
    </>
  );
}

export default App;
