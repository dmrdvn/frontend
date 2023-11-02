import Web3 from "web3";
import PredictorsABI from "../src/contracts/PredictorsApp.json";

let selectedAccount;
let predictorsContract;
let isInitialized = false;
let predictorsContractAddress = "0x88CC2C920f2D063f536802E49742f3BdFF176FF3";
//0xf3049720fcEd4519bCcd115d8162F4BF6a11Fe35

export const init = async () => {
  // Configure contract
  let provider = window.ethereum;

  if (typeof provider !== "undefined") {
    provider
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        selectedAccount = accounts[0];
      })
      .catch((err) => {
        // console.log(err);
        return;
      });
  }

  window.ethereum.on("accountChanged", function (accounts) {
    selectedAccount = accounts[0];
  });

  const web3 = new Web3(provider);

  const networkId = await web3.eth.net.getId();

  predictorsContract = new web3.eth.Contract(PredictorsABI.abi, predictorsContractAddress);

  isInitialized = true;
};

export const getUserAddress = async () => {
  if (!isInitialized) {
    await init();
  }
  return selectedAccount;
};

// Execute Functions
export const setOwner = async (newOwner) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await predictorsContract.methods
    .setOwner(newOwner.toLowerCase())
    .send({ from: selectedAccount });
    return res;
  } catch(e) {
    console.error(e);
  }
};

export const registerUser = async (_fullName) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await predictorsContract.methods
    .registerUser(_fullName)
    .send({ from: selectedAccount });
    return res;
  } catch(e) {
    console.error(e);
  }
};

export const createPost = async (_postContent, _postBet,_postEndDate, _side) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await predictorsContract.methods
    .createPost(_postContent, _postBet, _postEndDate, _side)
    .send({ from: selectedAccount });
    return res;
  } catch(e) {
    console.error(e);
  }
};

export const participateInPost = async (_postId, _amount, _side) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await predictorsContract.methods
    .participateInPost(_postId, _amount, _side)
    .send({from: selectedAccount});
    return res;
  } catch(e) {
    console.error(e);
  }
};

export const postResults = async (_id, _winner, _loser) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await predictorsContract.methods
    .postResults(_id, _winner, _loser )
    .send({from: selectedAccount});
    return res;
  } catch(e) {
    console.error(e);
  }
};

/* export const withdrawBalance = async (value) => {
  if (!isInitialized) {
    await init();
  }
  let send_value = Web3.utils.toWei(value, "ether");
  try {
    let res = await predictorsContract.methods
    .withdrawBalance(send_value)
    .send({ from: selectedAccount });
    return res;
  } catch(e) {
    console.error(e);
  }
}; */

/* export const withdrawOwnerBalance = async (value) => {
  if (!isInitialized) {
    await init();
  }
  let send_value = Web3.utils.toWei(value, "ether");
  try {
    let res = await predictorsContract.methods
    .withdrawOwnerBalance(send_value)
    .send({ from: selectedAccount });
    return res;
  } catch(e) {
    console.error(e);
  }
}; */

// Query functions

export const getOwner = async () => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await predictorsContract.methods.getOwner().call();
    return res.toString();
  } catch(e) {
    console.error(e);
  }
};

export const login = async () => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await predictorsContract.methods.getUser(selectedAccount).call();
    return res;
  } catch(e) {
    console.error(e);
  }
};

export const getPostDetails = async (_id) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await predictorsContract.methods.getPostDetails(_id).call();
    return res;
  } catch(e) {
    console.error(e);
  }
};
export const getUserDetails = async (_walletAddress) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await predictorsContract.methods.getUserDetails(_walletAddress).call();
    return res;
  } catch(e) {
    console.error(e);
  }
};
export const getUserFullName = async (userAddress) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await predictorsContract.methods.getUserDetails(userAddress).call();
    return res;
  } catch(e) {
    console.error(e);
  }
};
export const getPost = async (_id) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await predictorsContract.methods.getPost(_id).call();
    return res;
  } catch(e) {
    console.error(e);
  }
};

export const getUser = async (_walletAddress) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await predictorsContract.methods.getUser(_walletAddress).call();
    return res;
  } catch(e) {
    console.error(e);
  }
};

export const getPostByStatus = async (_status) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await predictorsContract.methods.getPostByStatus(_status).call();
    return res;
  } catch(e) {
    console.error(e);
  }
};

export const getUserCount = async () => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await predictorsContract.methods.getUserCount().call();
    return res;
  } catch(e) {
    console.error(e);
  }
};

export const getPostCount = async () => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await predictorsContract.methods.getPostCount().call();
    return res;
  } catch(e) {
    console.error(e);
  }
};
