import { ChainIDEnums, ContractType, getContractByContractType } from '../';
import { ISig } from '../interface';
import { IOrder } from '../interface/IOrder';
import { TxManager } from '../tx';

const txManager = new TxManager();

async function listSell() {
    const chainID: ChainIDEnums = ChainIDEnums.GOERLI;
    const provider: string = "https://falling-newest-morning.ethereum-goerli.discover.quiknode.pro/07b3a629befb5b812ff302df08c0fc7932ff2833/";

    const order: IOrder = {
        to: "0x0000000000000000000000000000000000000000",
        bob_amount: (1 * 10 ** 18).toString(),
        sell_token: "0x0000000000000000000000000000000000000000",
        sell_amount: (1 * 10 ** 18).toString(),
        collateral_token: getContractByContractType(chainID, ContractType.USDC).address,
        collateral_amount: (1 * 10 ** 18).toString(),
        time_lock_start: 0
    }

    const sig: ISig = {
        v: 28,
        r: "0x",
        s: "0x"
    }

    const hash = await txManager.getUserListHashData(
        provider,
        chainID,
        "0xF44A53ac17779f27ae9Fc4B352Db4157aDE7a35C",
        order);

    const functionCallData = txManager.makeListSell(provider, chainID, order, sig);

    console.log(hash, functionCallData);
}

listSell().then();