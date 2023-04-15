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
            address: "0x714c0cF64697d37DA06b54980bc9a38A3038b5b4",
            decimal: 18
        },
        {
            type: ContractType.USDC,
            tokenName: "USDC",
            address: "0x3B1732F952772f4A94A4bb415DcAeeB78b5d3fAF",
            decimal: 6
        },
        {
            type: ContractType.SELLER_VAULT,
            tokenName: null,
            address: "0xD5e2A4E44eb72a863016610B831fEb25e4cd0FfD",
            decimal: null
        },
        {
            type: ContractType.ORDER_FACTORY,
            tokenName: null,
            address: "0xD883509B408031b7A4632ce549535718E12dC1c5",
            decimal: null
        }
    ]],
    [ChainIDEnums.GOERLI, [
        {
            type: ContractType.NATIVE_COIN,
            tokenName: "ETHER",
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
            address: "0xD883509B408031b7A4632ce549535718E12dC1c5",
            decimal: 6
        },
        {
            type: ContractType.SELLER_VAULT,
            tokenName: null,
            address: "0x870E499c50F38E902F93EF1e9c483BdfAe2286FB",
            decimal: null
        },
        {
            type: ContractType.ORDER_FACTORY,
            tokenName: null,
            address: "0x0aC11775dF929F6FE90AE4AC1E9E8E5Ec7294f28",
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