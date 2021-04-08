
function feedbackController(connect){
    async function post(req, res){
       
        try{
            const insertedData = await connect.collection('feedback').insertOne(req.body);
            return res.send(insertedData)
            
        }catch(err){
            res.send(err)
        }
    }
   async function get(req, res){
       try{
            const data = await connect.collection('feedback').find( {} );
            const items = await data.toArray()
            res.send(items)
       }catch(err){
           res.send(err)
       }   
    }

    return {post, get}

}


module.exports = feedbackController;

