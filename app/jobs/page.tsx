"use client";
import { useState } from "react";
import Link from "next/link";

const sampleJobs = [
  {
    id: 1,
    title: "Customer Support Specialist",
    company: "Infosys BPO",
    location: "Bangalore, India",
    salary: "₹4L - ₹6L/year",
    type: "Full-time",
    posted: "2 days ago",
    logo: "I",
    color: "bg-blue-500",
    tags: ["Customer Service", "Salesforce", "SLA Management"],
  },
  {
    id: 2,
    title: "Operations Analyst",
    company: "Concentrix",
    location: "Bangalore, India",
    salary: "₹5L - ₹8L/year",
    type: "Full-time",
    posted: "1 day ago",
    logo: "C",
    color: "bg-purple-500",
    tags: ["Operations", "Tableau", "Reporting"],
  },
  {
    id: 3,
    title: "Quality Assurance Lead",
    company: "Wipro",
    location: "Bangalore, India",
    salary: "₹6L - ₹10L/year",
    type: "Full-time",
    posted: "3 days ago",
    logo: "W",
    color: "bg-green-500",
    tags: ["QA", "ServiceNow", "Team Lead"],
  },
  {
    id: 4,
    title: "Senior CX Specialist",
    company: "Teleperformance",
    location: "Bangalore, India",
    salary: "₹4.5L - ₹7L/year",
    type: "Full-time",
    posted: "Today",
    logo: "T",
    color: "bg-orange-500",
    tags: ["CX", "Escalation", "BPO"],
  },
  {
    id: 5,
    title: "Process Trainer",
    company: "HCL Technologies",
    location: "Bangalore, India",
    salary: "₹5L - ₹9L/year",
    type: "Full-time",
    posted: "5 days ago",
    logo: "H",
    color: "bg-red-500",
    tags: ["Training", "Process", "Communication"],
  },
  {
    id: 6,
    title: "Team Leader - Customer Ops",
    company: "Sutherland Global",
    location: "Bangalore, India",
    salary: "₹6L - ₹11L/year",
    type: "Full-time",
    posted: "1 day ago",
    logo: "S",
    color: "bg-teal-500",
    tags: ["Leadership", "Customer Ops", "KPI"],
  },
];

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState<number[]>([]);

  const toggleSave = (id: number) => {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const filtered = sampleJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-sm">
            J
          </div>
          <span className="text-xl font-bold">JobSync</span>
        </Link>
        <div className="flex items-center gap-6 text-sm text-slate-400">
          <Link href="/jobs" className="text-white font-medium">
            Find Jobs
          </Link>
          <Link href="#" className="hover:text-white transition">
            Companies
          </Link>
          <Link href="#" className="hover:text-white transition">
            Community
          </Link>
          <Link
            href="/auth"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition"
          >
            Sign Up Free
          </Link>
        </div>
      </nav>

      {/* Search Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3">
            <svg
              className="w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by job title, company, or skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-slate-500 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>
          <p className="text-slate-500 text-sm mt-3">
            {filtered.length} jobs found in Bangalore
          </p>
        </div>
      </div>

      {/* Jobs List */}
      <div className="max-w-4xl mx-auto px-8 py-8">
        <div className="flex flex-col gap-4">
          {filtered.map((job) => (
            <div
              key={job.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/40 transition group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  {/* Logo */}
                  <div
                    className={`w-12 h-12 ${job.color} rounded-xl flex items-center justify-center font-bold text-lg shrink-0`}
                  >
                    {job.logo}
                  </div>
                  {/* Info */}
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-blue-400 transition">
                      {job.title}
                    </h3>
                    <p className="text-slate-400 text-sm mt-0.5">
                      {job.company} · {job.location}
                    </p>
                    <div className="flex items-center gap-3 mt-3 flex-wrap">
                      <span className="bg-slate-800 text-slate-300 text-xs px-3 py-1 rounded-full">
                        {job.type}
                      </span>
                      <span className="bg-slate-800 text-slate-300 text-xs px-3 py-1 rounded-full">
                        {job.salary}
                      </span>
                      <span className="text-slate-500 text-xs">
                        {job.posted}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-blue-500/10 text-blue-400 text-xs px-2.5 py-1 rounded-lg border border-blue-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Actions */}
                <div className="flex flex-col gap-2 shrink-0">
                  <button className="bg-blue-500 hover:bg-blue-400 transition text-white text-sm font-medium px-5 py-2 rounded-xl">
                    Apply Now
                  </button>
                  <button
                    onClick={() => toggleSave(job.id)}
                    className={`text-sm font-medium px-5 py-2 rounded-xl border transition ${
                      saved.includes(job.id)
                        ? "bg-blue-500/10 border-blue-500/40 text-blue-400"
                        : "border-slate-700 text-slate-400 hover:border-slate-500"
                    }`}
                  >
                    {saved.includes(job.id) ? "✓ Saved" : "Save"}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-500">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-lg font-medium">No jobs found</p>
              <p className="text-sm mt-1">
                Try searching with different keywords
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
