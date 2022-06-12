const express = require('express');
const router = express.Router();
const {Favorite} = require('../models/Favorite')

router.post('/favoriteNumber', (req, res)=>{

    // mongoDB 에서 favorite 숫자를 가져오기
    Favorite.find({"movieId" : req.body.movieId})
    .exec((err, info)=> {
        if(err) return res.status(400).send(err)
        // 그다음에 프론트에 다시 숫자 정보를 보내주기
        res.status(200).json( {success : true , favoriteNumber : info.length })
    })    

})


router.post('/favorited', (req, res)=>{

    // 내가 이 영화를 favorite 리스트에 넣었는지 정보를 DB에서 가져오기

    // mongoDB 에서 favorite 숫자를 가져오기
    Favorite.find({"movieId" : req.body.movieId, "userFrom": req.body.userFrom})
    .exec((err, info)=> {
        if(err) return res.status(400).send(err)
        
        let result = false;
        if(info.length !== 0) {
            result = true
        }

        res.status(200).json( {success : true , favorited : result })
    })    

})


// movieDetail 페이지에서 좋아요 누를때 (좋아요 삭제)
router.post('/removeFromFavorite', (req, res)=>{
    Favorite.findOneAndDelete({ movieId: req.body.movieId , userFrom: req.body.userFrom })
    .exec( (err,doc)=> {
        if(err) return res.status(400).send(err)
        res.status(200).json( {success: true, doc})
    })
})

// movieDetail 페이지에서 좋아요 누를때 (좋아요 추가)
router.post('/addToFavorite', (req, res)=>{

    const favorite = new Favorite(req.body)

    favorite.save((err, doc)=>{
        if(err) return res.status(400).send(err)
        return res.status(200).json({ success: true })
    })

})



router.post('/getFavoritedMovie', (req, res)=>{
    // DB에서 해당 데이터 찾기
    Favorite.find({'userFrom': req.body.userFrom})
    .exec((err,favorites)=>{
        if(err) return res.status(400).send(err)
        return res.status(200).json({success:true, favorites})
    })
})


router.post('/removeFromFavorite', (req, res)=>{
    // DB에서 해당 데이터 삭제
    Favorite.findOneAndDelete({movieId : req.body.movieId, userFrom: req.body.userFrom})
    .exec((err,result)=>{
        if(err) return res.status(400).send(err)
        return res.status(200).json({success: true})
    })
})



module.exports = router;
