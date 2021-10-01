const {uniSwapExchangeABI} = require("../ABIs")
const moment = require("moment-timezone")
const logger = require("./winston")

let priceMonitor
let monitoringPrice = false;


async function checkPair(args) {

    try{
        const {web3,uniswapFactoryContract, kyberRateContract, inputTokenSymbol, inputTokenAddress, outputTokenSymbol, outputTokenAddress, inputAmount } = args
        const exchangeAddress = await uniswapFactoryContract.methods.getExchange(outputTokenAddress).call()
        const exchangeContract = new web3.eth.Contract(uniSwapExchangeABI, exchangeAddress)
        const uniswapResult = await exchangeContract.methods.getEthToTokenInputPrice(inputAmount).call()
        let kyberResult = await kyberRateContract.methods.getExpectedRate(inputTokenAddress, outputTokenAddress, inputAmount, true).call()

        const uniswapReturn = parseFloat(web3.utils.fromWei(uniswapResult, 'Ether'))
        const kyberReturn = parseFloat(web3.utils.fromWei(kyberResult.expectedRate, 'Ether'))

        // if(uniswapReturn < kyberReturn){
        //     const profit =kyberReturn - uniswapReturn
        //     logger.debug(`Profit: ${profit}\r\n`)
        // }
        // logger.debug(`Input Token: ${inputTokenSymbol}\nOutput Token:${outputTokenSymbol}\nInput Amount:${web3.utils.fromWei(inputAmount, 'Ether')}\nUniswap Return:${web3.utils.fromWei(uniswapResult, 'Ether')}\nKyber Expected Rate:${web3.utils.fromWei(kyberResult.expectedRate, 'Ether')}\nKyber Min Return:${web3.utils.fromWei(kyberResult.slippageRate, 'Ether')}\r\n`)

        console.table([{
            'Input Token': inputTokenSymbol,
            'Output Token': outputTokenSymbol,
            'Input Amount': web3.utils.fromWei(inputAmount, 'Ether'),
            'Uniswap Return': web3.utils.fromWei(uniswapResult, 'Ether'),
            'Kyber Expected Rate': web3.utils.fromWei(kyberResult.expectedRate, 'Ether'),
            'Kyber Min Return': web3.utils.fromWei(kyberResult.slippageRate, 'Ether'),
            'Timestamp': moment().tz('America/Chicago').format(),
        }])

        return {
            inputToken: inputTokenSymbol,
            outputToken: outputTokenSymbol,
            inputAmount: web3.utils.fromWei(inputAmount, 'Ether'),
            uniswapReturn: web3.utils.fromWei(uniswapResult, 'Ether'),
            kyberExpectedRate: web3.utils.fromWei(kyberResult.expectedRate, 'Ether'),
            kyberMinReturn: web3.utils.fromWei(kyberResult.slippageRate, 'Ether'),
            timestamp: moment().tz('America/Chicago').format(),
        }
    }catch (err) {
        console.log(err.message)
        throw new Error(err.message)
    }

}


async function monitorPrice(web3,uniswapFactoryContract, kyberRateContract) {
    console.log("Checking prices...")

    try {
       return await checkPair({
            web3,
            uniswapFactoryContract,
            kyberRateContract,
            inputTokenSymbol: 'ETH',
            inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
            outputTokenSymbol: 'MKR',
            outputTokenAddress: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
            inputAmount: web3.utils.toWei('1', 'ETHER')
        })
        // await checkPair({
        //     web3,
        //     uniswapFactoryContract,
        //     kyberRateContract,
        //     inputTokenSymbol: 'ETH',
        //     inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        //     outputTokenSymbol: 'BNB',
        //     outputTokenAddress: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
        //     inputAmount: web3.utils.toWei('1', 'ETHER')
        // })
        // await checkPair({
        //     web3,
        //     uniswapFactoryContract,
        //     kyberRateContract,
        //     inputTokenSymbol: 'ETH',
        //     inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        //     outputTokenSymbol: 'UNI',
        //     outputTokenAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
        //     inputAmount: web3.utils.toWei('1', 'ETHER')
        // })
        //
        // await checkPair({
        //     web3,
        //     uniswapFactoryContract,
        //     kyberRateContract,
        //     inputTokenSymbol: 'ETH',
        //     inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        //     outputTokenSymbol: 'cETH',
        //     outputTokenAddress: '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5',
        //     inputAmount: web3.utils.toWei('1', 'ETHER')
        // })
        // await checkPair({
        //     web3,
        //     uniswapFactoryContract,
        //     kyberRateContract,
        //     inputTokenSymbol: 'ETH',
        //     inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        //     outputTokenSymbol: 'OKB',
        //     outputTokenAddress: '0x75231f58b43240c9718dd58b4967c5114342a86c',
        //     inputAmount: web3.utils.toWei('1', 'ETHER')
        // })

        // await checkPair({
        //     inputTokenSymbol: 'ETH',
        //     inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        //     outputTokenSymbol: 'BUSD',
        //     outputTokenAddress: '0x4fabb145d64652a948d72533023f6e7a623c7c53',
        //     inputAmount: web3.utils.toWei('1', 'ETHER')
        // })

        // await checkPair({
        //     inputTokenSymbol: 'ETH',
        //     inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        //     outputTokenSymbol: 'DAI',
        //     outputTokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
        //     inputAmount: web3.utils.toWei('1', 'ETHER')
        // })
        //
        // await checkPair({
        //     inputTokenSymbol: 'ETH',
        //     inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        //     outputTokenSymbol: 'KNC',
        //     outputTokenAddress: '0xdd974d5c2e2928dea5f71b9825b8b646686bd200',
        //     inputAmount: web3.utils.toWei('1', 'ETHER')
        // })
        //
        // await checkPair({
        //     inputTokenSymbol: 'ETH',
        //     inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        //     outputTokenSymbol: 'LINK',
        //     outputTokenAddress: '0x514910771af9ca656af840dff83e8264ecf986ca',
        //     inputAmount: web3.utils.toWei('1', 'ETHER')
        // })

    } catch (error) {
        console.error(error)
        throw new Error(error.message)
    }
}

module.exports = monitorPrice

