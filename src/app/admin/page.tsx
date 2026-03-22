"use client";
import { useState, useEffect, useCallback } from "react";
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
  const [message, setMessage] = useState("");

  const fetchMembers = useCallback(async () => {
    const res = await fetch("/api/members");
    const data = await res.json();
    setMembers(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
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
    setSaving(true);
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
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this member?")) return;
    await fetch(`/api/members/${id}`, { method: "DELETE" });
    showMessage("Member removed.");
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-navy-600">Loading...</div>
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
              className="px-5 py-2.5 bg-gold-400 text-navy-900 font-semibold rounded-lg hover:bg-gold-300 transition-colors text-sm"
            >
              + Add Member
            </button>
          </div>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
            {message}
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
            <div className="space-y-3">
              {members.map((member) => (
                <div
                  key={member.id}
                  className={`bg-white rounded-xl p-4 shadow-sm border cursor-pointer transition-colors ${
                    editing?.id === member.id
                      ? "border-gold-400 bg-gold-50"
                      : "border-gray-100 hover:border-gray-300"
                  }`}
                  onClick={() => handleEdit(member)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-navy-100 overflow-hidden relative flex-shrink-0">
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
                      <p className="text-gold-500 text-xs">{member.role}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(member.id);
                      }}
                      className="text-red-400 hover:text-red-600 p-1"
                      title="Delete"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Edit/Create Form */}
          <div className="lg:col-span-2">
            {(editing || creating) ? (
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <h2 className="text-lg font-bold text-navy-800 mb-6">
                  {editing ? `Edit: ${editing.name}` : "Add New Member"}
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => updateForm("name", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1">
                      Role *
                    </label>
                    <select
                      value={form.role}
                      onChange={(e) => updateForm("role", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none text-sm"
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
                      Photo URL
                    </label>
                    <input
                      type="text"
                      value={form.photo}
                      onChange={(e) => updateForm("photo", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none text-sm"
                      placeholder="/images/members/name.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1">
                      Join Date
                    </label>
                    <input
                      type="date"
                      value={form.joinDate}
                      onChange={(e) => updateForm("joinDate", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-navy-700 mb-1">
                    Quote
                  </label>
                  <input
                    type="text"
                    value={form.quote}
                    onChange={(e) => updateForm("quote", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none text-sm"
                    placeholder="An inspiring personal quote..."
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-navy-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    value={form.bio}
                    onChange={(e) => updateForm("bio", e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none text-sm resize-none"
                    placeholder="Short biography..."
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-navy-700 mb-1">
                    My Story
                  </label>
                  <textarea
                    value={form.story}
                    onChange={(e) => updateForm("story", e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none text-sm resize-none"
                    placeholder="Personal story and journey..."
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-navy-700 mb-1">
                    Testimony
                  </label>
                  <textarea
                    value={form.testimony}
                    onChange={(e) => updateForm("testimony", e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none text-sm resize-none"
                    placeholder="Testimony about the club experience..."
                  />
                </div>

                {/* Social Accounts */}
                <div className="mt-6">
                  <h3 className="text-sm font-bold text-navy-800 mb-3 uppercase tracking-wider">
                    Social Accounts
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { key: "linkedin", label: "LinkedIn URL", placeholder: "https://linkedin.com/in/..." },
                      { key: "twitter", label: "Twitter / X URL", placeholder: "https://x.com/..." },
                      { key: "facebook", label: "Facebook URL", placeholder: "https://facebook.com/..." },
                      { key: "instagram", label: "Instagram URL", placeholder: "https://instagram.com/..." },
                      { key: "email", label: "Email", placeholder: "name@email.com" },
                      { key: "phone", label: "Phone", placeholder: "+256..." },
                      { key: "website", label: "Website", placeholder: "https://..." },
                    ].map(({ key, label, placeholder }) => (
                      <div key={key}>
                        <label className="block text-xs font-medium text-navy-600 mb-1">
                          {label}
                        </label>
                        <input
                          type="text"
                          value={(form.social as Record<string, string>)[key] || ""}
                          onChange={(e) => updateSocial(key, e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none text-sm"
                          placeholder={placeholder}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={handleSave}
                    disabled={saving || !form.name}
                    className="px-6 py-2.5 bg-navy-800 text-white font-semibold rounded-lg hover:bg-navy-700 transition-colors text-sm disabled:opacity-50"
                  >
                    {saving ? "Saving..." : editing ? "Update Member" : "Add Member"}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-md p-12 border border-gray-100 text-center">
                <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-navy-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
                <h3 className="text-navy-800 font-bold text-lg mb-2">
                  Select a Member
                </h3>
                <p className="text-gray-500 text-sm">
                  Click on a member from the list to edit their details, or
                  click &quot;Add Member&quot; to create a new profile.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
