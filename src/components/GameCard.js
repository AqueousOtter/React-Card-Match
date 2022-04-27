
import React from 'react'
import  './GameCard.css'

export default function SingleCard({card, handleChoice, flipped, disabled}) {

    const handleClick = () => {
      if(!disabled){
        handleChoice(card)
      }
    }


  return (
    <div className="card" >
            <div className={flipped? "flipped" : ""}>
                <img className="front" src={card.src} alt="Card Front."/>
                <img className="back" src='./img/back.png' onClick={handleClick} alt='Card back' />
            </div>
    </div>
  )
}
