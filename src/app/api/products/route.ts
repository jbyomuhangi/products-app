import { NextRequest, NextResponse } from "next/server";

import { ProductApiData } from "@/app/types/product";
import { ProductQuery } from "@/app/types/query-engine/product";
import { DataLoader } from "@/app/utils/dataLoader";
import { ProductQueryEngine } from "@/app/utils/query-engine/products";

export const GET = async (request: NextRequest) => {
  try {
    const products = DataLoader.getProducts();
    const queryEngine = new ProductQueryEngine(products);
    const result = await queryEngine.query({});

    const results: ProductApiData[] = result.data.map((product) => {
      return {
        id: product.id,
        skuId: product.skuId,
        updatedAt: product.updatedAt,
        createdAt: product.createdAt,
      };
    });

    const data = {
      results,
      pagination: result.pagination,
      total: result.total,
    };

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error processing products query:", error);
    return NextResponse.json(
      { error: "Failed to process products query" },
      { status: 500 }
    );
  }
};

export async function POST(request: NextRequest) {
  try {
    let body: ProductQuery | null = null;

    if (request.headers.get("content-length") === "0") {
      body = null;
    } else {
      body = await request.json();
    }

    const { filter, sort, pagination } = body ?? {};

    const products = DataLoader.getProducts();
    const queryEngine = new ProductQueryEngine(products);
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
    console.error("Error processing products query:", error);
    return NextResponse.json(
      { error: "Failed to process products query" },
      { status: 500 }
    );
  }
}
