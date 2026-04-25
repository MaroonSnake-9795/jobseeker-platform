"use client";
import { useState } from "react";
import Link from "next/link";

const steps = [
  { id: 1, title: "Personal Info", icon: "👤" },
  { id: 2, title: "Job Preferences", icon: "🎯" },
  { id: 3, title: "Resume", icon: "📄" },
  { id: 4, title: "Auto-Apply Settings", icon: "⚡" },
];

export default function AutoApplyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    jobTitle: "",
    jobType: "Full-time",
    minSalary: "",
    keywords: "",
    maxApplications: "10",
    autoApplyEnabled: false,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const startAutoApply = async () => {
    setIsRunning(true);
    const mockJobs = [
      "Customer Support Specialist at Infosys BPO",
      "Operations Analyst at Concentrix",
      "Quality Assurance Lead at Wipro",
      "Senior CX Specialist at Teleperformance",
      "Team Leader at Sutherland Global",
    ];

    for (
      let i = 0;
      i < Math.min(parseInt(formData.maxApplications), mockJobs.length);
      i++
    ) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setAppliedJobs((prev) => [...prev, mockJobs[i]]);
    }
    setIsRunning(false);
  };

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

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="bg-blue-500/10 text-blue-400 text-sm px-4 py-1.5 rounded-full mb-4 border border-blue-500/20 inline-block">
            ⚡ Auto-Apply Engine
          </div>
          <h1 className="text-4xl font-bold mb-3">
            Apply to jobs automatically
          </h1>
          <p className="text-slate-400">
            Set your preferences once and let JobSync apply to matching jobs on
            your behalf.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-10">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition ${
                    currentStep >= step.id
                      ? "bg-blue-500 text-white"
                      : "bg-slate-800 text-slate-500"
                  }`}
                >
                  {currentStep > step.id ? "✓" : step.icon}
                </div>
                <span
                  className={`text-xs mt-1 ${currentStep >= step.id ? "text-blue-400" : "text-slate-500"}`}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 w-16 mx-2 mb-4 ${currentStep > step.id ? "bg-blue-500" : "bg-slate-800"}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1 - Personal Info */}
        {currentStep === 1 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
            <div className="flex flex-col gap-4">
              {[
                {
                  id: "fullName",
                  label: "Full Name",
                  placeholder: "Joseph Tirkey",
                },
                {
                  id: "email",
                  label: "Email Address",
                  placeholder: "joseph@email.com",
                },
                {
                  id: "phone",
                  label: "Phone Number",
                  placeholder: "+91 98765 43210",
                },
                {
                  id: "location",
                  label: "Location",
                  placeholder: "Bangalore, India",
                },
              ].map((field) => (
                <div key={field.id}>
                  <label className="text-sm text-slate-400 mb-1.5 block">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={
                      formData[field.id as keyof typeof formData] as string
                    }
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 transition"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 - Job Preferences */}
        {currentStep === 2 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-xl font-semibold mb-6">Job Preferences</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-slate-400 mb-1.5 block">
                  Desired Job Title
                </label>
                <input
                  type="text"
                  placeholder="Customer Operations Specialist"
                  value={formData.jobTitle}
                  onChange={(e) => handleChange("jobTitle", e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 transition"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1.5 block">
                  Job Type
                </label>
                <select
                  value={formData.jobType}
                  onChange={(e) => handleChange("jobType", e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500 transition"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Remote</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1.5 block">
                  Minimum Salary (₹ per year)
                </label>
                <input
                  type="text"
                  placeholder="400000"
                  value={formData.minSalary}
                  onChange={(e) => handleChange("minSalary", e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 transition"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1.5 block">
                  Keywords to match
                </label>
                <input
                  type="text"
                  placeholder="Salesforce, ServiceNow, BPO, Customer Support"
                  value={formData.keywords}
                  onChange={(e) => handleChange("keywords", e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 transition"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3 - Resume */}
        {currentStep === 3 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-xl font-semibold mb-2">Your Resume</h2>
            <p className="text-slate-400 text-sm mb-6">
              Your resume will be automatically submitted with every
              application.
            </p>
            <div className="flex flex-col gap-4">
              <Link
                href="/resume"
                className="flex items-center justify-between bg-slate-800 border border-slate-700 hover:border-blue-500/40 rounded-xl px-5 py-4 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📄</span>
                  <div>
                    <p className="font-medium text-sm">
                      Build with AI Resume Builder
                    </p>
                    <p className="text-slate-500 text-xs">
                      Answer questions and AI creates your resume
                    </p>
                  </div>
                </div>
                <span className="text-blue-400 text-sm">→</span>
              </Link>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-700" />
                <span className="text-slate-500 text-xs">or</span>
                <div className="flex-1 h-px bg-slate-700" />
              </div>
              <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center hover:border-blue-500/40 transition">
                <p className="text-3xl mb-3">📎</p>
                <p className="text-sm font-medium mb-1">
                  Upload your existing resume
                </p>
                <p className="text-slate-500 text-xs">PDF or Word document</p>
                <button className="mt-4 bg-slate-800 hover:bg-slate-700 transition text-white text-sm font-medium px-5 py-2 rounded-xl">
                  Choose File
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4 - Auto Apply Settings */}
        {currentStep === 4 && !isRunning && appliedJobs.length === 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-xl font-semibold mb-2">Auto-Apply Settings</h2>
            <p className="text-slate-400 text-sm mb-6">
              Configure how many jobs to apply to automatically.
            </p>
            <div className="flex flex-col gap-6">
              <div>
                <label className="text-sm text-slate-400 mb-1.5 block">
                  Maximum applications per day
                </label>
                <select
                  value={formData.maxApplications}
                  onChange={(e) =>
                    handleChange("maxApplications", e.target.value)
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500 transition"
                >
                  <option value="5">5 applications</option>
                  <option value="10">10 applications</option>
                  <option value="20">20 applications</option>
                  <option value="50">50 applications</option>
                </select>
              </div>

              {/* Summary */}
              <div className="bg-slate-800 rounded-xl p-5">
                <h3 className="text-sm font-semibold mb-3 text-slate-300">
                  Application Summary
                </h3>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Name</span>
                    <span>{formData.fullName || "Not set"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Job Title</span>
                    <span>{formData.jobTitle || "Not set"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Location</span>
                    <span>{formData.location || "Not set"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Job Type</span>
                    <span>{formData.jobType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Max Applications</span>
                    <span>{formData.maxApplications}/day</span>
                  </div>
                </div>
              </div>

              <button
                onClick={startAutoApply}
                className="w-full bg-blue-500 hover:bg-blue-400 transition text-white font-semibold py-4 rounded-xl text-lg"
              >
                ⚡ Start Auto-Apply
              </button>
              <p className="text-slate-500 text-xs text-center">
                JobSync will automatically find and apply to matching jobs based
                on your preferences.
              </p>
            </div>
          </div>
        )}

        {/* Running State */}
        {isRunning && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-6 animate-bounce">⚡</div>
            <h2 className="text-2xl font-bold mb-3">
              Auto-Apply is running...
            </h2>
            <p className="text-slate-400 mb-8">
              Applying to matching jobs on your behalf.
            </p>
            <div className="flex flex-col gap-3 text-left">
              {appliedJobs.map((job, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3"
                >
                  <span className="text-green-400">✓</span>
                  <span className="text-sm text-green-300">
                    Applied to {job}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-3 bg-slate-800 rounded-xl px-4 py-3">
                <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-slate-400">
                  Searching for more matching jobs...
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Done State */}
        {!isRunning && appliedJobs.length > 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">Auto-Apply Complete!</h2>
            <p className="text-slate-400 mb-8">
              Successfully applied to {appliedJobs.length} jobs on your behalf.
            </p>
            <div className="flex flex-col gap-3 text-left mb-8">
              {appliedJobs.map((job, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3"
                >
                  <span className="text-green-400">✓</span>
                  <span className="text-sm text-green-300">
                    Applied to {job}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <Link
                href="/dashboard"
                className="flex-1 bg-blue-500 hover:bg-blue-400 transition text-white font-semibold py-3 rounded-xl text-center"
              >
                View Dashboard
              </Link>
              <button
                onClick={() => {
                  setAppliedJobs([]);
                  setCurrentStep(1);
                }}
                className="flex-1 bg-slate-800 hover:bg-slate-700 transition text-white font-semibold py-3 rounded-xl"
              >
                Start Over
              </button>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        {currentStep < 4 && (
          <div className="flex justify-between mt-6">
            {currentStep > 1 ? (
              <button
                onClick={handleBack}
                className="text-slate-400 hover:text-white text-sm transition px-4 py-2"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={handleNext}
              className="bg-blue-500 hover:bg-blue-400 transition text-white font-semibold px-8 py-3 rounded-xl"
            >
              {currentStep === 3 ? "Review & Launch →" : "Next →"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
