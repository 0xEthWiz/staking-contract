use array::ArrayTrait;
use result::ResultTrait;
use option::OptionTrait;
use traits::TryInto;
use serde::Serde;

use starknet::{ContractAddress, contract_address_const};

use snforge_std::{declare, ContractClassTrait, start_prank};
use contracts::erc20::{IERC20Dispatcher, IERC20DispatcherTrait};


const NAME: felt252 = 111;
const SYMBOL: felt252 = 222;

fn setup_erc20() -> ContractAddress {
    let erc20_class_hash = declare('erc_20');
    let account: ContractAddress = contract_address_const::<1>();
    let INITIAL_SUPPLY: u256 = 1000000000;

    let mut calldata = ArrayTrait::new();
    NAME.serialize(ref calldata);
    SYMBOL.serialize(ref calldata);
    18.serialize(ref calldata);
    INITIAL_SUPPLY.serialize(ref calldata);
    account.serialize(ref calldata);
    let contract_address = erc20_class_hash.deploy(@calldata).unwrap();

    contract_address
}

fn setup_staking(erc20_address: ContractAddress) -> ContractAddress {
    let staking_class_hash = declare('StakingContract');
    let mut calldata = ArrayTrait::new();
    erc20_address.serialize(ref calldata);
    let staking_address: ContractAddress = staking_class_hash.deploy(@calldata).unwrap();

    staking_address
}
