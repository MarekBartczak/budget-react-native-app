import Item from "../models/Item";

const createItem = (place, date, item) => {
  return new Item(
    item.id,
    date,
    place,
    item.category,
    item.name,
    item.cost,
    item.multiply
  );
};

const SaveItemsToTheStore = (receipt) => {
  const dataToSave = {
    date: receipt.date.toISOString().slice(0, 10),
    place: receipt.place,
    receiptList: receipt.items,
    receiptLengthList: receipt.items.length,
  };
  const itemsToSave = [];

  dataToSave.receiptList.map((item, i) => {
    const itemToSave = createItem(dataToSave.place, dataToSave.date, item);
    itemsToSave.push(itemToSave);
  });
  return itemsToSave;
};

export default SaveItemsToTheStore;
