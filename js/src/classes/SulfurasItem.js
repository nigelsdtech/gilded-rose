/**
 * Class representing aged brie.
 */
class SulfurasItem extends BaseItem {

  /**
   * BaseItem model constructor.
   *
   * @param {object}  params
   * @param {integer} params.quality  - Perceived value of the item
   *
   * @constructor
   */
  constructor(params) {
    params.name = "Sulfuras, Hand of Ragnaros"
    super(params);
  }

}


/**
 * Run the daily operations to update quality and sellIn when a day has passed.
 *
 */
SulfurasItem.prototype.runDailyOperation = function () {
  this.changeQuality(0)
  this.decrementSellIn()
}
