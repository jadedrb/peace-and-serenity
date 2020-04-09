import React from 'react';

function NationalPark(props) {
  let { images, name } = props.park
  let randomImg = Math.floor(Math.random() * images.length)

  console.log(props.park)
  return (
    <div className='national'>
      <div className='natContain'>
        <h3 className='natTitle'>{name}</h3>
        <img src={images[randomImg] ? images[randomImg].url : images[0]} className='natImg'/>
      </div>
    </div>
  )
}

export default NationalPark;
