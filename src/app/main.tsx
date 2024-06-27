import React from "react";
import { Chat } from "../components/Chat";
import { Header } from "../components/Header";
import styled from "@emotion/styled"


export const Main = () => {
  return <>
    <Header />
    <MainContainer>
      <Chat />
    </MainContainer>
  </>
}

const MainContainer = styled.main({
  width: "min(800px,100%)",
  margin: "0 auto",
  padding: "1rem",
  boxSizing: "border-box"
})