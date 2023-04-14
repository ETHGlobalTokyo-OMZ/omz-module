import { ChainIDEnums, ContractType } from './enums';

interface IContract {
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
            address: "0xeBB42f3d9aDB45d6EF586b06CaE7B15563F3389B",
            decimal: 18
        },
        {
            type: ContractType.BOB,
            tokenName: "BOB",
            address: "0xD75c9Ba92383EBE819fF443E7857f23555Df500f",
            decimal: 18
        },
        {
            type: ContractType.ORDER_FACTORY,
            tokenName: null,
            address: "0x6262BB470AEd4CC88105392845E97d0FB1feea5e",
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
            address: "0x",
            decimal: 18
        },
        {
            type: ContractType.SELLER_VAULT,
            tokenName: null,
            address: "0x",
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