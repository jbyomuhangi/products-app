import { useRef } from "react";

const useValueRef = <T extends Record<string, any>>(value: T) => {
  const valueRef = useRef<T>(value);
  valueRef.current = value;

  return valueRef;
};

export default useValueRef;
