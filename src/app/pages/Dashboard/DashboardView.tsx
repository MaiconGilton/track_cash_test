import React from 'react';
import './dashboard.scss';
import FilterSelect from './components/FilterSelect'
import { IDashboardViewProps } from './DashboardContainer';
import PerformanceCardOne from './components/PerformanceCardOne';
import PerformanceCardTwo from './components/PerformanceCardTwo';

const DashboardView = (props: IDashboardViewProps) => {
    const {
        onFilterChange,
        paymentData,
        fetchingData
    } = props

    return (
        <div className='dashboard'>
            <div className='header'>
                <div>
                    <div className='title'>
                        Tabela de Recorrências de Pagamentos
                    </div>

                    <div className='subtitle'>
                        Página de Recorrências de pagamentos referentes ao mês selecionado
                    </div>
                </div>

                <FilterSelect onChange={onFilterChange} />
            </div>

            <div className='content'>
                <PerformanceCardOne
                    fetchingData={fetchingData}
                    data={paymentData}
                />

                <PerformanceCardTwo
                    fetchingData={fetchingData}
                    data={paymentData}
                />
            </div>
        </div>
    )
}

export default DashboardView;
