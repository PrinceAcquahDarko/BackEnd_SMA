function adminController(connect){
   async function post(req, res){
       
        try{
            // await client.connect();
            // const db = client.db(dbName);
            const insertedData = await connect.collection('admin').insertOne(req.body);
            return res.send(insertedData)
            
        }catch(err){
            res.send(err)
        }
    }
   async function get(req, res){
       try{
        // await client.connect();
        // const db = client.db(dbName); 
            const data = await connect.collection('admin').find( {} );
            const items = await data.toArray()
            let schoolInfo = []
            schoolInfo.push(items[0])
            res.send(schoolInfo)
       }catch(err){
           res.send(err)
       }   
    }

    return {post, get}
}


module.exports = adminController;