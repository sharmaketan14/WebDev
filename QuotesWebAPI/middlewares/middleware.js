//Error Handeling MiddleWare

function gen_error(error, req, res, next){
    res.status(400)
}

module.exports  = gen_error