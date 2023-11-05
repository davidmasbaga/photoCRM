const { Router } = require("express");
const {
  newUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
  getUserContactsByUserId
} = require("../controllers/usersController");

const router = Router();

router.post("/", newUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/:id/contacts", getUserContactsByUserId);
router.delete("/:id", deleteUserById);
router.put('/:id', updateUserById );



module.exports = router;
