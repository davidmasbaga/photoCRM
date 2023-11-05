const { response, request } = require("express");
const User = require("../database/schemas/user");

const newUser = async (req, res) => {
    try {
        const body = req.body;
        const {
            name,
            lastname,
            username,
            email,
            company,
            phone_number,
            website,
            instagram,
            address,
            fiscal_number
        } = body;
    
        const data = {
            name: name,
            lastname: lastname,
            email: email,
            username: username,
            company: company,
            phone_number: phone_number,
            website: website,
            instagram: instagram,
            adress:address,
            fiscal_number:fiscal_number,
            // contacts
        };

       

        const newUser = new User(data);
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        return res
            .status(500)
            .send({ status: "ERROR TRYCATCH CREATE", message: error });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).populate("contacts","_id  main_email");

        res.status(200).json(users);
    } catch (error) {
        console.error(error); // Registrar el error puede dar más pistas
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {

    try {
        const { id } = req.params;
        const user = await User.findById(id).populate("contacts","_id  main_email");
        if (user) res.status(200).json(user);
        else res.status(404).send({ status: "ERROR", message: "User not found" });
    } catch (error) {
        res.status(500).send({ status: "ERROR TRYCATCH ById", message: error })
    }

}

const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (user) res.status(200).json(`DELETED ${user.username}`);
        else res.status(404).send({ status: "ERROR", message: "User not found" });
    } catch (error) {
        res.status(500).send(error)
    }

}

const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body)
        if (user) res.status(200).json(user);
        else res.status(404).send({ status: "ERROR", message: "User not found" });
    } catch (error) {
        res.status(500).send(error)
    }

}


//--- Búsquedas parametrizadas

const getUserContactsByUserId= async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findById(id).select('contacts').populate("contacts","_id  main_email")
        if (!user) {
            return res.status(404).json({ status: "ERROR", message: "User not found" });
        }

        res.status(200).json(user.contacts);

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "ERROR", message: error.message });
    }
}

module.exports = {
    newUser,
    getAllUsers,
    getUserById,
    deleteUserById,
    updateUserById,
    getUserContactsByUserId,
};
