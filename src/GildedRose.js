import { neverChanges, improvesWithAge, increaseQuality, decreaseQuality } from './adjusters';


exports.updateQuality = items => {
  return items.map(i => {
    let item = {...i};
    if (neverChanges(item)) {
      return item;
    }
    item.sellIn--;
    improvesWithAge(item) ? increaseQuality(item) : decreaseQuality(item);
    return item;
  })
};

