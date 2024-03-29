function showYearMonth (record) {
  const year = new Date(record.date).getFullYear()
  const month = new Date(record.date).getMonth() + 1
  return month < 10 ? `${year}-0${month}` : `${year}-${month}`
}

function showYearMonthDate (record) {
  const year = new Date(record.date).getFullYear()
  let month = new Date(record.date).getMonth() + 1
  let date = new Date(record.date).getDate()
  if (month < 10) {
    month = '0' + month.toString()
  }
  if (date < 10) {
    date = '0' + date.toString()
  }
  return `${year}-${month}-${date}`
}

function renderMonthFilter (record, months) {
  months.push(showYearMonth(record))
  months = months.filter(function (e, i, s) {
    return s.indexOf(e) === i
  })
  return months
}


module.exports = { showYearMonth, showYearMonthDate, renderMonthFilter }
