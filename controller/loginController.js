let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')
let config = require('../config')
const connection = require('../db/db.config')



function loginController(){
    async function post(req, res){
        let credentials = req.body
        try{
            let username = await connection.db.collection('register').findOne({email: credentials.email})
            if(!username)
            return res.status(401).send({message: 'invalid username please try again'})
            bcrypt.compare(credentials.password, username.password, (err, isMatch) => {
                if(!isMatch)
                return res.status(401).send({message: 'username and password do not match'})
                
                // let payload = {sub: username.id}
                let token = jwt.sign({id:username._id}, config.secret)
                res.status(200).send({auth: true, token, position:username.position, data:username.data})
            })  
        }catch(err){
            res.status(400).send({message: 'invalid credentitals'});
        }
    }
    return {post}
}




module.exports = loginController()