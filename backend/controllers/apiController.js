require("dotenv").config()
const { init, fetchQuery } = require("@airstack/node");
const {OpenAI} = require("openai")

init(process.env.AIRSTACK_API_KEY);
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

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

const getAllEthereumNftTransfers = async (req, res) => {

    const userAddress = `"${req.body.userAddress}"`

    const query = `query MyQuery {
        Ethereum: TokenTransfers(
          input: {
            filter: {
              _or: [
                {from: {_eq: ${userAddress}}},
                {to: {_eq: ${userAddress}}}
              ],
              tokenType: {_in: [ERC721, ERC1155]},
              blockTimestamp: {_gte: "2023-01-01T00:00:00Z", _lte: "2023-12-31T23:59:59Z"}
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
            token {
              name
              symbol
              tokenNfts {
                contentValue {
                  image {
                    small
                  }
                }
              }
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

const getAllPolygonNftTransfers = async (req, res) => {

    const userAddress = `"${req.body.userAddress}"`

    const query = `query MyQuery {
        Ethereum: TokenTransfers(
          input: {
            filter: {
              _or: [
                {from: {_eq: ${userAddress}}},
                {to: {_eq: ${userAddress}}}
              ],
              tokenType: {_in: [ERC721, ERC1155]},
              blockTimestamp: {_gte: "2023-01-01T00:00:00Z", _lte: "2023-12-31T23:59:59Z"}
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
            token {
              name
              symbol
              tokenNfts {
                contentValue {
                  image {
                    small
                  }
                }
              }
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

const getAllBaseNftTransfers = async (req, res) => {

    const userAddress = `"${req.body.userAddress}"`

    const query = `query MyQuery {
        Ethereum: TokenTransfers(
          input: {
            filter: {
              _or: [
                {from: {_eq: ${userAddress}}},
                {to: {_eq: ${userAddress}}}
              ],
              tokenType: {_in: [ERC721, ERC1155]},
              blockTimestamp: {_gte: "2023-01-01T00:00:00Z", _lte: "2023-12-31T23:59:59Z"}
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
            token {
              name
              symbol
              tokenNfts {
                contentValue {
                  image {
                    small
                  }
                }
              }
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
        console.log(error)
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

const getAllLensFollowersGained = async (req, res) => {
    const userAddress = `"${req.body.userAddress}"`

    const query = `query MyQuery {
        SocialFollowers(
          input: {filter: {identity: {_in: [${userAddress}]}, followerSince: {_gt: "2023-01-01T00:00:00Z"}, dappName: {_eq: lens}}, blockchain: ALL, limit: 200}
        ) {
          Follower {
            followerAddress {
              addresses
              domains {
                name
              }
              socials {
                dappName
                profileName
                profileTokenId
                profileTokenIdHex
                userId
                userAssociatedAddresses
              }
            }
            followerProfileId
            followerTokenId
            followingAddress {
              domains {
                name
              }
            }
            followingProfileId
            followerSince
          }
        }
      }`

      const { data, error } = await fetchQuery(query);

      if (error) {
        throw new Error(error.message);
      }
    
      res.send(data)
}


const createWrappedImage = async (req, res) => {

    var promptText = "For the below text - generate an image kind of similar to spotify wrapped. This is meant to summarize the on-chain activity of the user across multiple chains. You dont have to have so much of infographics on it, just make something attractive. "
    promptText += req.body.promptText

    const image = await openai.images.generate({
        model: "dall-e-3",
        prompt: promptText,
        n: 1,
        size: "1024x1024",
      });
      image_url = image.data

      var obj = {
        image_url: image_url
      }

      res.send(obj)



}


module.exports = {simulateMock, getAllUserPoaps, getAllEthereumTokenTransfers, getAllPolygonTokenTransfers, getAllBaseTokenTransfers, getAllLensFollowersGained, createWrappedImage, getAllEthereumNftTransfers, getAllPolygonNftTransfers, getAllBaseNftTransfers}