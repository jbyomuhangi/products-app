import { NextRequest, NextResponse } from "next/server";

import { ProductApiData, ProductApiResponse } from "@/app/api/types/product";
import {
  InternalQueryFilter,
  InternalQuerySort,
} from "@/app/api/types/query-engine/common";
import { DataLoader } from "@/app/api/utils/dataLoader";
import { ProductQueryEngine } from "@/app/api/utils/query-engine/products";
import isInteger from "@/utils/validationUtils/isNumber";

export const GET = async (request: NextRequest) => {
  try {
    /** Extract and parse search params */
    const { searchParams } = new URL(request.url);
    const offset = searchParams.get("offset");
    const limit = searchParams.get("limit");
    const orderBy = searchParams.get("orderBy");
    const skuId = searchParams.get("skuId");

    const parsedOffset = offset ? parseInt(offset) : null;
    const parsedLimit = limit ? parseInt(limit) : null;

    /** Validate search params */
    if (!isInteger(parsedOffset) || !isInteger(parsedLimit)) {
      return NextResponse.json(
        { error: "Invalid offset or limit" },
        { status: 400 }
      );
    }

    const sort: InternalQuerySort | undefined = (() => {
      if (!orderBy) return undefined;

      const direction = orderBy[0] === "-" ? "DESC" : "ASC";
      const field = orderBy[0] === "-" ? orderBy.slice(1) : orderBy;
      return { field, order: direction };
    })();

    const filter = (() => {
      const returnObj: InternalQueryFilter = {};

      if (skuId) returnObj.skuId = { $regex: skuId };

      return returnObj;
    })();

    const products = DataLoader.getProducts();
    const queryEngine = new ProductQueryEngine(products);
    const result = await queryEngine.query({
      sort,
      filter,
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

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Error processing products query:", error);

    const responseData: ProductApiResponse = {
      data: undefined,
      error: { message: "Failed to process products query" },
    };

    return NextResponse.json(responseData, { status: 500 });
  }
};
