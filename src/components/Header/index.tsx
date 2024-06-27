import styled from "@emotion/styled"

export const Header = () => {
    return <TheHeader>
        <Title>AI Chat</Title>
    </TheHeader>
}

const TheHeader = styled.header({
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    padding: '10px 0',
    textAlign: 'center'
})

const Title = styled.h1({
    margin: 0
})