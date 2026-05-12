"use client"

/* Import AI Packages */
import { useChat } from "ai/react"  /*import { useChat } from "@ai-sdk/react" */
import  { Message } from 'ai'

/* Import Components */
import ChatBubble from "./components/ChatBubble"
import LoadingMessage from "./components/LoadingMessage"
import PromptSuggestions from "./components/PromptSuggestions"
 
/* Establish main home function */
const Home = () => {

    const handlePrompt = (promptText: string) => {
        console.log("Page.tsx: HandlePrompt().PromptText = " + promptText)
        const msg: Message = {
            id: crypto.randomUUID(),
                content: promptText,
                role: "user"
        };
        append(msg);
        console.log("Page.tsx: Msg Value" );
        console.table(msg);
    };

    /* Grab features from useChat - https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-chat */
    const {append, isLoading, messages, input, handleInputChange, handleSubmit} =  useChat();

    /* If messages are empty, then display default message */
    const noMessages = !messages || messages.length === 0 // const noMessages =  false
    console.log("Page.tsx: Value in noMessages: " + noMessages)

    const handleSubmitIssues = async (e: React.FormEvent) => {
      e.preventDefault(); //if issue with submission occurs try
      await handleSubmit(e); // Call the handleSubmit from useChat
  }
    return (<main>
        <h1>Marcy Labs Study Guide AI</h1>

        <section className={noMessages ? "" : "populated"}>
            {/* If Messages are empty display welcome */}
          {
            noMessages ? 
            (
              <div>
                <p className="starter-text">Welcome to Marcy Labs Study AI. <br /><br />
                <i>Click on the chat bubbles for initial prompts.</i></p> 

                {/* Display default prompt suggestions - users can click on each bubble to receive a response */}
                { <PromptSuggestions onPromptClick={handlePrompt}   /> }
              </div>
            ) 
            :  
            (
            <div> 
              <i>Chat History</i>
              {/* Map data from messages, if not empty */}
                { messages.map(
                  (message, index) => 
                    <ChatBubble key={`message-${index}`} message={message} />                  
                  )  
                }
                {isLoading && <LoadingMessage />} 
                </div>
              )
            }
        </section>

        {/* Get questions from form */}
         <form onSubmit={handleSubmitIssues}>
            <input className="question-box" 
                   onChange={handleInputChange} 
                   value={input} 
                   placeholder="Ask me anything about Marcy Labs" />
            <input type="submit" />
         </form>
    </main>)
} 
export default Home