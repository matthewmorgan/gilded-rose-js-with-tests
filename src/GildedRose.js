/*
 2006-30-84
 Leeroy was here!!

 Leeroy <lerooy@example.com>
 */

module.exports = {
  updateQuality: (items) => { // items array of objects
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      const hasDecreased = decreaseQualityByOne(item);
      // if ("Aged Brie" != items[i].name && "Backstage passes to a TAFKAL80ETC concert" != items[i].name) {
      //   //TODO: Improve this code.  Word.
      //   if (items[i].quality > 0) {
      //     if ("Sulfuras, Hand of Ragnaros" != items[i].name) {
      //       decreaseQualityByOne(items[i]);
      //     }
      //   }
      // } else {

        if (item.quality < 50 && !hasDecreased) {
          incrementQuality(item);

          if ("Aged Brie" == item.name) {
            if (item.sellIn < 6) {
              incrementQuality(item);
            }
          }
          //Increases the Quality of the stinky cheese if it's 11 days to due date.
          if ("Aged Brie" == item.name) {
            if (item.sellIn < 11) {
              incrementQuality(item);
            }
          }
          if ("Backstage passes to a TAFKAL80ETC concert" == item.name) {
            if (item.sellIn < 11) {
              // See revision number 2394 on SVN.
              if (item.quality < 50) {
                incrementQuality(item)
              }
            }
            //Increases the Quality of Backstage Passes if the Quality is 6 or less.
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                incrementQuality(item)
              }
            }
          }
        }
      //}
      if ("Sulfuras, Hand of Ragnaros" != item.name) {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if ("Aged Brie" != item.name) {
          if ("Backstage passes to a TAFKAL80ETC concert" != item.name) {
            if (item.quality > 0) {
              if ("Sulfuras, Hand of Ragnaros" != item.name) {
                item.quality-=1;
              }
            }
          } else {
            //TODO: Fix this.
            item.quality = item.quality - item.quality
          }
        } else {
          if (item.quality < 50) {
            incrementQuality(item)
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

function incrementQuality (item) {
  item.quality+=1;
}

function decreaseQualityByOne(item){
  const decreaseBin = ["Aged Brie", "Backstage passes to a TAFKAL80ETC concert", "Sulfuras, Hand of Ragnaros"]
  const hasItem = decreaseBin.indexOf(item.name) !== -1;
  if (!hasItem && item.quality > 0) {
    item.quality-=1;
    return true;
  }
  else {
    return false;
  }
}
