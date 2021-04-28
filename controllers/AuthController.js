const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function (err, hashPass) {
        if (err) {
            res.json({
                error: err
            })
        }

        let user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashPass
        })
        user.save()
            .then(user => {
                res.json({
                    message: "User is added successfully 👏👏"
                })
            }).catch(error => {
                res.json({
                    message: "An error Occured 😢"
                })
            })

    })


}
// login

const login = (req,res,next) => {
    var username = req.body.username
    var password = req.body.password

    User.findOne({$or:[{email:username},{phone:username}]})
    .then(user =>{
        if(user){
            bcrypt.compare(password, user.password, function (err,result){
                if(err){
                    res.json({
                        error: err
                    }) 
                }
                if(result){
                    let token = jwt.sign({name:user.name},'secretValue',{expiresIn:'1h'})
                    res.json({
                        message:'Login Successfully 👏👏',
                        token
                    })
                }else{
                    res.json({
                        message:"Password dose not match 🤷‍♀️ "
                    })
                }
            })
        }
        else{
          res.json({
              message:'no user found 🙌'
          })  
        }
    })
}


// 
module.exports = {
    register,login
}