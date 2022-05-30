import React from 'react'
import {Col} from 'antd';

function GridCards(props) {
  if(props.landingPage){
    return (
      <Col lg = {6} md = {8} xs ={24}>
          <div style = {{position : 'relative'}}>
              <a href = {`/movie/${props.movieId}`}>
                  <img style = {{width : '100%' , height :'320px' }} src = {props.image} alt = {props.movieName}/>
                  {/* image 사이즈 100% 넘어갈때 포스터 크기 초과출력됨   */}
              </a>
  
          </div>
      </Col>
    )
  } else{
    return (
      <Col lg = {6} md = {8} xs ={24}>
          <div style = {{position : 'relative'}}>
              <img style = {{width : '100%' , height :'320px' }} src = {props.image} alt = {props.charaterName}/>
          </div>
      </Col>
    )
  }

}

export default GridCards