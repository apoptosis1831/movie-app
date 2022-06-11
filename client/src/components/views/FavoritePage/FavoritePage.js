import Axios from 'axios'
import React, { useEffect } from 'react'
import './favorite.css'

function FavoritePage() {
    useEffect(()=>{
        Axios.post('/api/favorite/getFavoritedMovie',{userFrom : localStorage.getItem('userId')})
        .then(response=>{
            if(response.data.success){

            } else{
                alert('영화 정보를 가져오는데 실패했습니다');
            }
        })
        
    }, [])
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



            </tbody>
        
        </table>
    </div>
  )
}

export default FavoritePage