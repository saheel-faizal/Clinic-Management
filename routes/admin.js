var express = require('express');
const doctorHelpers = require('../helpers/doctor-helpers');
var router = express.Router();
var doctorHelper=require('../helpers/doctor-helpers')
const adminHelpers=require('../helpers/admin-helpers');
const { response } = require('express');



/* GET users listing. */
router.get('/', function(req, res, next) {
  let admin=req.session.admin
    res.render('admin/view-dashboard', {admin:true})
  
  
});

router.get('/login',(req,res)=>{
  if(req.session.adminLoggedIn){
    res.redirect('/admin')
  }else
     res.render('admin/login',{'loginErr':req.session.loginErr})
     req.session.loginErr=false
})

router.get('/register',(req,res)=>{
  res.render('admin/register')
})

router.post('/register',(req,res)=>{
  adminHelpers.doRegister(req.body).then((response)=>{
    console.log(response);
    

  })
})

router.post('/login',(req,res)=>{
  adminHelpers.doAdminLogin(req.body).then((response)=>{
    
    if(response.status){
      req.session.adminLoggedIn=true
      req.session.admin=response.admin
      console.log(req.session.admin,'dfghjk');
      res.redirect('/admin')
    }else{
      req.session.loginErr=true
      res.redirect('/admin/login',)
    }

  })
})



router.get('/add-doctor',function(req,res){
  res.render('admin/add-doctor',{admin:true})

})

router.get('/view-doctors',(req,res)=>{
  console.log(req.session.admin);
  res.render('admin/view-doctors',{admin:true})

})

router.get('/view-dashboard',(req,res)=>{
  res.render('admin/view-dashboard',{admin:true})

})


router.post('/add-doctor',(req,res)=>{
  console.log(req.body)
  console.log(req.files.Image)
  doctorHelpers.addDoctor(req.body,(id)=>{
    let image=req.files.Image
    console.log(id);
    image.mv('./public/doctor-images/'+id+'.png',(err,done)=>{
      if(err){
        res.render('admin/add-doctor')
        
      }else{
        console.log(err)
      }
    })
    
  })
})


router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/admin/login");
});

module.exports = router;
