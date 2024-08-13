const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs');   // A library used to hash passwords.


async function userSignUpController(req,res){
    //req: The request object containing information about the HTTP request, including parameters, headers, and the body (data sent by the client).
    //res: The response object used to send back a response to the client.
    try{
        const { email, password, name} = req.body

        const user = await userModel.findOne({email})
        // his line checks if a user with the provided email already exists in the database.
        console.log("user",user)

        if(user){
            throw new Error("Already user exits.")
        }

        if(!email){
           throw new Error("Please provide email")
        }
        if(!password){
            throw new Error("Please provide password")
        }
        if(!name){
            throw new Error("Please provide name")
        }

        const salt = bcrypt.genSaltSync(10);
        //The salt is a random string that is used in conjunction with the password to produce a secure hash
        const hashPassword = await bcrypt.hashSync(password, salt);

        if(!hashPassword){
            throw new Error("Something is wrong")
        }

        const payload = {
            ...req.body,
            role : "GENERAL",
            password : hashPassword
        }

        const userData = new userModel(payload)  //This creates a new instance of the userModel using the payload.
        const saveUser = await userData.save()  //: This saves the new user to the database

        res.status(201).json({  // 201 is a status code used to tell the client that the operation is successful
            data : saveUser,
            success : true,
            error : false,
            message : "User created Successfully!"
        })


    }catch(err){
        res.json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }
}

module.exports = userSignUpController