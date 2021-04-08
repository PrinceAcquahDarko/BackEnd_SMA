const {MongoClient} = require('mongodb')
let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')
let config = require('../config')
const uri = 'mongodb+srv://Darko:gospel333@cluster0.xbklg.mongodb.net/SMA?retryWrites=true&w=majority' 

const dbName = "SMA"
const client = new MongoClient(uri,  { useNewUrlParser: true, useUnifiedTopology: true } )


function loginController(connect){
    async function post(req, res){
        let credentials = req.body
        try{
            // await client.connect();
            // const db = client.db(dbName);
            let username = await connect.collection('register').findOne({email: credentials.email})
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




module.exports = loginController