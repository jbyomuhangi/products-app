const isInteger = (value: unknown) => {
  const num = Number(value);
  return Number.isInteger(num);
};

export default isInteger;
