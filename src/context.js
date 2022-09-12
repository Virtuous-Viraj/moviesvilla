import React, { useContext, useEffect, useState } from "react";
const AppContext = React.createContext();


export const API_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const AppProvider = ({ children }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ show: "false", msg: "" });
  const [movie, setMovie] = useState([]);
  const [query, setQuery] = useState("hack");//default
  const getMovies = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

      if (data.Response === "True") {
        setIsError({ show: false, msg: data.Error })
        setIsLoading(false);
        setMovie(data.Search);
      }
      else {
        setIsError({ show: true, msg: data.Error })
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    let timerOut = setTimeout(() => {
      getMovies(`${API_URL}&s=${query}`);
    }, 1000);

    return () => clearTimeout(timerOut);
  }, [query]);
  return <AppContext.Provider value={{ isLoading, isError, movie, query, setQuery }}>
    {children}
  </AppContext.Provider>;
};
//global custom hook
const useGlobalContext = () => {
  return useContext(AppContext);
}

export { AppContext, AppProvider, useGlobalContext };