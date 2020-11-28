var express = require('express');
var router = express.Router();
const doctorHelpers = require('../helpers/doctor-helpers');

/* GET home page. */
router.get('/', function(req, res, next) {

  doctorHelpers.getAllDoctors().then((doctors)=>{
    console.log(doctors);
    res.render('/user/view-doctors',{doctors})
  })
});

module.exports = router;
