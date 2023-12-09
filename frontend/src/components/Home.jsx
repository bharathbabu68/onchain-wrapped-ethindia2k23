import React, { useState } from 'react'
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { particles_config } from "../particle-configs/particle1";
import NavBar from './NavBar';



const Home = () => {

    const [walletAddress, setWalletAddress] = useState("")
    const [createWrappedButtonClickStatus, setCreateWrappedButtonClickStatus] = useState(false)


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

        setCreateWrappedButtonClickStatus(true)

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
    </>
  )
}

export default Home