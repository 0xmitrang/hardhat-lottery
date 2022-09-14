import { ethers } from "hardhat"

export interface networkConfigItem {
    vrfCoordinatorV2?: string
    blockConfirmations?: number
    entranceFee?: any
    gasLane?: string
    vrfSubscriptionId?: number
    callbackGasLimit?: string
    interval?: string
}

export interface networkConfigInfo {
    [key: string]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
    localhost: {},
    hardhat: {
        blockConfirmations: 1,
        entranceFee: ethers.utils.parseEther("0.01"),
        gasLane: "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15", //keyHash or GAslane
        callbackGasLimit: "500000",
        interval: "30",
    },
    goerli: {
        blockConfirmations: 6,
        vrfCoordinatorV2: "0x2ca8e0c643bde4c2e08ab1fa0da3401adad7734d",
        entranceFee: ethers.utils.parseEther("0.01"),
        gasLane: "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15", //keyHash or GAslane
        vrfSubscriptionId: 1452,
        callbackGasLimit: "500000",
        interval: "30",
    },
}

export const developmentChains = ["hardhat", "localhost"]
