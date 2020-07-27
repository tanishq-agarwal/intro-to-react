import React, {useState,useEffect} from "react";   //hooks
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./usedropdown";
import Results from "./Results";

const SearchParams = () => {
  const [location,setLocation] = useState("Seattle, WA");
    //const [animal, updateAnimal] = useState("");
  //const [breed , setBreed] = useState("");
  const [breeds , setBreeds] = useState([]);
  const [animal , AnimalDropdown] = useDropdown("Animal","dog",ANIMALS);
  const [breed , BreedDropdown,setBreed] = useDropdown("Breed","",breeds);
  const [pets,setPets] = useState([]);

  async function requestPets() {
    const {animals} = await pet.animals({
      location,
      breed,
      type: animal
    });
    setPets(animals || [])
  }

  useEffect(() => {
    setBreeds([]);
    setBreed("");
    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal,setBreed, setBreeds]);   //when animal changes setBreed calls(whenever animal changes ,u can give new breed)

  return (
    <div className="search-params"> 
      <form 
      onSubmit={e => {
        e.preventDefault();
        requestPets();
      }}
      >
        <label htmlFor="location">
          Location
          <input id="location" 
          value={location} 
          placeholder="Location"
          onChange={e => setLocation(e.target.value)}/>
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;


/*
<label htmlFor="animal">
Animal
<select
  id="animal"
  value={animal}
  onChange={e => updateAnimal(e.target.value)}
  onBlur={e => updateAnimal(e.target.value)}
>
    <option>All</option>
    {ANIMALS.map(animal => (
        <option key={animal} value={animal}>{animal}</option>
    ))}
 </select>
</label>
<label htmlFor="breeds">
      Breed
      <select
      id="breed"
      value={breed}
      onChange={e => setBreed(e.target.value)}
      onBlur = {e => setBreed(e.target.value)}
      disabled = { breeds.length === 0} //if brreds.length is zero ,it would be disabled
      >
        <option>All</option>
        {breeds.map(breed => (
          <option key={breed} value={breed} >{breed}</option>
        )) }

      </select>
</label>
*/