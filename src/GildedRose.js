/*
 2006-30-84
 Leeroy was here!!

 Leeroy <lerooy@example.com>
 */

function updateConjuredItem(item){
  item.quality-=2;
  item.sellIn--;
}

function isNotSulfuras(item){
  return item.name !== 'Sulfuras, Hand of Ragnaros';
}

exports.updateQuality = (items) => {
  items.filter(isNotSulfuras).forEach((item, i) => {
    if (item.name === 'Conjured') {
      updateConjuredItem(item);
    } else {
      if ("Aged Brie" != item.name && "Backstage passes to a TAFKAL80ETC concert" != item.name) {
        //TODO: Improve this code.  Word.
        if (item.quality > 0) {
          if ("Sulfuras, Hand of Ragnaros" != item.name) {
            item.quality = item.quality - 1
          }
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1
          if ("Aged Brie" == item.name) {
            if (item.sellIn < 6) {
              item.quality = item.quality + 1
            }
          }
          //Increases the Quality of the stinky cheese if it's 11 days to due date.
          if ("Aged Brie" == item.name) {
            if (item.sellIn < 11) {
              item.quality = item.quality + 1
            }
          }
          if ("Backstage passes to a TAFKAL80ETC concert" == item.name) {
            if (item.sellIn < 11) {
              // See revision number 2394 on SVN.
              if (item.quality < 50) {
                item.quality = item.quality + 1
              }
            }
            //Increases the Quality of Backstage Passes if the Quality is 6 or less.
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality = item.quality + 1
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
          if (item.quality < 50) {
            item.quality = item.quality + 1
          }
          if ("Aged Brie" == item.name && item.sellIn <= 0)
            item.quality = 0;
        } // of for.
      }
      if ("Sulfuras, Hand of Ragnaros" != item.name)
        if (item.quality > 50) {
          item.quality = 50;
        }
    }

  })
  return items;
}

