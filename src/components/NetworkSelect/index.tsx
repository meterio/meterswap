import React, { useRef, useState } from 'react'

import styled from 'styled-components'
import detectEthereumProvider from "@metamask/detect-provider";

import {  useWeb3React } from '@web3-react/core'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'

import meter_logo from "../../assets/images/meter.png";
import theta_logo from "../../assets/images/theta.png";
import glmr_logo from "../../assets/images/glmr.png";
import getChain from '../../constants/chain'



const StyledMenuButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg3};

  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
`

const StyledMenu = styled.div`
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`

const MenuFlyout = styled.span`
  min-width: 10.125rem;
  background-color: ${({ theme }) => theme.bg3};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 12px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 4rem;
  right: 0rem;
  z-index: 100;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    top: -17.25rem;
  `};
`

const MenuItem = styled.div`
  flex: 1;
  padding: 0.5rem 0.5rem;
  color: ${({ theme }) => theme.text2};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 8px;
  }
`



export default function NetworkSelect() {
  const { account, chainId, active } = useWeb3React()


  

  const [open, setOpen] = useState(false)
 




  function togglePopup(){
    setOpen(!open)
  }

  const connectNetwork = (chainId:number) => {
    const chain = getChain(chainId)

  
  window.localStorage.setItem("chainId", chain.networkId.toString())
    detectEthereumProvider().then((provider: any) => {
      provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x" + chain.networkId.toString(16),
            chainName: chain.name,
            nativeCurrency: {
              name: chain.nativeTokenSymbol,
              symbol: chain.nativeTokenSymbol,
              decimals: chain.decimals,
            },
            rpcUrls: [chain.rpcUrl],
            blockExplorerUrls: [chain.blockExplorer],
          },
        ],
      })
    })
    
   

  }


  

  
  const node = useRef<HTMLDivElement>()
 
  useOnClickOutside(node, open ? togglePopup : undefined)
  

  

  return (
    
    <StyledMenu ref={node as any}>
      <StyledMenuButton style={{color:"white"}} onClick={togglePopup}>
        { chainId ===82  &&  'Meter'}
        {chainId === 361 && 'Theta'}
        {chainId === 1284 && 'Moonbeam'}
        {!chainId &&  'Select Network'}
      </StyledMenuButton>

      {open && (
        <MenuFlyout>
          <MenuItem onClick={()=>connectNetwork(82)}>
         
            
           {chainId === 82  && <span style={{marginLeft:"-12px"}}>•</span>} <img style={{marginLeft:"5px",marginBottom:"-5px",marginRight:"5px",width:'20px', height:'20px'}} src={meter_logo}/>
            <span>Meter</span>
          </MenuItem>
          <MenuItem onClick={()=>connectNetwork(361)}>
          {chainId === 361 && <span style={{marginLeft:"-12px"}}>•</span>} <img style={{marginLeft:"5px",marginBottom:"-5px",marginRight:"5px",width:'20px', height:'20px'}} src={theta_logo}/>
          <span>Theta</span>
          </MenuItem>

          <MenuItem onClick={()=>connectNetwork(1284)}>
          {chainId === 1284 && <span style={{marginLeft:"-12px"}}>•</span>} <img style={{marginLeft:"5px",marginBottom:"-5px",marginRight:"5px",width:'20px', height:'20px'}} src={glmr_logo}/>
          <span>Moonbeam</span>
          </MenuItem>
         
         
        </MenuFlyout>
      )}
    </StyledMenu>
  )
}
