from mapping_netlist_value import MappingNetlistValue
import sys
import json
import numpy as np

ele_argv = sys.argv
length_argv = len(ele_argv)

import numpy as np
#tparam = (tdelay, trise, tfall, twidth, T, ncycle)


def pulse_gen(tparam, Von):

    tdelay, trise, tfall, twidth, T, ncycle = tparam

    delt = min(trise, tfall) / 4.0  # (ns)time step
    t0 = 0.0
    t1 = tdelay  # t0 ---> t1: input = 0
    t2 = tdelay + trise  # t1 ---> t2: input = Vm*t/trise --- rising
    t3 = t2 + twidth  # t2 ---> t3: input = Vm --- constant
    t4 = t3 + tfall  # t3 ---> t4: input = -Vm*t/tfall --- falling
    t5 = t4 + tdelay  # t4 ---> t5: input = 0

    t = np.concatenate((np.arange(t0, t1, delt),
                        np.arange(t1 + delt, t2 + delt, delt),
                        np.arange(t2 + delt, t3 + delt, delt),
                        np.arange(t3 + delt, t4 + delt, delt),
                        np.arange(t4 + delt, t5 + delt, delt)),
                       axis=0)

    udelay = np.zeros(len(np.arange(0.0, tdelay, delt)))
    urise = Von / trise * np.arange(delt, trise + delt, delt)
    uon = Von * np.ones(len(np.arange(delt, twidth + delt, delt)))
    ufall = Von - Von / tfall * np.arange(delt, tfall + delt, delt)
    uecho = np.zeros(len(np.arange(delt, tdelay + delt, delt)))

    u = np.concatenate((udelay, urise, uon, ufall, uecho), axis=0)

    Vpulse = u
    tpulse = t

    return (Vpulse, tpulse, delt)


def near_far_lossless_TL(tfly, Z0, Zs, ZL, inputVt, trun, delt):
    # relf and trans coeff.
    gamma_L = (ZL - Z0) / (ZL + Z0)
    gamma_S = (Zs - Z0) / (Zs + Z0)
    tau_S = Z0 / (Z0 + Zs)

    # input voltage
    u, _ = inputVt

    u_num = int(np.ceil(trun / tfly))  # number of shifted version of u to add
    tpt_tot = int(np.ceil(trun / delt))  # total number of time points
    shiftpt = int(np.ceil(tfly / delt))  # number of time points to shift u

    uuwidth = (u_num - 1) * shiftpt + len(u)  # longest shifted version of u

    # each row is u, right shifted by multiple of shiftpt
    uu = np.zeros((u_num, uuwidth))

    for i in range(u_num):
        start = i * shiftpt
        stop = start + len(u)
        uu[i, start:stop] = u

    # truncated all shifted u within run time, in matlab, we just do uu(:,range_of_last_columns) = []
    uu_chop = np.delete(uu, np.s_[tpt_tot:], axis=1)

    tt = np.linspace(0, trun, tpt_tot)

    if tpt_tot < len(u):  # truncate input
        v_in = np.delete(u, np.s_[tpt_tot:])
    else:  # zero-pad input
        v_in = np.concatenate((u, np.zeros(tpt_tot - len(u))))

    # NEAR - FAR END VOLTAGE:

    v_far = np.zeros(tpt_tot)
    v_near = np.zeros(tpt_tot)
    n = 0
    while (2 * n + 3 < u_num):
        v_far = v_far + tau_S * gamma_S**n * \
            (1 + gamma_L) * gamma_L**n * uu_chop[2 * n + 2, :]
        v_near = v_near + tau_S * gamma_S**n * gamma_L**n * \
            (uu_chop[2 * n + 1, :] + gamma_L * uu_chop[2 * n + 3, :])
        n = n + 1

    return (v_in, v_near, v_far, tt)


if (length_argv != 2):
    print "Error. Losslesstl computing by netlist need 2 arguments."

else:
    mappingNetlistValue = MappingNetlistValue(ele_argv[1])
    argList = mappingNetlistValue.get_arg_list()
    trise = float(argList["Vg0"]["riseTime"])
    tfall = float(argList["Vg0"]["fallTime"])
    tdelay = float(argList["Vg0"]["timeDelay"])
    twidth = float(argList["Vg0"]["pulseWidth"])
    Vm = float(argList["Vg0"]["pulseAmplitude"])
    tfly = float(argList["Rt0"]["timeFly"])
    Z0 = float(argList["Rt0"]["resistance"])
    Zs = float(argList["R0"]["resistance"])
    Zl = float(argList["R1"]["resistance"])
    trun = 100.0

    tparam = (tdelay,trise,tfall,twidth,1,1)

    U,t,delt = pulse_gen(tparam, Vm)
    vin, vnear, vfar, tt = near_far_lossless_TL(tfly, Z0, Zs, Zl, (U,t), trun, delt)

    print json.dumps([
                        {
                            "name" : "vin",
                            "value" : map(lambda x: format(x, '.2f'), vin.tolist())
                        },
                        {
                            "name" : "vnear",
                            "value" : map(lambda x: format(x, '.2f'), vnear.tolist())
                        },
                        {
                            "name" : "vfar",
                            "value" : map(lambda x: format(x, '.2f'), vfar.tolist())
                        },
                        {
                            "name" : "tt",
                            "value" : map(lambda x: format(x, '.2f'), tt.tolist())
                        }
                    ])

sys.stdout.flush()
