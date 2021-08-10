export const SELECT_PLACE = "SELECT_PLACE";
export const selectPlace = (place) => {
  return { type: SELECT_PLACE, place: place };
};

export const EDIT_PLACE = "EDIT_PLACE";
export const editPlace = (place, logo) => {
  return { type: EDIT_PLACE, place: place, logo: logo };
};

export const SELECT_LOGO = "SELECT_LOGO";
export const selecLogo = (logo) => {
  return { type: SELECT_LOGO, logo: logo };
};

export const LOADING_FAVORITE_PLACE_FROM_DB = "LOADING_FAVORITE_PLACE_FROM_DB";
export const loafingFavoritePlaceFromDB = (array) => {
  return { type: LOADING_FAVORITE_PLACE_FROM_DB, array: array };
};
