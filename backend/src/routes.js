var express = require('express');
const bcrypt = require("bcrypt");
var db=require('./database');
var router = express.Router();
var config=require('./config');
var jwt = require('jsonwebtoken');


// router.route('/getUsers').get(function(req,res){
//   console.log('getUserrrrrrr');
//   res.status(200).send('ok');
// });
router.route('/login').post(function(req,res){
  let cadCheck=`select email,name,password from users where email=?`;
  db.query(cadCheck,req.body.email,(err,user)=>{
    if(!user){
      // return res.status(401).send({
      //   status:404,
      //   mesage:'Usuario no encontrado'
      // });
      return res.status(404).send('Sorry cant find that!');
    }else{
      console.log('----------');
      let usuario= Object.values(JSON.parse(JSON.stringify(user)))[0];
      console.log(usuario);
      let authenticated = bcrypt.compareSync(req.body.password, usuario.password)

      if(!authenticated){
        return res.json({
          status:404,
          message:'email o password no son correctos'
        });
      }else{
        const userObject = {
          email: user.email,
          name: user.name
        }
        // create token
        let token = jwt.sign(userObject, config.secret);
        return res.status(200).cookie('access_token', token, {
          maxAge: 3600000,
          httpOnly: true,
          // secure: true
        }).json({
          status: 200,
          usuario:{
            name:usuario.name,
            email:usuario.email,
            token:token
          }
        });
      }
    }
  });
});

router.route('/register').post(function(req,res){
	if(req.body.email){
    console.log('existe el email');
    let cadCheck=`select email from users where email=?`;
    db.query(cadCheck,req.body.email,(err,results,fields)=>{
      console.log('resultados'+results);
			if(results.length==0){
				console.log('no existe el usuario');
    		bcrypt.hash(req.body.password, config.saltRounds, (err, hash) => {
					var userData = {
						email: req.body.email,
						password: hash,
						name: req.body.name ? req.body.name : '',
          }
          let stmt = `INSERT INTO users(email,password,name) VALUES(?,?,?)`;
          let todo = [userData.email,hash,userData.name];
        // execute the insert statment
          db.query(stmt, todo, (err, results, fields) => {
            if (err) {
              return console.error(err.message);
            }
            console.log('Todo Id:' + results.insertId);
          });

					let token = jwt.sign(userData, config.secret);
    			return res.status(200).cookie('access_token', token, {
						maxAge: 3600000,
						httpOnly: true,
						// secure: true
					}).json({
						success: true
					});
					
				});

			}else{
				console.log('el email ya existe');
				return res.json({
					status:401,
					success:false,
					message:'el email ya existe'
				});
			}
			
		});

	}else{
		return res.json({
			status:404,
			success:false,
			message:'no email provided'
		});
	}

});

module.exports=router