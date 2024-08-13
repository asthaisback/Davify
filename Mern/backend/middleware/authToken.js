const jwt = require('jsonwebtoken')

async function authToken(req,res,next){
    try{
        const token = req.cookies?.token           //operator (?.) is used to safely access the token property in cookies

        console.log("token",token)
        if(!token){        //  If the token is missing, the middleware responds with a message asking the user to log in
            return res.status(200).json({
                message : "Please Login...!",
                error : true,
                success : false
            })
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            // JWT verification involves decoding the token using the secret key to ensure that it has not been tampered with
            console.log(err)
            console.log("decoded",decoded)
            
            if(err){
                console.log("error auth", err)
            }

            req.userId = decoded?._id

            next()
        });


    }catch(err){
        res.status(400).json({
            message : err.message || err,
            data : [],
            error : true,
            success : false
        })
    }
}


module.exports = authToken