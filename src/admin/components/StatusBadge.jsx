export default function StatusBadge({ status, type = "status" }) {
  const map = {
    published: { cls: "admin-status-published", label: "Published" },
    draft: { cls: "admin-status-draft", label: "Draft" },
    featured: { cls: "admin-status-featured", label: "Featured" },
    hidden: { cls: "admin-status-hidden", label: "Hidden" },
    visible: { cls: "admin-status-published", label: "Visible" },
    pending: { cls: "admin-status-pending", label: "Pending" },
    approved: { cls: "admin-status-approved", label: "Approved" },
    rejected: { cls: "admin-status-hidden", label: "Rejected" },
    unread: { cls: "admin-status-featured", label: "Unread" },
    read: { cls: "admin-status-published", label: "Read" },
    starred: { cls: "admin-status-featured", label: "Starred" },
    archived: { cls: "admin-status-draft", label: "Archived" },
  };
  const s = map[status] || { cls: "admin-status-draft", label: status };
  return <span className={`admin-status ${s.cls}`}>{s.label}</span>;
}
