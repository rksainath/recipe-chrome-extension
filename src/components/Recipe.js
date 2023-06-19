import React, { useEffect, useState, useLayoutEffect } from 'react'
import apiService from '../api'
import { hasFlag } from 'country-flag-icons'
import './Recipe.css'

const Recipe = (props) => {
  const [recipes, setRecipes] = useState([])
  const [selectedDish, setSelectedDish] = useState('')
  const [searchResults, setSearchResults] = useState()
  const [searchText, setSearchText] = useState('')

  const flag = (countryCode) => {
    let code = !!countryCode && countryCode.toUpperCase()

    code = code === 'SP' ? 'ES' : code

    const flgImg = hasFlag(code) ? <img alt={code} src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${code}.svg`} /> : ''

    return flgImg
  }

  useEffect(() => {
    apiService
      .getRecipes()
      .then((data) => {
        const updatedArray = data.message.map((obj, count) => ({
          ...obj,
          id: count,
        }))
        setRecipes(updatedArray)
        const spanishDish = data.message.filter((dish) => dish.name === 'Spanish Paella')
        spanishDish && setSelectedDish(spanishDish[0])
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  useEffect(() => {
    console.log(`selectedDish: ${JSON.stringify(selectedDish)}`)
    if (recipes.length !== 0) {
      if (!!selectedDish) {
        setSelectedDish(selectedDish)
      }
    }
  }, [recipes, selectedDish])

  useLayoutEffect(() => {
    if (!!searchText) {
      document.getElementById('searchResults').style.display = 'block'
    } else {
      document.getElementById('searchResults').style.display = 'none'
    }
  }, [searchText])

  const difficultyLevel = (difficultyLevel) => {
    const level = +difficultyLevel
    return level === 1 ? 'Medium' : level < 1 ? 'Easy' : 'Hard'
  }

  const produceUsed = (produce) => {
    const commaExists = !!produce ? produce.includes(',') : false
    const produceArray = commaExists ? produce.split(',') : []
    const finalElement =
      produceArray.length > 0 ? (
        <div>
          <span className='green'>{produceArray[0]}</span>
          <span className='white'>&nbsp;/&nbsp;</span>
          <span className='red'>{produceArray[1]}</span>
        </div>
      ) : (
        <div>
          <span className='green'>{produce}</span>
        </div>
      )
    return finalElement
  }
  const spiceUsed = (spice) => {
    const commaExists = !!spice ? spice.includes(',') : false
    const spiceArray = commaExists ? spice.split(',') : []
    const finalElement =
      spiceArray.length > 0 ? (
        <div>
          <span className='green'>{spiceArray[0]}</span>
          <span className='white'>&nbsp;/&nbsp;</span>
          <span className='sunfire'>{spiceArray[1]}</span>
        </div>
      ) : (
        <div>
          <span className='sunfire'>{spice}</span>
        </div>
      )
    return finalElement
  }

  const searchHandler = (event) => {
    performSearch(event.target.value)
  }

  const getColor = (difficultyLevel) => {
    const level = +difficultyLevel
    return level === 1 ? (
      <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M0 12V0H12V5.5L5.5 12H0Z' fill='#F73B00' />
      </svg>
    ) : level < 1 ? (
      <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M0 12V0H12V5.5L5.5 12H0Z' fill='#6CF700' />
      </svg>
    ) : (
      <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M0 12V0H12V5.5L5.5 12H0Z' fill='#FF003D' />
      </svg>
    )
  }

  const performSearch = (value) => {
    let searchVal = value.toLowerCase()
    const result = recipes
      .filter((dish) => dish.name.toLowerCase().includes(searchVal))
      .map((dish) => (
        <div className='items' key={dish.id} id={dish.id} onClick={() => performSelection(dish.id)}>
          <div className='dish'>
            <div className='dishContainer'>
              <div className='nameAndCountry'>
                {/* <div className='flag'>{flag(dish?.origin)}</div>
                <div className='nameContainer'>
                  <div className='name'>{dish.name}</div>
                </div> */}
                {flag(dish?.origin)}
                <p className='name'>{dish.name}</p>
              </div>
              <div className='diffLevel'>
                {/* <div className='difficultyIcon'>
                  <div className='iconContainer'>
                    <div className={`icon`}>{getColor(dish?.difficulty)}</div>
                  </div>
                </div>
                <div className='difficultyText'>
                  <div className='text'>{difficultyLevel(dish?.difficulty)}</div>
                </div> */}
                {getColor(dish?.difficulty)}
                <p className='text'>{difficultyLevel(dish?.difficulty)}</p>
              </div>
            </div>
            <div className='vline'></div>
            <div className='timetaken'>35 min</div>
          </div>
        </div>
      ))
    if (searchVal.length > 0) {
      setSearchText(searchVal)
    } else {
      setSearchText('')
    }
    setSearchResults(result)
  }

  //   const onSelection = (event) => {
  //     const id = +event.target.id
  //     console.log(id)
  //     performSelection(id)
  //   }

  const performSelection = (id) => {
    /* const selection = recipes.findIndex((dish) => dish.id === id)
    console.log(selection)
    selection !== -1 &&
      apiService
        .getRecipe(selection)
        .then((data) => {
          setSelectedDish(data.message)
          setSearchText('')
        })
        .catch((error) => {
          console.error(error)
        }) */
    !!id &&
      apiService
        .getRecipe(id)
        .then((data) => {
          setSelectedDish(data.message)
          setSearchText('')
        })
        .catch((error) => {
          console.error(error)
        })
  }

  return (
    <div className='container'>
      <div className='searchBar'>
        <div className='searchField'>
          <div className='searchGroup'>
            <div className='searchIcon'>
              <svg width='17' height='18' viewBox='0 0 17 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M10.0481 12.2266C9.09081 12.8225 7.9606 13.1667 6.75 13.1667C3.29822 13.1667 0.5 10.3684 0.5 6.91666C0.5 3.46488 3.29822 0.666656 6.75 0.666656C10.2018 0.666656 13 3.46488 13 6.91666C13 8.55474 12.3698 10.0456 11.3387 11.1601L16.0893 15.9107C16.4147 16.2362 16.4147 16.7638 16.0893 17.0892C15.7638 17.4147 15.2362 17.4147 14.9107 17.0892L10.0481 12.2266ZM11.3333 6.91666C11.3333 9.44796 9.28131 11.5 6.75 11.5C4.2187 11.5 2.16667 9.44796 2.16667 6.91666C2.16667 4.38535 4.2187 2.33332 6.75 2.33332C9.28131 2.33332 11.3333 4.38535 11.3333 6.91666Z'
                  fill='white'
                />
              </svg>
            </div>
            <div className='searchInput'>
              <input type='text' value={searchText} onChange={searchHandler} name='searchBox' id='searchBox' placeholder='Search cousine' />
            </div>
          </div>
        </div>
        <div id='searchResults'>{searchResults}</div>
      </div>
      <div className='recipeHeader'>
        <div className='heading'>
          <div className='flag'>{flag(selectedDish?.origin)}</div>
          <div className='title'>{selectedDish?.name}</div>
        </div>
        <div className='social'>
          <button>
            <svg width='8' height='7' viewBox='0 0 8 7' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M2.60948 6.96899C5.43897 6.96899 6.98702 4.62421 6.98702 2.59145C6.98702 2.52553 6.98555 2.45815 6.98262 2.39223C7.28376 2.17445 7.54365 1.9047 7.75005 1.59565C7.46959 1.72043 7.17182 1.80193 6.8669 1.83735C7.18795 1.6449 7.42834 1.34258 7.54351 0.986421C7.24148 1.16542 6.91117 1.29169 6.56675 1.35981C6.33469 1.11323 6.02786 0.949968 5.69371 0.89526C5.35955 0.840552 5.01668 0.897447 4.7181 1.05715C4.41952 1.21685 4.18187 1.47046 4.04188 1.77878C3.9019 2.08709 3.86737 2.43294 3.94366 2.76284C3.33208 2.73215 2.73378 2.57328 2.18755 2.29652C1.64131 2.01977 1.15933 1.63132 0.772856 1.15634C0.576428 1.49501 0.516321 1.89576 0.604751 2.27715C0.69318 2.65854 0.92351 2.99195 1.24893 3.20961C1.00462 3.20186 0.765671 3.13608 0.551811 3.01772V3.03676C0.551592 3.39217 0.674459 3.73668 0.899525 4.01173C1.12459 4.28679 1.43797 4.47542 1.78638 4.54555C1.56007 4.60747 1.32255 4.61649 1.09219 4.57192C1.19051 4.87757 1.3818 5.1449 1.63936 5.3366C1.89692 5.5283 2.2079 5.63481 2.52891 5.64126C1.98394 6.06934 1.31073 6.30153 0.617729 6.30044C0.494831 6.30025 0.372053 6.29271 0.250053 6.27788C0.954071 6.72954 1.77303 6.96943 2.60948 6.96899Z'
                fill='white'
              />
            </svg>
          </button>
          <button>
            <svg width='8' height='8' viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M7.75005 4.00002C7.75005 6.07108 6.07112 7.75002 4.00005 7.75002C1.92899 7.75002 0.250053 6.07108 0.250053 4.00002C0.250053 1.92895 1.92899 0.250015 4.00005 0.250015C6.07112 0.250015 7.75005 1.92895 7.75005 4.00002ZM4.33604 2.92704L1.81075 3.9675C1.36638 4.14091 1.6265 4.30348 1.6265 4.30348C1.6265 4.30348 2.00583 4.43354 2.33098 4.53109C2.65612 4.62863 2.82953 4.52025 2.82953 4.52025L4.35771 3.49062C4.89962 3.12213 4.76956 3.42559 4.6395 3.55565C4.35771 3.83744 3.89167 4.28181 3.5015 4.63947C3.32809 4.7912 3.41479 4.92126 3.49066 4.98629C3.71121 5.17291 4.23053 5.51223 4.46662 5.66649C4.53217 5.70933 4.57589 5.73789 4.58531 5.74496C4.6395 5.78831 4.94297 5.9834 5.12722 5.94005C5.31147 5.89669 5.33315 5.64741 5.33315 5.64741L5.6041 3.94583C5.62818 3.7863 5.65226 3.63011 5.67471 3.48447C5.73311 3.10569 5.78052 2.79819 5.78835 2.6886C5.82086 2.3201 5.43069 2.47184 5.43069 2.47184C5.43069 2.47184 4.58531 2.81866 4.33604 2.92704Z'
                fill='white'
              />
            </svg>
          </button>
          <button>
            <svg width='8' height='7' viewBox='0 0 8 7' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M1.13942 2.0897C1.1488 1.99752 1.11348 1.90658 1.04473 1.8447L0.344733 1.00095V0.875015H2.51911L4.19973 4.56095L5.67723 0.875015H7.75005V1.00095L7.1513 1.57502C7.09973 1.61439 7.07411 1.67908 7.08473 1.74314V5.96126C7.07411 6.02501 7.09973 6.0897 7.1513 6.12908L7.73598 6.70314V6.82908H4.79473V6.70314L5.40067 6.11502C5.46005 6.05564 5.46005 6.03814 5.46005 5.9472V2.53783L3.77598 6.81533H3.54848L1.58755 2.53783V5.4047C1.5713 5.52502 1.6113 5.64658 1.69598 5.73345L2.4838 6.68908V6.81533H0.250046V6.68908L1.03786 5.73345C1.12223 5.64627 1.15973 5.52408 1.13942 5.4047V2.0897V2.0897Z'
                fill='white'
              />
            </svg>
          </button>
          <button className='addRecipe' onClick={props.handleAddRecipe}>
            <span>+ Add recipe</span>
          </button>
        </div>
      </div>
      <div className='recipeSummary'>
        <div className='toast'>
          <div className='difficulty'>
            <div className='level'>
              <div>
                <img src='/yummazzo-logo.png' alt='' />
              </div>
              <div>Difficulty: {difficultyLevel(selectedDish?.difficulty)}</div>
            </div>
          </div>
          <div className='description'>{selectedDish?.description}</div>
          <button>
            <p>View Full Recipe</p>
          </button>
        </div>
      </div>
      <div className='recipeDetails'>
        <div className='row row-1'>
          <div className='col col-1'>
            <div className='textTitle'>Seafood</div>
            <div className='white'>{selectedDish?.protein}</div>
          </div>
          <div className='col col-2'>
            <div className='textTitle'>Produce</div>
            {produceUsed(selectedDish?.produce)}
          </div>
        </div>
        <div className='row row-2'>
          <div className='col col-1'>
            <div className='textTitle'>Spices</div>
            <div>
              {/* <span className='sunfire'>{selectedDish && selectedDish?.spice}</span> */}
              {spiceUsed(selectedDish?.spice)}
            </div>
          </div>
          <div className='col col-2'>
            <div className='textTitle'>Olive Oil</div>
            <div className='sunfire'>{selectedDish?.cookingOil}</div>
          </div>
        </div>
        <div className='row row-3'>
          <div className='col col-1'>
            <div className='textTitle'>Volume/Weight</div>
            <div className='white'>{selectedDish?.volume}g</div>
          </div>
          <div className='col col-2'>
            <div className='textTitle'>Serves</div>
            <div className='white'>{selectedDish?.serves}</div>
          </div>
        </div>
        <div className='row row-4'>
          <div className='col col-1'>
            <div className='textTitle'>Authenticity</div>
            <div className='sunfire'>{selectedDish?.authenticity}</div>
          </div>
          <div className='col col-2'>
            <div className='textTitle'>Stock</div>
            <div className='sunfire'>{selectedDish?.stock}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recipe
