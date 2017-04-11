let Item = require('./Item');
const cloneItem = (item) => {
    return new Item(item.name, item.sellIn, item.quality);
};

const decreaseQuality = (item, amountToDecreaseBy) => {
    let newItem = cloneItem(item);
    newItem.quality = newItem.quality - amountToDecreaseBy;
    return newItem;
};

const increaseQuality = (item, amountToIncreaseBy) => {
    let newItem = cloneItem(item);
    newItem.quality =  newItem.quality + amountToIncreaseBy;
    return newItem;
};

const setQuality = (item, value) => {
    let newItem = cloneItem(item);
    newItem.quality =  value;
    return newItem;
};

const decreaseSellIn =  (item) => {
    let newItem = cloneItem(item);
    newItem.sellIn--;
    return newItem;
};

module.exports = {
    cloneItem,
    decreaseQuality,
    increaseQuality,
    setQuality,
    decreaseSellIn
};