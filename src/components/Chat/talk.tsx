import styled from "@emotion/styled"
import { Markdown } from "../Markdown"

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
            talk.map((item, i) => <TalkItemComponent key={i} {...item} />)
        }
        {
            lastMessage && <TalkItemComponent {...lastMessage} />
        }
    </TalkContainer>

}

const TalkItemComponent = ({ speaker, text }: TalkItem) => {
    return <TalkItemContainer>
        <SpeakerName>{speaker}</SpeakerName>
        <Separator>:</Separator>
        <Markdown markdown={text.trim()}></Markdown>
    </TalkItemContainer>
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