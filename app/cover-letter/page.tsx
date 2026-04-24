"use client";
import { useState } from "react";
import Link from "next/link";

export default function CoverLetterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    company: "",
    skills: "",
    experience: "",
    whyCompany: "",
  });
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateCoverLetter = async () => {
    if (!formData.name || !formData.jobTitle || !formData.company) return;
    setLoading(true);

    try {
      const response = await fetch("/api/generate-cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      setCoverLetter(result.coverLetter);
    } catch {
      setCoverLetter("Sorry, there was an error. Please try again.");
    }
    setLoading(false);
  };

  const fields = [
    { id: "name", label: "Your Full Name", placeholder: "Joseph Tirkey" },
    { id: "email", label: "Your Email", placeholder: "joseph@email.com" },
    { id: "phone", label: "Your Phone", placeholder: "+91 98765 43210" },
    {
      id: "jobTitle",
      label: "Job Title Applying For",
      placeholder: "Customer Operations Specialist",
    },
    { id: "company", label: "Company Name", placeholder: "Infosys BPO" },
    {
      id: "skills",
      label: "Your Top Skills",
      placeholder: "Salesforce, ServiceNow, SLA Management",
    },
    { id: "experience", label: "Years of Experience", placeholder: "4 years" },
    {
      id: "whyCompany",
      label: "Why do you want to work here?",
      placeholder: "I admire the company's focus on customer excellence...",
    },
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
        <Link
          href="/jobs"
          className="text-slate-400 hover:text-white text-sm transition"
        >
          ← Back to Jobs
        </Link>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-16">
        {!coverLetter && !loading && (
          <>
            <div className="text-center mb-10">
              <div className="bg-blue-500/10 text-blue-400 text-sm px-4 py-1.5 rounded-full mb-4 border border-blue-500/20 inline-block">
                ✉️ AI Cover Letter Generator
              </div>
              <h1 className="text-4xl font-bold mb-3">
                Generate your cover letter
              </h1>
              <p className="text-slate-400">
                Fill in your details and we'll write a professional cover letter
                for you.
              </p>
            </div>

            {/* Form */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <div className="flex flex-col gap-5">
                {fields.map((field) => (
                  <div key={field.id}>
                    <label className="text-sm text-slate-400 mb-1.5 block">
                      {field.label}
                    </label>
                    {field.id === "whyCompany" ? (
                      <textarea
                        rows={3}
                        placeholder={field.placeholder}
                        value={formData[field.id as keyof typeof formData]}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 transition resize-none"
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        value={formData[field.id as keyof typeof formData]}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 transition"
                      />
                    )}
                  </div>
                ))}

                <button
                  onClick={generateCoverLetter}
                  disabled={
                    !formData.name || !formData.jobTitle || !formData.company
                  }
                  className="w-full bg-blue-500 hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition text-white font-semibold py-3 rounded-xl mt-2"
                >
                  Generate Cover Letter ✨
                </button>
              </div>
            </div>
          </>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-32">
            <div className="text-5xl mb-6 animate-bounce">✉️</div>
            <h2 className="text-2xl font-bold mb-3">
              Writing your cover letter...
            </h2>
            <p className="text-slate-400">This takes just a few seconds.</p>
          </div>
        )}

        {/* Cover Letter Output */}
        {coverLetter && !loading && (
          <div>
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold mb-2">
                Your cover letter is ready!
              </h2>
              <p className="text-slate-400">
                Review it below. You can copy it or start over.
              </p>
            </div>
            <div className="bg-white text-slate-900 rounded-2xl p-8 whitespace-pre-wrap text-sm leading-relaxed">
              {coverLetter}
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => navigator.clipboard.writeText(coverLetter)}
                className="flex-1 bg-blue-500 hover:bg-blue-400 transition text-white font-semibold py-3 rounded-xl"
              >
                Copy Cover Letter
              </button>
              <button
                onClick={() => {
                  setCoverLetter("");
                }}
                className="flex-1 bg-slate-800 hover:bg-slate-700 transition text-white font-semibold py-3 rounded-xl"
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
