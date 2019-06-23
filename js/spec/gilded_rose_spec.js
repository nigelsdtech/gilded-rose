describe("Gilded Rose", function() {


  describe("Aged Brie", function() {
    it("should increase in quality by one in one day", function() {
      items = [ new Item("Aged Brie", 10, 1) ];
      update_quality();
      expect(items[0].name).toEqual("Aged Brie");
      expect(items[0].quality).toEqual(2);
      expect(items[0].sell_in).toEqual(9);
    });

  });
});
