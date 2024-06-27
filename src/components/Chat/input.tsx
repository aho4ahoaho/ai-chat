import styled from "@emotion/styled"
import { Button } from "../Button"

type Props = {
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const ChatInput = ({ onSubmit, value, onChange }: Props) => {

    return <form onSubmit={onSubmit}>
        <ChatContainer>
            <TheInput type="text" placeholder="Type your message here" value={value} onChange={onChange} />
            <Button type="submit">Submit</Button>
        </ChatContainer>
    </form>
}

const ChatContainer = styled.div({
    display: 'flex',
    gap: "4px"
})

const TheInput = styled.input({
    flex: 1,
    padding: '5px 10px',
    fontSize: "1rem",
    borderStyle: "solid",
    borderRadius: "0.25rem"
})