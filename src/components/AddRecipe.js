import React, { useState } from 'react'
import './AddRecipe.css'
import { countries } from 'countries-list'
import apiService from '../api'

const AddRecipe = (props) => {
  const [name, setName] = useState('')
  const [origin, setOrigin] = useState('')
  const [description, setDescription] = useState('')
  const [diff, setDiff] = useState(1)
  const [protein, setProtein] = useState('')
  const [produce, setProduce] = useState('')
  const [spice, setSpice] = useState('')
  const [cookingOil, setCookingOil] = useState('')
  const [volume, setVolume] = useState(0)
  const [serves, setServes] = useState(1)
  const [auth, setAuth] = useState('Unverified')
  const [stock, setStock] = useState('')

  const createRecipe = async (payload) => {
    try {
      const newRecipe = await apiService.createRecipe(payload)
      console.log(newRecipe)
      alert(newRecipe.message)
      resetValues()
    } catch (error) {
      const errMsg = error.message.replace(/,/g, '\n')
      console.log(errMsg)
      alert(errMsg)
    }
  }

  const countriesList = Object.entries(countries).map(([code, country]) => ({
    name: country.name,
    code: code,
  }))

  const difficulty = [
    { name: 'Easy', code: 0 },
    { name: 'Medium', code: 1 },
    { name: 'Hard', code: 2 },
  ]

  const authenticity = [
    { name: 'Verified', code: 'Verified' },
    { name: 'Unverified', code: 'Unverified' },
  ]

  const resetValues = () => {
    setName('')
    setOrigin('')
    setDescription('')
    setDiff(1)
    setProtein('')
    setProduce('')
    setSpice('')
    setCookingOil('')
    setVolume(0)
    setServes(1)
    setAuth('Unverified')
    setStock('')
  }

  const onSubmitHandler = () => {
    const finalPayload = {
      name: !!name ? name : undefined,
      origin: !!origin ? origin : undefined,
      description: !!description ? description : undefined,
      difficulty: !!diff ? diff : undefined,
      protein: !!protein ? protein : undefined,
      produce: !!produce ? produce : undefined,
      spice: !!spice ? spice : undefined,
      cookingOil: !!cookingOil ? cookingOil : undefined,
      volume: !!volume ? volume : undefined,
      serves: !!serves ? serves : undefined,
      authenticity: !!auth ? auth : undefined,
      stock: !!stock ? stock : undefined,
    }
    createRecipe(finalPayload)
  }

  const backArrowHandler = () => {
    props.handleBackClick()
    resetValues()
  }
  return (
    <div className='newRecipeContainer'>
      <div className='row row-0'>
        <div className='newRecipeHeader'>
          <div className='arrowLeft' onClick={backArrowHandler}>
            <svg width='24' height='25' viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M15.41 17.09L10.83 12.5L15.41 7.91L14 6.5L8 12.5L14 18.5L15.41 17.09Z' fill='#6B7280' />
            </svg>
          </div>
          <div className='heading'>Add new recipe</div>
        </div>
        <div className='hline'></div>
      </div>
      <div className='row row-1'>
        <div className='col col-0'>
          <div className='col-heading'>
            <div className='textHeading'>Name</div>
          </div>
          <div className='col-value'>
            <input
              type='text'
              value={name}
              onChange={(e) => {
                if (e.target.value.length < 40) {
                  setName(e.target.value)
                }
              }}
              placeholder='recipe name'
            />
          </div>
        </div>
        <div className='col col-1'>
          <div className='col-heading'>
            <div className='textHeading'>Origin</div>
          </div>
          <div className='col-value'>
            <select className='dropdown-container' value={origin} onChange={(e) => setOrigin(e.target.value)}>
              {countriesList.map((country, index) => (
                <option key={index} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className='row row-2'>
        <div className='col col-0'>
          <div className='col-heading'>
            <div className='textHeading'>Description</div>
          </div>
          <div className='col-value'>
            <textarea
              placeholder='Describe your recipe...'
              value={description}
              onChange={(e) => {
                if (e.target.value.length < 201) {
                  setDescription(e.target.value)
                }
              }}
            ></textarea>
          </div>
          <div className='charLimit'>
            <p>{!!description ? description?.length : 0}/200 characters</p>
          </div>
        </div>
      </div>
      <div className='row row-3'>
        <div className='col col-0'>
          <div className='col-heading'>
            <div className='textHeading'>Difficulty</div>
          </div>
          <div className='col-value'>
            <select value={diff} onChange={(e) => setDiff(e.target.value)}>
              {difficulty.map((country, index) => (
                <option key={index} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='col col-1'>
          <div className='col-heading'>
            <div className='textHeading'>Protein</div>
          </div>
          <div className='col-value'>
            <input
              type='text'
              value={protein}
              onChange={(e) => {
                if (e.target.value.length < 15) {
                  setProtein(e.target.value)
                }
              }}
              placeholder='protein'
            />
          </div>
        </div>
      </div>
      <div className='row row-4'>
        <div className='col col-0'>
          <div className='col-heading'>
            <div className='textHeading'>Spices</div>
          </div>
          <div className='col-value'>
            <input
              type='text'
              value={spice}
              onChange={(e) => {
                if (e.target.value.length < 15) {
                  setSpice(e.target.value)
                }
              }}
              placeholder='spices'
            />
          </div>
        </div>
        <div className='col col-1'>
          <div className='col-heading'>
            <div className='textHeading'>Cooking Oil</div>
          </div>
          <div className='col-value'>
            <input
              type='text'
              value={cookingOil}
              onChange={(e) => {
                if (e.target.value.length < 15) {
                  setCookingOil(e.target.value)
                }
              }}
              placeholder='oil'
            />
          </div>
        </div>
      </div>
      <div className='row row-5'>
        <div className='col col-0'>
          <div className='col-heading'>
            <div className='textHeading'>Volume/Weight</div>
          </div>
          <div className='col-value'>
            <input type='number' value={volume} onChange={(e) => setVolume(e.target.value)} placeholder='vol/weight' />
          </div>
        </div>
        <div className='col col-1'>
          <div className='col-heading'>
            <div className='textHeading'>Produce</div>
          </div>
          <div className='col-value'>
            <input
              type='text'
              value={produce}
              onChange={(e) => {
                if (e.target.value.length < 15) {
                  setProduce(e.target.value)
                }
              }}
              placeholder='produce'
            />
          </div>
        </div>
      </div>
      <div className='row row-6'>
        <div className='col col-0'>
          <div className='col-heading'>
            <div className='textHeading'>Serves</div>
          </div>
          <div className='col-value'>
            <input type='number' value={serves} onChange={(e) => setServes(e.target.value)} placeholder='serves' />
          </div>
        </div>
        <div className='col col-1'>
          <div className='col-heading'>
            <div className='textHeading'>Authenticity</div>
          </div>
          <div className='col-value'>
            <select value={auth} onChange={(e) => setAuth(e.target.value)}>
              {authenticity.map((country, index) => (
                <option key={index} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className='row row-7'>
        <div className='col col-0'>
          <div className='col-heading'>
            <div className='textHeading'>Stock</div>
          </div>
          <div className='col-value'>
            <input
              type='text'
              value={stock}
              onChange={(e) => {
                if (e.target.value.length < 15) {
                  setStock(e.target.value)
                }
              }}
              placeholder='stocks'
            />
          </div>
        </div>
      </div>
      <button className='btn' onClick={onSubmitHandler}>
        Add Recipe
      </button>
    </div>
  )
}

export default AddRecipe
