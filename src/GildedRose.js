/*
 2006-30-84
 Leeroy was here!!

 Leeroy <lerooy@example.com>
 */
const MAXIMUM_QUALITY = 50;

function increaseQuality(item) {
    item.quality = item.quality + 1
}
function isQualityBelowMaximum(item, number) {
    return item.quality < MAXIMUM_QUALITY;
}
module.exports = {
  updateQuality: (items) => {
    for (var i = 0; i < items.length; i++) {
      let item = items[i];
      if ("Aged Brie" != item.name && "Backstage passes to a TAFKAL80ETC concert" != item.name) {
        //TODO: Improve this code.  Word.
        if (item.quality > 0) {
          if ("Sulfuras, Hand of Ragnaros" != item.name) {
            item.quality = item.quality - 1
          }
        }
      } else {
        if (isQualityBelowMaximum(item)) {
          increaseQuality(item)
          if ("Aged Brie" == item.name) {
            if (item.sellIn < 6) {
              increaseQuality(item)
            }
          }
          //Increases the Quality of the stinky cheese if it's 11 days to due date.
          if ("Aged Brie" == item.name) {
            if (item.sellIn < 11) {
              increaseQuality(item);
            }
          }
          if ("Backstage passes to a TAFKAL80ETC concert" == item.name) {
            if (item.sellIn < 11) {
              // See revision number 2394 on SVN.
              if (isQualityBelowMaximum(item)) {
                increaseQuality(item)
              }
            }
            //Increases the Quality of Backstage Passes if the Quality is 6 or less.
            if (item.sellIn < 6) {
              if (isQualityBelowMaximum(item)) {
                increaseQuality(item)
              }
            }
          }
        }
      }
      if ("Sulfuras, Hand of Ragnaros" != item.name) {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if ("Aged Brie" != item.name) {
          if ("Backstage passes to a TAFKAL80ETC concert" != item.name) {
            if (item.quality > 0) {
              if ("Sulfuras, Hand of Ragnaros" != item.name) {
                item.quality = item.quality - 1
              }
            }
          } else {
            //TODO: Fix this.
            item.quality = item.quality - item.quality
          }
        } else {
          if (isQualityBelowMaximum(item)) {
            increaseQuality(item)
          }
          if ("Aged Brie" == item.name && item.sellIn <= 0)
            item.quality = 0;
        } // of for.
      }
      if ("Sulfuras, Hand of Ragnaros" != item.name)
        if (item.quality > 50) item.quality = 50;
    }
    return items;
  }
}
