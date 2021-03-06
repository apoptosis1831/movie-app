import Axios from 'axios'
import React, { useEffect , useState} from 'react'
import {Button} from 'antd';

function Favorite(props) {
    const movieId = props.movieId;
    const userFrom = props.userFrom;
    let movieTitle ;
    let moviePost ;
    let movieRunTime;
    if(props.movieInfo){
        movieTitle = props.movieInfo.title;
        moviePost = props.movieInfo.backdrop_path;
        movieRunTime = props.movieInfo.runtime;
    }
    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);
    let variables = {
        userFrom :userFrom,
        movieId : movieId,
        movieTitle : movieTitle,
        moviePost : moviePost,
        movieRunTime : movieRunTime
    }

    useEffect(()=>{
        
        Axios.post('/api/favorite/favoriteNumber', variables)
        .then(response => {
            setFavoriteNumber(response.data.favoriteNumber)
            if(response.data.success) {
                
            } else{
                alert('숫자 정보를 가져오는데 실패 했습니다.')
            }
        })

        // 해당 영화를 좋아요 했는지 체크
        Axios.post('/api/favorite/favorited', variables)
        .then(response => {
            if(response.data.success) {
                setFavorited(response.data.favorited)
            } else{
                alert('정보를 가져오는데 실패 했습니다.')
            }
        })
    }, [])


    const onClickFavorite = () =>{
        // 좋아요 했던 영화일때
        if(Favorited){
            Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response=>{
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber-1)
                    setFavorited(!Favorited);
                } else {
                    alert('Favorite 리스트에서 지우는 걸 실패했습니다')
                }
            })
        } else{ // 좋아요 했던 영화가 아닐때
            Axios.post('/api/favorite/addToFavorite', variables)
            .then(response=>{
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber+1)
                    setFavorited(!Favorited);
                } else {
                    alert('Favorite 리스트에서 추가하는 걸 실패했습니다')
                }
            })
        }
    }

    // Favorited boolean 상태따라 다르게 버튼 출력
  return (
    <div>
        <Button onClick = {onClickFavorite}>{Favorited ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber} </Button>
    </div>
  )
}

export default Favorite