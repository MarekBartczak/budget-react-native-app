export const SELECT_PLACE = "SELECT_PLACE";

export const selectPlace = (place) => {
  return { type: SELECT_PLACE, place: place };
};
