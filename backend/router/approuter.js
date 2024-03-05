const express = require('express');
const router = express.Router();
const User = require('../models/usermodel');
//get for login
router.post("/Login",async(req,res)=>{
    try{
        const {email,password}=req.body;
        const person = await User.findOne({email:email}).then((ola)=>{
            const sms = "User mail or password is invalid";
            if(!ola){
                res.status(400).json({error:"user dont exist"});
                return
            }
            if(ola.password!==password){
                res.status(400).json({error:sms});
                return
            }
            else{
                res.status(200).json(ola);
            }})
        
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
})
//get vercel basic
router.get("/",async(req,res)=>{
    res.json="hello bhailog"
});
//get endpoint for / path or default page data get all user tasks

router.get("/:id",async(req,res)=>{
    const {id}=req.params;
    try{
        const us = await User.find({_id:id})
        // .then((user)=>{
            // if(!user){
            //     console.log("user mila he nahi");
            //     return;
            // }
            // const saman = user.tasks.find((task)=>
            //     task._id.toString()==="65a7accd6f5b2168f2d883e0"
            // )
            // const task = user.tasks[0].taskname;
            res.status(200).json(us);
        // });
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
});

//post for creating of new task addition 
router.post("/Signup",async(req,res)=>{
    // const {mail} = req.params;
    const {name,email,password,tasks}=req.body;
    try{
        const userAdded = await User.create({
            name:name,
            email:email,
            password:password,
            tasks:tasks
        });
        res.status(201).json(userAdded);
    }
    catch(error){
        // res.status(400).json({error:"1100"});
        if(error.code===11000){
            res.status(400).json({error:"1100"});
            // console.log(error);
        }
        else{
            res.status(500).json("internal server error");
            console.log(error);
        }
    }

});

//patch for editing task
router.post("/newtask/:id",async(req,res)=>{
    const {id} = req.params;
    console.log(req.body)
    const {taskname,taskstatus}=req.body
    try{
        const updateUser = await User.findById(id)
            if(!updateUser){
                res.status(221).json({error:"user kya update karu"});
                return;
            }
            const newtask = {taskname,taskstatus};
            updateUser.tasks.push(newtask);
            await updateUser.save();
            res.status(200).json(updateUser);    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
// router.patch("/newtask/:id",async(req,res)=>{
//     const {id} = req.params;
//     console.log(req.body)
//     try{
//         const updateUser = await User.findByIdAndUpdate(id,req.body,{new:true,});
//         res.status(200).json(updateUser);    }
//     catch(error){
//         console.log(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

//for updating taskstatus
router.patch("/status/:id/:taskId",
async(req,res)=>{
    const {id,taskId} = req.params;
    const {newstatus} = req.body;
    console.log(newstatus,taskId)
    try{
    const aadmi= await User.findOne({_id:id});
    console.log("if ke bahar aadmi",aadmi);
    if(aadmi){
        const aadminame=aadmi.name;
        const aadmimail=aadmi.email;
        const aadmipassword=aadmi.password;
        const taskindex= aadmi.tasks.findIndex(t=>t._id.equals(taskId));
        console.log(taskindex,"abkdwkndwnmdlkwd");
        aadmi.tasks[taskindex].taskstatus = newstatus;
        const newtasks = aadmi.tasks;
        console.log("if ke andr aadmi",aadmi.tasks[taskindex].taskstatus)
        const newprofile = {name:aadminame,email:aadmimail,password:aadmipassword,tasks:newtasks}
        const newaadmi = await User.findByIdAndUpdate(id,newprofile,{new:true})
        res.status(200).json(newaadmi);
    }else{
        console.log("else le andr hu nahi mila aadmi")
        res.status(400).json("else le andr hu nahi mila aadmi")

    }}
    catch(error){
        console.log("le mil gya error ",error)
        res.status(400).json("le mil gya error")

    }
})


//export of router
router.delete("/delete/:id/:taskId",async(req,res)=>{
    const {id,taskId} = req.params;
    try{
    const aadmi= await User.findOne({_id:id});
    console.log("if ke bahar aadmi",aadmi)
    
    if(aadmi){
        const aadminame=aadmi.name;
        const aadmimail=aadmi.email;
        const aadmipassword=aadmi.password;
        const newtasks= aadmi.tasks.filter(t=>!t._id.equals(taskId));
        console.log("if ke andr aadmi")
        const newprofile = {name:aadminame,email:aadmimail,password:aadmipassword,tasks:newtasks}
        const newaadmi = await User.findByIdAndUpdate(id,newprofile,{new:true})
        res.status(200).json(newaadmi);
    }else{
        console.log("else le andr hu nahi mila aadmi")
        res.status(400).json("else le andr hu nahi mila aadmi")

    }}
    catch(error){
        console.log("le mil gya error ",error)
        res.status(400).json("le mil gya error")

    }
})




module.exports=router;