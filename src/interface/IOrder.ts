export interface IOrder {
    to: string;
    bob_amount: string;
    sell_token: string;
    sell_amount: string;
    collateral_token: string;
    collateral_amount: string;
    time_lock_start: number
}