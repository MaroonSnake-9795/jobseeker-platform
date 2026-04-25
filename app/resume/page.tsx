"use client";
import { useState } from "react";
import Link from "next/link";

const questions = [
  {
    id: "name",
    label: "What is your full name?",
    placeholder: "Joseph Tirkey",
  },
  {
    id: "email",
    label: "What is your email address?",
    placeholder: "joseph@email.com",
  },
  {
    id: "phone",
    label: "What is your phone number?",
    placeholder: "+91 98765 43210",
  },
  {
    id: "location",
    label: "Where are you located?",
    placeholder: "Bangalore, India",
  },
  {
    id: "title",
    label: "What is your current job title?",
    placeholder: "Customer Operations Specialist",
  },
  {
    id: "experience",
    label: "How many years of experience do you have?",
    placeholder: "4 years",
  },
  {
    id: "skills",
    label: "What are your top skills?",
    placeholder: "Salesforce, ServiceNow, Tableau, SLA Management",
  },
  {
    id: "education",
    label: "What is your highest qualification?",
    placeholder: "Bachelor of Commerce, Bangalore University",
  },
  {
    id: "achievements",
    label: "What is your biggest achievement at work?",
    placeholder: "Reduced escalation rate by 30% in 6 months",
  },
  {
    id: "summary",
    label: "Describe yourself in 2-3 sentences.",
    placeholder:
      "Dedicated customer operations professional with 4+ years of BPO experience...",
  },
];

export default function ResumePage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [current, setCurrent] = useState("");
  const [resume, setResume] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleNext = () => {
    if (!current.trim()) return;
    setAnswers((prev) => ({ ...prev, [questions[step].id]: current }));
    setCurrent("");
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      generateResume();
    }
  };

  const generateResume = async () => {
    setLoading(true);
    const data = { ...answers, [questions[step].id]: current };

    try {
      const response = await fetch("/api/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setResume(result.resume);
    } catch {
      setResume(
        "Sorry, there was an error generating your resume. Please try again.",
      );
    }
    setLoading(false);
  };

  const progress = Math.round((step / questions.length) * 100);

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
        <Link
          href="/jobs"
          className="text-slate-400 hover:text-white text-sm transition"
        >
          ← Back to Jobs
        </Link>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-16">
        {!resume && !loading && (
          <>
            <div className="text-center mb-10">
              <div className="bg-blue-500/10 text-blue-400 text-sm px-4 py-1.5 rounded-full mb-4 border border-blue-500/20 inline-block">
                📄 AI Resume Builder
              </div>
              <h1 className="text-4xl font-bold mb-3">
                Build your perfect resume
              </h1>
              <p className="text-slate-400">
                Answer {questions.length} simple questions and our AI will
                create a professional resume for you.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-slate-400 mb-2">
                <span>
                  Question {step + 1} of {questions.length}
                </span>
                <span>{progress}% complete</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <h2 className="text-xl font-semibold mb-6">
                {questions[step].label}
              </h2>
              <textarea
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                placeholder={questions[step].placeholder}
                rows={3}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 transition resize-none"
              />
              <div className="flex justify-between items-center mt-6">
                {step > 0 ? (
                  <button
                    onClick={() => {
                      setStep(step - 1);
                      setCurrent("");
                    }}
                    className="text-slate-400 hover:text-white text-sm transition"
                  >
                    ← Previous
                  </button>
                ) : (
                  <div />
                )}
                <button
                  onClick={handleNext}
                  disabled={!current.trim()}
                  className="bg-blue-500 hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition text-white font-semibold px-8 py-3 rounded-xl"
                >
                  {step + 1 === questions.length
                    ? "Generate Resume ✨"
                    : "Next →"}
                </button>
              </div>
            </div>
          </>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-32">
            <div className="text-5xl mb-6 animate-bounce">✨</div>
            <h2 className="text-2xl font-bold mb-3">Building your resume...</h2>
            <p className="text-slate-400">
              Our AI is crafting your perfect resume. This takes about 10
              seconds.
            </p>
          </div>
        )}

        {/* Resume Output */}
        {resume && !loading && (
          <div>
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold mb-2">Your resume is ready!</h2>
              <p className="text-slate-400">
                Review it below. You can edit, copy or start over.
              </p>
            </div>

            {/* Resume Content */}
            {isEditing ? (
              <div className="flex flex-col gap-3">
                <textarea
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  rows={20}
                  className="w-full bg-white text-slate-900 rounded-2xl p-8 text-sm leading-relaxed font-mono outline-none resize-none"
                />
                <button
                  onClick={() => setIsEditing(false)}
                  className="w-full bg-green-500 hover:bg-green-400 transition text-white font-semibold py-3 rounded-xl"
                >
                  ✓ Save Changes
                </button>
              </div>
            ) : (
              <div className="bg-white text-slate-900 rounded-2xl p-8 whitespace-pre-wrap text-sm leading-relaxed font-mono">
                {resume}
              </div>
            )}

            {/* Action Buttons */}
            {!isEditing && (
              <div className="flex flex-col gap-3 mt-6">
                <Link
                  href="/auto-apply"
                  className="w-full bg-blue-500 hover:bg-blue-400 transition text-white font-semibold py-3 rounded-xl text-center"
                >
                  ⚡ Use This Resume for Auto-Apply
                </Link>
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-slate-700 hover:bg-slate-600 transition text-white font-semibold py-3 rounded-xl"
                >
                  ✏️ Edit Resume
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(resume)}
                  className="w-full bg-slate-800 hover:bg-slate-700 transition text-white font-semibold py-3 rounded-xl"
                >
                  📋 Copy Resume
                </button>
                <button
                  onClick={() => {
                    setResume("");
                    setStep(0);
                    setAnswers({});
                    setCurrent("");
                    setIsEditing(false);
                  }}
                  className="w-full border border-slate-700 hover:border-slate-500 transition text-slate-400 font-semibold py-3 rounded-xl"
                >
                  Start Over
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
