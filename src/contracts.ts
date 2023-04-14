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
            type: ContractType.USDC,
            tokenName: "USDC",
            address: "0x1B487e41a3D806378eFdBC6E14ca96E31Ee2D90c",
            decimal: 18
        },
        {
            type: ContractType.BOB,
            tokenName: "BOB",
            address: "0xe14B7E2a2Ce7CDe22e36f4518F9747B1e374e3a1",
            decimal: 18
        },
        {
            type: ContractType.SELLER_VAULT,
            tokenName: null,
            address: "0x46DE81eA95C2540cC38CBA4e45cf749Ac3a80a5f",
            decimal: null
        },
        {
            type: ContractType.ORDER_FACTORY,
            tokenName: null,
            address: "0x24F72B93748EB1752dEb9b01A9944aC3238f8C5C",
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
            type: ContractType.USDC,
            tokenName: "USDC",
            address: "0x88fBa6D6C53FBDC3D8b6C11bC5cB5DC8f853Cc6E",
            decimal: 18
        },
        {
            type: ContractType.SELLER_VAULT,
            tokenName: null,
            address: "0x3EFD20673d47507C382Fd1004CA729FCD04C40c7",
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