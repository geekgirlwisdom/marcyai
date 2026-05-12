
const PromptSuggestions = ({onPromptClick}) => {
    console.log("PromptSuggestions.tsx: Initial Prompt Suggestions Called")
    const prompts = [
            "What is reactjs?",
            "What is HTML?",
            "What is CSS?",
            "What is github?",  
    ]
    return (<div className="prompt-suggestion-row">
        { 
           prompts.map(
                (prompt, index) => 
                    <button className="prompt-suggestion-button" 
                        key ={`suggestion-${index}`}  
                        onClick={() => onPromptClick(prompt)} > 
                        {prompt}
                    </button>
            )
        }
    </div>)
}

export default PromptSuggestions