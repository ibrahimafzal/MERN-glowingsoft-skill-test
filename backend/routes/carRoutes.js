const express = require("express");
const { createNewCar, getAllCars, getOneCar, deleteCar, updateCar } = require("../controllers/carController");
const { authMiddleware, isAdmin } = require("../middlewares/authmiddlewares")

const router = express.Router()


router.put("/:id", authMiddleware, isAdmin, updateCar)
router.post("/", authMiddleware, isAdmin, createNewCar)
router.delete("/:id", authMiddleware, isAdmin, deleteCar)
router.get("/all-cars", getAllCars)
router.get("/:id", getOneCar)

module.exports = router;