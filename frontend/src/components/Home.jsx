import React, { useState } from 'react'
import { Container, Row, Col, Button, Card, Form, Modal, Spinner } from 'react-bootstrap';
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { particles_config } from "../particle-configs/particle1";
import NavBar from './NavBar';
import PoapCards from './PoapCards';
import TokenTransfersTable from './TokenTransfers';


const Home = () => {

    const [walletAddress, setWalletAddress] = useState("")
    const [createWrappedButtonClickStatus, setCreateWrappedButtonClickStatus] = useState(false)

    const [userPoaps, setUserPoaps] = useState([])
    const [mostFrequentLocation, setMostFrequentLocation] = useState("")
    const [numberofPoapsClaimedAtFreqLocation, setNumberofPoapsClaimedAtFreqLocation] = useState("")

    const [numberofEthTokenTransfers, setNumberOfEthTokenTransfers] = useState("")
    const [ethTokenTransfers, setEthTokenTransfers] = useState([])

    const [numberofEthNftTransfers, setNumberOfEthNftTransfers] = useState("")
    const [ethNftTransfers, setEthNftTransfers] = useState([])

    const [numberofPolygonNftTransfers, setNumberOfPolygonNftTransfers] = useState("")
    const [polygonNftTransfers, setPolygonNftTransfers] = useState([])

    const [numberofBaseNftTransfers, setNumberOfBaseNftTransfers] = useState("")
    const [baseNftTransfers, setBaseNftTransfers] = useState([])


    const [numberofPolygonTokenTransfers, setNumberOfPolygonTokenTransfers] = useState("")
    const [polygonTokenTransfers, setPolygonTokenTransfers] = useState([])

    const [numberofBaseTokenTransfers, setNumberOfBaseTokenTransfers] = useState("")
    const [baseTokenTransfers, setBaseTokenTransfers] = useState([])

    const [mostLikedChain, setMostLikedChain] = useState("")
    const [mostTransferCount, setMostTransferCount] = useState("");
    const [mostLikedChainData, setMostLikedChainData] = useState([])


    const [mostLikedChainForNft, setMostLikedChainForNft] = useState("")
    const [mostTransferCountForNft, setMostTransferCountForNft] = useState("");

    const [mostlikedTokenName, setMostLikedTokenName] = useState("")
    const [mostlikedTokenSymbol, setMostLikedTokenSymbol] = useState("")
    const [mostlikedTokenAddress, setMostLikedTokenAddress] = useState("")
    const [mostlikedTokenAddressTotalValueTransferred, setMostlikedTokenAddressTotalValueTransferred] = useState("")
    const [mostlikedTokenAddressMaxValueTransferred, setMostlikedTokenAddressMaxValueTransferred] = useState("")
    const [mostlikedTokenAddressTransferredTo, setMostlikedTokenAddressTransferredTo] = useState("")

    const [followersGainedCount, setFollowersGainedCount] = useState("")
    const [followersGained, setFollowersGained] = useState([])

    const [showCreatingWrappedModal, setShowCreatingWrappedModal] = useState(false)
    const [showWrappedResult, setShowWrappedResult] = useState(false)


    const [dalleUrl, setDalleUrl] = useState("")

    const [showPoaps, setShowPoaps] = useState(false)
    const [showTxTable, setShowTxTable] = useState(false)
    const [showAIGenImage, setShowAIGenImage] = useState(false)


    const particlesInit = useCallback(async (engine) => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
      }, []);
    
      const particlesLoaded = useCallback(async (container) => {
        await console.log(container);
      }, []);


      async function createWrapped() {
        setShowCreatingWrappedModal(true)
        // setCreateWrappedButtonClickStatus(true)

        // Make All API Calls to get whatever data here
        await getAllUserPoaps()

        await getAllTokenTransferDataAndSetMostUsed()

        await getAllNftTransferDataAndSetMostUsed()

        await getLensFollowerData()




        // Once we got all data, hide everything and show new component
        setCreateWrappedButtonClickStatus(true)
        handleCloseCreatingWrappedModal()
        setShowWrappedResult(true)

      }

      async function getLensFollowerData() {

        const response = await fetch('http://localhost:4000/api/getAllLensFollowersGained',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              "userAddress": walletAddress,
        })})
        if(response.status === 200){
          console.log("Request sent successfully")
          const data = await response.json()
          const socialFollowers = data.SocialFollowers
          const followers = socialFollowers.Follower
          if(followers){
            const followersGainedCount = followers.length
            setFollowersGainedCount(followersGainedCount)
            setFollowersGained(followers)
          }
          else{
            setFollowersGainedCount(0)
            setFollowersGained([])
          }
          

        }

      }

      async function getAllEthereumNftTransfers() {
        const response = await fetch('http://localhost:4000/api/getAllEthereumNftTransfers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "userAddress": walletAddress,
          })
        });
      
        if (response.status === 200) {
          console.log("Request sent successfully");
          const data = await response.json();
          const transfers = data.Ethereum;
          let tokenTransferArray = [];
          let transferCount = 0;
      
          if (transfers && transfers.TokenTransfer) {
            tokenTransferArray = transfers.TokenTransfer;
            transferCount = tokenTransferArray.length;
          }
      
          setEthNftTransfers(tokenTransferArray);
          setNumberOfEthNftTransfers(transferCount);
      
          console.log(tokenTransferArray);
          console.log(transferCount);
      
          return { tokenTransferArray, transferCount };
        }
      
        // Handle the case when the response status is not 200
        console.log('Failed to fetch Ethereum token transfers');
        setEthNftTransfers([]);
        setNumberOfEthNftTransfers(0);
        return { tokenTransferArray: [], transferCount: 0 };
      }

      async function getAllPolygonNftTransfers() {
        const response = await fetch('http://localhost:4000/api/getAllPolygonNftTransfers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "userAddress": walletAddress,
          })
        });
      
        if (response.status === 200) {
          console.log("Request sent successfully");
          const data = await response.json();
          const transfers = data.Ethereum;
          let tokenTransferArray = [];
          let transferCount = 0;
      
          if (transfers && transfers.TokenTransfer) {
            tokenTransferArray = transfers.TokenTransfer;
            transferCount = tokenTransferArray.length;
          }
      
          setPolygonNftTransfers(tokenTransferArray);
          setNumberOfPolygonNftTransfers(transferCount);
      
          console.log(tokenTransferArray);
          console.log(transferCount);
      
          return { tokenTransferArray, transferCount };
        }
      
        // Handle the case when the response status is not 200
        console.log('Failed to fetch Ethereum token transfers');
        setPolygonNftTransfers([]);
        setNumberOfPolygonNftTransfers(0);
        return { tokenTransferArray: [], transferCount: 0 };
      }

      async function getAllBaseNftTransfers() {
        const response = await fetch('http://localhost:4000/api/getAllBaseNftTransfers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "userAddress": walletAddress,
          })
        });
      
        if (response.status === 200) {
          console.log("Request sent successfully");
          const data = await response.json();
          const transfers = data.Ethereum;
          let tokenTransferArray = [];
          let transferCount = 0;
      
          if (transfers && transfers.TokenTransfer) {
            tokenTransferArray = transfers.TokenTransfer;
            transferCount = tokenTransferArray.length;
          }
      
          setBaseNftTransfers(tokenTransferArray);
          setNumberOfBaseNftTransfers(transferCount);
      
          console.log(tokenTransferArray);
          console.log(transferCount);
      
          return { tokenTransferArray, transferCount };
        }
      
        // Handle the case when the response status is not 200
        console.log('Failed to fetch Ethereum token transfers');
        setBaseNftTransfers([]);
        setNumberOfBaseNftTransfers(0);
        return { tokenTransferArray: [], transferCount: 0 };
      }

      async function getAllNftTransferDataAndSetMostUsed() {
        // Call the functions and store their return values
        const ethereumData = await getAllEthereumNftTransfers();
        const polygonData = await getAllPolygonNftTransfers();
        const baseData = await getAllBaseNftTransfers();
      
        // Extract transfer counts
        const ethTransferCount = ethereumData.transferCount;
        const polygonTransferCount = polygonData.transferCount;
        const baseTransferCount = baseData.transferCount;
      
        // Determine the most used chain and its transfer count
        const maxTransferCount = Math.max(ethTransferCount, polygonTransferCount, baseTransferCount);
        let mostUsedChain = '';
      
        if (maxTransferCount === ethTransferCount) {
          mostUsedChain = 'Ethereum';
        } else if (maxTransferCount === polygonTransferCount) {
          mostUsedChain = 'Polygon';
        } else if (maxTransferCount === baseTransferCount) {
          mostUsedChain = 'Base';
        }
      
        // Set the state for the most used chain and the number of transactions
        setMostLikedChainForNft(mostUsedChain);
        setMostTransferCountForNft(maxTransferCount);

      }

      async function getAllTokenTransferDataAndSetMostUsed() {
        // Call the functions and store their return values
        const ethereumData = await getAllEthereumTokenTransfers();
        const polygonData = await getAllPolygonTokenTransfers();
        const baseData = await getAllBaseTokenTransfers();
      
        // Extract transfer counts
        const ethTransferCount = ethereumData.transferCount;
        const polygonTransferCount = polygonData.transferCount;
        const baseTransferCount = baseData.transferCount;
      
        // Determine the most used chain and its transfer count
        const maxTransferCount = Math.max(ethTransferCount, polygonTransferCount, baseTransferCount);
        let mostUsedChain = '';
      
        if (maxTransferCount === ethTransferCount) {
          mostUsedChain = 'Ethereum';
        } else if (maxTransferCount === polygonTransferCount) {
          mostUsedChain = 'Polygon';
        } else if (maxTransferCount === baseTransferCount) {
          mostUsedChain = 'Base';
        }
      
        // Set the state for the most used chain and the number of transactions
        setMostLikedChain(mostUsedChain);
        setMostTransferCount(maxTransferCount);

        var mostFreqToken;

        if(mostUsedChain=='Ethereum'){
          setMostLikedChainData(ethereumData.tokenTransferArray)
          mostFreqToken = analyzeTokenTransfers(ethereumData.tokenTransferArray)
        }
        else if(mostUsedChain == 'Polygon'){
          setMostLikedChainData(polygonData.tokenTransferArray)
          mostFreqToken = analyzeTokenTransfers(polygonData.tokenTransferArray)
        }

        else{
          setMostLikedChainData(baseData.tokenTransferArray)
          mostFreqToken = analyzeTokenTransfers(baseData.tokenTransferArray)
        }

        setMostLikedTokenName(mostFreqToken.name);
        setMostLikedTokenSymbol(mostFreqToken.symbol);
        setMostLikedTokenAddress(mostFreqToken.address);
        setMostlikedTokenAddressTotalValueTransferred(mostFreqToken.totalAmount);
        setMostlikedTokenAddressMaxValueTransferred(mostFreqToken.maxTransfer.amount);
        setMostlikedTokenAddressTransferredTo(mostFreqToken.maxTransfer.to);

      }
      

      function handleCloseCreatingWrappedModal() {
        setShowCreatingWrappedModal(false)
      }


      async function createWrappedImageDallE(){
        console.log("Request sent to Dall e")
        const promptText = `This year, you claimed aroud ${userPoaps.length} POAPs. You claimed the most POAPs at ${mostFrequentLocation.city},${mostFrequentLocation.country}. You claimed around ${numberofPoapsClaimedAtFreqLocation} POAPs here ! You used multiple chains for token transfers, but there was one-chain you liked the most. Your favorite chain was ${mostLikedChain} where you performed ${mostTransferCount} transactions. Your favorite token was ${mostlikedTokenName} with symbol ${mostlikedTokenSymbol}. The total value of this token you transferred across all your transactions was ${mostlikedTokenAddressTotalValueTransferred}. The biggest transaction you made with this token was for ${mostlikedTokenAddressMaxValueTransferred} ${mostlikedTokenSymbol} to ${mostlikedTokenAddressTransferredTo}. This year, you gained ${followersGainedCount} followers on your lens handle.`
        const response = await fetch('http://localhost:4000/api/createWrappedImage',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "promptText": promptText,
          })})
          if(response.status === 200){
            console.log("Request sent successfully")
            const data = await response.json()
            const url = data.image_url[0].url;
            console.log(url)
            setDalleUrl(url)
          }
      }

      async function getAllUserPoaps() {
        const response = await fetch('http://localhost:4000/api/getUserPoaps',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "userAddress": walletAddress,
          })})
          if(response.status === 200){
            console.log("Request sent successfully")
            const data = await response.json()
            const poaps = data.Poaps
            const poapArray = poaps.Poap
            if(poapArray){
            console.log(poapArray)
            setUserPoaps(poapArray)
            const res = getMostFrequentLocation(poapArray)
            setMostFrequentLocation(res.mostFrequentLocation)
            setNumberofPoapsClaimedAtFreqLocation(res.maxCount)
            }
            else{
              setUserPoaps([])
              setMostFrequentLocation("")
              setNumberofPoapsClaimedAtFreqLocation("")
            }

          }
      }

      function analyzeTokenTransfers(transfers) {
        const tokenCounts = {};
        let mostFrequentToken = {
          name: '',
          symbol: '',
          address: '',
          totalAmount: 0,
          maxTransfer: { to: '', amount: 0 }
        };
      
        transfers.forEach(transfer => {
          const tokenKey = transfer.token.symbol;
          const formattedAmount = transfer.formattedAmount;
          const toAddress = transfer.to.identity;
      
          if (!tokenCounts[tokenKey]) {
            tokenCounts[tokenKey] = { count: 0, totalAmount: 0, maxTransfer: { to: '', amount: 0 } };
          }
      
          tokenCounts[tokenKey].count++;
          tokenCounts[tokenKey].totalAmount += formattedAmount;
      
          if (formattedAmount > tokenCounts[tokenKey].maxTransfer.amount) {
            tokenCounts[tokenKey].maxTransfer = { to: toAddress, amount: formattedAmount };
          }
      
          if (tokenCounts[tokenKey].count > mostFrequentToken.totalAmount) {
            mostFrequentToken = {
              name: transfer.token.name,
              symbol: tokenKey,
              address: transfer.tokenAddress,
              totalAmount: tokenCounts[tokenKey].totalAmount,
              maxTransfer: tokenCounts[tokenKey].maxTransfer
            };
          }
        });
      
        return mostFrequentToken;
      }
      
      async function getAllEthereumTokenTransfers() {
        const response = await fetch('http://localhost:4000/api/getAllEthereumTokenTransfers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "userAddress": walletAddress,
          })
        });
      
        if (response.status === 200) {
          console.log("Request sent successfully");
          const data = await response.json();
          const transfers = data.Ethereum;
          let tokenTransferArray = [];
          let transferCount = 0;
      
          if (transfers && transfers.TokenTransfer) {
            tokenTransferArray = transfers.TokenTransfer;
            transferCount = tokenTransferArray.length;
          }
      
          setEthTokenTransfers(tokenTransferArray);
          setNumberOfEthTokenTransfers(transferCount);
      
          console.log(tokenTransferArray);
          console.log(transferCount);
      
          return { tokenTransferArray, transferCount };
        }
      
        // Handle the case when the response status is not 200
        console.log('Failed to fetch Ethereum token transfers');
        setEthTokenTransfers([]);
        setNumberOfEthTokenTransfers(0);
        return { tokenTransferArray: [], transferCount: 0 };
      }
      

      async function getAllPolygonTokenTransfers() {
        const response = await fetch('http://localhost:4000/api/getAllPolygonTokenTransfers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "userAddress": walletAddress,
          })
        });
      
        if (response.status === 200) {
          console.log("Request sent successfully");
          const data = await response.json();
          const transfers = data.Polygon;
          let tokenTransferArray = [];
          let transferCount = 0;
      
          if (transfers && transfers.TokenTransfer) {
            tokenTransferArray = transfers.TokenTransfer;
            transferCount = tokenTransferArray.length;
          }
      
          setPolygonTokenTransfers(tokenTransferArray);
          setNumberOfPolygonTokenTransfers(transferCount);
      
          console.log(tokenTransferArray);
          console.log(transferCount);
      
          return { tokenTransferArray, transferCount };
        }
      
        // Handle the case when the response status is not 200
        console.log('Failed to fetch Ethereum token transfers');
        setPolygonTokenTransfers([]);
        setNumberOfPolygonTokenTransfers(0);
        return { tokenTransferArray: [], transferCount: 0 };
      }

      async function getAllBaseTokenTransfers() {
        const response = await fetch('http://localhost:4000/api/getAllBaseTokenTransfers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "userAddress": walletAddress,
          })
        });
      
        if (response.status === 200) {
          console.log("Request sent successfully");
          const data = await response.json();
          const transfers = data.Base;
          let tokenTransferArray = [];
          let transferCount = 0;
      
          if (transfers && transfers.TokenTransfer) {
            tokenTransferArray = transfers.TokenTransfer;
            transferCount = tokenTransferArray.length;
          }
      
          setBaseTokenTransfers(tokenTransferArray);
          setNumberOfBaseTokenTransfers(transferCount);
      
          console.log(tokenTransferArray);
          console.log(transferCount);
      
          return { tokenTransferArray, transferCount };
        }
      
        // Handle the case when the response status is not 200
        console.log('Failed to fetch Ethereum token transfers');
        setBaseTokenTransfers([]);
        setNumberOfBaseTokenTransfers(0);
        return { tokenTransferArray: [], transferCount: 0 };
      }

      function getMostFrequentLocation(poapEvents) {
        const locationCount = {};
        let maxCount = 0;
        let mostFrequentLocation = {};
      
        poapEvents.forEach(event => {
          // Check if both city and country are present
          if (event.poapEvent.city && event.poapEvent.country) {
            const locationKey = `${event.poapEvent.city}, ${event.poapEvent.country}`;
            
            if (locationCount[locationKey]) {
              locationCount[locationKey]++;
            } else {
              locationCount[locationKey] = 1;
            }
      
            if (locationCount[locationKey] > maxCount) {
              maxCount = locationCount[locationKey];
              mostFrequentLocation = { city: event.poapEvent.city, country: event.poapEvent.country };
            }
          }
        });
      
        return {mostFrequentLocation, maxCount};
      }
      
      


  return (
    <>
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={particles_config}
        />
        <NavBar/>

        <Modal centered show={showCreatingWrappedModal} onHide={handleCloseCreatingWrappedModal}>
        <Modal.Header closeButton>
          <Modal.Title>Creating your wrapped !</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Hold on, we're fetching your on-chain data ! Fetching from Airstack ⚡️ Also running some analytics on your data !</p>
          <Spinner animation="border" />
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>

        {!createWrappedButtonClickStatus && <div style={{textAlign:"center"}}>
            <Container style={{color:"white"}}>
                <h1 style={{fontFamily:"Roboto Mono", marginTop:"12%", fontSize:"3.5rem"}}>{`< On-chain Wrapped ⛓ >`}</h1>
                <h3 style={{fontFamily:"Roboto Mono", marginTop:"2%", fontSize:"1.7rem", color:"orange"}}>Create your #2023 on-chain wrapped</h3>
                <Form.Control style={{marginLeft: "25%", width:"50%", textAlign:"center", marginTop:"5%"}} onChange={(e)=>setWalletAddress(e.target.value)} type="text" placeholder="Paste your wallet address / ENS to get your #wrapped !" />
                <Button onClick={createWrapped} style={{marginTop:"2%"}} variant="outline-light" size="lg">
                Create my Wrapped !
                </Button>{' '}
                <h5 style={{fontFamily:"Roboto Mono", fontSize:"1.1rem", marginTop:"7%", color:"lightgreen"}}>Powered by Airstack APIs, get a summary of your on-chain activity across multiple chains for the year !</h5>
            </Container>
        </div>}

        {showWrappedResult && <div style={{textAlign:"center", padding:"2%"}}>


        <h1 style={{fontFamily:"Roboto Mono", marginTop:"6%", fontSize:"3.5rem", color:"yellow"}}>Presenting your 2023 Wrapped !</h1>
        <br />
        <div style={{padding:"1%", paddingTop:"0%", border:"1px solid white", marginLeft:"25%", marginRight:"25%"}}>
        <h3 style={{marginTop:"3%", fontFamily:"Roboto Mono", color:"white", fontSize:"1.7rem", color:"orange"}}>#Wrapped</h3>
        <br />
        <p style={{color:"white",fontFamily:"Roboto Mono", fontSize:"1.1rem"}}>This year, you claimed aroud {userPoaps.length} POAPs</p>
        <p style={{color:"white", fontFamily:"Roboto Mono",fontSize:"1.1rem"}}>You claimed the most POAPs at {mostFrequentLocation.city},{mostFrequentLocation.country}. You claimed around {numberofPoapsClaimedAtFreqLocation} POAPs here !</p>
        <br />
        <p style={{color:"white",fontFamily:"Roboto Mono", fontSize:"1.1rem"}}>You used multiple chains for token transfers, but there was one-chain you liked the most. Your favorite chain was {mostLikedChain} where you performed {mostTransferCount} transactions. </p>
        <br />
        <p style={{color:"white",fontFamily:"Roboto Mono", fontSize:"1.1rem"}}>Your favorite token was {mostlikedTokenName} with symbol {mostlikedTokenSymbol}. The total value of this token you transferred across all your transactions was {mostlikedTokenAddressTotalValueTransferred}. </p>
        <p style={{color:"white",fontFamily:"Roboto Mono", fontSize:"1.1rem"}}>The biggest transaction you made with this token was for {mostlikedTokenAddressMaxValueTransferred} {mostlikedTokenSymbol} to {mostlikedTokenAddressTransferredTo}</p>
        <br />
        <p style={{color:"white",fontFamily:"Roboto Mono", fontSize:"1.1rem"}}>Oh, and coming to NFTs, your favorite chain for NFT Transfers was {mostLikedChainForNft} with around {mostTransferCountForNft} transfers this year!</p>
        <br />
        <p style={{color:"white",fontFamily:"Roboto Mono", fontSize:"1.1rem"}}>This year, you gained {followersGainedCount} followers on your lens handle. </p>

        </div>

        <Button onClick={
          ()=>{
            if(showPoaps){
              setShowPoaps(false)
            }
            else{
              setShowPoaps(true)
            }
          }
        } style={{marginTop:"2%"}} variant="outline-light" size="lg">
                Show / Hide my POAPs
                </Button>{' '}

                <Button onClick={
          ()=>{
            if(showTxTable){
              setShowTxTable(false)
            }
            else{
              setShowTxTable(true)
            }
          }
        } style={{marginTop:"2%"}} variant="outline-light" size="lg">
                Show / Hide my Transfers Data
                </Button>{' '}

          <Button onClick={
              async ()=>{
                if(!dalleUrl){
                  await createWrappedImageDallE()
                }
                if(showAIGenImage){
                  setShowAIGenImage(false)
                }
                else{
                  setShowAIGenImage(true)
                }
              }
          } style={{marginTop:"2%"}} variant="outline-light" size="lg">
          Mint my Wrapped
          </Button>{' '}
          <Button onClick={
           ()=>{
          }
          } style={{marginTop:"2%"}} variant="outline-light" size="lg">
          Share my #Wrapped
          </Button>{' '}
        {showPoaps && <PoapCards poapEvents={userPoaps} />}
        {showTxTable && < div style={{padding:"2%"}}>
        <TokenTransfersTable tokenTransfers={mostLikedChainData} />
        </div>}
        {showAIGenImage &&  <div style={{marginTop:"2%"}}><h5 style={{marginBottom:"2%",color:"white",fontFamily:"Roboto Mono", fontSize:"1.2rem"}}>Your Wrapped Image</h5> <img src={dalleUrl} alt="From URL" /> </div>}
        </div>
        }



    </>
  )
}

export default Home