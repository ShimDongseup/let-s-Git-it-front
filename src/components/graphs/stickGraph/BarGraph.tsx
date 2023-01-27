import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

function BarGraph() {
  return (
    <ReactApexChart
      // eslint-disable-next-line react/destructuring-assignment
      options={{
        chart: {
          type: 'bar',
          height: 300,
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
          categories: ['issue', 'forked repos', 'stared repos', 'following'],
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
        legend: {
          show: true,
          showForSingleSeries: true,
          customLegendItems: ['유저 평균', '나의 점수', '최고점'],
          markers: {
            fillColors: ['#00E396', '#775DD0', '#feb019'],
          },
        },
      }}
      // eslint-disable-next-line react/destructuring-assignment
      series={[
        {
          name: 'Actual',
          data: [
            {
              x: '나의 점수',
              y: 200,
              goals: [
                {
                  name: 'Average',
                  value: 600,
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
              y: 44,
              goals: [
                {
                  name: 'Average',
                  value: 54,
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
              y: 54,
              goals: [
                {
                  name: 'Average',
                  value: 54,
                  strokeWidth: 5,
                  strokeHeight: 12,
                  strokeColor: '#775DD0',
                },
                {
                  name: '최고점수',
                  value: 80,
                  strokeWidth: 10,
                  strokeHeight: 0,
                  strokeLineCap: 'round',
                  strokeColor: 'white',
                },
              ],
            },
            {
              x: '나의 점수',
              y: 66,
              goals: [
                {
                  name: 'Average',
                  value: 70,
                  strokeWidth: 5,
                  strokeHeight: 12,
                  strokeColor: '#775DD0',
                },
                {
                  name: '최고점수',
                  value: 120,
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
      width={500}
      height={300}
    />
  );
}

export default BarGraph;
