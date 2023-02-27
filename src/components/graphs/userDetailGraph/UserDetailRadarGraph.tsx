import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

// eslint-disable-next-line @typescript-eslint/no-redeclare
type UserRadar = {
  rankerDetail: {
    rankerId: string;
    RankerProfile_name: string;
    curiosityScore: string;
    passionScore: string;
    fameScore: string;
    abilityScore: string;
  };
};
interface Props {
  // setUser: React.Dispatch<React.SetStateAction<Rank[]>>;
  radarGraph: UserRadar[];
}

function RadarGraph(props: Props) {
  const radar = [...props.radarGraph];
  return (
    <>
      {radar.map(({ rankerDetail }) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <ReactApexChart
            key={rankerDetail.rankerId}
            // eslint-disable-next-line react/destructuring-assignment
            options={{
              // tooltip: { enabled: true },
              chart: {
                toolbar: { show: false },
                // id: id,
                animations: {
                  enabled: true,
                  easing: 'easeinout',
                  speed: 1000,
                  animateGradually: {
                    enabled: true,
                    delay: 1000,
                  },
                  dynamicAnimation: {
                    enabled: true,
                    speed: 1000,
                  },
                },
                height: 300,
                type: 'radar',
                dropShadow: {
                  enabled: true,
                  blur: 1,
                  left: 1,
                  top: 1,
                },
              },
              title: {},
              stroke: {
                width: 2,
              },
              fill: {
                opacity: 0,
              },
              markers: {
                size: 0,
              },
              dataLabels: { style: { fontSize: '10px' }, enabled: true },
              xaxis: {
                categories: ['호기심', '열정', '명성', '능력'],
              },
            }}
            // eslint-disable-next-line react/destructuring-assignment
            series={[
              {
                name: rankerDetail.RankerProfile_name,
                data: [
                  Number(rankerDetail.curiosityScore),
                  Number(rankerDetail.passionScore),
                  Number(rankerDetail.fameScore),
                  Number(rankerDetail.abilityScore),
                ],
                color: '#ef6062',
              },
            ]}
            type="radar"
            height={300}
          />
        );
      })}
    </>
  );
}

export default RadarGraph;
