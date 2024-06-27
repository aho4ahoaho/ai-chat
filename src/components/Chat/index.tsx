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

type AIStatus = "readily" | "after-download" | "no"

export const Chat = () => {
    const [aiSession, setAiSession] = React.useState<AITextSession>()
    const [talk, setTalk] = React.useState<TalkItem[]>([])
    const [prompt, setPrompt] = React.useState<string>('')

    React.useEffect(() => {
        let aiSession: AITextSession | undefined
        (async () => {
            //@ts-expect-error まだ標準でwindow.aiが存在しないため
            const canUseAi: AIStatus = await window.ai?.canCreateTextSession()
            switch (canUseAi) {
                case "readily":
                    break
                case "after-download":
                    //ダウンロード待ちだけでなく起動直後にも返される場合があるため、アラートを表示して待つ
                    alert('AI is being loaded, please wait')

                    //読み込み可能であればアラート消している間に読み込み完了しているはず
                    //@ts-expect-error まだ標準でwindow.aiが存在しないため
                    if (await window.ai.canCreateTextSession()) {
                        break
                    } else {
                        alert('AI failed to load')
                        return
                    }
                case "no":
                default:
                    console.error('AI not available')
                    return
            }

            //@ts-expect-error まだ標準でwindow.aiが存在しないため
            aiSession = await window.ai.createTextSession()
            if (aiSession) {
                setAiSession(aiSession)
                console.log('AI session created')
            }
        })()

        return () => {
            aiSession?.destroy()
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

    const lastMessage = React.useMemo(() => {
        if (talk.length) {
            return undefined;
        }
        if (aiSession) {
            return { speaker: "AI", text: "Hi! How can I help you?" }
        }
        return { speaker: "AI", text: "Sorry, I cannot start a conversation right now" }
    }, [aiSession, !!talk.length])

    return <Container>
        <Talk talk={talk} lastMessage={lastMessage}></Talk>
        {aiSession &&
            <ChatInput value={prompt} onChange={(e) => setPrompt(e.currentTarget.value)} onSubmit={handleSubmit}></ChatInput>
        }
    </Container>
}

const Container = styled.div({
    display: 'flex',
    flexDirection: 'column',
    gap: "8px",
})