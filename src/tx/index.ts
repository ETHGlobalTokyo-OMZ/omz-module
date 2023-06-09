import { AbiItem } from 'web3-utils';

import { getContractByContractType } from '../contracts';
import { ChainIDEnums, ContractType } from '../enums';
import { ISig } from '../interface';
import { IOrder } from '../interface/IOrder';
// import orderFactoryABI from './abis/order-factory.abi.json';
import sellerABI from './abis/seller.abi.json';

const Web3 = require('web3')


export class TxManager {
    constructor() { }

    public async getUserListHashData(provider: string, chainID: ChainIDEnums, userAddress: string, order: IOrder): Promise<string> {
        const web3 = new Web3(new Web3.providers.HttpProvider(provider));

        const sellerVault = getContractByContractType(chainID, ContractType.SELLER_VAULT);
        const sellerVaultContract = new web3.eth.Contract(sellerABI as AbiItem[], sellerVault.address);

        const userNonce = await sellerVaultContract.methods.user_nonce(userAddress).call();

        const listHash = await sellerVaultContract.methods.get_order_hash(order, 0, userNonce).call();
        return listHash;
    }

    public async getResolveUserListHashData(provider: string, chainID: ChainIDEnums, userAddress: string, order: IOrder): Promise<string> {
        const web3 = new Web3(new Web3.providers.HttpProvider(provider));

        const sellerVault = getContractByContractType(chainID, ContractType.SELLER_VAULT);
        const sellerVaultContract = new web3.eth.Contract(sellerABI as AbiItem[], sellerVault.address);

        const userNonce = await sellerVaultContract.methods.user_nonce(userAddress).call();

        const listHash = await sellerVaultContract.methods.get_order_hash(order, userNonce, 0).call();
        return listHash;
    }

    public async deposit(): Promise<string> {
        return "0xd0e30db0";
    }

    public async makeResolveSell(
        provider: string,
        chainID: ChainIDEnums,
        sig: ISig,
        userAddress: string,
        buyAddress: string,
    ): Promise<string> {
        const web3 = new Web3(new Web3.providers.HttpProvider(provider));
        const sellerVault = getContractByContractType(chainID, ContractType.SELLER_VAULT);
        const sellerVaultContract = new web3.eth.Contract(sellerABI as AbiItem[], sellerVault.address);
        let userNonce = await sellerVaultContract.methods.user_nonce(userAddress).call();
        userNonce = userNonce - 1;
        let callBytes = await sellerVaultContract.methods.resolve_sell(
            userNonce,
            sig,
            buyAddress
        ).encodeABI();
        return callBytes;
    }

    public makeListSell(
        provider: string,
        chainID: ChainIDEnums,
        order: IOrder,
        sig: ISig
    ): string {
        const web3 = new Web3(new Web3.providers.HttpProvider(provider));

        const sellerVault = getContractByContractType(chainID, ContractType.SELLER_VAULT);

        const sellerVaultContract = new web3.eth.Contract(sellerABI as AbiItem[], sellerVault.address);
        return sellerVaultContract.methods.list_sell(order, sig).encodeABI();
    }
}