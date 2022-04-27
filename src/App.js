import './App.css'
import {useEffect, useState} from 'react'
import GameCard from './components/GameCard'

const cardImages = [
  {"src" : "./img/ChickenCard.png", matched:false},
  {"src" : "./img/CrystalCard.png", matched:false},
  {"src" : "./img/EyesCard.png", matched:false},
  {"src" : "./img/Fish.png", matched:false},
  {"src" : "./img/HorrorCard.png", matched:false},
  {"src" : "./img/MeltingCard.png", matched:false},
  {"src" : "./img/PlantCard.png", matched:false},
  {"src" : "./img/RebelCard.png", matched:false},
  {"src" : "./img/RobotCard.png", matched:false},
  {"src" : "./img/RogueCard.png", matched:false},
  {"src" : "./img/SteriodsCard.png", matched:false},
  {"src" : "./img/YVCard.png", matched:false}
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null) // for first pick
  const [choiceTwo, setChoiceTwo] = useState(null) //for second
  const [disabled, setDisabled] = useState(false) //for disabling cards


  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
        .map((card) => ({...card, id: Math.random()}))
    
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  //handle choices
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)

  }
  //compare 2 selected cards
  useEffect(() => {
    if(choiceOne && choiceTwo){
      setDisabled(true) //stops player from selecting too soon
      if(choiceOne.src === choiceTwo.src){   //matched
        setCards(prevCards => {
          return prevCards.map(card => {
            //for each card, returns matched = true
            if(card.src === choiceOne.src){
              
              return {...card, matched: true}
            }
            else{
              return card
            }
          })
        })
        console.log("Matched!")
      }
      setTimeout(() => resetTurn(), 800); // 1 sec delay
    }
  }, [choiceOne, choiceTwo])

  //reset turn
  const resetTurn = () => {
    setDisabled(false)
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
  }

  //start a new game on load
  useEffect(() => {
    shuffleCards()
  }, [])
  return (
    <div className="App">
      <h1><span className="nuclear">Nuclear</span> <span className="throne">Throne</span></h1>
      <h3>Character Match</h3>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <GameCard  key={card.id} card={card} handleChoice = {handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched} disabled={disabled} />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App