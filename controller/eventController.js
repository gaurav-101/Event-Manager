const express = require('express');
const router = express.Router();
const EVENT_OBJ = require("../models/event.model");
const User = require('../models/user.model');
const multer=require('multer')
const fs = require('fs');
const path = require('path');
var mongoose = require('mongoose');

// const storage=multer.diskStorage({
//     destination: function(Request,file,callback)
//     {
//         callback(null,'./Uploads');
//     },
//     filename: function(Request,file,callback)
//     {
//         callback(null,Date.now()+ '-' + file.originalname);
//     },
// });
// const upload=multer({storage:storage});
router.use(express.urlencoded({ extended: true }))


const postEvent = async (req,res)=>{

    console.log(req.body)
    console.log(req.user)
    const details=new EVENT_OBJ({name:req.body.name ,description:req.body.description ,time:req.body.time,date:req.body.date,end_date:req.body.end_date,venue:req.body.venue});
    try{
        await details.save( function(err,docum)
        {
            // if(!docum) return console.log(err);
             id= docum._id;
             id=""+id
             console.log(id)
             User.updateOne({email:'gaurav.coder1@gmail.com'},{$push: { postedEvents:id } }).then(response=>{
                res.redirect("/sucessPost.html")
            }).catch(err=>{
                console.log(err);
                res.redirect("/wrongPost.html")
            });
        });
    }
    catch(error)
    {
        res.status(500).send(error);
    }
}

const getAllEvents = async (req,res)=>{
    var count= Number(req.query.count);
    var data=null;
    if(count==null){
         data= await EVENT_OBJ.find().sort({_id:-1});
    }
    else{
         data = await EVENT_OBJ.find().sort({_id:-1}).limit(count);
    }
    res.send(data);
}

const getEvent = async (req,res)=>{
    var event_id = req.params.id;
    const data = await  EVENT_OBJ.find({_id: event_id});
    res.send(data);
}

const getParticipants = (req,res)=>{
    const id=req.body.id;
    console.log(id);
    User.find({regEvents:{$elemMatch:{$eq:id}}}).then(users=>{
        res.status(200).send(users);
    }).catch(err=>{
        console.log(err);
        res.status(400);
    });

}

const checkRegistered = (req,res)=>{
    const id=req.body.id;
    const email=req.user.email;
    User.find({$and:[{email:email},{regEvents:{$elemMatch:{$eq:id}}}]}).then(users=>{
        res.status(200).send(users);
    }).catch(err=>{
        console.log(err);
        res.status(400);
    });

}

const register = (req,res)=>{
    const user = req.user;
    const id=req.body.id;
    User.updateOne({email:user.email},{$push: { regEvents:id } }).then(response=>{
        res.status(200).json({Success:true})
    }).catch(err=>{
        console.log(err);
        res.status(400);
    });
}

module.exports={postEvent,getAllEvents,getEvent,getParticipants,register,checkRegistered};
