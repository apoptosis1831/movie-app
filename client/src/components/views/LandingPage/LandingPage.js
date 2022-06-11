import React, {useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import {API_KEY, API_URL,IMAGE_BASE_URL} from '../../Config';
import MainImage from './Sections/MainImage'
import GridCards from '../commons/GridCards';
import {Row} from 'antd';


function LandingPage() {

    const [Movies, setMovies] = useState([]) // 배열 형태의 state
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [currentPage, setcurrentPage] = useState(0)
    // load more 버튼 누를때마다 증가되는 currentPage 변수

    useEffect(()=>{
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint);

    }, [])


    const fetchMovies = (endpoint)=>{
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            console.log(response.results)
            setMovies([...Movies, ...response.results]);
            // 원래 있던 movie와 현재 results 합쳐준다 => Load more 누를때마다 더해짐
            if(currentPage === 0){
                setMainMovieImage(response.results[0]);
            }
            setcurrentPage(response.page)
            // response 페이지 정보도 포함돼있음
        })
    }

    const loadMoreItems = () =>{
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage+1}`;
        fetchMovies(endpoint);
    }


    return (
        <div style = {{width : '100%', margin : '0'}}>

            {/* Main image */}
            {MainMovieImage &&
            <MainImage
            image = {`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
            title = {MainMovieImage.original_title}
            text = {MainMovieImage.overview}
            />
            
            }
            
            <div style = {{width : '85%', margin : '1rem auto'}}>
                <h2>Movies by latest</h2>
                
                    {/* Movie Grid cards */}
                    <Row gutter={[16,16]}>
                    {/* grid card 사이사이 하얀 여백 줌 */}
                    {Movies && Movies.map((movie, index)=>(
                        <React.Fragment key = {index}> {/* key 값 넣어줘야 오류가 안난다 */}
                            <GridCards // prop 으로 넘겨쥴 데이터 작성 
                                landingPage
                                image =  {movie.poster_path ? 
                                    `${IMAGE_BASE_URL}w500${movie.poster_path}` : null }
                                    // poster_path 가 없는 영화가 있을 수도 있다*
                                movieId = {movie.id}
                                movieName = {movie.original_title}

                            />
                        </React.Fragment>
                    ))}
                    </Row>

            </div>

            <div style = {{display : 'flex', justifyContent: 'center'}}>
                <button onClick = {loadMoreItems} >Laod More</button>
                {/* load more 버튼 누르면 loadMoreItems function 실행 */}
            </div>

        </div>
    )
}

export default LandingPage
