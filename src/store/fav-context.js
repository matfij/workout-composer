import { createContext, useState } from "react";

const FavContext = createContext({
  favs: [],
  favCount: 0,
  addFav: (newFav) => {},
  removeFav: (name) => {},
  isFinite: (name) => {},
});

export const FavContextProvider = (props) => {
  const [favExercises, setFavExercises] = useState([]);

  const addFav = (newFav) => {
    setFavExercises((prevFav) => {
        return prevFav.concat(newFav)
    });
  };

  const removeFav = (name) => {
    setFavExercises((prevFav) => {
        return prevFav.filter(x => x.name !== name);
    });
  };

  const isFav = (name) => {
    return favExercises.some(x => x.name === name);
  };

  const context = {
    favs: favExercises,
    favCount: favExercises.length,
    addFav: addFav,
    removeFav: removeFav,
    isFav: isFav,
  };

  return (
    <FavContext.Provider value={context}>{props.children}</FavContext.Provider>
  );
};

export default FavContext;
