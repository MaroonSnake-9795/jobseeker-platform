import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-sm">
            J
          </div>
          <span className="text-xl font-bold text-white">JobSync</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-slate-400">
          <Link href="/jobs" className="hover:text-white transition">
            Find Jobs
          </Link>
          <Link href="/auto-apply" className="hover:text-white transition">
            Auto-Apply
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

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">
        <div className="bg-blue-500/10 text-blue-400 text-sm px-4 py-1.5 rounded-full mb-6 border border-blue-500/20">
          🚀 Your AI-powered career companion
        </div>
        <h1 className="text-6xl font-bold text-white mb-6 max-w-3xl leading-tight">
          Find Jobs. Build Resumes.
          <span className="text-blue-400"> Apply Automatically.</span>
        </h1>
        <p className="text-slate-400 text-xl mb-10 max-w-xl">
          One platform to search all jobs, create the perfect resume with AI,
          and apply automatically — without lifting a finger.
        </p>
        <div className="flex items-center gap-3 w-full max-w-xl bg-slate-900 border border-slate-700 rounded-xl px-4 py-3">
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
            placeholder="Search jobs, companies, or roles..."
            className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none text-sm"
          />
          <Link
            href="/jobs"
            className="bg-blue-500 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-400 transition font-medium"
          >
            Search
          </Link>
        </div>
        <p className="text-slate-600 text-sm mt-4">
          Popular: Software Engineer, Data Analyst, Product Manager
        </p>
      </section>

      {/* Features Section */}
      <section className="px-8 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          Everything you need in one place
        </h2>
        <p className="text-slate-400 text-center mb-14">
          Stop wasting time on multiple websites
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "🔍",
              title: "Unified Job Search",
              desc: "Search thousands of jobs from Indeed, LinkedIn, Glassdoor and more — all in one place.",
              href: "/jobs",
            },
            {
              icon: "📄",
              title: "AI Resume Builder",
              desc: "Answer a few questions and our AI builds a perfect, ATS-friendly resume tailored to you.",
              href: "/resume",
            },
            {
              icon: "⚡",
              title: "Auto-Apply",
              desc: "Set your preferences and let our bot apply to matching jobs automatically on your behalf.",
              href: "/auto-apply",
            },
            {
              icon: "✉️",
              title: "Cover Letter AI",
              desc: "Get a personalized cover letter generated for every job you apply to automatically.",
              href: "/cover-letter",
            },
            {
              icon: "🏢",
              title: "Company Insights",
              desc: "Read reviews, salary data, and culture insights for every company — like Glassdoor built in.",
              href: "/community",
            },
            {
              icon: "👥",
              title: "Community",
              desc: "Connect with other job seekers, share tips, referrals, and support each other.",
              href: "/community",
            },
          ].map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/40 hover:bg-slate-800/50 transition cursor-pointer"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center px-6 py-24 border-t border-slate-800">
        <h2 className="text-4xl font-bold mb-4">
          Ready to land your dream job?
        </h2>
        <p className="text-slate-400 mb-8">
          Join thousands of job seekers already using JobSync
        </p>
        <Link
          href="/auth"
          className="bg-blue-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-400 transition inline-block"
        >
          Get Started for Free
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-slate-600 text-sm border-t border-slate-800">
        © 2026 JobSync. Built for job seekers, by job seekers.
      </footer>
    </main>
  );
}
