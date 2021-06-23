import {
  SELECT_PLACE,
  EDIT_PLACE,
  SELECT_LOGO,
} from "../actions/favoritePlace";
import axios from "axios";

const data = { lidl: "www.lidl.de" };

const initialState = {
  favoritePlace: [
    {
      name: "Biedronka",
      //   logo: "https://assets.brandfetch.io/0f4497cd69d445d.png",
      logo: "https://logo.clearbit.com/biedronka.pl",
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
      //   const url = "https://logo.clearbit.com/";
      //   const newState = [...state.favoritePlace];
      //   const isName = (placeName) => placeName.name === state.selected;
      //   const index = newState.indexOf(newState.find(isName));

      //   const target = "biedronka.pl";

      //   axios
      //     .get(url + action.place + ".pl")
      //     .then((res) => {
      //       console.log(res.config.url);
      //       newState[index].logo = res.config.url;
      //     })
      //     .catch((err) => console.log(`error: ${err.response.status}`));
      newState[index].name = action.place;
      return { ...state, favoritePlace: [...newState] };
  }

  return state;
};
