import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DisplayPokemon from './Components/DisplayPokemon';
import UserForm from './Components/UserForm';
import PokeDex from './Components/Pokedex';

function App() {
// setting the pokemon
  const [pokemon, setPokemon] = useState([]);
  const randomPokemonID = Math.ceil(Math.random() * 300);
  const [userInput, setUserInput] = useState('');
  const [correctArr, setCorrectArr] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState();
  const [isColor, setIsColor] = useState(false);
  const [hint, setHint] = useState(false);
  const [theme, setTheme] = useState("")

  //  themes for the gameboy color
  const handleThemeSwitch = (color) => {
    setTheme(color)
  }
  // function to retrieve Api 
  function loadNewPokemon() {
      axios({
        url: `https://pokeapi.co/api/v2/pokemon/${randomPokemonID}`,
        method: "GET",
      })
      .then((response) => {
        setPokemon(response.data)
        setUserInput('');
        setIsColor(false)
        setHint(false)
      })
      .catch(err => {
        console.log(err, "Something went wrong!")
      });
    }
  useEffect(() => {
    loadNewPokemon()
    },[])
  
  return (
    <div className='App'>
       <div class="sidebar">
        <button onClick={() => handleThemeSwitch("redBg")} className='changeColor redButton'></button> 
        <button onClick={() => handleThemeSwitch("blueBg")} className='changeColor blueButton'></button> 
        <button onClick={() => handleThemeSwitch("pinkBg")} className='changeColor pinkButton'></button> 
        <button onClick={() => handleThemeSwitch("greenBg")}className='changeColor greenButton'></button> 
        <button onClick={() => handleThemeSwitch("purpleBg")}className='changeColor purpleButton'></button>
      </div>
     <section className='head'>
        <h1>Gotta Catch' Em All</h1>
    
          <PokeDex 
              correctArr={correctArr}
              pokemon={pokemon}
          />
      </section>
    
      <div className="pokemonApp">

        <div className={`flexContainerRow ${theme}`}>
          <div className='screen'>
            <DisplayPokemon  
            pokemon={pokemon}
            correctAnswer={correctAnswer}
            setCorrectAnswer={setCorrectAnswer}
            isColor={isColor}
            setIsColor={setIsColor}
            hint={hint}
            setHint={setHint}
            />
        </div>
        <div className='rightSide'>
              <UserForm
                setPokemon={setPokemon}
                pokemon={pokemon}
                userInput={userInput} 
                setUserInput={setUserInput} 
                correctArr={correctArr} 
                setCorrectArr={setCorrectArr} 
                setIsColor={setIsColor}
                isColor={isColor}
                hint={hint}
                setHint={setHint}
              />
              <button 
              className="loadNewPokemon"onClick={() => {loadNewPokemon()}}
              > 
                <img src="images/pokeball.png" 
                alt="pokeball image" 
                className='pokeballImage'
                />
                <div 
                className='newPokemonLabel'
                > New Pokemon
                </div>
              </button>
              <div className="gameboyDesign">
              {/* Gameboy D-pad art taken from @Bidji */}
                  <div id="cross" className='gameboyButtons'>  
                      <div id="leftcross">
                        <div id="leftT"></div>
                      </div>
                      <div id="topcross">
                        <div id="upT"></div>
                      </div>
                      <div id="rightcross">
                        <div id="rightT"></div>
                      </div>
                      <div id="midcross">
                        <div id="midCircle"></div>
                      </div>
                      <div id="botcross">
                        <div id="downT"></div>
                      </div> 
                  </div>
                  <div className='abButton'>
                      <div className='aButton'>A</div>
                      <div className='bButton'>B</div>
                  </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  );
  }

export default App;