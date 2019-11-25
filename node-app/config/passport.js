const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose =require("mongoose");
const User =mongoose.model("users");
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';


module.exports = passport =>{ //接收server.js传递进来的passport  
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
       User.findById(jwt_payload.id)
           .then(user=>{
               if(user){
                   return done(null,user);
               }
               return done(null,err);
           })
           .catch(err=>console.log(err));
    }));
 
}

