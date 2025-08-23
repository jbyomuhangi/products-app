/**
 * Fixed types
 * If you need to modify these, please state your reasons in the SUBMISSION.md file.
 */

import { InternalQueryPagination } from "./query-engine/common";

export type ProductAttributeValue = string | object | string[] | number | null;

export interface ProductAttribute {
  key: string;
  value: ProductAttributeValue;
}

export interface Product {
  id: string;
  skuId: string;
  updatedAt: number;
  createdAt: number;
  attributes: ProductAttribute[];
}

export interface ProductApiData {
  id: string;
  skuId: string;
  updatedAt: number;
  createdAt: number;
}

interface ProductApiResponseData {
  data: {
    results: ProductApiData[];
    pagination: InternalQueryPagination;
    total: number;
  };
  error: undefined;
}

interface ProductApiResponseError {
  data: undefined;
  error: { message: string };
}

export type ProductApiResponse =
  | ProductApiResponseData
  | ProductApiResponseError;
