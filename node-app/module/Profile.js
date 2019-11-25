const mongoose =require('mongoose');
const Schema =mongoose.Schema;
//数据
//声明表格模型 实例化schema
const ProfileSchema = new Schema({
    type:{//类型
        type:String,
    },
    describe:{//类型
        type:String,
    },
    incode:{//类型
        type:String,
        required:true
    },
    expend:{//类型
        type:String,
        required:true
    },
    cash:{//类型
        type:String,
        required:true
    },
    remark:{//类型
        type:String,
    },
    date:{//时间
        type:Date,
        default:Date.now//默认时间
    },

})

module.exports = Profile =mongoose.model("profile",ProfileSchema);