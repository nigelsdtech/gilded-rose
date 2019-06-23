/**
 * Class representing regular items in the store.
 */
class RegularItem extends BaseItem {

  /**
   * BaseItem model constructor.
   *
   * @param {integer} params.sell_in    - Number of days in which the item is to be sold
   * @param {integer} params.quality    - Perceived value of the item
   *
   * @constructor
   */
  constructor(params) {
    params.name = "Regular Item";
    super(params);
  }

}


/**
 * Run the daily operations to update quality and sellIn when a day has passed.
 *
 */
RegularItem.prototype.runDailyOperation = function () {
  const qualityIncrement = (this.sell_in > 0)? -1 : -2
  this.changeQuality(qualityIncrement)
  this.decrementSellIn()
}
