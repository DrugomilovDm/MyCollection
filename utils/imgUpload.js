const path = require('path');
const {cloudinary} = require("../utils/cloudinary");
const fs = require("fs");

const imgUpload = async (img)=>{
    const imgName='upload.jpg'
    await img.mv(path.resolve(__dirname,'..','files',imgName))
    const uploadedResponse =await cloudinary.uploader.upload(path.resolve(__dirname,'../files',imgName))
    fs.unlink(path.resolve(__dirname,'../files',imgName),(err)=>{console.log('file is not deleted')})
    return uploadedResponse
}

module.exports={imgUpload}