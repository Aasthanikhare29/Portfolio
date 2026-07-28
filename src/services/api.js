import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

/* Add admin token to protected requests */
api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("portfolio_admin_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

/* Handle expired or invalid admin login */
api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      error.response &&
      (error.response.status === 401 ||
        error.response.status === 403)
    ) {
      const path = window.location.pathname;

      /*
       * Do not remove the admin token when a public API request fails.
       * Only handle authentication errors while inside admin pages.
       */
      if (
        path.startsWith("/admin") &&
        !path.includes("/admin/login")
      ) {
        localStorage.removeItem("portfolio_admin_token");
        localStorage.removeItem("portfolio_admin_user");
        window.location.href = "/admin/login";
      }
    }

    return Promise.reject(error);
  }
);

function extractData(response) {
  if (
    response.data &&
    Object.prototype.hasOwnProperty.call(
      response.data,
      "data"
    )
  ) {
    return response.data.data;
  }

  return response.data;
}

/* ── Auth ── */

export const authApi = {
  login: (email, password) =>
    api
      .post("/auth/login", {
        email,
        password,
      })
      .then(extractData),
};

/* ── Profile ── */

export const profileApi = {
  get: () =>
    api.get("/profile").then(extractData),

  update: (data) =>
    api.put("/admin/profile", data).then(extractData),
};

/* ── Projects ── */

export const projectApi = {
  getAll: () =>
    api.get("/projects").then(extractData),

  getFeatured: () =>
    api.get("/projects/featured").then(extractData),

  getById: (id) =>
    api.get(`/projects/${id}`).then(extractData),

  getBySlug: (slug) =>
    api.get(`/projects/slug/${slug}`).then(extractData),

  create: (data) =>
    api.post("/admin/projects", data).then(extractData),

  update: (id, data) =>
    api
      .put(`/admin/projects/${id}`, data)
      .then(extractData),

  delete: (id) =>
    api
      .delete(`/admin/projects/${id}`)
      .then(extractData),
};

/* ── Blogs ── */

export const blogApi = {
  getAll: () =>
    api.get("/blogs").then(extractData),

  getPublished: () =>
    api.get("/blogs/published").then(extractData),

  getById: (id) =>
    api.get(`/blogs/${id}`).then(extractData),

  getBySlug: (slug) =>
    api.get(`/blogs/slug/${slug}`).then(extractData),

  create: (data) =>
    api.post("/admin/blogs", data).then(extractData),

  update: (id, data) =>
    api
      .put(`/admin/blogs/${id}`, data)
      .then(extractData),

  delete: (id) =>
    api
      .delete(`/admin/blogs/${id}`)
      .then(extractData),
};

/* ── Skills ── */

export const skillApi = {
  getAll: () =>
    api.get("/skills").then(extractData),

  create: (data) =>
    api.post("/admin/skills", data).then(extractData),

  update: (id, data) =>
    api
      .put(`/admin/skills/${id}`, data)
      .then(extractData),

  delete: (id) =>
    api
      .delete(`/admin/skills/${id}`)
      .then(extractData),
};

/* ── Experiences ── */

export const experienceApi = {
  getAll: () =>
    api.get("/experiences").then(extractData),

  create: (data) =>
    api
      .post("/admin/experiences", data)
      .then(extractData),

  update: (id, data) =>
    api
      .put(`/admin/experiences/${id}`, data)
      .then(extractData),

  delete: (id) =>
    api
      .delete(`/admin/experiences/${id}`)
      .then(extractData),
};

/* ── Education ── */

export const educationApi = {
  getAll: () =>
    api.get("/education").then(extractData),

  create: (data) =>
    api
      .post("/admin/education", data)
      .then(extractData),

  update: (id, data) =>
    api
      .put(`/admin/education/${id}`, data)
      .then(extractData),

  delete: (id) =>
    api
      .delete(`/admin/education/${id}`)
      .then(extractData),
};

/* ── Testimonials ── */

export const testimonialApi = {
  getAll: () =>
    api.get("/testimonials").then(extractData),

  getFeatured: () =>
    api
      .get("/testimonials/featured")
      .then(extractData),

  create: (data) =>
    api
      .post("/admin/testimonials", data)
      .then(extractData),

  update: (id, data) =>
    api
      .put(`/admin/testimonials/${id}`, data)
      .then(extractData),

  delete: (id) =>
    api
      .delete(`/admin/testimonials/${id}`)
      .then(extractData),
};

/* ── Services ── */

export const serviceApi = {
  getAll: () =>
    api.get("/services").then(extractData),

  getFeatured: () =>
    api.get("/services/featured").then(extractData),

  create: (data) =>
    api
      .post("/admin/services", data)
      .then(extractData),

  update: (id, data) =>
    api
      .put(`/admin/services/${id}`, data)
      .then(extractData),

  delete: (id) =>
    api
      .delete(`/admin/services/${id}`)
      .then(extractData),
};

/* ── Contact ── */

export const contactApi = {
  submit: (data) =>
    api.post("/contact", data).then(extractData),

  getAll: () =>
    api
      .get("/admin/contact/messages")
      .then(extractData),

  getUnreadCount: () =>
    api
      .get("/admin/contact/unread-count")
      .then(extractData),

  markRead: (id) =>
    api
      .patch(`/admin/contact/messages/${id}/read`)
      .then(extractData),

  delete: (id) =>
    api
      .delete(`/admin/contact/messages/${id}`)
      .then(extractData),
};

/* ── Certificates ── */

export const certificateApi = {
  getAll: () =>
    api.get("/certificates").then(extractData),

  create: (data) =>
    api
      .post("/admin/certificates", data)
      .then(extractData),

  update: (id, data) =>
    api
      .put(`/admin/certificates/${id}`, data)
      .then(extractData),

  delete: (id) =>
    api
      .delete(`/admin/certificates/${id}`)
      .then(extractData),
};

/* ── Settings ── */

export const settingsApi = {
  get: () =>
    api.get("/settings").then(extractData),

  update: (data) =>
    api
      .put("/admin/settings", data)
      .then(extractData),
};

/* ── Case Studies ── */

export const caseStudyApi = {
  getAll: () =>
    api.get("/case-studies").then(extractData),

  create: (data) =>
    api
      .post("/admin/case-studies", data)
      .then(extractData),

  update: (id, data) =>
    api
      .put(`/admin/case-studies/${id}`, data)
      .then(extractData),

  delete: (id) =>
    api
      .delete(`/admin/case-studies/${id}`)
      .then(extractData),
};

/* ── File Upload ── */

export const uploadApi = {
  upload: (file, dir = "general") => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("dir", dir);

    return api
      .post("/admin/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(extractData);
  },
};

export default api;