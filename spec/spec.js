const Item = require('../src/Item');
const GildedRose = require('../src/GildedRose');

describe("GildedRose shop manager", () => {
  let items;

  beforeEach(() => {
    items = [];
  });

  it("decreases by 1 the quality and remaining sellIn days of regular items", () => {
    items.push(new Item("+5 Dexterity Vest", 10, 20));
    items.push(new Item("Conjured Mana Cake", 3, 6));

    items = GildedRose.updateQuality(items);

    const expected = [
      {sellIn: 9, quality: 19},
      {sellIn: 2, quality: 4}
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("increases the quality by one, of the products that get better as they age", () => {
    items.push(new Item("Aged Brie", 20, 30));
    items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 20, 30));

    items = GildedRose.updateQuality(items);

    const expected = [
      {sellIn: 19, quality: 31},
      {sellIn: 19, quality: 31},
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("increases the quality by two, of the products that get better as they age, when there are 10 days or less left", () => {
    items.push(new Item("Aged Brie", 10, 34));
    items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 8, 30));

    items = GildedRose.updateQuality(items);

    const expected = [
      {sellIn: 9, quality: 36},
      {sellIn: 7, quality: 32},
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("increases the quality by three, of the products that get better as they age, when there are 5 days or less left", () => {
    items.push(new Item("Aged Brie", 4, 11));
    items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 5, 15));

    items = GildedRose.updateQuality(items);

    const expected = [
      {sellIn: 3, quality: 14},
      {sellIn: 4, quality: 18},
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("decreases the quality and the sellIn of the products twice as fast when we have passed the sellIn date", () => {
    items.push(new Item("+5 Dexterity Vest", 0, 20));
    items.push(new Item("Conjured Mana Cake", 0, 6));

    items = GildedRose.updateQuality(items);

    const expected = [
      {sellIn: -1, quality: 18},
      {sellIn: -1, quality: 2}
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("updates the quality of Backstage Passes and Brie to zero when we have passed the sellIn date", () => {
    items.push(new Item("Aged Brie", 0, 20));
    items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20));

    items = GildedRose.updateQuality(items);

    const expected = [
      {sellIn: -1, quality: 0},
      {sellIn: -1, quality: 0},
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("does not alter the quality of 'Sulfuras', which is always 80 or its expiration", () => {
    items.push(new Item("Sulfuras, Hand of Ragnaros", 1, 80));

    items = GildedRose.updateQuality(items);

    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(1);
  });

  it("does not increase quality over 50", () => {
    items.push(new Item("Aged Brie", 4, 49));

    items = GildedRose.updateQuality(items);

    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(3);
  });

  it('does not decrease quality below 0', () => {
    items.push(new Item('Conjured other thing', 4, 1));

    let returnedItems = GildedRose.updateQuality(items);

    expect(returnedItems[0].quality).toBe(0);
  })
});
