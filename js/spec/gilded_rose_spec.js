describe("A regular item", function() {

  const origSellIn  = 10
  const origQuality = 50

  beforeEach(function() {
    items = [ new RegularItem({sell_in: origSellIn, quality: origQuality}) ];
  });


  it("should decrease in quality by one in one day", function() {
    updateQualityNTimes(1)
    expect(items[0].quality).toEqual(origQuality - 1);
    expect(items[0].sell_in).toEqual(origSellIn  - 1);
  });

  it("should decrease in quality twice as fast (i.e. by two in one day) after the sell by date has passed", function() {
    const numDaysToPass = origSellIn
    const fasterDecreasingExpectedQuality = origQuality - numDaysToPass - 2

    // Pass enough days for the sellIn date to be 0, and then another so we're in rapid depreciation
    updateQualityNTimes(numDaysToPass+1)
    expect(items[0].quality).toEqual(fasterDecreasingExpectedQuality);
    expect(items[0].sell_in).toEqual(-1);
  });

  it("should never have quality go below 0", function() {

    // Pass enough days for the quality to drop to 0, and then some more to check it won't go below
    const numDaysToPass = origQuality + 10

    updateQualityNTimes(numDaysToPass)
    expect(items[0].quality).toEqual(0);
  });


});


describe("Aged Brie", function() {

  const origSellIn  = 100
  const origQuality = 40

  beforeEach(function() {
    items = [ new AgedBrieItem({sell_in: origSellIn, quality: origQuality}) ];
  });


  it("should increase in quality by one in one day", function() {
    updateQualityNTimes(1)
    expect(items[0].quality).toEqual(origQuality+1);
    expect(items[0].sell_in).toEqual(origSellIn-1);
  });

  it("should never have quality go above 50", function() {
    updateQualityNTimes(50-origQuality+100)
    expect(items[0].quality).toEqual(50);
  });

});


describe("Sulfuras", function() {

  it("doesn't reduce in quality with the passing of time", function() {
    items = [ new SulfurasItem({quality: 10}) ];
    updateQualityNTimes(100)
    expect(items[0].quality).toEqual(10);
  });

});

describe("Backstage passes", function() {

  afterEach(function() {
    items = [];
  });

  const itemName = "Backstage passes to a TAFKAL80ETC concert"
  const tests = [
    {
      desc: "should increase in quality by one in one day (given there are more than 10 days left)",
      quality: 20,
      sellIn: 15,
      numDays: 1,
      finalQuality: 21,
      finalSellIn: 14
    },
    {
      desc: "should increase in quality by two in one day (given there are between 5 and 10 days left)",
      quality: 20,
      sellIn: 10,
      numDays: 1,
      finalQuality: 22,
      finalSellIn: 9
    },
    {
      desc: "should increase in quality by three in one day (given there are less than 5 days left)",
      quality: 20,
      sellIn: 5,
      numDays: 1,
      finalQuality: 23,
      finalSellIn: 4
    },
    {
      desc: "should drop to 0 quality after the concert",
      quality: 49,
      sellIn: 5,
      numDays: 6,
      finalQuality: 0,
      finalSellIn: -1
    },
    {
      desc: "should not increase in quality above 50",
      quality: 49,
      sellIn: 5,
      numDays: 1,
      finalQuality: 50,
      finalSellIn: 4
    }
  ]

  tests.forEach( (t) => {
    it(t.desc, function() {
      items = [ new BackstagePassItem({sell_in: t.sellIn, quality: t.quality} ) ];
      updateQualityNTimes(t.numDays);
      expect(items[0].quality).toEqual(t.finalQuality);
      expect(items[0].sell_in).toEqual(t.finalSellIn);
    });
  })

});


describe("Conjoured", function() {

  const origSellIn  = 10
  const origQuality = 50

  beforeEach(function() {
    items = [ new ConjouredItem({sell_in: origSellIn, quality: origQuality}) ];
  });


  it("should decrease in quality by two units in one day", function() {
    updateQualityNTimes(1)
    expect(items[0].quality).toEqual(origQuality - 2);
    expect(items[0].sell_in).toEqual(origSellIn  - 1);
  });

  it("should decrease in quality four times as fast (i.e. by four in one day) after the sell by date has passed", function() {
    const numDaysToExpiry   = origSellIn
    const numAdditionalDays = 2
    const fasterDecreasingExpectedQuality = origQuality - (numDaysToExpiry*2) - (numAdditionalDays*4)

    // Pass enough days for the sellIn date to be 0, and then another so we're in rapid depreciation
    updateQualityNTimes(numDaysToExpiry+numAdditionalDays)
    expect(items[0].quality).toEqual(fasterDecreasingExpectedQuality);
    expect(items[0].sell_in).toEqual(0-numAdditionalDays);
  });


});



/**
 * A function to simulate a number of days elapsing
 *
 */
function updateQualityNTimes(numDaysToPass) {
  for (let i = 0; i < numDaysToPass; i++) update_quality();
}
