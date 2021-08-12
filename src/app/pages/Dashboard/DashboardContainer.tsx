import api from '@services/api';
import React from 'react';
import DashboardView from './DashboardView';

export interface IDashboardViewProps {
    onFilterChange: ({ month, year }) => void;
    paymentData: any;
    fetchingData: boolean
}

function groupByCode(items: any[]) {
    const data: any = {}

    items.map(item => item.payments
        .filter(entry => entry)
        .map(
            entry => {
                const code = entry.code
                if (!(code in data)) data[code] = []
                data[code].push(entry)
                return null
            }
        ))

    return data
}

function groupByChannel(deposits: any[]) {
    const data: any = {}

    deposits?.map(item => {
        const channel = item.channel
        if (!(channel in data)) data[channel] = []
        data[channel].push(item)
        return null
    })

    return data
}

function parseData(paymentData) {
    if (!paymentData[0]) return {}

    const { Total: total, List: list } = paymentData[0]

    const groupedByCode = groupByCode(list)
    const groupedByChannel = groupByChannel(groupedByCode?.deposits)

    return {
        total,
        groupedByCode,
        groupedByChannel
    }
}

const DashboardContainer = () => {
    const [paymentData, setPaymentData] = React.useState({})
    const [fetchingData, setFetchingData] = React.useState(false)

    async function getPaymentData(props) {
        const { month, year } = props
        const dateStart = `${year}-${month}-01`
        const dateEnd = `${year}-${month}-31`
        const query = `date_start=${dateStart}&date_end=${dateEnd}`

        setFetchingData(true)
        const res: any = await api('payments?' + query)
        setFetchingData(false)

        if (res.error) return window.alert(res.error)

        if (res.data) setPaymentData(res.data)
    }

    const passProps: IDashboardViewProps = {
        onFilterChange: getPaymentData,
        paymentData: parseData(paymentData),
        fetchingData
    }

    return <DashboardView {...passProps} />
}

export default DashboardContainer;
