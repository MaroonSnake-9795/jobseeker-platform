"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState<string[]>([]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/jobs?query=${encodeURIComponent(search || "customer support")}&location=${encodeURIComponent(location)}`,
      );
      const data = await res.json();
      setJobs(data.jobs || []);
    } catch {
      setJobs([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const toggleSave = (id: string) => {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const colors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-orange-500",
    "bg-red-500",
    "bg-teal-500",
    "bg-pink-500",
    "bg-yellow-500",
  ];

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
          <Link href="/auto-apply" className="hover:text-white transition">
            Auto-Apply
          </Link>
          <Link href="/resume" className="hover:text-white transition">
            Resume
          </Link>
          <Link href="/community" className="hover:text-white transition">
            Community
          </Link>
          <Link href="/dashboard" className="hover:text-white transition">
            Dashboard
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
        <div className="max-w-4xl mx-auto flex gap-3">
          <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 flex-1">
            <svg
              className="w-5 h-5 text-slate-400 shrink-0"
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
              placeholder="Job title or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none text-sm"
            />
          </div>
          <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 w-48">
            <span className="text-slate-400 text-sm">📍</span>
            <input
              type="text"
              placeholder="Location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none text-sm"
            />
          </div>
          <button
            onClick={fetchJobs}
            className="bg-blue-500 hover:bg-blue-400 transition text-white font-semibold px-6 py-3 rounded-xl text-sm"
          >
            Search
          </button>
        </div>
      </div>

      {/* Jobs List */}
      <div className="max-w-4xl mx-auto px-8 py-8">
        {loading ? (
          <div className="text-center py-32">
            <div className="text-5xl mb-6 animate-bounce">🔍</div>
            <h2 className="text-2xl font-bold mb-3">Finding jobs for you...</h2>
            <p className="text-slate-400">
              Searching real job listings from multiple sources.
            </p>
          </div>
        ) : (
          <>
            <p className="text-slate-500 text-sm mb-6">
              {jobs.length} jobs found
            </p>
            <div className="flex flex-col gap-4">
              {jobs.map((job, index) => (
                <div
                  key={job.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/40 transition group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 ${colors[index % colors.length]} rounded-xl flex items-center justify-center font-bold text-lg shrink-0`}
                      >
                        {job.logo}
                      </div>
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
                        </div>
                        <p className="text-slate-500 text-xs mt-3 leading-relaxed">
                          {job.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <button
                        onClick={() => window.open(job.applyLink, "_blank")}
                        className="bg-blue-500 hover:bg-blue-400 transition text-white text-sm font-medium px-5 py-2 rounded-xl"
                      >
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

              {jobs.length === 0 && (
                <div className="text-center py-20 text-slate-500">
                  <p className="text-4xl mb-4">🔍</p>
                  <p className="text-lg font-medium">No jobs found</p>
                  <p className="text-sm mt-1">
                    Try different keywords or location
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
