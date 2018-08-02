#include <iostream>
#include <math.h>

#define N 10
#define E 2.71828182845904523536
using namespace std;

int main()
{
  double train[5][2] = {{1.0 ,1.0}, {2.0,4.0}, {3.0,6.0}, {4.0,16.0}, {5.0,25.0}};
  double net1[N], weightL01[N*2+2], weightL12[N+1], onet1[N], net2, onet2;
  double er, alpha1, alpha2[N+1], rate = 0.5;
  int trainVal = 0;

  //init value for weight
  for (int i = 0; i < N*2+2; i++)
  {
    weightL01[i] = 1;
    weightL12[i] = 1;
  }

  while(true)
  {
    for (int i = 0; i < N; i++)
    {
      net1[i] =  weightL01[i + N] + weightL01[i]*train[trainVal][1];
      onet1[i] = 1/(1+pow(E,net1[i]));
    }
    net2 = weightL12[0];
    for (int i = 0; i < N; i++)
    {
      net2 += weightL12[i+1];
    }
    onet2 = 1/(1+pow(E,net2));

    er = 0.5 * pow((onet2 - train[trainVal][2]), 2);

    alpha1 = -(train[trainVal][2] - onet2)*onet2*(1 - onet2);

    weightL12[0] -= rate*alpha1*1;
    for (int i = 0; i < N; i++)
    {
      weightL12[i+1] -= rate*alpha1*outnet1[i];
    }
    alpha2[0] =


    trainVal = (trainVal + 1)%5;
  }
}
