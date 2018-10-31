const express = require('express')
const router = express.Router()
const swiperModel = require('../model/swiper')
const auth = require('./auth')

router.post('/',auth,async(req,res,next)=>{
    try{
        const{
            title,
            img,
            newsId,
            status,
            sort
        } = req.body
        const data = await swiperModel.create({
            title,
            img,
            newsId,
            status,
            sort
        })

        res.json({
            code:200,
            data,
            msg:'添加轮播图成功'
        })

    }catch(err){
        next(err)
    }
})

router.get('/',auth,async(req,res,next)=>{
    try{
        let {page=1,page_size = 10} =req.query
        page = parseInt(page)
        page_size = parseInt(page_size)

        const datalist = await swiperModel
        .find()
        .skip((page-1)*page_size)
        .limit(page_size)
        .sort({sort:-1,_id:-1})
        .populate({
            path:'newsId'
            
        })
        
        res.json({
            code:200,
            data:datalist,
            msg:'success'
        })       
    }catch(err){
        next(err)
    }
})
router.get('/:id',auth,async(req,res,next)=>{
    try{
        let {id} = req.params

        const datalist = await swiperModel
        .findById(id)
        // .skip((page-1)*page_size)
        // .limit(page_size)
        // .sort({_id:-1})
        // .populate({
        //     path:'newsId'
            
        // })
        
        res.json({
            code:200,
            data:datalist,
            msg:'success'
        })       
    }catch(err){
        next(err)
    }
})

//编辑
router.patch('/:id',auth,async(req,res,next)=>{
    try{
        const{id} = req.params
        const{
            img,
            title,
            newsId,
            sort,
            status
        } = req.body
        const data = await swiperModel.findById(id)
        const updateData = await data.update({$set:{
            img,
            title,
            newsId,
            sort,
            status
        }
            
        })
        res.json({
            code:200,
            data:updateData,
            msg:"修改成功"
        })
    }catch(err){
        next(err)
    }
})

module.exports = router