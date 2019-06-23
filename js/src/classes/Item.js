/**
 * According to the challenge this was not to be altered. This is the "basic" class for everything in the store.
 *
 * @param {string}  name    - Name of the item
 * @param {integer} sell_in - Number of days in which the item is to be sold (it pains me that this isn't in camelCase)
 * @param {integer} quality - Perceived value of the item
 *
 */
function Item(name, sell_in, quality) {

  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;

}
