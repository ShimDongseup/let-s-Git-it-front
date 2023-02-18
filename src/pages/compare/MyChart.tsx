import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

function RadarGraph() {
  return (
    <ReactApexChart
      // eslint-disable-next-line react/destructuring-assignment
      options={{
        chart: {
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
          name: 'user1',
          data: [800, 500, 300, 400],
          color: 'red',
        },
        {
          name: 'user2',
          data: [200, 300, 400, 800],
          color: 'blue',
        },
      ]}
      type="radar"
      height={300}
    />
  );
}

export default RadarGraph;
