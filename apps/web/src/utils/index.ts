export const debounce = (cb: (...args: any) => void, delay = 1000) => {
  let timeout: any;
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => cb(...args), delay);
  };
};

export const formatAddress = (address: string) => {
  return address
    .split(",")
    .filter((u) => !/.*ntico$|.*lombia$/gi.test(u.trim()))
    .join(", ");
};

export const formatNumber = (number: number, digits: number, unit: string) => {
  const res = parseFloat(number.toString());
  return (res !== 0 ? res.toFixed(digits) : "--") + " " + unit;
};
