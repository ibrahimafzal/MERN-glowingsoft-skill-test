const Car = require("../models/carModel")
const asyncHandler = require("express-async-handler")
const APIFilters = require("../utils/APIFilters")
const ErrorHandler = require("../utils/errorHandler")


const createNewCar = asyncHandler(async (req, res) => {
    req.body.user = req.user._id
    const car = await Car.create(req.body);
    res.json({ car })
})

const getAllCars = asyncHandler(async (req, res) => {
    const resPerPage = parseInt(req.query.resPerPage) || 4;
    const page = parseInt(req.query.page) || 1;
    const keyword = req.query.keyword
        ? {
            $or: [
                { name: { $regex: req.query.keyword, $options: "i" } },
            ]
        }
        : {};

    const carCount = await Car.countDocuments(keyword);

    // Pagination
    const skip = (page - 1) * resPerPage;

    const cars = await Car.find(keyword)
        .skip(skip)
        .limit(resPerPage);

    res.json({
        carCount,
        resPerPage,
        currentPage: page,
        totalPages: Math.ceil(carCount / resPerPage),
        cars,
    });
});

const getOneCar = asyncHandler(async (req, res) => {
    const car = await Car.findById(req.params.id);
    if (!car) {
        return new Error("car not find")
    }
    res.json({ car });
})

const deleteCar = asyncHandler(async (req, res) => {
    const carId = req.params.id;

    let car = await Car.findById(carId);
    if (!car) {
        return new Error("The car was not found")
    }

    car = await Car.findByIdAndDelete(carId)

    res.json({ success: true })
})

const updateCar = asyncHandler(async (req, res) => {
    let car = await Car.findById(req.params.id);
    if (!car) {
        return new Error("The car was not found")
    }

    car = await Car.findByIdAndUpdate(req.params.id, req.body)

    res.json({ car })

})

module.exports = { createNewCar, getAllCars, getOneCar, deleteCar, updateCar }