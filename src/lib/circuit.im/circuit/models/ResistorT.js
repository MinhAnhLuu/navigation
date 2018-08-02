export default {
  data: {
    nodes: []
  },
  functions: {
    stamp: (data, equation) => {
      const {
        editables: {
          resistance: {
            value: resistance
          },
          timeFly: {
            value: timeFly
          }
        },
        nodes: [n1, n2]
      } = data;
    }
  }
};
