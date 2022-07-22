const express = require("express");
const router = express.Router();
const convertapi = require("convertapi")("BALUtsv1heiPUlWP");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const aws = require("aws-sdk");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


// add likes data
router.post('/updatelikes',(req,res)=>{
    const {email,sEmail} =  req.body;
    var ddb = new aws.DynamoDB.DocumentClient();
    const params = {
        TableName:'likes',
        Key:{'email':email}
    }

    ddb.get(params,(err,data)=>{
        if(err){
            console.log("ERROR:",err.message)
        } else {
            console.log("Success:",data.Item.swipes)
            const oldLikes = data.Item.swipes;
            oldLikes.push(sEmail)
            console.log(oldLikes)
            
            // update query
            const updateParams = {
                TableName:'likes',
                Key:{'email':email},
                UpdateExpression:'set swipes= :x',
                ExpressionAttributeValues:{
                    ":x":oldLikes
                }
            }
            ddb.update(updateParams,(err,data)=>{
                if(err){
                    console.log("UPDATE ERROR:",err.message)
                } else {
                    console.log("UPDATE SUCCESS:",data)
                }
            })
            return res.status(200).json({message:'done.'})
        }
    })
})


module.exports = router;