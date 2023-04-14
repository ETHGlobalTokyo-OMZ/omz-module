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
            address: "0xE1F26CE19D9B2eEfBB533fa991fE299cFC5EA915",
            decimal: 6
        },
        {
            type: ContractType.BOB,
            tokenName: "BOB",
            address: "0x60906a86E4768AfA612ed8E03752F9D6ae53F3aC",
            decimal: 18
        },
        {
            type: ContractType.SELLER_VAULT,
            tokenName: null,
            address: "0xB870C41eBA2711Ab3E1e47d53F817635a3eD5D23",
            decimal: null
        },
        {
            type: ContractType.ORDER_FACTORY,
            tokenName: null,
            address: "0x0eBE433228B2af01b3802d53c6065c141224603f",
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