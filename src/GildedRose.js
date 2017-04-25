/*
 2006-30-84
 Leeroy was here!!

 Leeroy <lerooy@example.com>
 */

const AGED_BRIE = "Aged Brie";
const BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";
const SULFURAS = "Sulfuras, Hand of Ragnaros";

function handleBrieAndBackstage(items, i) {
  if (items[i].quality < 50) {
    items[i].quality++;
    if (items[i].sellIn < 6) {
      items[i].quality++;
    }
    if (items[i].sellIn < 11) {
      items[i].quality++;
    }
  }
}

module.exports = {
  updateQuality: (items) => {
    for (let i = 0; i < items.length; i++) {

      if (AGED_BRIE != items[i].name && BACKSTAGE_PASSES != items[i].name) {
        if (items[i].quality > 0) {
          if (SULFURAS != items[i].name) {
            items[i].quality = items[i].quality - 1
          }
        }
      } else {
        handleBrieAndBackstage(items, i);
      }


      if (SULFURAS != items[i].name) {
        items[i].sellIn--;
      }

      if (items[i].sellIn < 0) {
        if (AGED_BRIE != items[i].name) {
          if (BACKSTAGE_PASSES != items[i].name) {
            if (items[i].quality > 0) {
              if (SULFURAS != items[i].name) {
                items[i].quality--;
              }
            }
          } else {
            items[i].quality = 0;
          }
        } else {
          if (items[i].quality < 50) {
            items[i].quality++;
          }
          if (AGED_BRIE == items[i].name && items[i].sellIn <= 0)
            items[i].quality = 0;
        } // of for.
      }
      if (SULFURAS != items[i].name)
        if (items[i].quality > 50) items[i].quality = 50;
    }
    return items;
  }
};
