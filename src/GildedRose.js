/*
 2006-30-84
 Leeroy was here!!

 Leeroy <lerooy@example.com>
 */
const isDecreasingQuality = name => "Aged Brie" != name && "Backstage passes to a TAFKAL80ETC concert" != name;
const isNotSulfuras = name => "Sulfuras, Hand of Ragnaros" != name;
const decreaseQuality = item => {
  if (item.quality > 0) {
    item.quality = item.quality - 1;
  }
};

const increaseQuality = item => {
  if (item.quality < 50) {
    item.quality = item.quality + 1;
  }
};
module.exports = {
  updateQuality: (items) => {
    items
      .filter(item => isNotSulfuras(item.name))
      .forEach((item) => {
          const name = item.name;
          if (isDecreasingQuality(name)) {
            decreaseQuality(item);
          } else {
            if (item.quality < 50) {
              increaseQuality(item);
              if ("Aged Brie" == name) {
                if (item.sellIn < 6) {
                  increaseQuality(item);
                }
              }
              //Increases the Quality of the stinky cheese if it's 11 days to due date.
              if ("Aged Brie" == name) {
                if (item.sellIn < 11) {
                  increaseQuality(item);
                }
              }
              if ("Backstage passes to a TAFKAL80ETC concert" == name) {
                if (item.sellIn < 11) {
                  increaseQuality(item);
                }
                if (item.sellIn < 6) {
                  increaseQuality(item);
                }
              }
              //Increases the Quality of Backstage Passes if the Quality is 6 or less.

            }
          }

          item.sellIn = item.sellIn - 1;
          if (item.sellIn < 0) {
            if ("Aged Brie" != name) {
              if ("Backstage passes to a TAFKAL80ETC concert" != name) {
                decreaseQuality(item);
              } else {
                item.quality = 0;
              }
            } else {
              increaseQuality(item);
              if ("Aged Brie" == name && item.sellIn <= 0)
                item.quality = 0;
            } // of for.
          }
        }
      );

    return items;


  }
};
