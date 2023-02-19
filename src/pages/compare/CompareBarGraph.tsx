import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

type CompareStick = {
  firstUser: {
    rankerDetail: {
      rankerName: string;
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
  secondUser: {
    rankerDetail: {
      rankerName: string;
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
  // setUser: React.Dispatch<React.SetStateAction<Rank[]>>;
  compareStickGraph: CompareStick[];
}

function BarGraph(props: Props) {
  const bar = [...props.compareStickGraph];
  return (
    <>
      {bar.map(({ firstUser, secondUser, legendName, graphName }) => {
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
              categories: ['이슈넘버', '이슈넘버', '이슈넘버', '이슈넘버'],
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
              name: firstUser.rankerDetail.rankerName,
              data: [
                firstUser.rankerDetail.issueNumber,
                firstUser.rankerDetail.forkingNumber,
                firstUser.rankerDetail.starringNumber,
                firstUser.rankerDetail.followingNumber,
              ],
            },
            {
              name: secondUser.rankerDetail.rankerName,
              data: [53, 32, 33, 52],
            },
          ]}
          type="bar"
          width={500}
          height={300}
        />;
      })}
    </>
  );
}

export default BarGraph;
