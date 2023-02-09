import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

// eslint-disable-next-line @typescript-eslint/no-redeclare
type Rank = {
  id: string;
  userName: string;
  repo: string;
  follow: string;
  following: string;
  company: string;
  location: string;
  blog: string;
  mail: string;
  language: string;
  image: string;
  followers: number;
  stars: number;
  contribution: number;
  total: number;
};
interface Props {
  // setUser: React.Dispatch<React.SetStateAction<Rank[]>>;
  user: Rank[];
}

function CompareBarGraph(props: Props) {
  const graph = [...props.user];
  return (
    <>
      {graph.map(
        ({
          id,
          language,
          userName,
          total,
          image,
          contribution,
          followers,
          stars,
        }) => {
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
                      y: followers,
                      goals: [
                        {
                          name: 'Average',
                          value: stars,
                          strokeWidth: 5,
                          strokeHeight: 12,
                          strokeColor: '#775DD0',
                        },
                        {
                          name: '최고점수',
                          value: total,
                          strokeWidth: 10,
                          strokeHeight: 0,
                          strokeLineCap: 'round',
                          strokeColor: 'white',
                        },
                      ],
                    },
                    {
                      x: '나의 점수',
                      y: followers,
                      goals: [
                        {
                          name: 'Average',
                          value: stars,
                          strokeWidth: 5,
                          strokeHeight: 12,
                          strokeColor: '#775DD0',
                        },
                        {
                          name: '최고점수',
                          value: total,
                          strokeWidth: 10,
                          strokeHeight: 0,
                          strokeLineCap: 'round',
                          strokeColor: 'white',
                        },
                      ],
                    },
                    {
                      x: '나의 점수',
                      y: followers,
                      goals: [
                        {
                          name: 'Average',
                          value: stars,
                          strokeWidth: 5,
                          strokeHeight: 12,
                          strokeColor: '#775DD0',
                        },
                        {
                          name: '최고점수',
                          value: total,
                          strokeWidth: 10,
                          strokeHeight: 0,
                          strokeLineCap: 'round',
                          strokeColor: 'white',
                        },
                      ],
                    },
                    {
                      x: '나의 점수',
                      y: followers,
                      goals: [
                        {
                          name: 'Average',
                          value: stars,
                          strokeWidth: 5,
                          strokeHeight: 12,
                          strokeColor: '#775DD0',
                        },
                        {
                          name: '최고점수',
                          value: total,
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
              width={700}
              height={260}
            />
          );
        }
      )}
    </>
  );
}

export default CompareBarGraph;
