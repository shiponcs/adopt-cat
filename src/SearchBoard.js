import React, { useState, useEffect, useContext } from "react";
import pet from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

const SearchBoards = () => {
  const [pets, updatePets] = useState([]);
  const [breeds, updateBreeds] = useState([]);
  const [country, updateCountry] = useState("Seattle, WA");
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [theme, updateTheme] = useContext(ThemeContext);

  const searchPets = async function () {
    console.log(breed);
    try {
      const { animals } = await pet.animals({
        country,
        breed,
        type: "cat",
      });
      updatePets(animals || []);
      console.log(animals);
    } catch (err) {
      console.log(err);
    }
  };

  const getDataFromPetAPI = async function () {
    try {
      const { breeds } = await pet.breeds("cat");
      setBreed(breeds[0].name); // set first breed as default
      const breedNameArray = breeds.map(({ name }) => name);
      updateBreeds(breedNameArray);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("useEffect runs");
    getDataFromPetAPI();
  }, []); // no depedency so it runs only one

  return (
    <div className="search-boards">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchPets();
        }}
      >
        <label htmlFor="country">
          Country
          <input
            type="text"
            id="country"
            value={country}
            placeholder="Country"
            onChange={(e) => updateCountry(e.target.value)}
          />
        </label>
        <BreedDropdown />
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={(e) => updateTheme(e.target.value)}
            onBlur={(e) => updateTheme(e.target.value)}
          >
            <option value="skyblue">Skyblue</option>

            <option value="peru">Peru</option>
            <option value="darkblue">Darkblue</option>
            <option value="green">Green</option>
            <option value="white">White</option>
          </select>
        </label>
        <button className="search-btn" style={{ backgroundColor: theme }}>
          Search
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchBoards;
