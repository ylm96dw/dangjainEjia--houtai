const express = require('express')
const router = express.Router()
const auth = require('./auth')
const topicModel = require('../model/topic')
const commonModel = require('../model/common')

router.post('/',auth,async(req,res,next)=>{
    try{
        const {content,
            topic_id
        } = req.body
        const userId = req.session.user._id

        let common
        const topic = await topicModel.findById(topic_id)
        if(topic_id){
            common = await commonModel.create({
                content,
                user:userId,
                topic:topic._id
            })
            await topic.update({$push:{common:common._id}})
            // await topic.save()
            res.json({
                code:200,
                msg:'success',
                data:common
            })
        }else{
            res.json({
                code:400,
                msg:'没有找到该主题'
            })
        }
        
    }catch(err){
        next(err)
    }
})

router.get('/getCommon/:topicId',async(req,res,next)=>{
    try{
        const topicId = req.params.topicId

        const datalist = await commonModel
        .find(topic.topicId)
        .populate({
            path:'user',
            selrct:"username avatar"
        })
        res.json({
            code:200,
            msg:'success',
            data:datalist
        })
    }catch(err){
        next(err)
    }
})
module.exports = router