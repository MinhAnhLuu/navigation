export default {
  data: {
    nodes: []
  },
  functions: {
    stamp: (data, equation) => {
      const {
        editables: {
          SNPFile: {
            value: SNPFile
          }
        },
        nodes: [n1, n2]
      } = data;
    }
  }
};
