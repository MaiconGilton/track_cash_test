import { CashIcon, ListIcon } from '@assets/images';
import Loading from '@components/Loading';
import redux from '@store/actions';
import {
    ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';

type Tticket = {
    totalValue: number;
    numberOfSales: number;
}

const legendMap = {
    totalValue: 'Valor de Vendas',
    numberOfSales: 'Número de vendas'
}

function getSalesOfMonth(data) {
    const arr = {}

    data?.deposits?.map(item => {
        const day = parseInt(item.date.split(' ')[0].split('-')[2])
        const itemValue = parseFloat(item.value || 0)

        const totalValueLabel = legendMap['totalValue']
        const numberOfSalesLabel = legendMap['numberOfSales']

        if (day in arr) arr[day] = {
            [totalValueLabel]: arr[day][totalValueLabel] + itemValue / 1000,
            [numberOfSalesLabel]: arr[day][numberOfSalesLabel] + 1,
            day
        }
        else arr[day] = {
            [totalValueLabel]: itemValue / 1000,
            [numberOfSalesLabel]: 1,
            day
        }
    })

    return Object.values(arr);
}

const PerformanceCardOne = ({ fetchingData, data }) => {
    const selectedDate: Date = redux.getState('selectedDate') || new Date()
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0).getDate();
    const chartData = getSalesOfMonth(data.groupedByCode)
    const todayStats: any = data.groupedByCode?.deposits?.find((i: any) =>
        new Date(i.date.split(' ')[0]) === new Date()
    )

    const ticket = chartData.reduce((pv: any, cv: any) => {
        return {
            totalValue: pv.totalValue + cv[legendMap['totalValue']] * 1000,
            numberOfSales: pv.numberOfSales + cv[legendMap['numberOfSales']],
        }
    }, { totalValue: 0, numberOfSales: 0 }) as Tticket

    return (
        <div className='card performance-card-one'>
            <div className="title">
                Desempenho Mensal e Diário
            </div>

            <div className="card-content">
                <div className="chart-area">
                    <span className='label'>Quantidade</span>

                    <div className="chart-container">
                        <ResponsiveContainer
                            height={250}
                            className='line-chart'
                        >
                            <LineChart
                                data={chartData}
                                margin={{
                                    top: 20,
                                    right: 0,
                                    left: 0,
                                    bottom: -20
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis
                                    dataKey="day"
                                    type='number'
                                    allowDecimals={false}
                                    height={60}
                                    interval={1}
                                    domain={[1, daysInMonth]}
                                    tickCount={daysInMonth || 30}
                                />

                                <YAxis
                                    yAxisId="right"
                                    orientation="right"
                                    unit='K'
                                    allowDecimals={false}
                                />

                                <YAxis
                                    yAxisId="left"
                                    allowDecimals={false}
                                />

                                <Tooltip
                                    labelFormatter={(value) => 'Dia ' + value}
                                    formatter={(value, name, props) => {
                                        if (name === legendMap['totalValue'])
                                            return 'R$ ' + (value * 1000).toLocaleString('pt-BR')
                                        else return value
                                    }}
                                />

                                <Line
                                    type="monotone"
                                    dataKey={legendMap['totalValue']}
                                    stroke="#C94A21"
                                    yAxisId="right"
                                />

                                <Line
                                    type="monotone"
                                    yAxisId="left"
                                    dataKey={legendMap["numberOfSales"]}
                                    stroke="#2980B9"
                                />
                            </LineChart>
                        </ResponsiveContainer>

                        <div className="x-label">Dia do mês</div>

                        <div className="legend">
                            <div className="item">
                                <span className="square orange" />
                                <div className="text">Número de vendas</div>
                            </div>

                            <div className="item">
                                <span className="square blue" />
                                <div className="text">Valor de Vendas (R$)</div>
                            </div>
                        </div>
                    </div>

                    <span className='label value'>Valor</span>
                </div>

                <div className="stats">
                    <div className="item blue">
                        <ListIcon />
                        <div className="value">{0}</div>
                        <div className="label">Taxa de aprovação dos pedidos</div>
                    </div>

                    <div className="item green">
                        <CashIcon />
                        <div className="value">{(ticket.totalValue / ticket.numberOfSales).toFixed(2).replace(".", ",")}</div>
                        <div className="label">Valor médio do pedido (R$)</div>
                    </div>
                </div>

                <div className="separator" />

                <div className="stats">
                    <div className="item blue">
                        <ListIcon />
                        <div className="value">{todayStats?.numberOfSales || 0}</div>
                        <div className="label">Pedidos aprovados na data de hoje</div>
                    </div>

                    <div className="item green">
                        <CashIcon />
                        <div className="value">{todayStats?.totalValue * 1000 || 0}</div>
                        <div className="label">Total de vendas do dia (R$)</div>
                    </div>
                </div>
            </div>

            <Loading
                visible={fetchingData}
                size={90}
                text="Carregando"
            />
        </div>
    )
}
export default PerformanceCardOne