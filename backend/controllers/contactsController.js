const { response, request } = require("express");
const Contact = require("../database/schemas/contact");
const User = require("../database/schemas/user");

const newContact = async (req,res)=>{
   
try {
    const body = req.body
    const {
        main_name,
        main_lastname,
        main_email,
        main_company,
        main_address,
        main_fiscal_number,
        main_phone_number,
        secondary_name,
        secondary_lastname,
        secondary_email,
        secondary_address,
        secondary_fiscal_number,
        secondary_phone_number,
        annotations,
        related_user

    } = body

    console.log(body)
    const user= await User.findById(related_user)
    console.log(user)
    

    const data = {
        main_name:main_name,
        main_lastname:main_lastname,
        main_email: main_email,
        main_company: main_company,
        main_address:main_address,
        main_fiscal_number:main_fiscal_number,
        main_phone_number:main_phone_number,
        secondary_name:secondary_name,
        secondary_lastname:secondary_lastname,
        secondary_email:secondary_email,
        secondary_address:secondary_address,
        secondary_fiscal_number:secondary_fiscal_number,
        secondary_phone_number:secondary_phone_number,
        annotations:annotations,
        related_user:user._id
    }
const newContact= new Contact(data)
await newContact.save()
user.contacts.push(newContact._id);
await user.save()

res.status(201).json(newContact)

} catch (error) {
    console.log(error)
    return res.status(500).send({ status: "ERROR TRYCATCH CREATE", message: error });
}


}


const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({});

        res.status(200).json(contacts);
    } catch (error) {
        console.error(error); // Registrar el error puede dar más pistas
        res.status(500).json({ message: error.message });
    }
};



const getContactbyId = async(req, res)=>{
try {
    const {id}= req.params;
    const contact = await Contact.findById(id)
    if (contact) res.status(200).json(contact);
    else res.status(404).send({ status: "ERROR", message: "Contact not found" });
} catch (error) {
    res.status(500).json({ message: error.message });
    
}

}

const deleteContactById = async (req, res) => {
    try {
        const { id } = req.params;

        // Primero, eliminar el contacto
        const contact = await Contact.findByIdAndDelete(id);

        if (!contact) {
            return res.status(404).send({ status: "ERROR", message: "Contact not found" });
        }

        // Si el contacto se eliminó con éxito, actualizar los usuarios que tenían este contacto
        await User.updateMany(
            { contacts: id },
            { $pull: { contacts: id } }
        );

        res.status(200).json({ message: `DELETED ${contact.main_email}` });
    } catch (error) {
        res.status(500).send({ status: "ERROR TRYCATCH DELETE", message: error });
    }
};

const updateContactById = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findByIdAndUpdate(id, req.body)
        if (contact) res.status(200).json(contact);
        else res.status(404).send({ status: "ERROR", message: "Contact not found" });
    } catch (error) {
        res.status(500).send(error)
    }

}


module.exports={
    newContact,
    getAllContacts,
getContactbyId,
deleteContactById,
updateContactById,
}