import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const today = new Date().toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const coverLetter = `
${data.name}
${data.email} | ${data.phone}
${today}

Hiring Manager
${data.company}

Dear Hiring Manager,

I am writing to express my strong interest in the ${data.jobTitle} position at ${data.company}. With ${data.experience} of professional experience and expertise in ${data.skills}, I am confident that I would be a valuable addition to your team.

Throughout my career, I have developed strong capabilities in ${data.skills}. My hands-on experience has equipped me with the ability to handle complex situations efficiently while maintaining high quality standards and meeting SLA requirements.

${data.whyCompany}

I am particularly drawn to ${data.company} because of its reputation for excellence and commitment to delivering outstanding results. I am excited about the opportunity to bring my skills and dedication to your organization and contribute meaningfully to your team's success.

I would welcome the opportunity to discuss how my background and skills align with your needs. Thank you for considering my application. I look forward to hearing from you.

Warm regards,
${data.name}
${data.email}
${data.phone}
    `.trim();

    return NextResponse.json({ coverLetter });
  } catch (error) {
    console.error("Cover letter generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate cover letter" },
      { status: 500 },
    );
  }
}
