const fs = require("fs")
const formidable = require("formidable-serverless")
const slugify = require('slugify')
const path = require('path')

export const config = {
    api:{
        bodyParse : false,
    }
}

export default async (req,res) => {
    const timestamp = moment().format("DD-MM-YYYY")

    fs.mkdir('./public/SalesFiles',{recursive:true},function (err){
        return console.log(err);
    })
    
    const form = formidable({
        multiple: true,
        uploadDir: './public/SalesFiles'
    })
}