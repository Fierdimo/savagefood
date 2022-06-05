function compare(a, b) {
  const bandA = Object.keys(a)[0] 
  const bandB = Object.keys(b)[0] 

  let comparison = 0;
  if (bandA > bandB) {
    comparison = 1;
  } else if (bandA < bandB) {
    comparison = -1;
  }
  return comparison;
}

export default function manageItem(chart, product, operation, quantity = 1) {

    let temporalTotal
    let temporalListChart = chart.list
    if(operation === 'add') temporalTotal = chart.total + product.price
    if(operation === 'minus') temporalTotal = chart.total - product.price
    let tempProduct = product.id
    if (chart.list !== null) {
      chart.list.forEach((item, index) => {
        if (tempProduct in item) {
          let spliced = temporalListChart.splice(index, 1)
          if(operation === 'add') quantity = spliced[0][`${tempProduct}`] + 1
          if(operation === 'minus') quantity = spliced[0][`${tempProduct}`] - 1
        }
      });
    }
    if(quantity < 0) quantity = 0

    temporalListChart.push({ [`${tempProduct}`]: quantity })
    temporalListChart.sort(compare)
    localStorage.setItem('total', temporalTotal)
    localStorage.setItem('list', JSON.stringify(temporalListChart))

    return({
      total: temporalTotal,
      list: temporalListChart,
    })
}