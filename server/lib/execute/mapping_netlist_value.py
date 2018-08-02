class MappingNetlistValue:
    argList = {}

    def __init__(self, netlist):
        comps = netlist.split("\n")
        for comp in comps:
            self.mapping_component_value(comp)

    def get_arg_list(self):
        return self.argList

    def mapping_component_value(self, comp):
        args = comp.split(" ")
        if args[0] == "Vg":
            label = "Vg" + args[1]
            self.argList[label] = {}
            self.argList[label]["pos1"] = args[2]
            self.argList[label]["pos2"] = args[3]
            self.argList[label]["timeDelay"] = args[4]
            self.argList[label]["riseTime"] = args[5]
            self.argList[label]["fallTime"] = args[6]
            self.argList[label]["pulseWidth"] = args[7]
            self.argList[label]["pulseAmplitude"] = args[8]
        elif args[0] == "R":
            label = "R" + args[1]
            self.argList[label] = {}
            self.argList[label]["pos1"] = args[2]
            self.argList[label]["pos2"] = args[3]
            self.argList[label]["resistance"] = args[4]
        elif args[0] == "Rt":
            label = "Rt" + args[1]
            self.argList[label] = {}
            self.argList[label]["pos1"] = args[2]
            self.argList[label]["pos2"] = args[3]
            self.argList[label]["resistance"] = args[4]
            self.argList[label]["timeFly"] = args[5]
        else:
            pass

if __name__ == "__main__":
    mapNetlistVal = MappingNetlistValue("Vg 0 0 1 1 1 1 20 4\nR 0 1 2 1000\nR 1 3 0 1000\nRt 0 2 3 1000 2.37 ")
    print mapNetlistVal.get_arg_list()
