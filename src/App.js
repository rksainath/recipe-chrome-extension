import './App.css'
import { Dishes } from './Dishes'
import React, { useEffect, useState, useLayoutEffect } from 'react'

function App() {
  const [dishes, setDishes] = useState([])
  const [selectedDish, setSelectedDish] = useState('')
  const [searchResults, setSearchResults] = useState()
  const [searchText, setSearchText] = useState('')

  const spainFlag = (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clip-path='url(#clip0_1_7337)'>
        <path fill-rule='evenodd' clip-rule='evenodd' d='M0 16.211H24V18.5901C24 21.5207 21.6023 23.9183 18.6718 23.9183H5.32819C2.39766 23.9183 0 21.5207 0 18.5901V16.211Z' fill='#D80027' />
        <path fill-rule='evenodd' clip-rule='evenodd' d='M24 7.78907H0V5.40988C0 2.47931 2.39766 0.0816498 5.32819 0.0816498H18.6718C21.6023 0.0816498 24 2.47931 24 5.40988V7.78907Z' fill='#D80027' />
        <path d='M0 7.78908H24V16.211H0V7.78908Z' fill='#FFDA44' />
      </g>
      <defs>
        <clipPath id='clip0_1_7337'>
          <rect width='24' height='24' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )

  const japanFlag = (
    <svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
      <rect width='24' height='24' fill='#FFF' />
      <circle cx='12' cy='12' r='8' fill='#C70039' />
    </svg>
  )

  const mexicoFlag = (
    <svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
      <path d='M0 16.211H24V18.5901C24 21.5207 21.6023 23.9183 18.6718 23.9183H5.32819C2.39766 23.9183 0 21.5207 0 18.5901V16.211Z' fill='#006847' />
      <path d='M24 7.78907H0V5.40988C0 2.47931 2.39766 0.0816498 5.32819 0.0816498H18.6718C21.6023 0.0816498 24 2.47931 24 5.40988V7.78907Z' fill='#006847' />
      <path d='M0 7.78908H24V16.211H0V7.78908Z' fill='#FFF' />
      <path d='M0 7.78908H24V9.78908H0V7.78908Z' fill='#D2232A' />
      <path d='M0 9.78907H24V11.7891H0V9.78907Z' fill='#FFF' />
      <path d='M0 11.7891H24V13.7891H0V11.7891Z' fill='#D2232A' />
      <path d='M0 13.7891H24V15.7891H0V13.7891Z' fill='#FFF' />
    </svg>
  )

  const flag = () => {
    if (selectedDish?.origin === 'Spain') {
      return spainFlag
    } else if (selectedDish?.origin === 'Japan') {
      return japanFlag
    } else return mexicoFlag
  }

  useEffect(() => {
    setDishes(Dishes)
    const spanishDish = Dishes.filter((dish) => dish.id === 1)
    setSelectedDish(spanishDish[0])
  }, [])

  useEffect(() => {
    if (dishes.length !== 0) {
      if (!!selectedDish) {
        setSelectedDish(selectedDish)
      }
    }
  }, [dishes, selectedDish])

  useLayoutEffect(() => {
    if (!!searchText) {
      document.getElementById('searchResults').style.display = 'block'
    } else {
      document.getElementById('searchResults').style.display = 'none'
    }
  }, [searchText])

  const searchHandler = (e) => {
    let searchVal = e.target.value
    searchVal = searchVal.toLowerCase()
    const result = dishes
      .filter((dish) => dish.name.toLowerCase().includes(searchVal))
      .map((dish) => (
        <div className='items' onClick={onSelection} key={dish.id}>
          {dish.name}
        </div>
      ))
    console.log(result)
    if (searchVal.length > 0) {
      setSearchText(searchVal)
    } else {
      setSearchText('')
    }
    setSearchResults(result)
  }

  const onSelection = (e) => {
    const name = e.target.innerText
    const selection = dishes.filter((dish) => dish.name === name)
    if (selection.length !== 0) {
      setSelectedDish(selection[0])
      setSearchText('')
    }
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
              <input type='text' value={searchText} onChange={searchHandler} name='' id='' placeholder='Search cousine' />
            </div>
          </div>
        </div>
        <div id='searchResults'>{searchResults}</div>
      </div>
      <div className='recipeHeader'>
        <div className='heading'>
          <div className='flag'>{flag()}</div>
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
          <button>
            <svg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M4.99587 0.833344C2.69587 0.833344 0.833374 2.70001 0.833374 5.00001C0.833374 7.30001 2.69587 9.16668 4.99587 9.16668C7.30004 9.16668 9.16671 7.30001 9.16671 5.00001C9.16671 2.70001 7.30004 0.833344 4.99587 0.833344ZM7.88337 3.33334H6.65421C6.52087 2.81251 6.32921 2.31251 6.07921 1.85001C6.84587 2.11251 7.48337 2.64584 7.88337 3.33334ZM5.00004 1.68334C5.34587 2.18334 5.61671 2.73751 5.79587 3.33334H4.20421C4.38337 2.73751 4.65421 2.18334 5.00004 1.68334ZM1.77504 5.83334C1.70837 5.56668 1.66671 5.28751 1.66671 5.00001C1.66671 4.71251 1.70837 4.43334 1.77504 4.16668H3.18337C3.15004 4.44168 3.12504 4.71668 3.12504 5.00001C3.12504 5.28334 3.15004 5.55834 3.18337 5.83334H1.77504ZM2.11671 6.66668H3.34587C3.47921 7.18751 3.67087 7.68751 3.92087 8.15001C3.15421 7.88751 2.51671 7.35834 2.11671 6.66668V6.66668ZM3.34587 3.33334H2.11671C2.51671 2.64168 3.15421 2.11251 3.92087 1.85001C3.67087 2.31251 3.47921 2.81251 3.34587 3.33334V3.33334ZM5.00004 8.31668C4.65421 7.81668 4.38337 7.26251 4.20421 6.66668H5.79587C5.61671 7.26251 5.34587 7.81668 5.00004 8.31668ZM5.97504 5.83334H4.02504C3.98754 5.55834 3.95837 5.28334 3.95837 5.00001C3.95837 4.71668 3.98754 4.43751 4.02504 4.16668H5.97504C6.01254 4.43751 6.04171 4.71668 6.04171 5.00001C6.04171 5.28334 6.01254 5.55834 5.97504 5.83334ZM6.07921 8.15001C6.32921 7.68751 6.52087 7.18751 6.65421 6.66668H7.88337C7.48337 7.35418 6.84587 7.88751 6.07921 8.15001V8.15001ZM6.81671 5.83334C6.85004 5.55834 6.87504 5.28334 6.87504 5.00001C6.87504 4.71668 6.85004 4.44168 6.81671 4.16668H8.22504C8.29171 4.43334 8.33337 4.71251 8.33337 5.00001C8.33337 5.28751 8.29171 5.56668 8.22504 5.83334H6.81671Z'
                fill='white'
              />
            </svg>
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
              <div>Difficulty: {selectedDish?.difficulty}</div>
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
            <div className='white'>{selectedDish?.seafood}</div>
          </div>
          <div className='col col-2'>
            <div className='textTitle'>Produce</div>
            <div>
              <span className='green'>{selectedDish && selectedDish?.produce[0]}</span>
              <span className='white'>&nbsp;/&nbsp;</span>
              <span className='red'>{selectedDish && selectedDish?.produce[1]}</span>
            </div>
          </div>
        </div>
        <div className='row row-2'>
          <div className='col col-1'>
            <div className='textTitle'>Spices</div>
            <div>
              <span className='green'>{selectedDish && selectedDish?.spices[0]}</span>
              <span className='white'>&nbsp;/&nbsp;</span>
              <span className='sunfire'>{selectedDish && selectedDish?.spices[1]}</span>
            </div>
          </div>
          <div className='col col-2'>
            <div className='textTitle'>Olive Oil</div>
            <div className='sunfire'>{selectedDish?.oliveoil}</div>
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

export default App
