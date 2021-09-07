export const DEL_ITEM = "DEL_ITEM";
export const delItem = (id, userId) => {
  return { type: DEL_ITEM, itemId: id, userId: userId };
};

export const ADD_ITEM_TO_THE_RECEIPT = "ADD_ITEM_TO_THE_RECEIPT";
export const addItemToTheReceipt = (item) => {
  return { type: ADD_ITEM_TO_THE_RECEIPT, item: item };
};

export const SET_RECEIPT_DATE = "SET_RECEIPT_DATE";
export const setReceiptDate = (date) => {
  return { type: SET_RECEIPT_DATE, date: date };
};

export const SET_RECEIPT_PLACE = "SET_RECEIPT_PLACE";
export const setReceiptPlace = (place) => {
  return { type: SET_RECEIPT_PLACE, place: place };
};

export const ADD_ITEMS_FROM_RECEIPT = "ADD_ITEMS_FROM_RECEIPT";
export const addItemsFromReceipt = (list) => {
  return { type: ADD_ITEMS_FROM_RECEIPT, list: list };
};

export const LOADING_EXPENSE_FROM_DB = "LOADING_EXPENSE_FROM_DB";
export const loadingExpensefromDB = (array) => {
  return { type: LOADING_EXPENSE_FROM_DB, array: array };
};

export const LOADING_CATEGORY_FROM_DB = "LOADING_CATEGORY_FROM_DB";
export const loadingCategoriesFromDB = (array) => {
  return { type: LOADING_CATEGORY_FROM_DB, array: array };
};

export const SET_CATEGORY_ID = "SET_CATEGORY_ID";
export const setCategoryId = (id) => {
  return { type: SET_CATEGORY_ID, id: id };
};

export const CLEAR_STATE_AFTER_LOGOUT = "CLEAR_STATE_AFTER_LOGOUT";
export const clearStateAfterLogout = () => {
  return { type: CLEAR_STATE_AFTER_LOGOUT };
};

export const SELECT_MAIN_CATEGORY = "SELECT_MAIN_CATEGORY";
export const selectMainCategory = (title) => {
  return { type: SELECT_MAIN_CATEGORY, title: title };
};

export const SELECT_SUB_CATEGORY = "SELECT_SUB_CATEGORY";
export const selectSubCategory = (title) => {
  return { type: SELECT_SUB_CATEGORY, title: title };
};

export const SET_SELECTED_CATEGORY = "SET_SELECTED_CATEGORY";
export const setSelectedCategory = (isSelected) => {
  return { type: SET_SELECTED_CATEGORY, isSelected: isSelected };
};

export const ADD_NEW_SUBCATEGORY = "ADD_NEW_SUBCATEGORY";
export const addNewSubCategory = (
  mainCategory,
  newSubCategory,
  userId,
  categoryId
) => {
  return {
    type: ADD_NEW_SUBCATEGORY,
    mainCategory: mainCategory,
    newSubCategory: newSubCategory,
    userId: userId,
    categoryId: categoryId,
  };
};

export const EDIT_CATEGORY = "EDIT_CATEGORY";
export const editCategory = (
  mainCategory,
  prevCategory,
  newCategory,
  userId,
  categoryId
) => {
  return {
    type: EDIT_CATEGORY,
    mainCategory: mainCategory,
    prevCategory: prevCategory,
    newCategory: newCategory,
    userId: userId,
    categoryId: categoryId,
  };
};

export const DELETE_SUBCATEGORY = "DELETE_SUBCATEGORY";
export const deleteSubcategory = (
  mainCategory,
  subCategory,
  userId,
  categoryId
) => {
  return {
    type: DELETE_SUBCATEGORY,
    mainCategory: mainCategory,
    subCategory: subCategory,
    userId: userId,
    categoryId: categoryId,
  };
};

export const SET_FILTERED_MONTH = "SET_FILTERED_MONTH";
export const setFilteredMonth = (month, year) => {
  return { type: SET_FILTERED_MONTH, month: month, year: year };
};
