const {MongoClient} = require('mongodb');
const uri = 'mongodb+srv://Darko:gospel333@cluster0.xbklg.mongodb.net/SMA?retryWrites=true&w=majority' ;
const dbName = 'SMA';
const client =   new MongoClient(uri,  {  useNewUrlParser: true, useUnifiedTopology: true } )



module.exports = {
    db: '',
    connect: async function(){
        try{
            const conn = await client.connect();
            this.db = conn.db(dbName)
            return client
        }catch(err){
            console.log(err)
        }
       
    }
}