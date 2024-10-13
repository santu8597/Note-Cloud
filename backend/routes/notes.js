const express=require('express');
const router=express.Router();
const fetch = require('../middleware/fetch');
const Note=require('../models/Note');


router.get('/fetchnotes',fetch,async (req,res)=>{
   const notes=await Note.find({user:req.user.id})
    res.json(notes)
})

router.post('/add',fetch,async (req,res)=>{
    const {title,description,tag}=req.body
    const note=new Note({
        title,description,tag,user:req.user.id
    })
    const notes=await note.save()
    res.json(notes)
})

router.put('/update/:id',fetch,async (req,res)=>{
    const {title,description,tag}=req.body
    const note1={};
    if(title){
        note1.title=title
    }
    if(description){
        note1.description=description
    }
    if(tag){
        note1.tag=tag
    }
    let note=await Note.findById(req.params.id);
    if(!note){
        return res.status(400).json({error:"note not found"})
    };
    if(note.user.toString()!==req.user.id){
        return res.status(400).json({error:"not authenticated"})
    }
    note=await Note.findByIdAndUpdate(req.params.id,{$set:note1},{new:true})
    res.send({note})
})


router.delete('/delete/:id',fetch,async (req,res)=>{
    
    let note=await Note.findById(req.params.id);
    if(!note){
        return res.status(400).json({error:"note not found"})
    };
    if(note.user.toString()!==req.user.id){
        return res.status(400).json({error:"not authenticated"})
    }
    note=await Note.findByIdAndDelete(req.params.id)

    res.send({sucess:"node deleted",note:note})
})

module.exports=router

