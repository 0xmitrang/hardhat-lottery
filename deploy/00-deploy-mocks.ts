import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { developmentChains } from "../helper-hardhat-config"
import { ethers } from "hardhat"

const BASE_FEE = ethers.utils.parseEther("0.25") //0.25 is the premium, costs 0.25 LINK/request
const GAS_PRICE_LINK = 1e9 //1000000000 // LINK/gas

const deployMocks: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { deployments, getNamedAccounts, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    // const chainId = network.config.chainId
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (developmentChains.includes(network.name)) {
        log(`Local Network detected! Deploying Mocks...`)
        await deploy("VRFCoordinatorV2Mock", {
            contract: "VRFCoordinatorV2Mock",
            from: deployer,
            log: true,
            args: args,
        })
        log("Mocks deployed successfully")
        log("_______________________________________________\n")
    }
}

export default deployMocks
deployMocks.tags = ["all", "mocks"]
