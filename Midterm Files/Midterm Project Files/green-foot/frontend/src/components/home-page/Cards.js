import React from 'react'
import CardItem from './CardItem'
import './Cards.css'

function Cards() {
  return (
    <div className='cards' id="home-cards">
      <h1>Where we get our Data!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
            <ul className='cards__items'>
                <CardItem 
                    src="images/img-10.jpg"
                    text="Learn more about the climate in any location"
                    label="Data"
                    path="https://disc.gsfc.nasa.gov/datasets/GPM_3IMERGDF_06/summary?keywords=gpm"
                />
                <CardItem 
                    src="images/img-11.jpg"
                    text="Find where renewable energy plants are in relativity to their location's climate"
                    label="Data"
                    path="https://hifld-geoplatform.opendata.arcgis.com/datasets/geoplatform::power-plants 2/about?layer=0 
                    "
                />
            </ul>
            {/*
            <ul className='cards__items'>
                <CardItem
                    src='images/img-3.jpg'
                    text='Set Sail in the Atlantic Ocean visiting Uncharted Waters'
                    label='Ocean'
                    path='/results'
                />
                <CardItem
                    src='images/img-4.jpg'
                    text='Experience the Top of the Himilayan Mountains'
                    label='Asia'
                    path='/results'
                />
                <CardItem
                    src='images/img-8.jpg'
                    text='Explore the vast Sahara Desert'
                    label='Africa'
                    path='/results'
                />
                
            </ul>
            */}
        </div>
      </div>
    </div>
  )
}

export default Cards
