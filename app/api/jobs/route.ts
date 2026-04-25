import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "customer support";
    const location = searchParams.get("location") || "Bangalore";

    const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query + " in " + location)}&page=1&num_pages=1&date_posted=all`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "jsearch.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
      },
    });

    const data = await response.json();

    const jobs =
      data.data?.map((job: any) => ({
        id: job.job_id,
        title: job.job_title,
        company: job.employer_name,
        location: job.job_city + ", " + job.job_country,
        type: job.job_employment_type,
        posted: job.job_posted_at_datetime_utc,
        salary: job.job_min_salary
          ? `$${job.job_min_salary} - $${job.job_max_salary}`
          : "Salary not listed",
        applyLink: job.job_apply_link,
        description: job.job_description?.slice(0, 200) + "...",
        logo: job.employer_name?.charAt(0).toUpperCase(),
      })) || [];

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Jobs fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 },
    );
  }
}
