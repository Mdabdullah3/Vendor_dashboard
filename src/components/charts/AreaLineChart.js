import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Filler, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Filler, CategoryScale);

const AreaLineChart = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Sales',
                data: [30, 50, 40, 60, 70, 90],
                fill: true,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.4, // Smooth curve
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Months',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Sales',
                },
            },
        },
    };

    return (
        <div className="chart-container" style={{ width: '100%', margin: '0 auto', padding: '20px' }}>
            <Line data={data} options={options} />
        </div>
    );
};

export default AreaLineChart;
