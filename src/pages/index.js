import Head from 'next/head'
// import styles from '@/styles/Home.module.css'
import { useState, useRef } from "react"
import Modal from '@/modal/Modal'

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [isThinking, setIsThinking] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [modalDisplayState, setModalDisplayState] = useState("none");
  const apiKeyRef = useRef();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      setIsThinking(true);
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input, apiKey }),
      });

      const data = await response.json();
      // console.log("response: ", response);
      // console.log("data: ", data);
      if (response.status !== 200) {
        // console.log("Request failed with status : ", data.error.message);
        throw new Error(`${data.error.message}`);
      }

      setIsThinking(false);
      setResult(data.result);
      setInput("");
      setErrorMessage("");

    } catch(error) {
      // Consider implementing your own error handling logic here
      setIsThinking(false);
      if(error.message === "OpenAI API key missing.") {
        console.log("OpenAI API key missing. \n\nTo create an OpenAI API key, you need to create an account or login on https://platform.openai.com. \n\nThen enter it in the field above. It will not be stored permanently.\n\nBesides, you can create an API key to test this web application and revoke it later if you want.");
        setErrorMessage("OpenAI API key missing. \n\nTo create an OpenAI API key, you need to create an account or login on https://platform.openai.com. \n\nThen enter it in the field above. It will not be stored permanently.\n\nBesides, you can create an API key to test this web application and revoke it later if you want.");
      }
      if(error.message === "Please enter an input.") {
        console.log("Please enter an input.");
        alert("Please enter an input.");
      }
    }
  }

  const handleOpenModal = () => {
    setModalDisplayState("block");
  };

  const handleCloseModal = () => {
    setModalDisplayState("none");
  };

  const handleApiKey = (event) => {
    event.preventDefault();
    // console.log("apiKey", apiKey);
    apiKeyRef.current.value = "";
    
  }

  return (
    <div>
      <Head>
      <title>ChatGPT Clone</title>
        <meta name="description" content="It is a clone of ChatGPT." />
        <meta name="keywords" content="ChatGPT, generative AI, application with generative AI" />
        <meta name="creator" content="Sandy LUDOSKY, Charles-Henri SAINT-MARS" />
        <meta name="publisher" content="Charles-Henri SAINT-MARS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='main'>
   
        <h3>Ask a question ?</h3>
        <form className='api-key-form' onSubmit={handleApiKey}>
        <label>
          <input
            type='password'
            name='apiKey'
            placeholder='Enter your API key from OpenAI'
            ref={apiKeyRef}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </label>
        <div className='apikey-button-container'>
          <button className='apikey-button' type='submit'>Submit</button>
          <button className='apikey-button' type='button' onClick={handleOpenModal}>
            Info
          </button>
        </div>
      </form>
      <Modal
        displayState={modalDisplayState}
        handleClose={handleCloseModal}
        message="Your OpenAI API key is not stored permanently. Besides, you can create an API key on https://platform.openai.com to test this web application and revoke it later if you want."
        bgColor=""
        textColor=""
        textSize=""
        btnColor=""
      />
        <form className='query-form' onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Enter input"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setErrorMessage("");
            }}
          />
          <input type="submit" value="Answer" />
        </form>
        <div className='thinking'>{isThinking && "Thinking..."}</div>
        <div className='result'>{result}</div>
        <div className='error'><pre>{errorMessage && errorMessage}</pre></div>
      </main>
    </div>
  );
}
