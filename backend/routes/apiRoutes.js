const express = require("express")
const apiController = require("../controllers/apiController")

const router = express.Router()

router.get("/mockAPI", apiController.simulateMock)

router.post("/getUserPoaps", apiController.getAllUserPoaps)

router.post("/getAllEthereumTokenTransfers", apiController.getAllEthereumTokenTransfers)

router.post("/getAllEthereumNftTransfers", apiController.getAllEthereumNftTransfers)

router.post("/getAllPolygonNftTransfers", apiController.getAllPolygonNftTransfers)

router.post("/getAllBaseNftTransfers", apiController.getAllBaseNftTransfers)

router.post("/getAllPolygonTokenTransfers", apiController.getAllPolygonTokenTransfers)

router.post("/getAllBaseTokenTransfers", apiController.getAllBaseTokenTransfers)

router.post("/getAllLensFollowersGained", apiController.getAllLensFollowersGained)

router.post("/createWrappedImage", apiController.createWrappedImage)

module.exports = router