const express = require("express")
const apiController = require("../controllers/apiController")

const router = express.Router()

router.get("/mockAPI", apiController.simulateMock)

router.post("/getUserPoaps", apiController.getAllUserPoaps)

router.post("/getAllEthereumTokenTransfers", apiController.getAllEthereumTokenTransfers)

router.post("/getAllPolygonTokenTransfers", apiController.getAllPolygonTokenTransfers)

router.post("/getAllBaseTokenTransfers", apiController.getAllBaseTokenTransfers)

module.exports = router