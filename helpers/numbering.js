const formatNumber = (num) => {
  let totalNumber = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  return totalNumber
}

module.exports = formatNumber
