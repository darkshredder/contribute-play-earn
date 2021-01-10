import React, { Component } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
import PayUserContract from "../../contracts/PayUser.json";
import getWeb3 from "../../getWeb3";
import FetchApi from "../../fetchAPI"; // import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { portis } from "../../portis";

class Github extends Component {
  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    user: null,
    pr: [],
    allPr: [],
    nonUsedPr: [],
    usedPr: [],
    githubId: null,
  };

  componentDidMount = async () => {
    try {
      const auth_code = document.URL.split("code=")[1].split("#")[0];
      const response = await FetchApi(
        "get",
        "http://localhost:8000/api/github/accesscode/" + auth_code
      );
      console.log(response.data.user.login);
      this.setState({ user: response.data.user });

      const response2 = await FetchApi(
        "get",
        "http://localhost:8000/api/github/user/" + response.data.user.login
      );
      console.log(response2.data[0].pr_by);
      this.setState({
        pr: response2.data[0].pr_by,
        githubId: response2.data[0].id,
      });
      const response3 = await FetchApi(
        "get",
        `https://api.github.com/search/issues?q=author:${response.data.user.login}+is:pull-request+linked:issue`
      );
      console.log(response3);
      var allPrs = response3.data.items;
      var allPrsUrl = allPrs.map(function (item) {
        return item.html_url;
      });
      console.log(allPrsUrl);
      this.setState({ allPr: allPrsUrl });

      var allUsedPrs = response2.data[0].pr_by;
      var allUsedUrl = allUsedPrs.map(function (item) {
        return item.url;
      });

      var pending_urls = allPrsUrl;
      pending_urls = pending_urls.filter(function (item) {
        return !allUsedUrl.includes(item);
      });

      console.log(pending_urls);
      this.setState({ nonUsedPr: pending_urls, usedPr: allUsedUrl });

      // // Get network provider and web3 instance.
      // const web3 = await getWeb3();

      // // Use web3 to get the user's accounts.
      // const accounts = await web3.eth.getAccounts();

      // // Get the contract instance.
      // const networkId = await web3.eth.net.getId();
      // const deployedNetwork = PayUserContract.networks[networkId];
      // const instance = new web3.eth.Contract(
      //   PayUserContract.abi,
      //   deployedNetwork && deployedNetwork.address
      // );

      // // Set web3, accounts, and contract to the state, and then proceed with an
      // // example of interacting with the contract's methods.
      // this.setState({ web3, accounts, contract: instance });
      // this.runExample();
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  runExample = async (url) => {
    let { accounts, contract, web3 } = this.state;

    let form_data = new FormData();
    form_data.append("url", url);
    form_data.append("pr_by", this.state.user.login);

    console.log(this.state.githubId, url);

    const response2 = await FetchApi(
      "post",
      "http://localhost:8000/api/github/pr/collect",
      form_data
    );
    // Stores a given value, 5 by default.
    console.log(contract);
    const privateKey =
      "4754379313e1a33ffca1b31ca442eedc72a7b5b8f4dc574dfc7fbde9ef727f59";
    const account = web3.eth.accounts.privateKeyToAccount("0x" + privateKey);
    web3.eth.accounts.wallet.add(account);
    web3.eth.defaultAccount = account.address;
    await contract.methods.payToUser(accounts[0]).send({
      from: web3.eth.defaultAccount,
      gas: 2000000,
      value: web3.utils.toHex(web3.utils.toWei("0.1", "ether")),
    });
    console.log(response2);
    portis.showPortis();

    alert("Sucessfully added 0.1 ether to you account");
  };

  collectReward = async (url) => {
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
      this.runExample(url);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  render() {
    // if (!this.state.web3) {
    //   return <div>Loading Web3, accounts, and contract...</div>;
    // }
    return (
      <div className="App">
        <Paper>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ minWidth: 250 }}>
                    Pull Request Url
                  </TableCell>
                  <TableCell style={{ minWidth: 100 }}>
                    Collected Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.nonUsedPr.map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell>{row}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            this.collectReward(row);
                          }}
                        >
                          Collect
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {this.state.usedPr.map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell>{row}</TableCell>
                      <TableCell>
                        <Button variant="contained" disabled>
                          Already Collected
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    );
  }
}

export default Github;
