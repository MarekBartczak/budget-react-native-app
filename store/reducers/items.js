import {
  DEL_ITEM,
  ADD_ITEM_TO_THE_RECEIPT,
  SET_RECEIPT_PLACE,
  SET_RECEIPT_DATE,
  ADD_ITEMS_FROM_RECEIPT,
  LOADING_EXPENSE_FROM_DB,
  LOADING_CATEGORY_FROM_DB,
  CLEAR_STATE_AFTER_LOGOUT,
  SELECT_MAIN_CATEGORY,
  SELECT_SUB_CATEGORY,
  SET_SELECTED_CATEGORY,
  ADD_NEW_SUBCATEGORY,
  EDIT_CATEGORY,
  DELETE_SUBCATEGORY,
  SET_FILTERED_MONTH,
} from "../actions/items";
import deleteDataInCloud from "../../functions/cloud/deleteDataInCloud";
const initialState = {
  categoryList: [],
  items: [],
  view: {
    month: "",
    year: "",
  },
  receipt: {
    place: "",
    date: "",
    items: [],
  },
  category: {
    selected: false,
    main: "",
    sub: "",
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_EXPENSE_FROM_DB:
      return { ...state, items: [...action.array] };
    case LOADING_CATEGORY_FROM_DB:
      return { ...state, categoryList: [action.array] };
    case DEL_ITEM:
      const filteredItem = state.items.find((el) => el.id === action.itemId);
      deleteDataInCloud.expense(filteredItem.firebaseId, action.userId);
      if (state.items.length > 0) {
        let current = [...state.items];
        let removeItem = current.map((el) => el.id).indexOf(action.itemId);
        current.splice(removeItem, 1);
        return { ...state, items: current };
      } else {
        return { ...state };
      }
    case ADD_ITEM_TO_THE_RECEIPT:
      return {
        ...state,
        receipt: {
          ...state.receipt,
          items: [...state.receipt.items, action.item],
        },
      };
    case SET_RECEIPT_DATE:
      return { ...state, receipt: { ...state.receipt, date: action.date } };
    case SET_RECEIPT_PLACE:
      return { ...state, receipt: { ...state.receipt, place: action.place } };
    case ADD_ITEMS_FROM_RECEIPT:
      return {
        ...state,
        items: [...state.items, ...action.list],
        receipt: { place: "", date: "", items: [] },
      };
    case CLEAR_STATE_AFTER_LOGOUT:
      return { ...state, items: [] };
    case SELECT_MAIN_CATEGORY:
      return { ...state, category: { main: action.title, sub: "" } };
    case SELECT_SUB_CATEGORY:
      return { ...state, category: { ...state.category, sub: action.title } };
    case SET_SELECTED_CATEGORY:
      return {
        ...state,
        category: { ...state.category, selected: action.isSelected },
      };
    case ADD_NEW_SUBCATEGORY:
      let newCategory = { ...state, ...state.categoryList };
      let listCategory = newCategory.categoryList[0][action.mainCategory].list;
      listCategory.push(action.newSubCategory);

      return { ...state, categoryList: newCategory };

    case DELETE_SUBCATEGORY:
      let categoryList = {
        ...state,
        ...state.categoryList,
      };
      const subCategoryList =
        categoryList.categoryList[0][action.mainCategory].list;
      const indexOfSubCategoryElement = subCategoryList.indexOf(
        action.subCategory
      );
      subCategoryList.splice(indexOfSubCategoryElement, 1);
      return {
        ...state,
        categoryList: categoryList,
      };
    case EDIT_CATEGORY:
      let newCategoryList = { ...state, ...state.categoryList };
      const list = newCategoryList[0][action.mainCategory].list;
      const index = list.indexOf(action.prevCategory);
      list[index] = action.newCategory;

      return {
        ...state,
        categoryList: newCategoryList,
      };
    case SET_FILTERED_MONTH:
      // console.log(action.year);
      // console.log(action.month);
      return { ...state, view: { month: action.month, year: action.year } };
  }
  return state;
};
