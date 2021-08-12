import React from 'react'
import { CashIcon, CloseIcon, LeroyMerlinIcon, MadeiraMadeiraIcon, TransferIcon } from '@assets/images'
import OutsideClickAlerter from '@utils/hooks'
import { formatCurrency } from '@utils/functions'
import dateUtils from '@utils/date'

function getChannelIcon(channel: string) {
    if (channel === 'Leroy Merlin') return <LeroyMerlinIcon />
    else if (channel === 'Madeira Madeira') return <MadeiraMadeiraIcon />
    else return <CashIcon />
}

function groupByDate(data) {
    const arr: any = {}

    data.map(item => {
        const date = item.date.split(' ')[0]
        if (!(date in arr)) arr[date] = []
        arr[date].push(item)
        return null
    })

    const result = {}

    Object.keys(arr).map(key =>
        result[key] = arr[key].reduce((pv, cv) => pv + parseFloat(cv.value), 0)
    )

    return result
}

const TransferDetails = ({ channel, data }) => {
    const [showData, setShowData] = React.useState(false)

    function toggleTransferData() {
        setShowData(!showData)
    }

    const groupedByDate: Record<string, any> = groupByDate(data)
    const totalValue = Object.values(groupedByDate).reduce((pv: number, cv: number) => pv + cv, 0)

    return (
        <div className='transfer-item'>
            <div className="channel">
                {getChannelIcon(channel)}

                <span className="item">
                    {channel}
                    {' (R$' + formatCurrency(totalValue) + ')'}
                    <TransferIcon onClick={toggleTransferData} />
                </span>
            </div>

            <OutsideClickAlerter
                onClickOutside={toggleTransferData}
                open={showData}
            >
                <div
                    className='transfer-details'
                    style={{
                        visibility: showData ? 'visible' : 'hidden',
                        opacity: showData ? 1 : 0
                    }}
                >
                    <div className="transfer-title">
                        {getChannelIcon(channel)}
                        Repasses da {channel}
                        <CloseIcon
                            className='close-icon'
                            onClick={toggleTransferData}
                        />
                    </div>

                    <div className="table">
                        <div className="transfer-header">
                            <span>Data</span>
                            <span>Valor (R$)</span>
                        </div>

                        <div className="transfer-items">
                            {Object.keys(groupedByDate).map(key =>
                                <div key={key} className="item">
                                    <span className='name'>
                                        {dateUtils.format(key, 'dd/MM/yyyy')}
                                    </span>

                                    <span className='value'>
                                        {formatCurrency(groupedByDate[key])}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="transfer-footer">
                            <span>Saldo Final</span>
                            <span>{formatCurrency(totalValue?.toString())}</span>
                        </div>
                    </div>
                </div>
            </OutsideClickAlerter>
        </div>
    )
}
export default TransferDetails