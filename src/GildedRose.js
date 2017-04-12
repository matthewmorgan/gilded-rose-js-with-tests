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

exports.updateQuality = (items) => {
  return items.map(item => {
    let {quality, sellIn, name} = item;
    if (isSulfuras(name)) return item;
    if (name === 'Conjured') {
      return updateConjuredItem(item);
    } else {
      if ("Aged Brie" === name || "Backstage passes to a TAFKAL80ETC concert" === name) {
        quality++;
        if (sellIn < 11) {
          quality++;
        }
        if (sellIn < 6) {
          quality++;
        }
      } else {
        if (quality > 0) {
          quality--;
        }
      }
      sellIn--;
      if (sellIn < 0) {
        if ("Aged Brie" === name || "Backstage passes to a TAFKAL80ETC concert" === name) {
          quality = 0;
        } else {
          if (quality > 0) {
            quality--;
          }
        }
      }
      quality = Math.min(quality, 50);
      return {sellIn, name, quality};
    }
  })
}

