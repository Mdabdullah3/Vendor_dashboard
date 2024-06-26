import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
    const data = {
        labels: ['Shoes', 'Gaming', 'Others'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // Define additional information to be displayed in the legend
    const additionalInfo = ['$2323', '$4567', '$789'];

    const options = {
        responsive: true,
        borderWidth: 2,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    usePointStyle: true,
                    generateLabels: (chart) => {
                        const originalLabels = chart.data.labels;
                        const dataset = chart.data.datasets[0];
                        return originalLabels.map((label, index) => {
                            const value = dataset.data[index];
                            const info = additionalInfo[index];
                            return {
                                text: `${label} ${info}`,
                                fillStyle: dataset.backgroundColor[index],
                                hidden: chart.getDatasetMeta(0).data[index].hidden,
                                lineCap: 'butt',
                                lineDash: [],
                                lineDashOffset: 0,
                                lineJoin: 'miter',
                                lineWidth: 1,
                                strokeStyle: dataset.borderColor[index],
                                pointStyle: 'circle',
                            };
                        });
                    },
                },
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return <div style={{ width: '90%', margin: '0 auto', padding: '20px' }}>
        <Pie data={data} options={options} />
    </div>;
};

export default PieChart;
