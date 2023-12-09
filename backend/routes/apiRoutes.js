const express = require("express")
const apiController = require("../controllers/apiController")

const router = express.Router()

router.get("/mockAPI", apiController.simulateMock)

module.exports = router