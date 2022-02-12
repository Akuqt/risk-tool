export const genData = (v1: number, v2: number, v3: number) => {
  v1 = v1 < 0 ? -v1 : v1;
  v2 = v2 < 0 ? -v2 : v2;
  v3 = v3 < 0 ? -v3 : v3;

  return [
    {
      value: v1,
      svg: {
        fill: "#FF6347",
      },
      key: "slice-1",
      arc: {
        outerRadius: "100%",
      },
    },
    {
      value: v2,
      svg: {
        fill: "#bb3820",
      },
      key: "b",
      arc: {
        outerRadius: "80%",
      },
    },
    {
      value: v3,
      svg: {
        fill: "#808080",
      },
      key: "c",
      arc: {
        outerRadius: "90%",
      },
    },
  ];
};
