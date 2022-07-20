const express = require("express");
const router = express.Router();
const convertapi = require("convertapi")("BALUtsv1heiPUlWP");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const aws = require("aws-sdk");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

aws.config.update({ region: "us-east-1" });
var s3bucket = new aws.S3({ apiVersion: "2006-03-01" });

// convert function
const convert = (snippet) => {
  console.log("Here 1");
  convertapi
    .convert(
      "png",
      {
        File: snippet,
      },
      "txt"
    )
    .then(function (result) {
      result.saveFiles(path.join(__dirname, "snippet.png"));
    });
};

router.get("/", (req, res) => {
  res.send("Hello");
});

router.post("/convert", (req, res) => {
  const { snippet } = req.body;
  fs.writeFileSync(path.join(__dirname, "snippet.txt"), snippet.toString());
  convert(snippet);
});


router.post('/uploadpng',upload.single('image'),async (req,res)=>{
    const file = req.file;   
    const result = await uploadFile(file) 
    return res.status(200).json(result)
})

const uploadFile = (file) =>{

  const fileStream = fs.createReadStream(file.path);

  var uploadParamas = {
    Bucket: "codematcherprofile",
    Key: file.filename+".png",
    Body: fileStream,
  };

return s3bucket.upload(uploadParamas).promise()

}


module.exports = router;
