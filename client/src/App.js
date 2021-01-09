import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import PayUserContract from "./contracts/PayUser.json";
import getWeb3 from "./getWeb3";


import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = PayUserContract.networks[networkId];
      const instance = new web3.eth.Contract(
        PayUserContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
      this.runExample();
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  runExample = async () => {
    let { accounts, contract, web3 } = this.state;

    // Stores a given value, 5 by default.
    console.log(contract);
    // const privateKey =
    //   "d87bbee163c66c5b77e9df4ea992e48c1e552a18a9c430e7941800cffdc31d79";
    // const account = web3.eth.accounts.privateKeyToAccount("0x" + privateKey);
    // web3.eth.accounts.wallet.add(account);
    // web3.eth.defaultAccount = account.address;
    // await contract.methods
    //   .payToUser(accounts[0])
    //   .send({
    //     from: web3.eth.defaultAccount,
    //     gas: 2000000,
    //     value: web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
    //   });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
      </div>
    );
  }
}

export default App;
