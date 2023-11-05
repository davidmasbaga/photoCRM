const { Schema,model } = require("mongoose");

const contactSchema = new Schema({
    main_name: {type: String, },
    main_lastname: {type: String},
    main_email: {type: String , required:true, unique: true},
    main_company: {type: String},
    main_address: {type: String},
    main_fiscal_number: {type: String},
    main_phone_number: {type: String},
    secondary_name: {type: String},
    secondary_lastname: {type: String},
    secondary_email: {type: String},
    secondary_address: {type: String},
    secondary_fiscal_number: {type: String},
    secondary_phone_number: {type: String},
    annotations: {type: String},
    createdAt: { type: Date, default: Date.now },
    related_user: {
      type: Schema.ObjectId,
      ref: 'User'
    }

})

const Contact = model('Contact', contactSchema);

module.exports= Contact