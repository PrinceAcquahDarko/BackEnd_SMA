const {MongoClient} = require('mongodb');
const uri = 'mongodb+srv://Darko:gospel333@cluster0.xbklg.mongodb.net/SMA?retryWrites=true&w=majority' 

const dbName = 'SMA';
const client =   new MongoClient(uri,  { useNewUrlParser: true, useUnifiedTopology: true } )


function feedbackController(){
    async function post(req, res){
       
        try{
            await client.connect();
            const db = client.db(dbName);
            const insertedData = await db.collection('feedback').insertOne(req.body);
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

