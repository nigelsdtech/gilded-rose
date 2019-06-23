/**
 * Basic parent class to be used by all items in the store. Calls the "Item" class to set universal properties for all items.
 * If I'd been allowed to change the "Item" class - a lot of this stuff would have gone in there.
 */
class BaseItem extends Item {

  /**
   * BaseItem model constructor.
   *
   * @param {object}  params
   * @param {string}  params.name       - Name of the item
   * @param {integer} params.sell_in    - Number of days in which the item is to be sold
   * @param {integer} params.quality    - Perceived value of the item
   * @param {integer} params.maxQuality - Maximum quality of the item (optional - defaults to 50)
   *
   * @constructor
   */
  constructor(params) {

    const maxQuality = (params.maxQuality)? params.maxQuality : 50;
    if (params.quality > maxQuality) { throw new Error('Item quality exceeds max permitted') }

    super(params.name,params.sell_in,params.quality);
    this.maxQuality = maxQuality
  }

}


const method = BaseItem.prototype


/**
 * Run the daily operations to update quality and sellIn when a day has passed.
 *
 * @abstract
 *
 */
method.runDailyOperation = function () {
  throw new Error('Abstract function needs to be defined')
}

/**
 * Increment the quality of the item by the specified amount.
 *
 * @param amount - Amount by which to increment the quality. A negative number indicated depreciation. A positive number indicates appreciation.
 *
 */
method.changeQuality = function (amount) {
  if ( amount > 0 && (this.quality + amount) > this.maxQuality ) {
    // Ensure the quality never exceeds max value
    this.quality = this.maxQuality;
  } else if ( amount < 0 && (this.quality + amount) < 0 ){
    // Ensure the quality never goes below 0
    this.quality = 0;
  } else {
    this.quality = this.quality + amount
  }
}

/**
 * Decrement the sell_in of the item by one day
 *
 */
method.decrementSellIn = function () {
  this.sell_in--
}
