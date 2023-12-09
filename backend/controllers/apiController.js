const simulateMock = async (req, res) => {
    try {
        res.send(200, "Mock simulated")
    }
    catch(err){
        console.error(err)
        res.send(400, "Failed")
    }
}

module.exports = {simulateMock}