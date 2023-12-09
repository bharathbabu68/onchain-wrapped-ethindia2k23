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

      const { data, error } = await fetchQuery(query);

      if (error) {
        throw new Error(error.message);
      }
    
      res.send(data)

}

const getAllEthereumTokenTransfers = async (req, res) => {

    const userAddress = `"${req.body.userAddress}"`

    const query = `query MyQuery {
        Ethereum: TokenTransfers(
          input: {
            filter: {
              from: {_eq: ${userAddress}}, 
              tokenType: {_eq: ERC20}, 
              blockTimestamp: {_gte: "2023-01-01T00:00:00Z"}
            }, 
            blockchain: ethereum, 
            limit: 200
          }
        ) {
          TokenTransfer {
            from {
              identity
            }
            to {
              identity
            }
            tokenAddress
            amount
            formattedAmount
            tokenId
            tokenType
            transactionHash
            blockTimestamp
            token {
              name
              symbol
            }
          }
          pageInfo {
            nextCursor
            prevCursor
          }
        }
      }`

      const { data, error } = await fetchQuery(query);

      if (error) {
        throw new Error(error.message);
      }
    
      res.send(data)

}

const getAllPolygonTokenTransfers = async (req, res) => {

    const userAddress = `"${req.body.userAddress}"`

    const query = `query MyQuery {
        Polygon: TokenTransfers(
          input: {
            filter: {
              from: {_eq: ${userAddress}}, 
              tokenType: {_eq: ERC20}, 
              blockTimestamp: {_gte: "2023-01-01T00:00:00Z"}
            }, 
            blockchain: polygon, 
            limit: 200
          }
        ) {
          TokenTransfer {
            from {
              identity
            }
            to {
              identity
            }
            tokenAddress
            amount
            formattedAmount
            tokenId
            tokenType
            transactionHash
            blockTimestamp
            token {
              name
              symbol
            }
          }
          pageInfo {
            nextCursor
            prevCursor
          }
        }
      }`

      const { data, error } = await fetchQuery(query);

      if (error) {
        throw new Error(error.message);
      }
    
      res.send(data)

}

const getAllBaseTokenTransfers = async (req, res) => {

    const userAddress = `"${req.body.userAddress}"`

    const query = `query MyQuery {
        Base: TokenTransfers(
          input: {
            filter: {
              from: {_eq: ${userAddress}}, 
              tokenType: {_eq: ERC20}, 
              blockTimestamp: {_gte: "2023-01-01T00:00:00Z"}
            }, 
            blockchain: base, 
            limit: 200
          }
        ) {
          TokenTransfer {
            from {
              identity
            }
            to {
              identity
            }
            tokenAddress
            amount
            formattedAmount
            tokenId
            tokenType
            transactionHash
            blockTimestamp
            token {
              name
              symbol
            }
          }
          pageInfo {
            nextCursor
            prevCursor
          }
        }
      }`

      const { data, error } = await fetchQuery(query);

      if (error) {
        throw new Error(error.message);
      }
    
      res.send(data)

}



module.exports = {simulateMock, getAllUserPoaps, getAllEthereumTokenTransfers, getAllPolygonTokenTransfers, getAllBaseTokenTransfers}