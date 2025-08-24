import { NextRequest, NextResponse } from "next/server";

import {
  AttributeApiData,
  AttributeApiResponse,
} from "@/app/api/types/attribute";
import {
  InternalQueryFilter,
  InternalQuerySort,
} from "@/app/api/types/query-engine/common";
import { DataLoader } from "@/app/api/utils/dataLoader";
import { SupplierAttributeQueryEngine } from "@/app/api/utils/query-engine/attributes";
import isInteger from "@/utils/validationUtils/isNumber";

export const GET = async (request: NextRequest) => {
  try {
    /** Extract and parse search params */
    const { searchParams } = new URL(request.url);
    const offset = searchParams.get("offset");
    const limit = searchParams.get("limit");
    const orderBy = searchParams.get("orderBy");
    const group = searchParams.get("group");
    const type = searchParams.get("type");

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

      if (group) returnObj.group = { $eq: group };
      if (type) returnObj.type = { $eq: type };

      return returnObj;
    })();

    const attributes = DataLoader.getAttributes();
    const queryEngine = new SupplierAttributeQueryEngine(attributes);
    const result = await queryEngine.query({
      sort,
      filter,
      pagination: {
        offset: parsedOffset as number,
        limit: parsedLimit as number,
      },
    });

    /** Remove any unneeded data from result we send */
    const results: AttributeApiData[] = result.data.map((attribute) => {
      return {
        id: attribute.id,
        createdAt: attribute.createdAt,
        updatedAt: attribute.updatedAt,
        type: attribute.type,
        name: attribute.name,
        group: attribute.group,
        description: attribute.description,
      };
    });

    const responseData: AttributeApiResponse = {
      data: {
        results,
        pagination: result.pagination,
        total: result.total,
      },
      error: undefined,
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Error processing attributes query:", error);

    const responseData: AttributeApiResponse = {
      data: undefined,
      error: { message: "Failed to process products query" },
    };

    return NextResponse.json(responseData, { status: 500 });
  }
};
