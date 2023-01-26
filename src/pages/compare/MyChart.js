import React from 'react';
import { Bar } from 'react-chartjs-2';

class MyChart extends React.Component {
  render() {
    const options = {
      legend: {
        display: false, // label 보이기 여부
      },
      scales: {
        yAxes: [
          {
            ticks: {
              min: 0, // y축 스케일에 대한 최소값 설정
              stepSize: 1, // y축 그리드 한 칸당 수치
            },
          },
        ],
      },

      // false : 사용자 정의 크기에 따라 그래프 크기가 결정됨.
      // true : 크기가 알아서 결정됨.
      maintainAspectRatio: false,
    };

    const data = {
      // 각 막대별 라벨
      labels: ['1번 막대', '2번 막대', '3번 막대'],
      datasets: [
        {
          borderWidth: 1, // 테두리 두께
          data: [1, 2, 3], // 수치
          backgroundColor: ['yellow', 'red', 'green'], // 각 막대 색
        },
      ],
    };
    console.log(1);
    return (
      <div style={{ width: 400 }}>
        <Bar data={data} options={options} height={300} />
      </div>
    );
  }
}

export default MyChart;
