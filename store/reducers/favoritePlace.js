import {
  SELECT_PLACE,
  EDIT_PLACE,
  SELECT_LOGO,
} from "../actions/favoritePlace";

const initialState = {
  favoritePlace: [
    {
      name: "Biedronka",
      logo: "https://assets.brandfetch.io/0f4497cd69d445d.png",
    },
    { name: "Lidl", logo: "https://assets.brandfetch.io/cfcdf51c90bc4a1.png" },
    { name: "Orlen", logo: "https://assets.brandfetch.io/15d30edd9e64469.png" },
    {
      name: "Auchan",
      logo: "https://assets.brandfetch.io/99a4dd6baf884e5.png",
    },
    { name: "Empik", logo: "https://assets.brandfetch.io/270ec4a92e8646c.png" },
    {
      name: "Castorama",
      logo: "https://assets.brandfetch.io/dd42e47f5b72439.png",
    },
  ],
  selected: "",
  selectedLogo: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_PLACE:
      return { ...state, selected: action.place };
    case SELECT_LOGO:
      return { ...state, selectedLogo: action.logo };
    case EDIT_PLACE:
      return { ...state };
  }

  return state;
};
