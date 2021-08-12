import { CashIcon } from '@assets/images'
import Loading from '@components/Loading'
import TransferDetails from './TransferDetails'

const PerformanceCardTwo = ({ fetchingData, data }) => {
    const {
        total,
        groupedByCode,
        groupedByChannel = {}
    } = data || {}

    const {
        withdrawals_total = '0',
        comissions = '0',
        anticipations = '0',
        mkt_delivery_service = '0',
        refundeds = '0',
    } = total || {}

    return (
        <div className='card performance-card-two'>
            <div className="title">
                Repasses
            </div>

            <div className="card-content">
                <div className="total">
                    <CashIcon className='cash-icon' />
                    {total?.total}
                    <div className="text">Total líquido (R$)</div>
                </div>

                <div className="transfers">
                    {Object.keys(groupedByChannel).map(channel =>
                        <TransferDetails
                            key={channel}
                            channel={channel}
                            data={groupedByChannel[channel]}
                        />
                    )}
                </div>

                <div className="separator" />

                <div className="stats">
                    {[
                        {
                            label: 'Retiradas (R$)',
                            value: withdrawals_total.replace('-', '')
                        },
                        {
                            label: 'Comissões (R$)',
                            value: comissions
                        },
                        {
                            label: 'Antecipações (R$)',
                            value: anticipations.replace('-', '')
                        },
                        {
                            label: 'Frete do marketplace (R$)',
                            value: mkt_delivery_service
                        },
                        {
                            label: 'Pagamentos totais (R$)',
                            value: withdrawals_total.replace('-', '')
                        },
                        {
                            label: 'Devoluções e cancelamentos (R$)',
                            value: refundeds
                        },
                    ].map((item, index) =>
                        <div
                            key={index}
                            className={"stat " + (index % 2 !== 0 ? 'right' : 'left')}
                        >
                            <div className="value">{item.value}</div>
                            <div className="label">{item.label}</div>
                        </div>
                    )}
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
export default PerformanceCardTwo