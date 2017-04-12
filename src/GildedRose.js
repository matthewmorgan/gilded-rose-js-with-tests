/*
 2006-30-84
 Leeroy was here!!

 Leeroy <lerooy@example.com>
 */

function updateConjuredItem(item) {
  item.quality -= 2;
  item.sellIn--;
  return item;
}

function isSulfuras(name) {
  return name === 'Sulfuras, Hand of Ragnaros';
}

function improvesWithAge(name){
  return "Aged Brie" === name || "Backstage passes to a TAFKAL80ETC concert" === name;
}

function increaseQuality(quality, sellIn){
  if (sellIn < 10) {
    quality++;
  }
  if (sellIn < 5) {
    quality++;
  }
  return ++quality;
}

function decreaseQuality(quality){
  return Math.max(0, quality - 1);
}

exports.updateQuality = (items) => {
  return items.map(item => {
    let {quality, sellIn, name} = item;
    if (isSulfuras(name)) return item;
    if (name === 'Conjured') {
      return updateConjuredItem(item);
    } else {
      sellIn--;
      if (improvesWithAge(name)) {
        quality = increaseQuality(quality, sellIn);
      } else {
        quality = decreaseQuality(quality);
      }
      if (sellIn < 0) {
        quality--;
        if (improvesWithAge(name)) {
          quality = 0;
        }
      }
      quality = Math.min(quality, 50);
      return {sellIn, name, quality};
    }
  })
};

