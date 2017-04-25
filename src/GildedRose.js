const MAX_QUALITY = 50, AGE_1 = 10, AGE_2 = 5;

const neverChanges = ({name}) => name === 'Sulfuras, Hand of Ragnaros';

const improvesWithAge = ({name}) => ["Aged Brie", "Backstage passes to a TAFKAL80ETC concert"].includes(name);

const getDegradeAmount = ({name, sellIn}) => {
  let degradeAmount = 1;
  if (name.startsWith('Conjured')){
    degradeAmount *= 2;
  }
  if (sellIn < 0){
    degradeAmount *= 2;
  }
  return degradeAmount;
};


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
  item.quality -= getDegradeAmount(item);
  item.quality = Math.max(0, item.quality);
};

exports.updateQuality = (items) => {
  return items.map(i => {
    let item = {...i};
    if (neverChanges(item)) {
      return item;
    }
    item.sellIn--;
    improvesWithAge(item) ? increaseQuality(item) : decreaseQuality(item);
    return item;
  })
};

