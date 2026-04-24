import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const resume = `
${data.name}
${data.email} | ${data.phone} | ${data.location}

PROFESSIONAL SUMMARY
${data.summary}

CORE SKILLS
${data.skills
  .split(",")
  .map((s: string) => `• ${s.trim()}`)
  .join("\n")}

WORK EXPERIENCE

${data.title} | Current Company | 2022 - Present
- Managed customer operations with focus on SLA adherence
- Handled escalations and ensured quality assurance
- Utilized ${data.skills.split(",")[0]} for daily operations

Customer Service Representative | Previous Company | 2020 - 2022
- Provided excellent customer support across multiple channels
- Maintained high customer satisfaction scores
- Trained new team members on processes and tools

EDUCATION
${data.education}

KEY ACHIEVEMENTS
- ${data.achievements}
- ${data.experience} of experience in customer operations
    `.trim();

    return NextResponse.json({ resume });
  } catch (error) {
    console.error("Resume generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate resume" },
      { status: 500 },
    );
  }
}
