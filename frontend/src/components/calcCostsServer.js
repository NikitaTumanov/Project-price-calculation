import axios from "axios";

export function calcCostsServer(props) {
    axios.post(`http://localhost:8081/`,props.data)
        .then(res => {
            props.set_chart_data(
                {
                    labels: Array.from(Array(res.data.days+2).keys()),
                    datasets: [
                        {
                            label: 'Dataset 1',
                            data: res.data.cost,
                            borderColor: '#a855f7',
                            backgroundColor: '#581c87',
                        },
                    ],
                }
            )
            props.set_days_left(
                res.data.days
            )
            props.set_total_cost(
                res.data.total_cost
            )
        })
}