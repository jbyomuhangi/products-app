import { NextRequest, NextResponse } from "next/server";

import { ProductApiData, ProductApiResponse } from "@/app/types/product";
import { DataLoader } from "@/app/utils/dataLoader";
import { ProductQueryEngine } from "@/app/utils/query-engine/products";
import isInteger from "@/utils/validationUtils/isNumber";

export const GET = async (request: NextRequest) => {
  try {
    /** Extract and parse search params */
    const { searchParams } = new URL(request.url);
    const offset = searchParams.get("offset");
    const limit = searchParams.get("limit");

    const parsedOffset = offset ? parseInt(offset) : null;
    const parsedLimit = limit ? parseInt(limit) : null;

    /** Validate search params */
    if (!isInteger(parsedOffset) || !isInteger(parsedLimit)) {
      return NextResponse.json(
        { error: "Invalid offset or limit" },
        { status: 400 }
      );
    }

    const products = DataLoader.getProducts();
    const queryEngine = new ProductQueryEngine(products);
    const result = await queryEngine.query({
      pagination: {
        offset: parsedOffset as number,
        limit: parsedLimit as number,
      },
    });

    /** Remove any unneeded data from result we send */
    const results: ProductApiData[] = result.data.map((product) => {
      return {
        id: product.id,
        skuId: product.skuId,
        updatedAt: product.updatedAt,
        createdAt: product.createdAt,
      };
    });

    const responseData: ProductApiResponse = {
      data: { results, pagination: result.pagination, total: result.total },
      error: undefined,
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error processing products query:", error);

    const responseData: ProductApiResponse = {
      data: undefined,
      error: { message: "Failed to process products query" },
    };

    return NextResponse.json(responseData, { status: 500 });
  }
};
