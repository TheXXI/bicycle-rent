import { useSelector } from "react-redux"
import { Message } from "./Message"

export const MessageBlock = () => {
    const { message } = useSelector(state => state.messagesAndLoader)
    return (
        <>
        {message && 
            <Message message={{success: message.success, text: message.text}}/>
        }
        </>
    )
}