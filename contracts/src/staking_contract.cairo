use starknet::ContractAddress;
#[starknet::interface]
trait IStakingContract<TContractState> {
    fn deposit(ref self: TContractState, amount: u256);
    // fn withdraw(ref self: TContractState, amount: u256);
    fn get_staked_balance(self: @TContractState, staker: ContractAddress) -> u256;
    fn get_staked_token_address(self: @TContractState) -> ContractAddress;
}


#[starknet::contract]
mod StakingContract {
    use starknet::{ContractAddress, get_caller_address, get_contract_address};
    use contracts::erc20::{IERC20Dispatcher, IERC20DispatcherTrait};
    #[storage]
    struct Storage {
        token_address: ContractAddress,
        balances: LegacyMap::<ContractAddress, u256>,
    }

    // #[event]
    // #[derive(Drop, starknet::event)]
    // enum Event{
    //     Deposit: Deposit,
    //     Withdraw: Withdraw,
    // }
    //   #[derive(Drop, starknet::Event)]
    //   struct Deposit {
    //     depositer: ContractAddress,
    //     amount: u256,
    //   }

    //   #[derive(Drop, starknet::Event)]
    //   struct Withdraw {
    //     withdrawer: ContractAddress,
    //     amount: u256,
    //   }
    #[constructor]
    fn constructor(ref self: ContractState, token_address: ContractAddress) {
        self.token_address.write(token_address);
    }

    #[external(v0)]
    impl IStakingContract of super::IStakingContract<ContractState> {
        fn deposit(ref self: ContractState, amount: u256) {
            let depositer: ContractAddress = get_caller_address();
            let this_contract_address: ContractAddress = get_contract_address();
            let stark_token: IERC20Dispatcher = IERC20Dispatcher {
                contract_address: self.token_address.read()
            };
            stark_token.transfer_from(depositer, this_contract_address, amount);
            let new_bal: u256 = self.balances.read(depositer) + amount;
            self.balances.write(depositer, new_bal);
        }
        // fn withdraw(: felt252) -> felt252 {

        // }

        fn get_staked_balance(self: @ContractState, staker: ContractAddress) -> u256 {
            self.balances.read(staker)
        }

        fn get_staked_token_address(self: @ContractState) -> ContractAddress {
            self.token_address.read()
        }
    }
}

