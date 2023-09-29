use starknet::{ContractAddress, contract_address_const};

use snforge_std::{declare, ContractClassTrait, start_prank};
use snforge_std::PrintTrait;
use contracts::erc20::{IERC20Dispatcher, IERC20DispatcherTrait};
use super::common::{setup_erc20};

#[test]
fn test_get_balance() {
    let contract_address = setup_erc20();
    let erc20 = IERC20Dispatcher { contract_address };
    let INITIAL_SUPPLY: u256 = 1000000000;
    let account: ContractAddress = contract_address_const::<1>();
    assert(erc20.balance_of(account) == INITIAL_SUPPLY, 'Balance should be > 0');
}

#[test]
fn test_mint() {
    let erc20_contract_address = setup_erc20();
    let erc20 = IERC20Dispatcher { contract_address: erc20_contract_address };
    let address2: ContractAddress = contract_address_const::<2>();
    start_prank(erc20_contract_address, address2);
    erc20.mint_self(100);
    let balance_after = erc20.balance_of(address2);
    assert(balance_after == 100, 'Invalid balance');
}
// #[test]
// fn test_cannot_increase_balance_with_zero_value() {
//     let contract_address = deploy_contract('HelloStarknet');

//     let safe_dispatcher = IHelloStarknetSafeDispatcher { contract_address };

//     let balance_before = safe_dispatcher.get_balance().unwrap();
//     assert(balance_before == 0, 'Invalid balance');

//     match safe_dispatcher.increase_balance(0) {
//         Result::Ok(_) => panic_with_felt252('Should have panicked'),
//         Result::Err(panic_data) => {
//             assert(*panic_data.at(0) == 'Amount cannot be 0', *panic_data.at(0));
//         }
//     };
// }


