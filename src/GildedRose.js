let immutableItemHelper = require('./immutableItemHelper');

const SULFURAS_NAME = `Sulfuras, Hand of Ragnaros`;
const AGED_BRIE_NAME = "Aged Brie";
const BACKSTAGE_PASS_NAME = "Backstage passes to a TAFKAL80ETC concert";

const isBrieOrPass = (item) => {
    return AGED_BRIE_NAME === item.name || BACKSTAGE_PASS_NAME === item.name;
};

const decreaseQualityIfNotAgedBrieOrPass = (item) => {
  if (item.quality > 0 && !isBrieOrPass(item)) {
        return immutableItemHelper.decreaseQuality(item, 1);
  } else return item;
};

let brieOrBackstagePassQualityUpdate = function (item) {
    if (item.sellIn < 6) {
        return immutableItemHelper.increaseQuality(item, 3);
    }
    else if (item.sellIn < 11 ) {
        return immutableItemHelper.increaseQuality(item, 2);
    } else return immutableItemHelper.increaseQuality(item, 1);
};

const increaseQualityIfAgedBrieOrPass = (item) => {
    if(isBrieOrPass(item)){
            return brieOrBackstagePassQualityUpdate(item);
    } else {
        return item;
    }
};

const checkMaxQuality = (item) => {
    if (item.quality > 50){
        return immutableItemHelper.setQuality(item, 50);
    } else return item;
};

const checkExpiration = item =>{
    if (item.sellIn < 0 && isBrieOrPass(item)) {
        return immutableItemHelper.setQuality(item, 0);
    }
    if (item.quality > 0 && item.sellIn < 0) {
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
