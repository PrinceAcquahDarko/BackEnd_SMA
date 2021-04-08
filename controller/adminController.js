const {MongoClient} = require('mongodb');
const uri = 'mongodb+srv://Darko:gospel333@cluster0.xbklg.mongodb.net/SMA?retryWrites=true&w=majority' ;
const dbName = 'SMA';
const client =   new MongoClient(uri,  {  useNewUrlParser: true, useUnifiedTopology: true } )


function adminController(){
   async function post(req, res){
       
        try{
            await client.connect();
            const db = client.db(dbName);
            const insertedData = await db.collection('admin').insertOne(req.body);
            return res.send(insertedData)
            
        }catch(err){
            res.send(err)
        }
    }
   async function get(req, res){
       try{
        await client.connect();
        const db = client.db(dbName); 
            const data = await db.collection('admin').find( {} );
            const items = await data.toArray()
            let schoolInfo = []
            schoolInfo.push(items[0])
            res.send(schoolInfo)
       }catch(err){
           res.send(err)
       }   
    }

    client.close()
    return {post, get}
}


module.exports = adminController();