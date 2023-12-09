const express = require("express")
const apiController = require("../controllers/apiController")

const router = express.Router()

router.get("/mockAPI", apiController.simulateMock)

router.post("/getUserPoaps", apiController.getAllUserPoaps)

module.exports = router