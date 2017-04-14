const neverChanges = ({name}) => name === 'Sulfuras, Hand of Ragnaros';

const improvesWithAge = ({name}) => ["Aged Brie", "Backstage passes to a TAFKAL80ETC concert"].includes(name);

const degradesTwiceAsFast = ({name, sellIn}) => name === 'Conjured' || sellIn < 0;

const increaseQuality = item => {
  if (item.sellIn < 0) {
    item.quality = 0;
  } else {
    ++item.quality;
    if (item.sellIn < 10) {
      ++item.quality;
    }
    if (item.sellIn < 5) {
      ++item.quality;
    }
    item.quality = Math.min(item.quality, 50);
  }
};

const decreaseQuality = item => {
  item.quality--;
  if (degradesTwiceAsFast(item)) {
    item.quality--;
  }
  item.quality = Math.max(0, item.quality);
};

exports.updateQuality = (items) => {
  return items.map(i => {
    let item = Object.assign({}, i);
    if (neverChanges(item)) {
      return item;
    }
    item.sellIn--;
    improvesWithAge(item) ? increaseQuality(item) : decreaseQuality(item);
    return item;
  })
};

