import { CalendarIcon } from '@assets/images';
import redux from '@store/actions';
import OutsideClickAlerter from '@utils/hooks';
import React from 'react'

const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
]

function getYearsRange() {
    const currentYear = new Date().getFullYear()
    const years: number[] = [];
    let startYear = 1980;

    while (startYear <= currentYear) {
        years.push(startYear++);
    }
    return years;
}

const FilterSelect = ({ onChange }) => {
    const [showSelect, setShowSelect] = React.useState(false)
    const [selectedMonth, setSelectedMonth] = React.useState(new Date().getMonth())
    const [selectedYear, setSelectedYear] = React.useState(new Date().getFullYear())

    function onMonthChange(e) {
        setSelectedMonth(e.target.value);
    }

    function onYearChange(e) {
        setSelectedYear(e.target.value);
    }

    function toggleSelect() {
        setShowSelect(!showSelect);
    }

    React.useEffect(() => {
        onChange({
            month: selectedMonth < 10 ? `0${selectedMonth}` : selectedMonth,
            year: selectedYear
        })

        redux.saveState(
            'selectedDate',
            new Date(selectedYear, selectedMonth)
        )
    }, [selectedMonth, selectedYear])

    return (
        <div className='filter-select'>
            <OutsideClickAlerter
                onClickOutside={toggleSelect}
                open={showSelect}
            >
                <div
                    className='select'
                    style={{
                        visibility: showSelect ? 'visible' : 'hidden',
                        opacity: showSelect ? 1 : 0
                    }}
                >
                    <div className='text'>
                        Visualizar dados correspondentes ao mês de:
                    </div>

                    <div className='month-select'>
                        <span>Mês:</span>

                        <select
                            onChange={onMonthChange}
                            className='date-select'
                            value={selectedMonth}
                        >
                            {months.map((month, index) =>
                                <option
                                    key={month}
                                    value={index}
                                >
                                    {month}
                                </option>
                            )}
                        </select>
                    </div>

                    <div className='year-select'>
                        <span>Ano:</span>

                        <select
                            onChange={onYearChange}
                            className='date-select'
                            value={selectedYear}
                        >
                            {getYearsRange().map((year) =>
                                <option
                                    key={year}
                                >
                                    {year}
                                </option>
                            )}
                        </select>
                    </div>
                </div>
            </OutsideClickAlerter>

            <button onClick={toggleSelect}>
                <CalendarIcon />
                {months[selectedMonth] + ' de ' + selectedYear}
            </button>
        </div>
    )
}
export default FilterSelect