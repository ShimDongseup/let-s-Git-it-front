import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

// eslint-disable-next-line @typescript-eslint/no-redeclare
type User = {
  rankerDetail: {
    rankerId: string;
    rankerName: string;
    personalRepoNumber: number;
    company: string;
    region: string;
    blog: string;
    email: string;
    profileImage: string;
    followingNumber: number;
    followerNumber: number;
    myStarNumber: number;
    mainLang: string;
    curiosityScore: string;
    passionScore: string;
    fameScore: string;
    abilityScore: string;
  };
};
interface Props {
  // setUser: React.Dispatch<React.SetStateAction<Rank[]>>;
  user: User[];
}

function RadarGraph(props: Props) {
  const copyList = [...props.user];
  return (
    <>
      {copyList.map(({ rankerDetail }) => {
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
                name: rankerDetail.rankerName,
                data: [
                  rankerDetail.followingNumber,
                  rankerDetail.followingNumber,
                  rankerDetail.followingNumber,
                  rankerDetail.followingNumber,
                ],
                color: '#ef6062',
              },
              {
                name: undefined,
                data: [null, null, null, null],
                color: '#7272eb',
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
