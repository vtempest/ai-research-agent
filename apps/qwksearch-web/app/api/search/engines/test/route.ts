import { NextRequest, NextResponse } from "next/server";
import { MergedSearchEngine } from "@/lib/search/merged-engine";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { engines } = body;

    if (!Array.isArray(engines) || engines.length === 0) {
      return NextResponse.json(
        { message: "engines array is required" },
        { status: 400 }
      );
    }

    const results: Record<string, { working: boolean; error?: string }> = {};
    const testQuery = "test";
    const search = new MergedSearchEngine({ engineNames: engines });

    for (const engineName of engines) {
      try {
        const result = await search.search(testQuery, { engineNames: [engineName] });

        results[engineName] = {
          working: Array.isArray(result) && result.length > 0,
        };
      } catch (error) {
        results[engineName] = {
          working: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }

    return NextResponse.json({ results }, { status: 200 });
  } catch (err) {
    console.error("Error testing engines:", err);
    return NextResponse.json(
      { message: "Failed to test engines" },
      { status: 500 }
    );
  }
};
