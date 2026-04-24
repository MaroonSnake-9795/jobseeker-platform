"use client";
import { useState } from "react";
import Link from "next/link";

const companies = [
  "All Companies",
  "Infosys BPO",
  "Concentrix",
  "Wipro",
  "Teleperformance",
  "Sutherland",
  "HCL",
];

const categories = [
  "All",
  "Salary",
  "Work Culture",
  "Ambience",
  "Management",
  "Work-Life Balance",
  "Growth",
  "Referral",
  "Tips",
];

const posts = [
  {
    id: 1,
    author: "Anonymous",
    avatar: "?",
    color: "bg-slate-600",
    time: "2 hours ago",
    category: "Salary",
    company: "Infosys BPO",
    categoryColor: "bg-yellow-500/20 text-yellow-400",
    content:
      "Salary for Customer Support Specialist starts at ₹4.2L. Appraisals happen yearly — around 8-12% hike if performance is good. Night shift allowance is ₹3,500/month extra.",
    likes: 24,
    comments: 8,
    isAnonymous: true,
  },
  {
    id: 2,
    author: "Rahul M.",
    avatar: "R",
    color: "bg-green-500",
    time: "5 hours ago",
    category: "Referral",
    company: "Concentrix",
    categoryColor: "bg-green-500/20 text-green-400",
    content:
      "Concentrix is hiring Customer Ops Specialists in Bangalore. I can refer you internally — drop your resume in the comments!",
    likes: 41,
    comments: 15,
    isAnonymous: false,
  },
  {
    id: 3,
    author: "Anonymous",
    avatar: "?",
    color: "bg-slate-600",
    time: "1 day ago",
    category: "Work Culture",
    company: "Wipro",
    categoryColor: "bg-blue-500/20 text-blue-400",
    content:
      "Work culture at Wipro is decent. Team leads are supportive but upper management can be distant. Friday town halls are a nice touch. Overall 3.5/5.",
    likes: 32,
    comments: 19,
    isAnonymous: true,
  },
  {
    id: 4,
    author: "Deepak T.",
    avatar: "D",
    color: "bg-purple-500",
    time: "2 days ago",
    category: "Tips",
    company: "Teleperformance",
    categoryColor: "bg-orange-500/20 text-orange-400",
    content:
      "Pro tip: Use the STAR method for interviews — Situation, Task, Action, Result. Got me through 3 rounds at Teleperformance!",
    likes: 67,
    comments: 11,
    isAnonymous: false,
  },
  {
    id: 5,
    author: "Anonymous",
    avatar: "?",
    color: "bg-slate-600",
    time: "2 days ago",
    category: "Ambience",
    company: "Sutherland",
    categoryColor: "bg-pink-500/20 text-pink-400",
    content:
      "Sutherland's Electronic City office is really well maintained. Good cafeteria, clean workstations, and decent transport facility. Parking can be an issue though.",
    likes: 28,
    comments: 6,
    isAnonymous: true,
  },
  {
    id: 6,
    author: "Sneha R.",
    avatar: "S",
    color: "bg-teal-500",
    time: "3 days ago",
    category: "Growth",
    company: "HCL",
    categoryColor: "bg-teal-500/20 text-teal-400",
    content:
      "HCL has great internal mobility. I moved from Customer Support to Process Trainer in 18 months. They really invest in upskilling if you show initiative!",
    likes: 89,
    comments: 23,
    isAnonymous: false,
  },
  {
    id: 7,
    author: "Anonymous",
    avatar: "?",
    color: "bg-slate-600",
    time: "4 days ago",
    category: "Work-Life Balance",
    company: "Concentrix",
    categoryColor: "bg-purple-500/20 text-purple-400",
    content:
      "Work-life balance at Concentrix depends heavily on your process. US shift processes can be tough. Day shift is much more manageable. Ask about shift timing before joining.",
    likes: 54,
    comments: 17,
    isAnonymous: true,
  },
  {
    id: 8,
    author: "Arjun P.",
    avatar: "A",
    color: "bg-orange-500",
    time: "5 days ago",
    category: "Management",
    company: "Infosys BPO",
    categoryColor: "bg-red-500/20 text-red-400",
    content:
      "Middle management at Infosys BPO is hit or miss. My team lead was excellent but I've heard mixed reviews from other floors. Make sure to meet your TL before accepting an offer.",
    likes: 36,
    comments: 14,
    isAnonymous: false,
  },
];

const categoryColors: Record<string, string> = {
  Salary: "bg-yellow-500/20 text-yellow-400",
  "Work Culture": "bg-blue-500/20 text-blue-400",
  Ambience: "bg-pink-500/20 text-pink-400",
  Management: "bg-red-500/20 text-red-400",
  "Work-Life Balance": "bg-purple-500/20 text-purple-400",
  Growth: "bg-teal-500/20 text-teal-400",
  Referral: "bg-green-500/20 text-green-400",
  Tips: "bg-orange-500/20 text-orange-400",
};

