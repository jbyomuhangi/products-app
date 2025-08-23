import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useCallback, useMemo } from "react";

import useValueRef from "./useValueRef";

const useSearchParamsMap = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const params = useMemo(() => {
    return Object.fromEntries(searchParams);
  }, [searchParams]);

  const valueRefs = useValueRef({
    params,
    router,
    pathname,
  });

  const handleUpdateSearchParams = useCallback(
    ({
      newParams,
      shouldReplace,
    }: {
      newParams: Record<string, string>;
      shouldReplace?: boolean;
    }) => {
      const { params, router, pathname } = valueRefs.current;

      const newSearchParams = new URLSearchParams();
      const finalParams = shouldReplace
        ? newParams
        : { ...params, ...newParams };

      Object.entries(finalParams).forEach(([key, value]) => {
        if (finalParams[key] !== null && finalParams[key] !== undefined) {
          newSearchParams.set(key, value);
        }
      });

      const searchString = newSearchParams.toString();

      if (searchString) {
        router.push(`${pathname}?${newSearchParams.toString()}`);
      } else {
        router.push(pathname);
      }
    },
    [valueRefs]
  );

  return { params, handleUpdateSearchParams };
};

export default useSearchParamsMap;
