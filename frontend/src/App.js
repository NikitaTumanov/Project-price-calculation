import './styles/App.css';
import { useState } from "react";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from "chart.js";
import { CostChart } from "./components/CostChart";
import { calcCostsServer } from "./components/calcCostsServer";
import { ChartModal } from "./components/ChartModal";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function App() {
    const [totalWorkTime, setTotalWorkTime] = useState(0);
    const [totalWorkAmount, settotalWorkAmount] = useState(0);
    const [teamEfficiency, setteamEfficiency] = useState(0);
    const [outsourceEfficiency, setoutsourceEfficiency] = useState(0);
    const [teamPrice, setteamPrice] = useState(0);
    const [outsourcePrice, setoutsourcePrice] = useState(0);
    const [penalty, setpenalty] = useState(0);
    const [outsourceDay, setoutsourceDay] = useState(0);

    const [days, setDays] = useState(0);
    const [total_cost, setTotalCost] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [chartReference, options] = CostChart()
    const [chartData, setChartData] = useState({
        labels: Array.from(Array(15).keys()),
        datasets: [
            {
                label: 'Dataset 1',
                data: [],
                borderColor: '#a855f7',
                backgroundColor: '#581c87',
            },
        ],
    });

    return (
        <div className="App">
            <div className="main_block">
                <h1>Рассчет стомости проекта</h1>

                <label for="1">Дедлайн сдачи проекта (день)</label>
                <input id="1" onChange={e => setTotalWorkTime(e.target.value)} />
                <label for="2">Кол-во работы (ч/ч)</label>
                <input id="2" onChange={e => settotalWorkAmount(e.target.value)} />
                <label for="3">Эффективность команды разработки (чч/д)</label>
                <input id="3" onChange={e => setteamEfficiency(e.target.value)} />
                <label for="4">Эффективность аутсорса (чч/д)</label>
                <input id="4" onChange={e => setoutsourceEfficiency(e.target.value)} />
                <label for="5">Стоимость команды разработки (за день)</label>
                <input id="5" onChange={e => setteamPrice(e.target.value)} />
                <label for="6">Стоимость команды аутсорса (за день)</label>
                <input id="6" onChange={e => setoutsourcePrice(e.target.value)} />
                <label for="7">Штраф за просрачивание дедлайна (руб/день)</label>
                <input id="7" onChange={e => setpenalty(e.target.value)} />
                <label for="8">День начала работы аутсорса</label>
                <input id="8" onChange={e => setoutsourceDay(e.target.value)} />

                <button
                    onClick={() => {
                        setShowModal(true);
                        calcCostsServer({
                            data: {
                                totalWorkTime,
                                totalWorkAmount,
                                teamEfficiency,
                                teamPrice,
                                outsourceEfficiency,
                                outsourceDay,
                                outsourcePrice,
                                penalty,
                                days: days
                            },
                            set_chart_data: setChartData,
                            set_days_left: setDays,
                            set_total_cost: setTotalCost
                        });
                    }}
                >
                    Рассчитать
                </button>
            </div>
            <ChartModal showModal={showModal}
                setShowModal={setShowModal}
                chartReference={chartReference}
                options={options}
                days={days}
                total_cost={total_cost}
                chartData={chartData} />
        </div>
    );
}

export default App;
