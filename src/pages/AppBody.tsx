import React from 'react'
import styled from 'styled-components'

export const BodyWrapper = styled.div`
  position: relative;
  max-width: 420px;
  width: 100%;
  background: rgba(0,0,0,0.1);
  
  box-shadow: #E6007E 0px 54px 55px, 
              #E6007E 0px -12px 30px, 
              #E6007E 0px 4px 6px,
              #E6007E 0px 12px 13px,
              #E6007E 0px -3px 5px;
  border-radius: 30px;
  padding: 2rem;
`



//box-shadow: #E6007E 0px 4px 16px, #E6007E 0px 8px 32px;




/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
