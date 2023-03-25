import { useState } from "react";
import "./Display.css"
// whatever images are there it should display in list
// input is user specific which is what address data they need to see
// through button we call function by which we can get data
// when another account which don't have access call get data we get error:you don't have access so we write it in try catch block
const Display=({contract,account})=>{
    //to set data
    const [data,setData]=useState("")// initialize with useState
    const getdata=async()=>{
      let dataArray;// as display() returns array
      const Otheraddress=document.querySelector(".address").value;//fetching the address value which user has given input
      try{
      if(Otheraddress){
        //if Otheraddress is present then 
        dataArray=await contract.display(Otheraddress)//Iam calling address related data
        console.log(dataArray);
      }else{
        dataArray=await contract.display(account);//display connected account data 
      }
    }
    catch(e){
        alert("You don't have access");// as require throws error
    }
      //if url is not there
      const isEmpty= Object.keys(dataArray).length===0;
      if(!isEmpty){
        //if it is not empty
        const str= dataArray.toString();//values are in object form so converting to string
        const str_array=str.split(","); // as string will be concatenated so we are splitting it
        // console.log(str);-->ipfs://qweehdh,ipfs://gyjnb
        //                                0              1
        // console.log(str_array);['ipfs://qweehdh','ipfs://gyjnb']
        /* we are using hyperlink to display images, in react we need to provide key -i which is iterator
        https://gateway.pinata.cloud/ipfs/${item}-->default url to access ipfs
        ${item.substring(6)} why? as in link ipfs://qweehdh we only need qweehdh becoz in default url we are inside ipfs only*/
        const images=str_array.map((item,i)=>{
            return(
                <a href={item} key={i} rel="noreferrer" target="_blank">
                    <img key={i} src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`} alt="new" className="image-list"></img>
                </a>
            )
        })
        setData(images);
      }else{
        alert("No image to display");
      }
    };
    //in below we have given {data} so all the images are set into this variable so it will display the images
    return<>
    <div className="image-list">{data}</div>
    <input type="text" placeholder="Enter address" className="address"></input>
    <button className="center button" onClick={getdata}>Get Data</button>
    
    </>;
}
export default Display;

/* we need to call display() in sc for that we need access to get data , fetch url from the users account */