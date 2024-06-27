import styled from "@emotion/styled"
import React from "react"

type Props = {
    children: React.ReactNode
}

export const Button = (props: Props & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return <MiddleButton {...props} />
}

const MiddleButton = styled.button({
    padding: '0.5rem 1rem',
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: "0.25rem",
    "&:hover": {
        filter: 'brightness(1.1)'
    }
})