import {
    format as fm,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'

type IDateFormat = 'dd/MM/yyyy' | 'dd/MM/yyyy HH:mm'
type TDate = string | Date

const parseDate = (date) => (date && date !== 'now')
    ? new Date(date)
    : new Date()

const dateUtils = {
    now: new Date(),

    date: (date?: TDate): Date => parseDate(date),

    format: (date: TDate, format: IDateFormat): string =>
        fm(parseDate(date), format, { locale: ptBR }),
}

export default dateUtils