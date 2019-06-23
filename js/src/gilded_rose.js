var items = []

function update_quality() {
  items.forEach( (item) => { item.runDailyOperation() } )
}
