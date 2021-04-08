const {MongoClient} = require('mongodb');
const uri = 'mongodb+srv://Darko:gospel333@cluster0.xbklg.mongodb.net/SMA?retryWrites=true&w=majority' ;
const dbName = 'SMA';
const client =   new MongoClient(uri,  {  useNewUrlParser: true, useUnifiedTopology: true } )

async function dbConifg(){
    try{
        await client.connect()
        const db = client.db(dbName);
        return db
    }catch(err){
        console.log(err)
    }
   
}

module.exports = dbConifg()