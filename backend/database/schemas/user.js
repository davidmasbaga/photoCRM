const {Schema,model} =require('mongoose');

const userSchema = new Schema({
    name: {type:String},
    lastname: {type:String},
    username:{type:String, unique:true, required:true},
    email:{type:String, unique:true, required:true},
    //password: { type: String, required:true},
    company:{type:String},
    address:{type:String},
    fiscal_number:{type:String},
    phone_number:{type:String},
    website:{type:String},
    Instagram:{type:String},
    Twitter:{type:String},
    Pinterest:{type:String},
    createdAt: { type: Date, default: Date.now },
    
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },

    //Relations
    contacts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Contact'
        }
      ],
})


const User = model('User', userSchema);

module.exports= User