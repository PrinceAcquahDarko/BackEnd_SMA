
const connection = require('../db/db.config')

function feedbackController(){
    async function post(req, res){
       
        try{
            const insertedData = await connection.db.collection('feedback').insertOne(req.body);
            return res.send(insertedData)
            
        }catch(err){
            res.send(err)
        }
    }
   async function get(req, res){
       try{
        await client.connect();
        const db = client.db(dbName);
            const data = await db.collection('feedback').find( {} );
            const items = await data.toArray()
            res.send(items)
       }catch(err){
           res.send(err)
       }   
    }
    
    return {post, get}

}


module.exports = feedbackController()

