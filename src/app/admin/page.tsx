"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import type { Member } from "@/lib/types";

const emptyMember: Omit<Member, "id"> = {
  name: "",
  role: "Member",
  photo: "/images/members/placeholder.svg",
  quote: "",
  bio: "",
  testimony: "",
  story: "",
  joinDate: new Date().toISOString().split("T")[0],
  social: {},
};

export default function AdminPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [editing, setEditing] = useState<Member | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Omit<Member, "id">>(emptyMember);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMembers = useCallback(async () => {
    const res = await fetch("/api/members");
    const data = await res.json();
    setMembers(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const showMessage = (msg: string, type: "success" | "error" = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 4000);
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        showMessage(data.error || "Upload failed", "error");
        return;
      }

      setForm((prev) => ({ ...prev, photo: data.url }));
      showMessage("Image uploaded successfully!");
    } catch {
      showMessage("Upload failed. Please try again.", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file);
    } else {
      showMessage("Please drop an image file (JPG, PNG, WebP, GIF)", "error");
    }
  };

  const handleEdit = (member: Member) => {
    setEditing(member);
    setCreating(false);
    const { id: _, ...rest } = member;
    setForm(rest);
  };

  const handleCreate = () => {
    setEditing(null);
    setCreating(true);
    setForm({ ...emptyMember });
  };

  const handleCancel = () => {
    setEditing(null);
    setCreating(false);
    setForm({ ...emptyMember });
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      showMessage("Name is required.", "error");
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        await fetch(`/api/members/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        showMessage("Member updated successfully!");
      } else {
        await fetch("/api/members", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        showMessage("Member created successfully!");
      }
      await fetchMembers();
      handleCancel();
    } catch {
      showMessage("Failed to save. Please try again.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this member?")) return;
    await fetch(`/api/members/${id}`, { method: "DELETE" });
    showMessage("Member removed.");
    if (editing?.id === id) handleCancel();
    await fetchMembers();
  };

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateSocial = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      social: { ...prev.social, [field]: value },
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-navy-200 border-t-gold-400 rounded-full animate-spin" />
          <p className="text-navy-600 text-sm">Loading members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-navy-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Panel</h1>
              <p className="text-gray-400 text-sm mt-1">
                Manage Kikalayi Investment Club Members
              </p>
            </div>
            <button
              onClick={handleCreate}
              className="px-5 py-2.5 bg-gold-400 text-navy-900 font-semibold rounded-lg hover:bg-gold-300 transition-colors text-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Member
            </button>
          </div>
        </div>
      </div>

      {/* Message Toast */}
      {message && (
        <div className="fixed top-24 right-4 z-50 animate-in">
          <div
            className={`px-5 py-3 rounded-lg text-sm font-medium shadow-lg ${
              messageType === "success"
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
          >
            <div className="flex items-center gap-2">
              {messageType === "success" ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z" />
                </svg>
              )}
              {message}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Members List */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-bold text-navy-800 mb-4">
              Members ({members.length})
            </h2>
            <div className="space-y-3 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
              {members.map((member) => (
                <div
                  key={member.id}
                  className={`bg-white rounded-xl p-4 shadow-sm border cursor-pointer transition-all ${
                    editing?.id === member.id
                      ? "border-gold-400 bg-gold-50 shadow-md"
                      : "border-gray-100 hover:border-gray-300 hover:shadow"
                  }`}
                  onClick={() => handleEdit(member)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-navy-100 overflow-hidden relative flex-shrink-0 border-2 border-white shadow-sm">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-navy-800 text-sm truncate">
                        {member.name}
                      </h3>
                      <p className="text-gold-500 text-xs font-medium">
                        {member.role}
                      </p>
                      {member.quote && (
                        <p className="text-gray-400 text-xs truncate mt-0.5 italic">
                          &ldquo;{member.quote}&rdquo;
                        </p>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(member.id);
                      }}
                      className="text-red-300 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                      title="Remove member"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Edit/Create Form */}
          <div className="lg:col-span-2">
            {editing || creating ? (
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                {/* Form Header */}
                <div className="bg-navy-800 text-white px-6 py-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold">
                    {editing ? `Edit: ${editing.name}` : "Add New Member"}
                  </h2>
                  <button
                    onClick={handleCancel}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {/* Photo Upload Section */}
                  <div>
                    <label className="block text-sm font-bold text-navy-800 mb-3 uppercase tracking-wider">
                      Profile Photo
                    </label>
                    <div className="flex items-start gap-6">
                      {/* Current Photo Preview */}
                      <div className="flex-shrink-0">
                        <div className="w-32 h-32 rounded-2xl bg-navy-100 overflow-hidden relative border-2 border-gray-200 shadow-sm">
                          <Image
                            src={form.photo}
                            alt="Profile preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>

                      {/* Upload Area */}
                      <div className="flex-1">
                        <div
                          className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer ${
                            dragOver
                              ? "border-gold-400 bg-gold-50"
                              : "border-gray-200 hover:border-navy-300 hover:bg-gray-50"
                          } ${uploading ? "opacity-60 pointer-events-none" : ""}`}
                          onClick={() => fileInputRef.current?.click()}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragOver(true);
                          }}
                          onDragLeave={() => setDragOver(false)}
                          onDrop={handleDrop}
                        >
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            onChange={handleFileSelect}
                            className="hidden"
                          />
                          {uploading ? (
                            <div className="flex flex-col items-center gap-2">
                              <div className="w-8 h-8 border-3 border-navy-200 border-t-gold-400 rounded-full animate-spin" />
                              <p className="text-navy-600 text-sm">Uploading...</p>
                            </div>
                          ) : (
                            <>
                              <svg
                                className="w-10 h-10 mx-auto text-gray-300 mb-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21zM8.25 8.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                />
                              </svg>
                              <p className="text-navy-700 text-sm font-medium">
                                Click to upload or drag & drop
                              </p>
                              <p className="text-gray-400 text-xs mt-1">
                                JPG, PNG, WebP or GIF (max 5MB)
                              </p>
                            </>
                          )}
                        </div>

                        {/* Manual URL input as fallback */}
                        <div className="mt-3">
                          <label className="block text-xs text-gray-400 mb-1">
                            Or enter image URL directly:
                          </label>
                          <input
                            type="text"
                            value={form.photo}
                            onChange={(e) => updateForm("photo", e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none text-xs text-gray-500"
                            placeholder="/images/members/name.jpg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Basic Info */}
                  <div>
                    <h3 className="text-sm font-bold text-navy-800 mb-3 uppercase tracking-wider">
                      Basic Information
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-navy-700 mb-1">
                          Full Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => updateForm("name", e.target.value)}
                          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none text-sm"
                          placeholder="Enter full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy-700 mb-1">
                          Role <span className="text-red-400">*</span>
                        </label>
                        <select
                          value={form.role}
                          onChange={(e) => updateForm("role", e.target.value)}
                          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none text-sm"
                        >
                          <option>Chairman</option>
                          <option>Vice-Chairman</option>
                          <option>Treasurer</option>
                          <option>Secretary</option>
                          <option>Member</option>
                          <option>Committee Member</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy-700 mb-1">
                          Join Date
                        </label>
                        <input
                          type="date"
                          value={form.joinDate}
                          onChange={(e) => updateForm("joinDate", e.target.value)}
                          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy-700 mb-1">
                          Personal Quote
                        </label>
                        <input
                          type="text"
                          value={form.quote}
                          onChange={(e) => updateForm("quote", e.target.value)}
                          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none text-sm"
                          placeholder="An inspiring personal quote..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Profile Content */}
                  <div>
                    <h3 className="text-sm font-bold text-navy-800 mb-3 uppercase tracking-wider">
                      Profile Content
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-navy-700 mb-1">
                          Bio
                        </label>
                        <textarea
                          value={form.bio}
                          onChange={(e) => updateForm("bio", e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none text-sm resize-none"
                          placeholder="Short biography about the member..."
                        />
                        <p className="text-xs text-gray-400 mt-1">{form.bio.length}/500 characters</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy-700 mb-1">
                          My Story
                        </label>
                        <textarea
                          value={form.story}
                          onChange={(e) => updateForm("story", e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none text-sm resize-none"
                          placeholder="Personal story and investment journey..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy-700 mb-1">
                          Testimony
                        </label>
                        <textarea
                          value={form.testimony}
                          onChange={(e) => updateForm("testimony", e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none text-sm resize-none"
                          placeholder="Testimony about the club experience..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Social Accounts */}
                  <div>
                    <h3 className="text-sm font-bold text-navy-800 mb-3 uppercase tracking-wider">
                      Social Accounts & Contact
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/...", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                        { key: "twitter", label: "Twitter / X", placeholder: "https://x.com/...", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                        { key: "facebook", label: "Facebook", placeholder: "https://facebook.com/...", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                        { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/...", icon: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.88 0 1.441 1.441 0 012.88 0z" },
                        { key: "email", label: "Email", placeholder: "name@email.com", icon: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" },
                        { key: "phone", label: "Phone", placeholder: "+256...", icon: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" },
                        { key: "website", label: "Website", placeholder: "https://...", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" },
                      ].map(({ key, label, placeholder, icon }) => (
                        <div key={key} className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-navy-100 flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-navy-600" viewBox="0 0 24 24" fill="currentColor">
                              <path d={icon} />
                            </svg>
                          </div>
                          <input
                            type="text"
                            value={(form.social as Record<string, string>)[key] || ""}
                            onChange={(e) => updateSocial(key, e.target.value)}
                            className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none text-sm"
                            placeholder={`${label}: ${placeholder}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={handleSave}
                      disabled={saving || uploading || !form.name.trim()}
                      className="px-8 py-3 bg-gold-400 text-navy-900 font-semibold rounded-lg hover:bg-gold-300 transition-colors text-sm disabled:opacity-50 flex items-center gap-2"
                    >
                      {saving ? (
                        <>
                          <div className="w-4 h-4 border-2 border-navy-400 border-t-transparent rounded-full animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {editing ? "Update Member" : "Add Member"}
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-md p-12 border border-gray-100 text-center">
                <div className="w-20 h-20 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-navy-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <h3 className="text-navy-800 font-bold text-lg mb-2">
                  Select a Member to Edit
                </h3>
                <p className="text-gray-500 text-sm max-w-xs mx-auto">
                  Click on a member from the list to update their profile, photo, and social accounts — or add a new member.
                </p>
                <button
                  onClick={handleCreate}
                  className="mt-6 px-6 py-2.5 bg-navy-800 text-white font-semibold rounded-lg hover:bg-navy-700 transition-colors text-sm inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Member
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
