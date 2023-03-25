import Upload from "./artifacts/contracts/Upload.sol/Upload.json";//fetching abi from here so that we can interact with smart contract
import {useState,useEffect} from "react";//to build user interfaces
import { ethers } from "ethers";//to interact with blockchain
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import './App.css';

function App() {
  const [account,setAccount]=useState("");
  const [contract,setContract]=useState(null);
  const [provider,setProvider]=useState(null);
  const [modalOpen,setModalOpen]=useState(false);// if this is true only show modal component not always

  useEffect(()=>{
    //get provider and signer from browser window
    //MetaMask injects a global API into websites visited by its users at window.ethereum . This API allows websites to request users' Ethereum accounts, read data from blockchains the user is connected to, and suggest that the user sign messages and transactions.
    const provider=new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider=async()=>{
      if(provider){//chenking whether we have provider or not
        // if our chain or network, accounts change then window gets reload
        window.ethereum.on("chainChanged",()=>{
          window.location.reload();
        });

        window.ethereum.on("accountChanged",()=>{
          window.location.reload();
        });

        await provider.send("eth_requestAccounts",[]);//automatic open metamask account
        const signer=provider.getSigner();//to write data on blockchain
        const address=await signer.getAddress();// which account is connected fetch it
        setAccount(address);//we set the connected account
        let contractAddress="0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

        const contract=new ethers.Contract(
          contractAddress,Upload.abi,signer// to create smart contract instance we need these and we are creating contract instance
        );
        console.log(contract);
        setContract(contract);
        setProvider(provider);
      }else{
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider() //before calling function check whether we have provider
  })
  //FileUpload component will interact with our account, need provider to access, and we need contract
  return (//if modalOpen is true show component else don't want
    <>{!modalOpen && (<button className="share" onClick={()=>setModalOpen(true)}>Share</button>)}
    {modalOpen&&(
    <Modal setModalOpen={setModalOpen} contract={contract}></Modal>)}
    <div className="App">
      <h1 style={{color:"white"}}>Decentralized File System</h1>
      <div class="bg"></div>
      <div class="bg bg2"></div>
      <div class="bg bg3"></div>

      <p style={{color:"white"}}>Account:{account?account:"Not Connected"}</p>
      <FileUpload account={account} provider={provider} contract={contract}></FileUpload>
      <Display contract={contract} account={account}></Display>

    </div></>
  );
}

export default App;
