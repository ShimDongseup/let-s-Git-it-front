import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

// eslint-disable-next-line @typescript-eslint/no-redeclare

type Stick = {
  rankerDetail: {
    issueNumber: number;
    forkingNumber: number;
    starringNumber: number;
    followingNumber: number;
    commitNumber: number;
    prNumber: number;
    reviewNumber: number;
    personalRepoNumber: number;
    followerNumber: number;
    forkedNumber: number;
    watchedNumber: number;
    sponsorNumber: number;
    contributingRepoStarNumber: number;
    myStarNumber: number;
  };
};
interface Props {
  // setUser: React.Dispatch<React.SetStateAction<Rank[]>>;
  stickGraph: Stick[];
}

function CompareBarGraph(props: Props) {
  const graph = [...props.stickGraph];
  return (
    <>
      {graph.map(({ rankerDetail }) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <ReactApexChart
            // eslint-disable-next-line react/destructuring-assignment
            options={{
              chart: {
                toolbar: { show: false },
                type: 'bar',
                height: 260,
                stacked: true,
                //   stackType: '100%',
              },
              plotOptions: {
                bar: {
                  horizontal: true,
                },
              },
              stroke: {
                width: 5,
                colors: ['#fff'],
              },
              title: {
                text: undefined,
              },
              xaxis: {
                categories: [
                  // String(rankerDetail.issueNumber),
                  'issue',
                  'forked repos',
                  'stared repos',
                  'following',
                ],
                labels: {
                  formatter: function (val) {
                    return val + '개';
                  },
                },
              },
              yaxis: {
                title: {
                  text: undefined,
                },
              },
              tooltip: {
                y: {
                  formatter: function (val) {
                    return val + '개';
                  },
                },
              },
              fill: {
                opacity: 1,
              },
              // legend: {
              //   show: true,
              //   showForSingleSeries: true,
              //   customLegendItems: ['유저 평균', '나의 점수', '최고점'],
              //   markers: {
              //     fillColors: ['#00E396', '#775DD0', '#feb019'],
              //   },
              // },
            }}
            // eslint-disable-next-line react/destructuring-assignment
            series={[
              {
                name: 'Actual',
                data: [
                  {
                    x: '나의 점수',
                    y: rankerDetail.issueNumber,
                    goals: [
                      {
                        name: 'Average',
                        value: 100,
                        strokeWidth: 5,
                        strokeHeight: 12,
                        strokeColor: '#775DD0',
                      },
                      {
                        name: '최고점수',
                        value: 100,
                        strokeWidth: 10,
                        strokeHeight: 0,
                        strokeLineCap: 'round',
                        strokeColor: 'white',
                      },
                    ],
                  },
                  {
                    x: '나의 점수',
                    y: rankerDetail.forkingNumber,
                    goals: [
                      {
                        name: 'Average',
                        value: 100,
                        strokeWidth: 5,
                        strokeHeight: 12,
                        strokeColor: '#775DD0',
                      },
                      {
                        name: '최고점수',
                        value: 1200,
                        strokeWidth: 10,
                        strokeHeight: 0,
                        strokeLineCap: 'round',
                        strokeColor: 'white',
                      },
                    ],
                  },
                  {
                    x: '나의 점수',
                    y: rankerDetail.starringNumber,
                    goals: [
                      {
                        name: 'Average',
                        value: 100,
                        strokeWidth: 5,
                        strokeHeight: 12,
                        strokeColor: '#775DD0',
                      },
                      {
                        name: '최고점수',
                        value: 1200,
                        strokeWidth: 10,
                        strokeHeight: 0,
                        strokeLineCap: 'round',
                        strokeColor: 'white',
                      },
                    ],
                  },
                  {
                    x: '나의 점수',
                    y: rankerDetail.followingNumber,
                    goals: [
                      {
                        name: 'Average',
                        value: 100,
                        strokeWidth: 5,
                        strokeHeight: 12,
                        strokeColor: '#775DD0',
                      },
                      {
                        name: '최고점수',
                        value: 1200,
                        strokeWidth: 10,
                        strokeHeight: 0,
                        strokeLineCap: 'round',
                        strokeColor: 'white',
                      },
                    ],
                  },
                ],
              },
            ]}
            type="bar"
            width={650}
            height={250}
          />
        );
      })}
    </>
  );
}

export default CompareBarGraph;
