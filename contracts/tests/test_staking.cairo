use starknet::{ContractAddress, contract_address_const};

use snforge_std::{declare, ContractClassTrait, start_prank, PrintTrait};
use contracts::erc20::{IERC20Dispatcher, IERC20DispatcherTrait};
use contracts::staking_contract::{IStakingContractDispatcher, IStakingContractDispatcherTrait};

use super::common::{setup_erc20, setup_staking};


#[test]
fn test_check_bal() {
    let erc20_contract_address = setup_erc20();
    let erc20 = IERC20Dispatcher { contract_address: erc20_contract_address };
    let staking_address = setup_staking(erc20_contract_address);
    let staking = IStakingContractDispatcher { contract_address: staking_address };

    let account: ContractAddress = contract_address_const::<1>();
    start_prank(erc20_contract_address, account);
    erc20.balance_of(account).print();
}

#[test]
fn test_check_approval() {
    let erc20_contract_address = setup_erc20();
    let erc20 = IERC20Dispatcher { contract_address: erc20_contract_address };
    let staking_address = setup_staking(erc20_contract_address);
    let staking = IStakingContractDispatcher { contract_address: staking_address };

    let account: ContractAddress = contract_address_const::<1>();
    start_prank(erc20_contract_address, account);
    erc20.approve(staking_address, 9999);
    erc20.allowance(account, staking_address).print();
}

#[test]
fn test_deposit() {
    let erc20_contract_address = setup_erc20();
    let erc20 = IERC20Dispatcher { contract_address: erc20_contract_address };
    let staking_address = setup_staking(erc20_contract_address);
    let staking = IStakingContractDispatcher { contract_address: staking_address };
    let account: ContractAddress = contract_address_const::<1>();
    start_prank(erc20_contract_address, account);
    erc20.approve(staking_address, 10000);
    erc20.balance_of(account).print();
    start_prank(staking_address, account);
    staking.deposit(100);
    let balance_after = staking.get_staked_balance(account);
    assert(balance_after == 100, 'Invalid balance');
}
