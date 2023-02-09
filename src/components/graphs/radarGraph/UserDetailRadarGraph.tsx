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

function RadarGraph(props: Props) {
  const copyList = [...props.user];
  return (
    <>
      {copyList.map(
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
                // tooltip: { enabled: true },
                chart: {
                  toolbar: { show: false },
                  id: id,
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
                    enabled: false,
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
                  name: userName,
                  data: [stars, followers, contribution, total],
                  color: '#ef6062',
                },
                {
                  name: userName,
                  data: [null, null, null, null],
                  color: '#7272eb',
                },
              ]}
              type="radar"
              height={300}
            />
          );
        }
      )}
    </>
  );
}

export default RadarGraph;
