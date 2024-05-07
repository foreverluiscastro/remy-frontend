import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [recipe, setRecipe] = useState(null);

  const [showFeed, setShowFeed] = useState("featured_recipes");


  const appContextValue = {
    user,
    setUser,
    recipe,
    setRecipe,
    showFeed,
    setShowFeed
  }

  return (
    <AppContext.Provider value={appContextValue}>
      { children }
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export { AppProvider };