const express = require('express')
const Web3 = require('web3')
const {uniSwapFactoryABI,uniSwapExchangeABI,kyberRateABI} = require("../ABIs")
const {UNISWAP_FACTORY_ADDRESS,KYBER_RATE_ADDRESS} = require("../addresses")
const app = express();

if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}

module.exports = async () => {


    try {
        console.log("PROVIDER: "+process.env.PROVIDER)
        // WEB3 CONFIG
        const web3 = await new Web3(process.env.PROVIDER);
        web3.eth.handleRevert = true;
        // Uniswap Factory Contract
        const uniswapFactoryContract = await new web3.eth.Contract(uniSwapFactoryABI, UNISWAP_FACTORY_ADDRESS)
        // Kyber mainnet "Expected Rate"
        const kyberRateContract = await new web3.eth.Contract(kyberRateABI, KYBER_RATE_ADDRESS)

        return {
            web3,
            uniswapFactoryContract,
            kyberRateContract
        }
    }catch (e) {
        throw new Error(e.message)
    }
}