export default function CommunityPage() {
  const [liked, setLiked] = useState<number[]>([]);
  const [newPost, setNewPost] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeCompany, setActiveCompany] = useState("All Companies");
  const [selectedCategory, setSelectedCategory] = useState("Tips");

  const toggleLike = (id: number) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const filtered = posts.filter((post) => {
    const matchCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchCompany =
      activeCompany === "All Companies" || post.company === activeCompany;
    return matchCategory && matchCompany;
  });

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
          <Link href="/jobs" className="hover:text-white transition">
            Find Jobs
          </Link>
          <Link href="/community" className="text-white font-medium">
            Community
          </Link>
          <Link href="/dashboard" className="hover:text-white transition">
            Dashboard
          </Link>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold text-sm">
            J
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="bg-blue-500/10 text-blue-400 text-sm px-4 py-1.5 rounded-full mb-4 border border-blue-500/20 inline-block">
            👥 Community
          </div>
          <h1 className="text-4xl font-bold mb-3">Company Reviews & Tips</h1>
          <p className="text-slate-400">
            Read honest reviews, share referrals, and support fellow job
            seekers.
          </p>
        </div>

        {/* New Post Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-6">
          <div className="flex gap-3">
            <div
              className={`w-9 h-9 ${isAnonymous ? "bg-slate-600" : "bg-blue-500"} rounded-full flex items-center justify-center font-bold text-sm shrink-0`}
            >
              {isAnonymous ? "?" : "J"}
            </div>
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share a review, tip, or referral..."
                rows={3}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 transition resize-none"
              />

              {/* Post Options */}
              <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                  {/* Category Selector */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-slate-800 border border-slate-700 text-slate-300 text-xs rounded-lg px-3 py-2 outline-none"
                  >
                    {categories
                      .filter((c) => c !== "All")
                      .map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                  </select>

                  {/* Anonymous Toggle */}
                  <button
                    onClick={() => setIsAnonymous(!isAnonymous)}
                    className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg border transition ${
                      isAnonymous
                        ? "bg-slate-700 border-slate-600 text-white"
                        : "border-slate-700 text-slate-400 hover:text-white"
                    }`}
                  >
                    <span>{isAnonymous ? "🎭" : "👤"}</span>
                    {isAnonymous ? "Posting Anonymously" : "Post Anonymously"}
                  </button>
                </div>

                <button
                  disabled={!newPost.trim()}
                  onClick={() => setNewPost("")}
                  className="bg-blue-500 hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition text-white text-sm font-semibold px-5 py-2 rounded-xl"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Company Filter */}
        <div className="mb-4">
          <p className="text-slate-400 text-xs mb-2 font-medium uppercase tracking-wide">
            Filter by Company
          </p>
          <div className="flex gap-2 flex-wrap">
            {companies.map((company) => (
              <button
                key={company}
                onClick={() => setActiveCompany(company)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  activeCompany === company
                    ? "bg-blue-500 text-white"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {company}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <p className="text-slate-400 text-xs mb-2 font-medium uppercase tracking-wide">
            Filter by Category
          </p>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  activeCategory === cat
                    ? "bg-blue-500 text-white"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-slate-500 text-sm mb-4">
          {filtered.length} posts found
        </p>

        {/* Posts */}
        <div className="flex flex-col gap-4">
          {filtered.map((post) => (
            <div
              key={post.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/30 transition"
            >
              <div className="flex items-start gap-3 mb-4">
                <div
                  className={`w-9 h-9 ${post.color} rounded-full flex items-center justify-center font-bold text-sm shrink-0`}
                >
                  {post.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm">
                      {post.isAnonymous ? "Anonymous" : post.author}
                    </span>
                    {post.isAnonymous && (
                      <span className="text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full">
                        🎭 Anonymous
                      </span>
                    )}
                    <span className="text-slate-500 text-xs">{post.time}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs text-slate-500">
                      🏢 {post.company}
                    </span>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full ${post.categoryColor}`}
                    >
                      {post.category}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {post.content}
              </p>
              <div className="flex items-center gap-4 text-slate-500 text-sm">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-1.5 transition ${
                    liked.includes(post.id)
                      ? "text-blue-400"
                      : "hover:text-white"
                  }`}
                >
                  {liked.includes(post.id) ? "❤️" : "🤍"}
                  <span>
                    {liked.includes(post.id) ? post.likes + 1 : post.likes}
                  </span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-white transition">
                  💬 <span>{post.comments}</span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-white transition">
                  🔗 Share
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-500">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-lg font-medium">No posts found</p>
              <p className="text-sm mt-1">
                Try selecting a different company or category
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
