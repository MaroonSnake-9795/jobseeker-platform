"use client";
import { useState } from "react";
import Link from "next/link";

const savedJobs = [
  {
    id: 1,
    title: "Customer Support Specialist",
    company: "Infosys BPO",
    location: "Bangalore, India",
    salary: "₹4L - ₹6L/year",
    status: "Saved",
    color: "bg-blue-500",
    logo: "I",
  },
  {
    id: 2,
    title: "Operations Analyst",
    company: "Concentrix",
    location: "Bangalore, India",
    salary: "₹5L - ₹8L/year",
    status: "Applied",
    color: "bg-purple-500",
    logo: "C",
  },
  {
    id: 3,
    title: "Quality Assurance Lead",
    company: "Wipro",
    location: "Bangalore, India",
    salary: "₹6L - ₹10L/year",
    status: "Interview",
    color: "bg-green-500",
    logo: "W",
  },
];

const statusColors: Record<string, string> = {
  Saved: "bg-slate-700 text-slate-300",
  Applied: "bg-blue-500/20 text-blue-400",
  Interview: "bg-green-500/20 text-green-400",
  Rejected: "bg-red-500/20 text-red-400",
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "jobs", label: "Saved Jobs" },
    { id: "applications", label: "Applications" },
    { id: "profile", label: "My Profile" },
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
        <div className="flex items-center gap-4 text-sm">
          <Link
            href="/jobs"
            className="text-slate-400 hover:text-white transition"
          >
            Find Jobs
          </Link>
          <Link
            href="/auto-apply"
            className="text-slate-400 hover:text-white transition"
          >
            Auto-Apply
          </Link>
          <Link
            href="/resume"
            className="text-slate-400 hover:text-white transition"
          >
            Resume
          </Link>
          <Link
            href="/cover-letter"
            className="text-slate-400 hover:text-white transition"
          >
            Cover Letter
          </Link>
          <Link
            href="/community"
            className="text-slate-400 hover:text-white transition"
          >
            Community
          </Link>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold text-sm">
            J
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Welcome back, Joseph! 👋</h1>
          <p className="text-slate-400">
            Here's what's happening with your job search.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Jobs Saved",
              value: "12",
              icon: "🔖",
              color: "text-blue-400",
            },
            {
              label: "Applied",
              value: "8",
              icon: "📨",
              color: "text-purple-400",
            },
            {
              label: "Interviews",
              value: "3",
              icon: "🎯",
              color: "text-green-400",
            },
            {
              label: "Profile Views",
              value: "24",
              icon: "👁️",
              color: "text-orange-400",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className={`text-3xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-slate-900 border border-slate-800 rounded-xl p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-blue-500 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Saved Jobs</h2>
              <div className="flex flex-col gap-3">
                {savedJobs.map((job) => (
                  <div key={job.id} className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 ${job.color} rounded-lg flex items-center justify-center font-bold text-sm shrink-0`}
                    >
                      {job.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {job.title}
                      </p>
                      <p className="text-xs text-slate-400">{job.company}</p>
                    </div>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full ${statusColors[job.status]}`}
                    >
                      {job.status}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href="/jobs"
                className="text-blue-400 text-sm hover:text-blue-300 transition mt-4 block"
              >
                View all jobs →
              </Link>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="flex flex-col gap-3">
                {[
                  { icon: "🔍", label: "Search New Jobs", href: "/jobs" },
                  {
                    icon: "⚡",
                    label: "Auto-Apply to Jobs",
                    href: "/auto-apply",
                  },
                  { icon: "📄", label: "Update My Resume", href: "/resume" },
                  {
                    icon: "✉️",
                    label: "Write Cover Letter",
                    href: "/cover-letter",
                  },
                ].map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="flex items-center gap-3 bg-slate-800 border border-slate-700 hover:border-blue-500/40 rounded-xl px-4 py-3 text-sm font-medium transition"
                  >
                    <span className="text-xl">{action.icon}</span>
                    {action.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Saved Jobs Tab */}
        {activeTab === "jobs" && (
          <div className="flex flex-col gap-4">
            {savedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 ${job.color} rounded-xl flex items-center justify-center font-bold text-lg shrink-0`}
                  >
                    {job.logo}
                  </div>
                  <div>
                    <h3 className="font-semibold">{job.title}</h3>
                    <p className="text-slate-400 text-sm">
                      {job.company} · {job.location}
                    </p>
                    <p className="text-slate-500 text-xs mt-1">{job.salary}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-3 py-1.5 rounded-full ${statusColors[job.status]}`}
                  >
                    {job.status}
                  </span>
                  <button className="bg-blue-500 hover:bg-blue-400 transition text-white text-sm font-medium px-4 py-2 rounded-xl">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === "applications" && (
          <div className="flex flex-col gap-4">
            {savedJobs
              .filter((j) => j.status !== "Saved")
              .map((job) => (
                <div
                  key={job.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 ${job.color} rounded-xl flex items-center justify-center font-bold text-lg shrink-0`}
                    >
                      {job.logo}
                    </div>
                    <div>
                      <h3 className="font-semibold">{job.title}</h3>
                      <p className="text-slate-400 text-sm">
                        {job.company} · {job.location}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-sm px-3 py-1.5 rounded-full ${statusColors[job.status]}`}
                  >
                    {job.status}
                  </span>
                </div>
              ))}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-2xl font-bold">
                J
              </div>
              <div>
                <h2 className="text-xl font-bold">Joseph Tirkey</h2>
                <p className="text-slate-400 text-sm">
                  Customer Operations Specialist
                </p>
                <p className="text-slate-500 text-xs">Bangalore, India</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { label: "Full Name", value: "Joseph Tirkey" },
                { label: "Email", value: "joseph.git99@gmail.com" },
                { label: "Phone", value: "+91 87979 77679" },
                { label: "Location", value: "Bangalore, India" },
                { label: "Experience", value: "4+ years in BPO" },
                { label: "Skills", value: "Salesforce, ServiceNow, Tableau" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between items-center py-3 border-b border-slate-800"
                >
                  <span className="text-slate-400 text-sm">{item.label}</span>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
              <button className="w-full bg-blue-500 hover:bg-blue-400 transition text-white font-semibold py-3 rounded-xl mt-4">
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
