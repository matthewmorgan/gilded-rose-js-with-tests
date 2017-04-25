const MAX_QUALITY = 50, AGE_1 = 10, AGE_2 = 5;

const neverChanges = ({name}) => name === 'Sulfuras, Hand of Ragnaros';

const improvesWithAge = ({name}) => ["Aged Brie", "Backstage passes to a TAFKAL80ETC concert"].includes(name);

const isConjuredItem = ({name}) => name.startsWith('Conjured');

const isPastSellIn = ({sellIn}) => sellIn < 0;

const increaseQuality = item => {
  if (item.sellIn < 0) {
    item.quality = 0;
  } else {
    ++item.quality;
    if (item.sellIn < AGE_1) {
      ++item.quality;
    }
    if (item.sellIn < AGE_2) {
      ++item.quality;
    }
    item.quality = Math.min(item.quality, MAX_QUALITY);
  }
};

const decreaseQuality = (item) => {
  let degradeAmount = 1;
  if (isPastSellIn(item)){
    degradeAmount *= 2;
  }
  if (isConjuredItem(item)) {
    degradeAmount *= 2;
  }
  item.quality -= degradeAmount;
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

