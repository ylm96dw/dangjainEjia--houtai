//验证是否时管理员
module.exports = function(req,res,next){
    if(req.session&&req.session.user){
        next()
    }else{
        res.json({
            code:403,
            msg:'登录状态失效'
        })
    }
}