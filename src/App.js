import './App.css';
import axios from 'axios';
import { useState } from 'react';
import List from './List';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  const [pokemon, setPokemon] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");
  const [loading, setLoading] = useState(false);

  const getPokemon = async () => {
    setLoading(true);
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      toArray.push(res.data);
      setPokemonType(res.data.types[0].type.name);
      setPokemonData(toArray);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const handleChange = (event) => {
    setPokemon(event.target.value.toLowerCase());
    if (event.target.value === '') {
      setPokemonData([]);
      setPokemonType('');
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    getPokemon();
  }

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={
          <div className="App">
            <form onSubmit={handleSubmit}>
              <label>
                <input type="text" onChange={handleChange} placeholder="Enter Pokemon Name" style={{ backgroundColor: '#6aac67', color: 'black', padding: '10px 0', margin: '15px'}}/>
              </label>
            </form>
            {loading ? <p style={{ fontWeight: 'bold', color: 'black' }}>Loading...</p> :
            (pokemon ? pokemonData.map((data) => {
              return (
                <div className="container">
                  <img src={data.sprites["front_default"]} alt="pokemon" />
                  <div className="table">
                    <div className="tableBody">
                    <div className="title">{data.name}</div>
                      <div className="tableRow">
                        <div className="label">Type</div>
                        <div>{pokemonType}</div>
                      </div>
                      <div className="tableRow">
                        <div className="label">Height</div>
                        <div>{" "} {Math.round(data.height * 3.9)}"</div>
                      </div>
                      <div className="tableRow">
                        <div className="label">Weight</div>
                        <div>{" "} {Math.round(data.weight / 4.3)} lbs</div>
                      </div>
                      <div className="tableRow">
                        <div className="label">Number of Battles</div>
                        <div>{data.game_indices.length}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }) : null)}
            <List pokemonData={pokemon}/> {/* Using the List component */}
          </div>
        } />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;