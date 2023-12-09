require("dotenv").config()
const { init, fetchQuery } = require("@airstack/node");

init(process.env.AIRSTACK_API_KEY);

const simulateMock = async (req, res) => {
    try {
        res.send(200, "Mock simulated")
    }
    catch(err){
        console.error(err)
        res.send(400, "Failed")
    }
}

const getAllUserPoaps = async (req, res) => {

    const userAddress = `"${req.body.userAddress}"`

    const query = `query POAPsof2023 {
        Poaps(
          input: {filter: {owner: {_eq: ${userAddress}}, createdAtBlockNumber: {_gt: 25747423}}, blockchain: ALL, limit: 200, order: {createdAtBlockNumber: DESC}}
        ) {
          Poap {
            eventId
            poapEvent {
              eventName
              eventURL
              startDate
              endDate
              country
              city
              contentValue {
                image {
                  extraSmall
                  large
                  medium
                  original
                  small
                }
              }
            }
            createdAtBlockNumber
          }
        }
      }`

      console.log(query)

      const { data, error } = await fetchQuery(query);

      if (error) {
        throw new Error(error.message);
      }
    
      res.send(data)

}

module.exports = {simulateMock, getAllUserPoaps}