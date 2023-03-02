import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

// eslint-disable-next-line @typescript-eslint/no-redeclare

type Stick = {
  rankerDetail: {
    issueNumber: number;
    forkingNumber: number;
    starringNumber: number;
    followingNumber: number | null;
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
  graphName: {
    curiosity: string;
    passion: string;
    fame: string;
    ability: string;
  };
  legendName: {
    issueNumber: string;
    forkingNumber: string;
    starringNumber: string;
    followingNumber: any | null;
    commitNumber: string;
    prNumber: string;
    reviewNumber: string;
    personalRepoNumber: string;
    followerNumber: string;
    forkedNumber: string;
    watchedNumber: string;
    sponsorNumber: string;
    contributingRepoStarNumber: string;
    myStarNumber: string;
    blank: string;
  };
};
interface Props {
  stickGraph: Stick[];
}

function CompareBarGraph(props: Props) {
  const graph = [...props.stickGraph];
  return (
    <>
      {graph.map(({ rankerDetail, graphName, legendName }) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <ReactApexChart
            // eslint-disable-next-line react/destructuring-assignment
            options={{
              chart: {
                type: 'bar',
                width: 350,
                height: 100,
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
                colors: ['#fff'],
              },
              xaxis: {
                categories: [graphName.curiosity],
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
              legend: {
                position: 'top',
                horizontalAlign: 'left',
                offsetX: 40,
                showForNullSeries: true,
              },
            }}
            // eslint-disable-next-line react/destructuring-assignment
            series={[
              {
                name: legendName.issueNumber,
                data: [rankerDetail.issueNumber],
              },
              {
                name: legendName.forkingNumber,
                data: [rankerDetail.forkingNumber],
              },
              {
                name: legendName.starringNumber,
                data: [rankerDetail.starringNumber],
              },
              {
                name: legendName.followingNumber,
                data: [rankerDetail.followingNumber],
              },
            ]}
            type="bar"
            width={window.screen.width > 480 ? 650 : 390}
            height={window.screen.width > 480 ? 150 : 150}
          />
        );
      })}
    </>
  );
}

export default CompareBarGraph;
