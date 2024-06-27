import React from "react"
import styled from "@emotion/styled"
import { ChatInput } from "./input"
import { Talk, type TalkItem } from "./talk"

type AITextSession = {
    prompt: (text: string) => Promise<string>
    promptStreaming: (text: string) => AsyncIterable<string>
    execute: (text: string) => Promise<string>
    executeStreaming: (text: string) => AsyncIterable<string>
    destroy: () => void
}

export const Chat = () => {
    const [aiSession, setAiSession] = React.useState<AITextSession>()
    const [talk, setTalk] = React.useState<TalkItem[]>([])
    const [prompt, setPrompt] = React.useState<string>('')

    React.useEffect(() => {
        let aiSession: AITextSession
        (async () => {
            //@ts-expect-error 
            const canUseAi = await window.ai.canCreateTextSession()
            if (!canUseAi) {
                console.error('Cannot create AI session')
                return
            } else {
                console.log('AI session created')
            }
            //@ts-expect-error
            aiSession = await window.ai.createTextSession()
            setAiSession(aiSession)
        })()

        return () => {
            aiSession.destroy()
            console.log('AI session destroyed')
        }
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!aiSession) {
            console.error('AI session not created')
            return
        }
        if (!prompt) {
            return
        }
        setTalk(prev => [...prev, { speaker: 'You', text: prompt }])
        setPrompt('')
        const response = await aiSession.prompt(prompt)
        if (!response) {
            console.error('AI response is empty')
            return
        }
        setTalk(prev => [...prev, { speaker: 'AI', text: response }])
    }

    return <Container>
        <Talk talk={talk}></Talk>
        <ChatInput value={prompt} onChange={(e) => setPrompt(e.currentTarget.value)} onSubmit={handleSubmit}></ChatInput>
    </Container>
}

const Container = styled.div({
    display: 'flex',
    flexDirection: 'column',
    gap: "8px",
})