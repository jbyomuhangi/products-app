import { NextRequest, NextResponse } from "next/server";

import { SupplierAttributeQuery } from "@/app/types/query-engine/attribute";
import { DataLoader } from "@/app/utils/dataLoader";
import { SupplierAttributeQueryEngine } from "@/app/utils/query-engine/attributes";

export async function POST(request: NextRequest) {
  try {
    let body: SupplierAttributeQuery | null = null;

    if (request.headers.get("content-length") === "0") {
      body = null;
    } else {
      body = await request.json();
    }

    const { filter, sort, pagination } = body ?? {};

    const attributes = DataLoader.getAttributes();
    const queryEngine = new SupplierAttributeQueryEngine(attributes);
    const result = await queryEngine.query({
      filter,
      sort,
      pagination,
    });

    const data = {
      results: result.data,
      pagination: result.pagination,
      total: result.total,
    };

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error processing attributes query:", error);
    return NextResponse.json(
      { error: "Failed to process attributes query" },
      { status: 500 }
    );
  }
}
