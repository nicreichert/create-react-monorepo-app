export const sortObject = (obj?: object) => {
  if (!obj) {
    return obj;
  }

  const keys = Object.keys(obj);
  keys.sort();

  return keys.reduce(
    (acc, key) => ({
      ...acc,
      [key]: obj[key],
    }),
    {}
  );
};
