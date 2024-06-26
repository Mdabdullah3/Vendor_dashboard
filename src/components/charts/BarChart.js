import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

const BarChart = () => {
    const data = {
        labels: ['32', '44', '34', '65', '33', '25'],
        datasets: [
            {
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                enabled: false,
            },
        },
        scales: {
            x: {
                display: false, // Hide the X-axis
            },
            y: {
                display: false, // Hide the Y-axis
                beginAtZero: false,
            },
        },
    };

    return (
        <div className="chart-container" style={{ width: '100%', margin: '0 auto', padding: '20px' }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;
