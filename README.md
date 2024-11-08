# Pokemon Memory Game

A fun and interactive memory game featuring Pokemon characters built with React.

## Game Overview

This Pokemon Memory Game challenges players to click on each Pokemon card only once. The game fetches Pokemon data from the PokeAPI to display official artwork for each Pokemon.

## Key Features

- Dynamic Pokemon card generation using PokeAPI
- Score tracking (current score and high score)
- Card shuffling after each click
- Responsive grid layout

## Implementation Details

### Main Component: PokemonMemoryGame

The `PokemonMemoryGame` component is the core of the application. It manages the game state and renders the Pokemon cards.

Key aspects:
- Uses React hooks (`useState`) for state management
- Implements game logic in the `handleCardClick` function
- Renders a grid of `PokemonCard` components

```jsx
export default function PokemonMemoryGame() {
  const [allCards, setAllCards] = useState([
    { id: 1, linkToApi: 'https://pokeapi.co/api/v2/pokemon/1/', isClicked: false },
    // ... more cards
  ])
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0)

  const handleCardClick = (id) => {
    // Game logic implementation
    // Updates scores and card states
    // Shuffles cards after each click
  }

  return (
    <div>
      {/* Render score display and Pokemon cards */}
    </div>
  )
}
