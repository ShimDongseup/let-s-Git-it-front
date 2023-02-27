import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

// eslint-disable-next-line @typescript-eslint/no-redeclare
type Compare = {
  firstUser: {
    rankerDetail: {
      rankerName: string;
      curiosityScore: string;
      passionScore: string;
      fameScore: string;
      abilityScore: string;
    };
  };
  secondUser: {
    rankerDetail: {
      rankerName: string;
      curiosityScore: string;
      passionScore: string;
      fameScore: string;
      abilityScore: string;
    };
  };
};
interface Props {
  compareRadarGraph: Compare[];
}

function RadarGraph(props: Props) {
  // eslint-disable-next-line react/destructuring-assignment
  const copyList = [...props.compareRadarGraph];
  return (
    <>
      {copyList.map(({ firstUser, secondUser }) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <ReactApexChart
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
              legend: {
                position: 'top',
                horizontalAlign: 'center',
              },
            }}
            // eslint-disable-next-line react/destructuring-assignment
            series={[
              {
                name: firstUser.rankerDetail.rankerName,
                data: [
                  Number(firstUser.rankerDetail.curiosityScore),
                  Number(firstUser.rankerDetail.passionScore),
                  Number(firstUser.rankerDetail.fameScore),
                  Number(firstUser.rankerDetail.abilityScore),
                ],
                color: '#ef6062',
              },
              {
                name: secondUser.rankerDetail.rankerName,
                data: [
                  Number(secondUser.rankerDetail.curiosityScore),
                  Number(secondUser.rankerDetail.passionScore),
                  Number(secondUser.rankerDetail.fameScore),
                  Number(secondUser.rankerDetail.abilityScore),
                ],
                color: '#7272eb',
              },
            ]}
            type="radar"
            width={window.screen.width > 480 ? 500 : 450}
            height={300}
          />
        );
      })}
    </>
  );
}

export default RadarGraph;
