const ChatBubble = ({ message }) => {
    const {content, role}  = message  
    return (<div className={`${role} bubble`}>{message.content}</div>)
}

export default ChatBubble