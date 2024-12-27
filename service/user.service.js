const User = require('../schemas/user.schema')
const bcrypt = require('bcrypt')

let service = {}


service.signUp = signUp
service.login = login


async function signUp(body) {
    try {
        // step 1 check for existing user
        const existingUser = await User.findOne({email:body.email})
        if(existingUser){
            return {error: 'Email already exists'}
        } 
        // Hash the password 
        const hashedPassword = await bcrypt.hash(body.password, 10)
        // console.log(body)
        // console.log(hashedPassword)
    
        // create new user 
        const user = await User.create({
            email: body.email,
            userName: body.userName,
            password: hashedPassword
        })
        return user
    } catch (error) {
        return Promise.reject({error: "Error"})
    }
        


}


async function login(body) {
    try {
        
        const existingUser = await User.findOne({email: body.email})
        if(!existingUser){
            return {error: "User not found "}
        }
        const matchPassword = await bcrypt.compare(body.password, existingUser.password)
        if(!matchPassword){
            return {error: "Invalid password "}
        }else{
            return existingUser
        }
    } catch (error) {
        return Promise.reject({error:"Error getting user"})
    }
}

module.exports = service