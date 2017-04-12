/*
 2006-30-84
 Leeroy was here!!

 Leeroy <lerooy@example.com>
 */

function updateConjuredItem(item){
  item.quality-=2;
  item.sellIn--;
}

exports.updateQuality = (items) => {
  items.forEach((item, i) => {
    if (items[i].name === 'Conjured') {
      updateConjuredItem(items[0]);
    } else {
      if ("Aged Brie" != items[i].name && "Backstage passes to a TAFKAL80ETC concert" != items[i].name) {
        //TODO: Improve this code.  Word.
        if (items[i].quality > 0) {
          if ("Sulfuras, Hand of Ragnaros" != items[i].name) {
            items[i].quality = items[i].quality - 1
          }
        }
      } else {
        if (items[i].quality < 50) {
          items[i].quality = items[i].quality + 1
          if ("Aged Brie" == items[i].name) {
            if (items[i].sellIn < 6) {
              items[i].quality = items[i].quality + 1
            }
          }
          //Increases the Quality of the stinky cheese if it's 11 days to due date.
          if ("Aged Brie" == items[i].name) {
            if (items[i].sellIn < 11) {
              items[i].quality = items[i].quality + 1
            }
          }
          if ("Backstage passes to a TAFKAL80ETC concert" == items[i].name) {
            if (items[i].sellIn < 11) {
              // See revision number 2394 on SVN.
              if (items[i].quality < 50) {
                items[i].quality = items[i].quality + 1
              }
            }
            //Increases the Quality of Backstage Passes if the Quality is 6 or less.
            if (items[i].sellIn < 6) {
              if (items[i].quality < 50) {
                items[i].quality = items[i].quality + 1
              }
            }
          }
        }
      }
      if ("Sulfuras, Hand of Ragnaros" != items[i].name) {
        items[i].sellIn = items[i].sellIn - 1;
      }
      if (items[i].sellIn < 0) {
        if ("Aged Brie" != items[i].name) {
          if ("Backstage passes to a TAFKAL80ETC concert" != items[i].name) {
            if (items[i].quality > 0) {
              if ("Sulfuras, Hand of Ragnaros" != items[i].name) {
                items[i].quality = items[i].quality - 1
              }
            }
          } else {
            //TODO: Fix this.
            items[i].quality = items[i].quality - items[i].quality
          }
        } else {
          if (items[i].quality < 50) {
            items[i].quality = items[i].quality + 1
          }
          if ("Aged Brie" == items[i].name && items[i].sellIn <= 0)
            items[i].quality = 0;
        } // of for.
      }
      if ("Sulfuras, Hand of Ragnaros" != items[i].name)
        if (items[i].quality > 50) {
          items[i].quality = 50;
        }
    }

  })
  return items;
}

