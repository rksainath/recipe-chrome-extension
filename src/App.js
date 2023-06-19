import React, { useState } from 'react'
import Recipe from './components/Recipe'
import AddRecipe from './components/AddRecipe'

function App() {
  const [showMain, setShowMain] = useState(true)

  const handleAddRecipe = () => {
    setShowMain(false)
  }

  const handleBackClick = () => {
    setShowMain(true)
  }

  return <>{showMain ? <Recipe handleAddRecipe={handleAddRecipe} /> : <AddRecipe handleBackClick={handleBackClick} />}</>
}

export default App
