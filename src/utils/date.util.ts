import moment from 'moment'

export const baseFormatDate = (date: Date) =>
  moment(date).format('DD.MM.yyyy HH:MM')
