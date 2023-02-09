import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

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
    r_fame_repository_watched_number: number;
    sponsorNumber: number;
    contributingRepoStarNumber: number;
    myStarNumber: number;
  };
};
interface Props {
  // setUser: React.Dispatch<React.SetStateAction<Rank[]>>;
  stickGraph: Stick[];
}

function BarGraph(props: Props) {
  return (
    <ReactApexChart
      // eslint-disable-next-line react/destructuring-assignment
      options={{
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          stackType: '100%',
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
          categories: ['commit', 2009, 2010, 2011],
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + 'K';
            },
          },
        },
        fill: {
          opacity: 1,
          colors: ['#7272eb', '#ef6062'],
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
          name: 'user1',
          data: [44, 55, 41, 37],
        },
        {
          name: 'user2',
          data: [53, 32, 33, 52],
        },
      ]}
      type="bar"
      width={500}
      height={300}
    />
  );
}

export default BarGraph;
