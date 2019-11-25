const mongoose =require('mongoose');
const Schema =mongoose.Schema;
//用户信息
//声明表格模型 实例化schema
const UserSchema = new Schema({
    name:{//用户名
        type:String,
        required:true//需要
    },
    email:{//邮箱
        type:String,
        required:true
    },
    password:{//密码
        type:String,
        required:true
    },
    avatar:{//头像
        type:String
    },
    identity:{//权限
        type:String,
        required:true
    },
    date:{//时间
        type:Date,
        default:Date.now//默认时间
    },

})

module.exports = User =mongoose.model("users",UserSchema);