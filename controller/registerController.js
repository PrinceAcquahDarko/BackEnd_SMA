let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken');
let config = require('../config');



function registerController(connect){
    async function post(req, res){
        let hashedPassword = bcrypt.hashSync(req.body.passwordGroup.password, 8);
        let users_Data = new userData(req.body, hashedPassword) 
        try{

            let registeredData = await connect.collection('register').insertOne(users_Data)
            let token = jwt.sign({id:registeredData.ops[0]._id}, config.secret)
            res.status(200).send({auth: true, position:registeredData.ops[0].position, token, data:registeredData.data})
            
        }catch(error){
            console.log(error)
        }
    }
    function validate(req, res, next){
        // we gonna do all sorts of validations here
        if (req.body === null){
            return;
        }
        next();
    }
     async function update(req, res){
        try{

            const data = req.body
            const id2 = ObjectID(req.query.teachers_Id)
            let registeredData = await connect.collection('register').updateOne({_id: id2}, { $set: { data }})

            res.status(200).send(registeredData)
           
           
        }catch(error){
            res.status(400).send('an error occured')
        };

    }

    async function get(req, res){
        try{

            const id = ObjectID(req.query.teachers_Id)
            const data = await connect.collection('register').find( {_id:id} );
            const items = await data.toArray()
            // for temporal usage
           
            res.send(items)
       }catch(err){
           res.send(err)
       }   
    }
    async function getAllData(req, res){
        try{
            const data = await connect.collection('register').find( {} );
            const items = await data.toArray()
            // for temporal usage
           
            res.status(200).send(items)
            
       }catch(err){
           res.status(400).send(err)
       }   
    }

    async function deleteStaff(req, res){
        try{
    
            const id = ObjectID(req.query.staffId)
            const data = await connect.collection('register').deleteOne( {_id: id} );
     
            res.status(200).send(data)
       }catch(err){
         res.status(400).send(err)

       }   
    }


    function authorization(req, res, next){
    
        if(!req.header('Authorization'))
        return res.send('no token')
    
    
       var token = req.header('Authorization').split(' ')[1]
       console.log(token, 'from token');
    
       jwt.verify(token, config.secret, function(err, decoded){
           if(err) return res.send('incore tken');
           console.log(decoded, 'from decoded');
           req.query.teachers_Id = decoded.id
       })

       next()
           
    }

    return {post, validate, update, get, authorization, getAllData, deleteStaff}
}


function userData(args, password){
    let data = {
        firstname: args.firstname,
        lastname: args.lastname,
        email: args.email,
        password,
        position:args.position
    }

    return data
}





module.exports = registerController;