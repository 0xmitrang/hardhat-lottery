import { ethers } from "hardhat"
import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { networkConfig, developmentChains } from "../helper-hardhat-config"
import verify from "../utils/verify"

const VRF_SUB_FUND_AMOUNT = ethers.utils.parseEther("2")

const deployRaffle: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { deployments, getNamedAccounts, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    // const chainId: number = network.config.chainId!
    let vrfCoordinatorV2Address, subscriptionId

    if (developmentChains.includes(network.name)) {
        const vrfCoordinatorV2Mock = await ethers.getContract(
            "VRFCoordinatorV2Mock"
        )
        vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address
        const txResponse = await vrfCoordinatorV2Mock.createSubscription()
        const txReceipt = await txResponse.wait(1)
        subscriptionId = txReceipt.events[0].args.subId

        await vrfCoordinatorV2Mock.fundSubscription(
            subscriptionId,
            VRF_SUB_FUND_AMOUNT
        )
    } else {
        vrfCoordinatorV2Address = networkConfig[network.name].vrfCoordinatorV2
        subscriptionId = networkConfig[network.name].vrfSubscriptionId
    }

    const entranceFee = networkConfig[network.name].entranceFee
    const gasLane = networkConfig[network.name].gasLane
    const callbackGasLimit = networkConfig[network.name].callbackGasLimit
    const interval = networkConfig[network.name].interval

    const args: any = [
        vrfCoordinatorV2Address,
        entranceFee,
        gasLane,
        subscriptionId,
        callbackGasLimit,
        interval,
    ]
    const raffle = await deploy("Raffle", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
    })

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API
    ) {
        await verify(raffle.address, args)
    }
}

export default deployRaffle
deployRaffle.tags = ["all", "raffle"]
