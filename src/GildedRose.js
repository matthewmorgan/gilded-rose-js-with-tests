let Item = require('./Item');
const SULFURAS_NAME = `Sulfuras, Hand of Ragnaros`;
const AGED_BRIE_NAME = "Aged Brie";
const BACKSTAGE_PASS_NAME = "Backstage passes to a TAFKAL80ETC concert";

const cloneItem = (item) => {
  return new Item(item.name, item.sellIn, item.quality);
};

const decreaseQuality = (item) => {
    item.quality = item.quality - 1
};

const decreaseQualityIfNotAgedBrieOrPass = (item) => {
    if (item.quality > 0) {
        let newItem = cloneItem(item);
        newItem.quality--;
        return newItem;
    }
};
let brieQualityUpdate = function (item) {

        if (item.sellIn < 11) {
            item.quality = item.quality + 1
            if (item.sellIn < 6) {
                item.quality = item.quality + 1
            }
        }
};
let backstagePassQualityUpdate = function (item) {
    if (BACKSTAGE_PASS_NAME === item.name) {
        if (item.sellIn < 11) {
            if (item.quality < 50) {
                item.quality = item.quality + 1
            }
        }
        if (item.sellIn < 6) {
            if (item.quality < 50) {
                item.quality = item.quality + 1
            }
        }
    }
};
const increaseQualityOfBrieOrPass = (item) => {
    if (item.quality < 50) {
        item.quality = item.quality + 1;
        if (AGED_BRIE_NAME === item.name) {
            brieQualityUpdate(item);
        } else {
            backstagePassQualityUpdate(item);
        }
    }
};
const isBrieOrPass = (item) => {
    return AGED_BRIE_NAME !== item.name && BACKSTAGE_PASS_NAME !== item.name;
};

exports.updateQuality = (items) => {



    let updatedItems = items
        .filter(item => item.name !== SULFURAS_NAME)
        .map((item) => {
            if (isBrieOrPass(item)) {
                return decreaseQualityIfNotAgedBrieOrPass(item);
            } else {
                increaseQualityOfBrieOrPass(item);
                return item;
            }
        })
        .map(item =>{
        item.sellIn = item.sellIn - 1;


        if (item.sellIn < 0) {
            if (AGED_BRIE_NAME !== item.name) {
                if (BACKSTAGE_PASS_NAME !== item.name && item.quality > 0) {
                      decreaseQuality(item);
                } else {
                    item.quality = 0;
                }
            } else {
                if (item.quality < 50) {
                    item.quality = item.quality + 1
                }
                if (!(item.sellIn > 0))
                    item.quality = 0;
            }
        }
        if (item.quality > 50) item.quality = 50;
        return item;
    });

    let sulfuras = items.find(item => item.name === SULFURAS_NAME);

    if(sulfuras){
      updatedItems.push(sulfuras);
    }

    return updatedItems;
  };
