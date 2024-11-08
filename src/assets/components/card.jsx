import  { useState, useEffect } from 'react'

function shuffleArray(array) {
  return [...array].sort(() => 0.5 - Math.random())
}

export default function PokemonMemoryGame() {
  const [allCards, setAllCards] = useState([
    { id: 1, linkToApi: 'https://pokeapi.co/api/v2/pokemon/1/', isClicked: false },
    { id: 2, linkToApi: 'https://pokeapi.co/api/v2/pokemon/2/', isClicked: false },
    { id: 3, linkToApi: 'https://pokeapi.co/api/v2/pokemon/3/', isClicked: false },
    { id: 4, linkToApi: 'https://pokeapi.co/api/v2/pokemon/4/', isClicked: false },
    { id: 5, linkToApi: 'https://pokeapi.co/api/v2/pokemon/5/', isClicked: false },
    { id: 6, linkToApi: 'https://pokeapi.co/api/v2/pokemon/6/', isClicked: false },
    { id: 7, linkToApi: 'https://pokeapi.co/api/v2/pokemon/7/', isClicked: false },
    { id: 8, linkToApi: 'https://pokeapi.co/api/v2/pokemon/8/', isClicked: false },
  ])
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0)
  
 
  const handleCardClick = (id) => {
    
    const currentCard = allCards.find(card => card.id === id)
    
    if (currentCard.isClicked) {
      
      setCurrentScore(0)
      setAllCards(prevCards => {
        
        const newCards = prevCards.map(card => ({
          ...card,
          isClicked: false
        }))
        return shuffleArray(newCards)
      })
    } else {
      
      setCurrentScore(prevScore => {
        const newScore = prevScore + 1
        setHighScore(prevHighScore => Math.max(prevHighScore, newScore))
        return newScore
      })
      setAllCards(prevCards => {
        const newCards = prevCards.map(card => 
          card.id === id ? { ...card, isClicked: true } : card
        )
        return shuffleArray(newCards)
      })
    }
  }

  return (
    <div style={{ padding: '1rem' }}>
      <div className="scores">Score: {currentScore}   |    HighScore: {highScore}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        {allCards.map(card => (
          <PokemonCard
            key={card.id}
            id={card.id}
            linkToApi={card.linkToApi}
            isClicked={card.isClicked}
            handleClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
    </div>
  )
}

function PokemonCard({ id, linkToApi, isClicked, handleClick }) {
  const [imgUrl, setImgUrl] = useState(null)

  useEffect(() => {
    fetch(linkToApi)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        setImgUrl(data.sprites.other['official-artwork'].front_default)
      })
      .catch(error => {
        console.error('Error fetching Pokemon data:', error)
      })
  }, [linkToApi])

  const cardStyle = {
    cursor: 'pointer',
    transition: 'all 0.3s',
    
    borderRadius: '8px',
    overflow: 'hidden',
  }

  const contentStyle = {
    padding: '1rem',
  }

  const imageStyle = {
    width: '100%',
    height: 'auto',
  }

  const loadingStyle = {
    width: '100%',
    height: '12rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e0e0',
  }

  return (
    <div style={cardStyle} onClick={handleClick}>
      <div style={contentStyle}>
        {imgUrl ? (
          <img src={imgUrl} alt={`Pokemon ${id}`} style={imageStyle} />
        ) : (
          <div style={loadingStyle}>
            <p>Loading...</p>
          </div>
        )}
      </div>
    </div>
  )
}