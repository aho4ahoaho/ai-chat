import markdownIt from "markdown-it";
import React from "react";
import styled from "@emotion/styled";

type Props = {
    markdown: string
}

const md = markdownIt();

export const Markdown = ({ markdown }: Props) => {
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (ref.current) {
            ref.current.innerHTML = md.render(markdown);
        }
    }, [ref, markdown]);

    return <MarkdownContainer ref={ref} />
};

const MarkdownContainer = styled.div({
    '& *': {
        margin: '0',
    },
    "& ul": {
        paddingLeft: "1rem"
    },
    "& ol": {
        paddingLeft: "2rem"
    },
    "& pre": {
        backgroundColor: 'lightgray',
        padding: '0.5rem 1rem',
        borderRadius: '0.25rem',
        fontFamily: 'monospace',
    },
    '& code': {
        fontSize: '0.8rem',
        lineHeight: '1.5',
    }
})