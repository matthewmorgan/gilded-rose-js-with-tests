let immutableItemHelper = require('./immutableItemHelper');

const SULFURAS_NAME = `Sulfuras, Hand of Ragnaros`;
const AGED_BRIE_NAME = "Aged Brie";
const BACKSTAGE_PASS_NAME = "Backstage passes to a TAFKAL80ETC concert";
const MAX_QUALITY = 50;
const CLOSE_SELLIN_DATE = 11;
const VERY_CLOSE_SELLIN_DATE = 6;

const isBrieOrPass = (item) => {
    return AGED_BRIE_NAME === item.name || BACKSTAGE_PASS_NAME === item.name;
};

const decreaseQualityIfNotAgedBrieOrPass = (item) => {
  if (!isBrieOrPass(item)) {
        return immutableItemHelper.decreaseQuality(item, 1);
  } else return item;
};

let brieOrBackstagePassQualityUpdate = function (item) {
    return item.sellIn < VERY_CLOSE_SELLIN_DATE ?
        immutableItemHelper.increaseQuality(item, 3) :
        item.sellIn < CLOSE_SELLIN_DATE ?
            immutableItemHelper.increaseQuality(item, 2) :
            immutableItemHelper.increaseQuality(item, 1);
};

const increaseQualityIfAgedBrieOrPass = (item) => {
    return isBrieOrPass(item) ?
        brieOrBackstagePassQualityUpdate(item) : item;
};

const checkMaxQuality = (item) => {
    return item.quality > MAX_QUALITY ?
        immutableItemHelper.setQuality(item, MAX_QUALITY) : item;
};

const checkExpiration = item =>{
    if (item.sellIn < 0 && isBrieOrPass(item)) {
        return immutableItemHelper.setQuality(item, 0);
    }
    if (item.sellIn < 0) {
        return immutableItemHelper.decreaseQuality(item, 1);
    }
    return item;
};

exports.updateQuality = (items) => {
    let updatedItems = items
        .filter(item => item.name !== SULFURAS_NAME)
        .map(decreaseQualityIfNotAgedBrieOrPass)
        .map(increaseQualityIfAgedBrieOrPass)
        .map(immutableItemHelper.decreaseSellIn)
        .map(checkExpiration)
        .map(checkMaxQuality);

    let sulfuras = items.find(item => item.name === SULFURAS_NAME);
    if(sulfuras){
      updatedItems.push(sulfuras);
    }
    return updatedItems;
};
