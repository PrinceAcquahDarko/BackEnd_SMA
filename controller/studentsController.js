const connection = require('../db/db.config')

function studentsController(){
    async function get(req, res){
        let data = req.query.class;
        try{
  
            let studentsData = await connection.db.collection(data).find({})
            const items = await studentsData.toArray()
            res.status(200).send(items)

        }catch(err){
            res.status(400).send('an  errror occured')


        }
    }
    async function post(req, res){
        let data = req.query.class;
        req.body.grandScore = 0;
        try{
       
            let studentsData = await connection.db.collection(data).insertOne(req.body)
            res.status(200).send(studentsData)

        }catch(err){
            res.status(400).send(err)

        }
    }

    async function deleteStudent(req, res){
        let queryClass = req.query.class
        try{
       
            const id = ObjectID(req.query.deletedId)
            const data = await connection.db.collection(queryClass).deleteOne( {_id: id} );
            // for temporal usage
            res.status(200).send(data)

       }catch(err){
           res.status(400).send(err)

       }   
    }

    async function updateStudent(req, res){
        let queryClass = req.query.class;
        updatedStudent = req.body
        try{
  
            const id = ObjectID(req.query.updatedId)
            const data = await connection.db.collection(queryClass).updateOne({_id: id}, { $set: {
                firstname: updatedStudent.firstname, 
                lastname: updatedStudent.lastname, 
                gender: updatedStudent.gender,
                age: updatedStudent.age,
                guardians_tel: updatedStudent.guardians_tel
            }})
            res.status(200).send(data)

       }catch(err){
           res.status(400).send(err)

       }   
    }


    async function postMarks(req, res){
        let currentClass = req.query.class;
        let subject = req.query.subject;
        let status = req.query.status
        let id = ObjectID(req.query.id)
        try{
   
            const UsersId = await connection.db.collection('register').findOne({_id: ObjectID(req.query.teachers_Id)})
            if (UsersId.position === 'teacher'){
                let score = await db.collection(currentClass).findOne({_id: id})
                if(status === 'add'){
                    let cummulative_score = score.grandScore + req.body.totalScore
                    let insertedMarks = await db.collection(currentClass).updateOne({_id: id}, {$set: {[subject]:  {classScore: req.body.classScore, examScore: req.body.examScore, totalScore: req.body.totalScore}, grandScore: cummulative_score} } ) 
                   return res.status(200).send(insertedMarks)

                }
                    let commulative_score = score.grandScore - score[subject].totalScore
                    let updatedScore = commulative_score + req.body.totalScore
                    let insertedMarks = await db.collection(currentClass).updateOne({_id: id}, {$set: {[subject]:  {classScore: req.body.classScore, examScore: req.body.examScore, totalScore: req.body.totalScore}, grandScore: updatedScore} } ) 
                    return res.status(200).send(insertedMarks)

              
            }
            
           
            return res.send('You are not allowed to enter mafks');
           

        }catch(err){
           return res.status(400).send(err)
        }

    }

    async function postfees(req, res){
        let currentClass = req.query.class;
        let id = ObjectID(req.query.id)
        try{
           
            const UsersId = await connection.db.collection('register').findOne({_id: ObjectID(req.query.teachers_Id)})
            if (UsersId.position === 'account'){
                let insertedFees = await db.collection(currentClass).updateOne({_id: id}, {$set: {fees: req.body}} ) 
                return res.status(200).send(insertedFees);
            }
            
            return res.send('You are not allowed to enter data');

        }catch(err){
            return res.status(400).send(err)
        }
    }

    return {get, post, postMarks, postfees, deleteStudent, updateStudent}
}

function marks(args){
    return {
        examsScore: args.body.examScore,
        classScore: args.body.classScore,
        totalScore: args.body.totalScore,
        subject: args.query.subject, 
        id: args.query.id
    }
}

module.exports = studentsController();
