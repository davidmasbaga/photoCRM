const {Router} = require ('express');

const {newContact,
    getAllContacts,
    getContactbyId,
    deleteContactById,
    updateContactById
    
} = require("../controllers/contactsController")
//import modelos

const router = Router()

//rutas
router.post("/", newContact)
router.get("/", getAllContacts)
router.get("/:id", getContactbyId)
router.delete("/:id", deleteContactById)
router.put("/:id", updateContactById)

module.exports=router
