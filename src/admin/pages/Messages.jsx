import { useState, useEffect, useMemo } from "react";
import {
  Search, Mail, MailOpen, Star, Trash2, Archive, ArchiveRestore,
  Copy, ExternalLink, ChevronDown, MessageSquare, Inbox, AlertTriangle,
} from "lucide-react";
import { messageService, formatDate, addActivity } from "../services/adminDataService";
import { contactApi } from "../../services/api";
import { useApiData } from "../hooks/useApiData";
import { useToast } from "../context/ToastContext";
import StatusBadge from "../components/StatusBadge";
import Pagination from "../components/Pagination";
import ConfirmationModal from "../components/ConfirmationModal";

export default function AdminMessages() {
  const { addToast } = useToast();
  const { data: messages, setData: setMessages, loading, error } = useApiData(contactApi.getAll, messageService.getAll);
  const [search, setSearch] = useState("");
  const [filterTab, setFilterTab] = useState("All");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshError, setRefreshError] = useState("");
  const perPage = 15;

  useEffect(() => { setRefreshError(""); }, [messages?.length]);

  const handleRefresh = async () => {
    setRefreshing(true);
    setRefreshError("");
    try {
      const data = await contactApi.getAll();
      if (Array.isArray(data)) {
        setData(data);
        addToast("Messages refreshed", "success");
      } else {
        setData(messageService.getAll());
      }
    } catch {
      setRefreshError("Unable to fetch messages. Your session may have expired.");
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => { setPage(1); }, [search, filterTab]);

  const filtered = useMemo(() => {
    let result = [...messages];
    if (filterTab === "Unread") result = result.filter((m) => !m.read);
    else if (filterTab === "Starred") result = result.filter((m) => m.starred);
    else if (filterTab === "Archived") result = result.filter((m) => m.archived);
    else result = result.filter((m) => !m.archived);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((m) =>
        m.name?.toLowerCase().includes(q) ||
        m.email?.toLowerCase().includes(q) ||
        m.subject?.toLowerCase().includes(q) ||
        m.message?.toLowerCase().includes(q)
      );
    }
    result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    return result;
  }, [messages, search, filterTab]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const tabs = ["All", "Unread", "Starred", "Archived"];

  const handleMarkRead = (msg) => {
    messageService.markRead(msg.id);
    setMessages(messageService.getAll());
    if (selectedMessage?.id === msg.id) setSelectedMessage({ ...selectedMessage, read: true });
  };

  const handleMarkUnread = (msg) => {
    messageService.markUnread(msg.id);
    setMessages(messageService.getAll());
    if (selectedMessage?.id === msg.id) setSelectedMessage({ ...selectedMessage, read: false });
  };

  const handleToggleStar = (msg) => {
    messageService.toggleStar(msg.id);
    setMessages(messageService.getAll());
    addToast(msg.starred ? "Unstarred message" : "Starred message", "success");
    if (selectedMessage?.id === msg.id) setSelectedMessage({ ...selectedMessage, starred: !msg.starred });
  };

  const handleArchive = (msg) => {
    messageService.archive(msg.id);
    setMessages(messageService.getAll());
    addToast("Message archived", "success");
    addActivity("Message archived", `"${msg.subject}" from ${msg.name} was archived`);
    if (selectedMessage?.id === msg.id) setSelectedMessage(null);
  };

  const handleUnarchive = (msg) => {
    messageService.unarchive(msg.id);
    setMessages(messageService.getAll());
    addToast("Message restored from archive", "success");
    addActivity("Message restored", `"${msg.subject}" from ${msg.name} was restored`);
    if (selectedMessage?.id === msg.id) setSelectedMessage({ ...selectedMessage, archived: false });
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await contactApi.delete(deleteTarget.id);
      setData(messageService.getAll());
      addToast("Message deleted", "success");
      addActivity("Message deleted", `"${deleteTarget.subject}" from ${deleteTarget.name} was deleted`);
      if (selectedMessage?.id === deleteTarget.id) setSelectedMessage(null);
    } catch {
      addToast("Failed to delete message", "error");
    }
    setDeleting(false);
    setDeleteTarget(null);
  };

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email).then(() => {
      addToast("Email address copied", "success");
    }).catch(() => {
      addToast("Failed to copy email", "error");
    });
  };

  const openMessage = (msg) => {
    if (!msg.read) {
      messageService.markRead(msg.id);
      setMessages(messageService.getAll());
    }
    setSelectedMessage({ ...msg, read: true });
  };

  const unreadCount = messages.filter((m) => !m.read && !m.archived).length;
  const starredCount = messages.filter((m) => m.starred).length;
  const archivedCount = messages.filter((m) => m.archived).length;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Messages</h2>
          <p className="admin-page-subtitle">{messages.length} total messages &middot; {unreadCount} unread &middot; {starredCount} starred</p>
        </div>
        <button onClick={handleRefresh} className="admin-btn admin-btn-primary" disabled={refreshing}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {error && (
        <div className="admin-error-banner" style={{
          padding: "0.75rem 1rem", background: "var(--color-error-light)",
          border: "1px solid var(--color-error)", borderRadius: "var(--radius-sm)",
          color: "var(--color-error)", fontSize: "0.8125rem", marginBottom: "1rem",
          display: "flex", alignItems: "center", gap: "0.5rem",
        }}>
          <AlertTriangle size={14} />
          Session expired. Please <a href="/admin/login" style={{ color: "var(--lavender-deep)", fontWeight: 600 }}>log in</a> again to load messages.
        </div>
      )}

      {refreshError && (
        <div className="admin-error-banner" style={{
          padding: "0.75rem 1rem", background: "var(--color-error-light)",
          border: "1px solid var(--color-error)", borderRadius: "var(--radius-sm)",
          color: "var(--color-error)", fontSize: "0.8125rem", marginBottom: "1rem",
        }}>
          {refreshError}
          <button onClick={handleRefresh} className="admin-btn admin-btn-ghost admin-btn-sm" style={{ marginLeft: "auto" }}>Retry</button>
        </div>
      )}

      <div className="admin-filters">
        <div className="admin-search">
          <Search size={14} className="search-icon" />
          <input type="text" placeholder="Search messages..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div style={{ display: "flex", gap: "0.25rem", background: "var(--admin-bg)", borderRadius: "var(--radius-sm)", padding: "2px" }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              style={{
                padding: "0.375rem 0.75rem", fontSize: "0.8125rem", fontWeight: 500,
                border: "none", borderRadius: "calc(var(--radius-sm) - 2px)",
                background: filterTab === tab ? "var(--admin-card-bg)" : "transparent",
                color: filterTab === tab ? "var(--admin-text)" : "var(--admin-text-secondary)",
                cursor: "pointer", fontFamily: "var(--font-body)",
                boxShadow: filterTab === tab ? "var(--shadow-sm)" : "none",
                transition: "var(--transition-fast)",
              }}
            >
              {tab === "All" && <Inbox size={14} style={{ marginRight: "0.375rem", verticalAlign: "middle" }} />}
              {tab === "Unread" && <Mail size={14} style={{ marginRight: "0.375rem", verticalAlign: "middle" }} />}
              {tab === "Starred" && <Star size={14} style={{ marginRight: "0.375rem", verticalAlign: "middle" }} />}
              {tab === "Archived" && <Archive size={14} style={{ marginRight: "0.375rem", verticalAlign: "middle" }} />}
              {tab}
              {tab === "Unread" && unreadCount > 0 && (
                <span style={{ marginLeft: "0.375rem", background: "var(--lavender-deep)", color: "white", fontSize: "0.65rem", padding: "0 6px", borderRadius: 999, fontWeight: 600 }}>{unreadCount}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
        <div style={{ flex: selectedMessage ? "0 0 55%" : "1", minWidth: 0, transition: "flex 0.2s ease" }}>
          {paginated.length === 0 ? (
            <div className="admin-card">
              <div className="admin-empty">
                <div className="admin-empty-icon"><MessageSquare size={24} /></div>
                <h3>No messages found</h3>
                <p>{search ? "Try adjusting your search." : filterTab !== "All" ? `No ${filterTab.toLowerCase()} messages.` : "No messages yet."}</p>
              </div>
            </div>
          ) : (
            <>
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: 40 }}></th>
                      <th>Sender</th>
                      <th>Subject</th>
                      <th>Message</th>
                      <th>Date</th>
                      <th style={{ width: 120 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((msg) => (
                      <tr
                        key={msg.id}
                        onClick={() => openMessage(msg)}
                        style={{ cursor: "pointer", fontWeight: msg.read ? 400 : 600, background: selectedMessage?.id === msg.id ? "rgba(237, 228, 255, 0.2)" : undefined }}
                      >
                        <td onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleToggleStar(msg)}
                            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex" }}
                            title={msg.starred ? "Unstar" : "Star"}
                          >
                            <Star size={14} fill={msg.starred ? "var(--yellow-deep)" : "none"} color={msg.starred ? "var(--yellow-deep)" : "var(--admin-border)"} />
                          </button>
                        </td>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <div style={{
                              width: 28, height: 28, borderRadius: "50%",
                              background: msg.read ? "var(--admin-bg)" : "var(--lavender-deep)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              color: msg.read ? "var(--admin-text-secondary)" : "white",
                              fontSize: "0.7rem", fontWeight: 600, flexShrink: 0,
                            }}>
                              {msg.name?.charAt(0) || "?"}
                            </div>
                            <div>
                              <div style={{ fontSize: "0.8125rem", fontWeight: msg.read ? 400 : 600, color: "var(--admin-text)" }}>{msg.name || "Unknown"}</div>
                              <div style={{ fontSize: "0.7rem", color: "var(--admin-text-secondary)" }}>{msg.email}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ fontSize: "0.8125rem", color: "var(--admin-text)", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {msg.subject || "(No subject)"}
                        </td>
                        <td style={{ fontSize: "0.8125rem", color: "var(--admin-text-secondary)", maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {(msg.message || "").length > 80 ? msg.message.slice(0, 80) + "..." : msg.message || ""}
                        </td>
                        <td style={{ fontSize: "0.75rem", color: "var(--admin-text-secondary)", whiteSpace: "nowrap" }}>
                          {formatDate(msg.createdAt)}
                        </td>
                        <td onClick={(e) => e.stopPropagation()}>
                          <div className="admin-actions" style={{ gap: "0.125rem" }}>
                            {msg.read ? (
                              <button onClick={() => handleMarkUnread(msg)} className="admin-btn admin-btn-ghost admin-btn-sm" title="Mark as unread">
                                <MailOpen size={14} />
                              </button>
                            ) : (
                              <button onClick={() => handleMarkRead(msg)} className="admin-btn admin-btn-ghost admin-btn-sm" title="Mark as read" style={{ color: "var(--lavender-deep)" }}>
                                <Mail size={14} />
                              </button>
                            )}
                            {!msg.archived ? (
                              <button onClick={() => handleArchive(msg)} className="admin-btn admin-btn-ghost admin-btn-sm" title="Archive">
                                <Archive size={14} />
                              </button>
                            ) : (
                              <button onClick={() => handleUnarchive(msg)} className="admin-btn admin-btn-ghost admin-btn-sm" title="Restore">
                                <ArchiveRestore size={14} />
                              </button>
                            )}
                            <button onClick={() => handleCopyEmail(msg.email)} className="admin-btn admin-btn-ghost admin-btn-sm" title="Copy email">
                              <Copy size={14} />
                            </button>
                            <a href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || "")}`} className="admin-btn admin-btn-ghost admin-btn-sm" title="Reply">
                              <ExternalLink size={14} />
                            </a>
                            <button onClick={() => setDeleteTarget(msg)} className="admin-btn admin-btn-ghost admin-btn-sm" title="Delete" style={{ color: "var(--color-error)" }}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </>
          )}
        </div>

        {selectedMessage && (
          <div className="admin-card" style={{
            flex: "0 0 42%", position: "sticky", top: "calc(var(--admin-header-h) + 1.5rem)",
            maxHeight: "calc(100vh - var(--admin-header-h) - 4rem)", overflow: "auto",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, flex: 1, marginRight: "1rem" }}>{selectedMessage.subject || "(No subject)"}</h3>
              <button
                onClick={() => setSelectedMessage(null)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", color: "var(--admin-text-secondary)", flexShrink: 0 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: selectedMessage.read ? "var(--admin-bg)" : "var(--lavender-deep)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: selectedMessage.read ? "var(--admin-text-secondary)" : "white",
                fontSize: "0.8125rem", fontWeight: 600, flexShrink: 0,
              }}>
                {selectedMessage.name?.charAt(0) || "?"}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--admin-text)" }}>{selectedMessage.name}</div>
                <a href={`mailto:${selectedMessage.email}`} style={{ fontSize: "0.8125rem", color: "var(--lavender-deep)", textDecoration: "none" }}>{selectedMessage.email}</a>
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--admin-text-secondary)", whiteSpace: "nowrap" }}>{formatDate(selectedMessage.createdAt)}</div>
            </div>

            <div style={{ display: "flex", gap: "0.375rem", marginBottom: "1rem" }}>
              <StatusBadge status={selectedMessage.read ? "read" : "unread"} />
              {selectedMessage.starred && <StatusBadge status="starred" />}
              {selectedMessage.archived && <StatusBadge status="archived" />}
            </div>

            <div style={{
              padding: "1rem", background: "var(--admin-bg)", borderRadius: "var(--radius-sm)",
              fontSize: "0.875rem", color: "var(--admin-text)", lineHeight: 1.7,
              whiteSpace: "pre-wrap", marginBottom: "1rem",
            }}>
              {selectedMessage.message || "No content"}
            </div>

            <div className="admin-actions" style={{ gap: "0.5rem", flexWrap: "wrap", borderTop: "1px solid var(--admin-border)", paddingTop: "1rem" }}>
              {selectedMessage.read ? (
                <button onClick={() => { handleMarkUnread(selectedMessage); setSelectedMessage({ ...selectedMessage, read: false }); }} className="admin-btn admin-btn-ghost admin-btn-sm">
                  <MailOpen size={14} /> Mark Unread
                </button>
              ) : (
                <button onClick={() => { handleMarkRead(selectedMessage); setSelectedMessage({ ...selectedMessage, read: true }); }} className="admin-btn admin-btn-ghost admin-btn-sm">
                  <Mail size={14} /> Mark Read
                </button>
              )}
              <button onClick={() => { handleToggleStar(selectedMessage); }} className="admin-btn admin-btn-ghost admin-btn-sm">
                <Star size={14} fill={selectedMessage.starred ? "var(--yellow-deep)" : "none"} color={selectedMessage.starred ? "var(--yellow-deep)" : undefined} />
                {selectedMessage.starred ? "Unstar" : "Star"}
              </button>
              {!selectedMessage.archived ? (
                <button onClick={() => { handleArchive(selectedMessage); }} className="admin-btn admin-btn-ghost admin-btn-sm">
                  <Archive size={14} /> Archive
                </button>
              ) : (
                <button onClick={() => { handleUnarchive(selectedMessage); }} className="admin-btn admin-btn-ghost admin-btn-sm">
                  <ArchiveRestore size={14} /> Restore
                </button>
              )}
              <button onClick={() => handleCopyEmail(selectedMessage.email)} className="admin-btn admin-btn-ghost admin-btn-sm">
                <Copy size={14} /> Copy Email
              </button>
              <a href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || "")}`} className="admin-btn admin-btn-primary admin-btn-sm">
                <ExternalLink size={14} /> Reply
              </a>
            </div>
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Message"
        message={`Are you sure you want to delete the message from "${deleteTarget?.name}"? This action cannot be undone.`}
        loading={deleting}
      />
    </div>
  );
}
