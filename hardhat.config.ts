import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "hardhat-deploy"
import "dotenv/config"

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || ""
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""
const ETHERSCAN_API = process.env.ETHERSCAN_API || ""
const COINMARKETCAP_API = process.env.COINMARKETCAP_API || ""

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            // blockConfirmations: 1,d
        },
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
            timeout: 120000,
        },
    },
    solidity: {
        compilers: [{ version: "0.8.9" }, { version: "0.8.0" }],
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        player: {
            default: 1,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API,
    },
    gasReporter: {
        enabled: false,
        currency: "USD",
        // coinmarketcap: COINMARKETCAP_API
        // token: "MATIC"
    },
    mocha: {
        timeout: 300000, // 300 seconds max for running tests
    },
}

export default config
