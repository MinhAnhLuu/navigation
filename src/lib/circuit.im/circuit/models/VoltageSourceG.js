import { stampResistor} from '../equation';

export default {
  data: {
    nodes: []
  },
  functions: {
    stamp: (data, equation) => {
      const {
        editables: {
          timeDelay: {
            value: timeDelay
          },
          riseTime: {
            value: riseTime
          },
          fallTime: {
            value: fallTime
          },
          pulseWidth: {
            value: pulseWidth
          },
          pulseAmplitude: {
            value: pulseAmplitude
          }
        },
        nodes: [n1, n2]
      } = data;
    }
  }
};