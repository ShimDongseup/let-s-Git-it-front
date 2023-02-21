import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

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
  // setUser: React.Dispatch<React.SetStateAction<Rank[]>>;
  compareStickGraph: Compare[];
}

function BarGraph(props: Props) {
  const bar = [...props.compareStickGraph];
  return (
    <>
      {bar.map(({ firstUser, secondUser }) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <ReactApexChart
            // eslint-disable-next-line react/destructuring-assignment
            options={{
              chart: {
                type: 'bar',
                height: 350,
                stacked: true,
                stackType: '100%',
                toolbar: { show: false },
              },
              plotOptions: {
                bar: {
                  horizontal: true,
                },
              },
              stroke: {
                width: 1,
                colors: ['tranparents'],
              },
              title: {
                text: undefined,
              },
              xaxis: {
                categories: ['호기심', '열정', '명성', '능력'],
              },
              tooltip: {
                y: {
                  formatter: function (val) {
                    return val + '점';
                  },
                },
              },
              fill: {
                opacity: 1,
                colors: ['#ef6062', '#7272eb'],
              },
              legend: {
                position: 'top',
                horizontalAlign: 'left',
                offsetX: 40,
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
            type="bar"
            width={500}
            height={300}
          />
        );
      })}
    </>
  );
}

export default BarGraph;
