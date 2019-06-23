/**
 * Class representing aged brie.
 */
class AgedBrieItem extends BaseItem {

  /**
   * BaseItem model constructor.
   *
   * @param {object}  params
   * @param {integer} params.sell_in  - Number of days in which the item is to be sold
   * @param {integer} params.quality  - Perceived value of the item
   *
   * @constructor
   */
  constructor(params) {
    params.name = "Aged Brie"
    super(params);
  }

}


/**
 * Run the daily operations to update quality and sellIn when a day has passed.
 *
 */
AgedBrieItem.prototype.runDailyOperation = function () {
  this.changeQuality(1)
  this.decrementSellIn()
}
