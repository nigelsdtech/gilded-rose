/**
 * Class representing regular items in the store.
 */
class ConjouredItem extends BaseItem {

  /**
   * BaseItem model constructor.
   *
   * @param {integer} params.sell_in    - Number of days in which the item is to be sold
   * @param {integer} params.quality    - Perceived value of the item
   *
   * @constructor
   */
  constructor(params) {
    params.name = "Conjoured";
    super(params);
  }

}


/**
 * Run the daily operations to update quality and sellIn when a day has passed.
 *
 */
ConjouredItem.prototype.runDailyOperation = function () {
  const qualityIncrement = (this.sell_in > 0)? -2 : -4
  this.changeQuality(qualityIncrement)
  this.decrementSellIn()
}
