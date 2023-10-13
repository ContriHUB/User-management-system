var Userdb=require('../model/model');
var Auditdb=require('../model/auditHistoryModel');
exports.create=(req,res)=>{
//validate the request
if(!req.body){
    res.status(400).send({message:"Content cannot be empty"});
    return;
}
//Userdb-name of database//
const user=new Userdb({
    name:req.body.name,
    email:req.body.email,
    gender:req.body.gender,
    status:req.body.status
})
//save user inthe database
user
.save(user)
.then(data=>{
    //res.send(data)
    res.redirect('/add-user');
})
.catch(err=>{
    res.status(500).send({
        message:err.message || "Some error occurred while implementing create operation"
    });
});
}
//return and retrieve all users or a single user//
exports.find=(req,res)=>{
if(req.query.id){
const id=req.query.id;
Userdb.findById(id)
.then(data=>{
    if(!data){
        res.status(404).send({message:"Not found user with id"+id})
    } else{
        res.send(data)
    }
})
.catch(err=>{
res.status(500).send({message:"Error retrieving user with id"+id})
})
}else{
Userdb.find()
.then(user=>{
    res.send(user)
})
.catch(err=>{
    res.status(500).send({message:err.message || "Error occurred while retrieving user information"})
})
}
}

//update a new user by userId//
exports.update=(req,res)=>{
if(!req.body){
    return res
    .status(400)
    .send({message:"Data to update cannot be empty"})
}
const id=req.params.id;
Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
.then(async (data)=>{
    if(!data){
        res.status(404).send({message:`cannot update user with ${id}.Maybe user not found`})
    }else{
        const audit = await Auditdb.create({name: data.name, time: Date.now(),operation: "update"});
        res.send(data);
    }
})
.catch(err=>{
    res.status(500).send({Message:"error update user information"})
})
}
exports.delete=(req,res)=>{
const id=req.params.id;
Userdb.findByIdAndDelete(id)
.then(async (data)=>{
    if(!data){
        res.status(404).send({message:`Cannot delete with id ${id}.Maybe id is wrong`})
    } else{
        const audit = await Auditdb.create({name: data.name, time: Date.now(),operation: "delete"});
        res.send({
            message:"User was deleted successfully!"
        })
    }
})
.catch(err=>{
    res.status(500).send({
        message:"Could not delete User with id="+id
    });
});
}