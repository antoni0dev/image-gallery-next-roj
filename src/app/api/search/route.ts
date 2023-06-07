import { NextResponse } from "next/server";
import { UnsplashSearchResponse } from "../../../../types";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "No query provided" }, { status: 404 });
  }

  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );

  const { results }: UnsplashSearchResponse = await response.json();
  return NextResponse.json(results);
};
