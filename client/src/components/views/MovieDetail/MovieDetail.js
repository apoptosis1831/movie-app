//import { response } from 'express';
import React,{useEffect, useState} from 'react'
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/MovieInfo'
import GridCards from '../commons/GridCards';
import {Button, Row} from 'antd'
import Favorite from './Sections/Favorite'

function MovieDetail(props) {

    let movieId = props.match.params.movieId
    // url에서 movieId 가져오는 방법
    const [Movie, setMovie] = useState(null)
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    // dom 이 load 가 되면 처음에 할 동작을 넣어준다
    useEffect(() => {
        
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endpointInfo)
        .then(response=>response.json())
        .then(response => {
            console.log(response);
            // 영화 정보 response로 가져온다
            setMovie(response);
        })

        fetch(endpointCrew)
        .then(response=>response.json())
        .then(response => {
            console.log('responseForCrew',response);
            // 영화 출연진들 정보 response 로 가져온다
            setCasts(response.cast)
        })

    }, [])


    const toggleActorView = ()=>{
        setActorToggle(!ActorToggle);
    }

    
  return (
    <div>
        { /*Header*/}

        {Movie &&
        <MainImage
            image = {`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
            title = {Movie.original_title}
            text = {Movie.overview}
        />}


        {/*body*/}
        <div style={{width : '85%' , margin : '1rem auto'}}>

            <div style = {{display : 'flex', justifyContent: 'flex-end'}}>
                <Favorite movieInfo = {Movie} movieId = {movieId} userFrom = {localStorage.getItem('userId')}/>
            </div>


            {/*movie info*/}
            {
            Movie &&
            <MovieInfo
                movie = {Movie}
            />
            }
            <br/>

            { /* actors Grid*/ }
            <div style={{display : 'flex', justifyContent : 'center' , margin :'2rem'}}>
                <button onClick ={toggleActorView}> Toggle Actor View </button>
            </div>

            {ActorToggle &&
                <Row gutter={[16,16]}>

                {Casts && Casts.map((Casts, index)=>(
                    <React.Fragment key = {index}>
                        <GridCards
                            image =  {Casts.profile_path ? 
                                `${IMAGE_BASE_URL}w500${Casts.profile_path}` : null }
                            characterName = {Casts.name}

                        />
                    </React.Fragment>
                ))}

                </Row>
            }
        </div>



    </div>
  )
}

export default MovieDetail