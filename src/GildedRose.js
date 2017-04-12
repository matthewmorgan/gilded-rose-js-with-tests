function isSulfuras(name) {
  return name === 'Sulfuras, Hand of Ragnaros';
}

function improvesWithAge(name) {
  return "Aged Brie" === name || "Backstage passes to a TAFKAL80ETC concert" === name;
}

function increaseQuality(quality, sellIn) {
  ++quality;
  if (sellIn < 10) {
    ++quality;
  }
  if (sellIn < 5) {
    ++quality;
  }
  return quality;
}

function decreaseQuality(quality, name) {
  if (improvesWithAge(name)) {
    return 0;
  }
  if (name === 'Conjured') {
    quality--;
  }
  return Math.max(0, quality - 1);
}

function capQuality(quality) {
  return Math.min(quality, 50);
}

exports.updateQuality = (items) => {
  return items.map(item => {
    let {quality, sellIn, name} = item;
    if (isSulfuras(name)) return {sellIn, name, quality};
    sellIn--;
    if (improvesWithAge(name)) {
      quality = increaseQuality(quality, sellIn);
    } else {
      quality = decreaseQuality(quality, name);
    }
    if (sellIn < 0) {
      quality = decreaseQuality(quality, name);
    }
    quality = capQuality(quality);
    return {sellIn, name, quality};
  })
};

