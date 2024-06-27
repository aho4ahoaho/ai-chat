import styled from "@emotion/styled"

export type TalkItem = {
    speaker: string
    text: string
}

type Props = {
    talk: Array<TalkItem>
    lastMessage?: TalkItem
}

export const Talk = ({
    talk, lastMessage
}: Props) => {

    return <TalkContainer>
        {
            talk.map(({ speaker, text }, i) => <TalkItemContainer key={i}>
                <SpeakerName>{speaker}</SpeakerName>
                <Separator>:</Separator>
                <Text>{text.trim()}</Text>
            </TalkItemContainer>)
        }
        {
            lastMessage && <TalkItemContainer>
                <SpeakerName>{lastMessage.speaker}</SpeakerName>
                <Separator>:</Separator>
                <Text>{lastMessage.text}</Text>
            </TalkItemContainer>
        }
    </TalkContainer>

}
const TalkContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    minHeight: "10rem",
    border: '1px solid darkgray',
})
const TalkItemContainer = styled.div({
    display: 'flex',
    gap: 10
})

const SpeakerName = styled.span({
    minWidth: "50px",
})

const Separator = styled.span({})

const Text = styled.span({
    whiteSpace: 'pre-wrap'
})

const Placeholder = styled.span({
    color: 'gray'
})