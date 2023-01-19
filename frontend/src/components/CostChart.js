import React from "react";

export function CostChart() {
    const chartReference = React.createRef();
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'center',
            },
            title: {
                display: true,
                font:{
                    size: 20,
                    style: "bold"
                },
                padding:{
                    bottom: 35
                },
                text: 'График изменения ежедневной стоимости проекта',
            },
            layout: {
                padding: 20
            }
        },
    };
    return [chartReference, options]
}