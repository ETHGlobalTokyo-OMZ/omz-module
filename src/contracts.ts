import { ChainIDEnums, ContractType } from './enums';

export interface IContract {
    type: ContractType;
    tokenName: string | null;
    address: string;
    decimal: number | null;
}

const contracts: Map<ChainIDEnums, IContract[]> = new Map([
    [ChainIDEnums.MUMBAI, [
        {
            type: ContractType.NATIVE_COIN,
            tokenName: "MATIC",
            address: "0x0000000000000000000000000000000000000000",
            decimal: 18
        },
        {
            type: ContractType.DAI,
            tokenName: "DAI",
            address: "0xE59062a02D944D3cEC8B87169d770A38b9f07ab0",
            decimal: 18
        },
        {
            type: ContractType.USDC,
            tokenName: "USDC",
            address: "0x1aC0aeFFfBe0D4483Da39f7a19d94b81b8645A42",
            decimal: 6
        },
        {
            type: ContractType.SELLER_VAULT,
            tokenName: null,
            address: "0x2476577EA63100172dD6AC68BcE9FaF74Ad973dE",
            decimal: null
        },
        {
            type: ContractType.ORDER_FACTORY,
            tokenName: null,
            address: "0x61Ed0C0Ba666085943fafCDBa54A8D280c4BC509",
            decimal: null
        }
    ]],
    [ChainIDEnums.GOERLI, [
        {
            type: ContractType.NATIVE_COIN,
            tokenName: "ETH",
            address: "0x0000000000000000000000000000000000000000",
            decimal: 18
        },
        {
            type: ContractType.DAI,
            tokenName: "DAI",
            address: "0x35e6B9DEd47E8187c98c54c590e8B3DAD7862769",
            decimal: 18
        },
        {
            type: ContractType.USDC,
            tokenName: "USDC",
            address: "0xa104180aF76c304DD2E2EaE152D93507b05e56E1",
            decimal: 6
        },
        {
            type: ContractType.SELLER_VAULT,
            tokenName: null,
            address: "0x84D2890F93170CEA8dDF19765605EcC4DDF0c0B9",
            decimal: null
        },
        {
            type: ContractType.ORDER_FACTORY,
            tokenName: null,
            address: "0x18afA8c1A0e33C2c59982cAF745D4BC6c23D010E",
            decimal: null
        }
    ]]
])

export function getContractsByChainID(chainID: ChainIDEnums): IContract[] | null {
    const chainContracts: IContract[] = contracts.get(chainID);
    if (chainContracts !== undefined && chainContracts.length === 0) {
        return null;
    }

    return chainContracts;
}

export function getContractByContractType(chainID: ChainIDEnums, contractType: ContractType): IContract | null {
    const chainContracts: IContract[] = contracts.get(chainID);

    for (const chainContract of chainContracts) {
        if (contractType === chainContract.type) {
            return chainContract
        }
    }

    return null;
}

export function getContractByContractAddress(chainID: ChainIDEnums, contractAddress: string): IContract | null {
    const chainContracts: IContract[] = contracts.get(chainID);

    for (const chainContract of chainContracts) {
        if (contractAddress.toLowerCase() === chainContract.address.toLocaleLowerCase()) {
            return chainContract
        }
    }

    return null;
}