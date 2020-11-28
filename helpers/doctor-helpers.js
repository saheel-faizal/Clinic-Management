var db=require('../config/connection');
var collection=require('../config/collections');
const { response } = require('express');
var objectId=require('mongodb').ObjectId

module.exports={

    addDoctor:(doctor,callback)=>{
            
            db.get().collection('doctor').insertOne(doctor).then((data)=>{
                callback(data.ops[0]._id)
            })
    },
    getAllDoctors:()=>{
        return new Promise(async(resolve,reject)=>{
            let doctors=await db.get().collection(collection.DOCTOR_COLLECTION).find().toArray()
            resolve(doctors)
        })

    }

        
    }

