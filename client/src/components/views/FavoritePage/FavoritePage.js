import Axios from 'axios'
import React, { useEffect , useState} from 'react'
import './favorite.css'
import { Popover} from 'antd'
import { IMAGE_BASE_URL } from '../../Config'

// 좋아요 한 영화들 정보 출력하는 페이지
function FavoritePage() {
    const [Favorites, setFavorites] = useState([]) // 좋아요 한 영화들

    // getFavoritedMovie 페이지로 request 보내는 함수
    const fetchFavoredMovie = () =>{
        // models/Favorite.js 에서 정의한 userFrom 에 userId 넣어서 request 넘기기
        Axios.post('/api/favorite/getFavoritedMovie',{userFrom : localStorage.getItem('userId')})
        .then(response=>{
            // response.data.favorites => createdAt, movieId, moviePost, movieRunTime, updateAt, userFrom 정보 (routes/favorite.js에서 넘겨준 success, favortes 데이터)
            if(response.data.success){
                //console.log('response?',response);
                setFavorites(response.data.favorites)
            } else{
                alert('영화 정보를 가져오는데 실패했습니다');
            }
        })
    }

    useEffect(()=>{
        fetchFavoredMovie()
    }, [])

    // DB에서 해당 user의 movieId 삭제
    const onClickDelete = (movieId, userFrom) =>{
        const variables = {
            movieId,
            userFrom
        }
        
        // removeFromFavorite 페이지로 request 보내기
        Axios.post('/api/favorite/removeFromFavorite', variables)
        .then(response=>{
            // 성공하면 다시 fetch하기
            if(response.data.success){
                fetchFavoredMovie();
            } else {
                alert("리스트에서 지우는데 실패했습니다");
            }
        })
    }

    // 좋아요 한 영화들 테이블 형태로 렌더링 해주는 함수
    const renderCards = Favorites.map((favorite, index)=>{
        // 좋아요 한 영화 이미지 content
        const content=(
            <div>
                {favorite.moviePost ?
                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost} `} /> : "no image"
                }
            </div>
        )
        return <tr key = {index}>
            <Popover content={content} title={`${favorite.movieTitle}`}>
            <td>{favorite.movieTitle}</td>
            </Popover>
            <td>{favorite.movieRunTime} mins</td>
            <td><button onClick={() => onClickDelete(favorite.movieId,favorite.userFrom)}>Remove</button></td>
        </tr>
    })


  return (
    <div style = {{ width : '85%' , margin : '3rem auto'}}>
        <h2> Favorite Movies</h2>    
        <hr />

        <table>
            <thead>
                <tr>
                    <th>Movie Title</th>
                    <th>Movie Runtime</th>
                    <td>Remove from favorite</td>
                </tr>
            </thead>
        
        
            <tbody>
            
            {renderCards}
            
            </tbody>
        
        </table>
    </div>
  )
}

export default FavoritePage