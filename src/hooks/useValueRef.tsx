import { useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useValueRef = <T extends Record<string, any>>(value: T) => {
  const valueRef = useRef<T>(value);
  valueRef.current = value;

  return valueRef;
};

export default useValueRef;
