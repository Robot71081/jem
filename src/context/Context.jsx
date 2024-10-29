import { createContext, useState } from "react";
import run from "../config/jem";

export const Context =createContext()

const ContextProvider =(props)=>{
    const [input,setInput]=useState("")
    const [recentPrompt,setRecentPrompt]=useState("")
    const [prevPrompt,setPrevPrompt]=useState([])
    const [showResult,setShowResult]=useState(false)
    const [loading,setLoading]=useState(false)
    const [resultData,setResultData]=useState("")
    const [extended, setExtended] = useState(false);
    const delaypara=(index,nextWord)=>{
          setTimeout(function (){
        setResultData(prev=>prev+nextWord)
          },75*index)
    }
    const toggleSidebar = () => {
        setExtended(prev => !prev); // Toggle sidebar visibility
    };

    const newChat =()=>{
        setLoading(false)
        setShowResult(false)
    }
    const onSent =async (prompt)=>{
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response
        if(prompt !== undefined)
        {
            response = await  run(prompt)
            setRecentPrompt(prompt)
           
          
        }
        else{
            setPrevPrompt(prev=>[...prev,input])
            setRecentPrompt(input)
            response =await run(input)
        }
       
      let responseArray = response.split("**");
      let newArray = ""; // Initialize newArray as an empty string
      
      for (let i = 0; i < responseArray.length; i++) {
          if (i === 0 || i % 2 !== 1) {
              newArray += responseArray[i] + "<br>"; // Add a line break after each non-bold topic
          } else {
              newArray += "<b>" + responseArray[i] + "</b><br>"; // Add bold tags and a line break
          }
      }
      
      // Optionally replace * with <br> if needed
      let newArray2 = newArray.split("*").join("<br>"); // This line might not be necessary if * is not used
      
     let newResponseArray=newArray2.split(" ")
     for (let i = 0; i < newResponseArray.length; i++) {
       const nextWord=newResponseArray[i]
       delaypara(i,nextWord+" ")
        
     }
      setLoading(false)
      setInput("")
    }
    
     const contextValue={
         prevPrompt,
         setPrevPrompt,
         onSent,
         recentPrompt,
         setRecentPrompt,
         loading,
         setLoading,
         input,
         setInput,
         showResult,
         setShowResult,
         resultData,
         setResultData,
         newChat,
         extended,
         setExtended,
         toggleSidebar
     }
     return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
     )
}

export default ContextProvider

