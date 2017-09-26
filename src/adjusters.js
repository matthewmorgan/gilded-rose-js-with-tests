const MAX_QUALITY = 50;
const AGE_1 = 10;
const AGE_2 = 5;

function neverChanges({name}) {
  return name === 'Sulfuras, Hand of Ragnaros'
}

function improvesWithAge({name}) {
  return ["Aged Brie", "Backstage passes to a TAFKAL80ETC concert"].includes(name)
}

function getDegradeAmount({name, sellIn}) {
  let degradeAmount = 1;
  if (name.startsWith('Conjured')) {
    degradeAmount *= 2;
  }
  if (sellIn < 0) {
    degradeAmount *= 2;
  }
  return degradeAmount;
}

function increaseQuality(item) {
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
}

function decreaseQuality(item) {
  item.quality -= getDegradeAmount(item);
  item.quality = Math.max(0, item.quality);
}

export { decreaseQuality, getDegradeAmount, improvesWithAge, increaseQuality, neverChanges }
