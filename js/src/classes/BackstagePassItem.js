/**
 * Class representing aged brie.
 */
class BackstagePassItem extends BaseItem {

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
    params.name = "Backstage Pass"
    super(params);
  }

}


/**
 * Run the daily operations to update quality and sellIn when a day has passed.
 *
 */
BackstagePassItem.prototype.runDailyOperation = function () {

  var qualityIncrement = 1;

  if (this.sell_in <= 10 && this.sell_in > 5)      qualityIncrement = 2;
  else if (this.sell_in <= 5  && this.sell_in > 1) qualityIncrement = 3;
  else if (this.sell_in <= 0)                      qualityIncrement = -this.quality;

  this.changeQuality(qualityIncrement)
  this.decrementSellIn()
}
