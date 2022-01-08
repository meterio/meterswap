import React from 'react';
import { useIntl } from 'react-intl';

import { BookOpen, MessageCircle, BarChart, Home } from 'react-feather'
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import styled from 'styled-components'

import { NavLink } from 'react-router-dom'
import {  FaGithub, FaWallet, FaTractor, FaExchangeAlt, FaDatabase, FaGamepad, FaPassport, FaMoneyBillWave, FaPiggyBank } from 'react-icons/fa';
import './styles/prosidebar.css';
import {  ExternalLink } from '../../../theme'


const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  
  text-decoration:none;
  &.${activeClassName} {
    
    font-weight: 500;
    color: ${({ theme }) => theme.text1};
    
  }
`



const StyledExternalLink = styled(ExternalLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  text-decoration:none;
  color: ${({ theme }) => theme.text1};
 
  &.${activeClassName} {
    font-weight: 500;
    color: ${({ theme }) => theme.text1};
    background:  #E6007E;
  }
  
`


const Aside = ({ image, rtl, toggled, handleToggleSidebar,handleToggleCollapse, collapsed, chainId}) => {
  
  const intl = useIntl();

  const handleMenuItemClick = () => {
    handleToggleCollapse()
  }

  return (
    <ProSidebar
   
      image={false}
      rtl={rtl}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
      
  
        <div
          style={{
            padding: '24px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 14,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        ><Menu >
       <MenuItem icon={<Home />}> 
       <StyledNavLink id={`stake-nav-link`}  to={'/'}>
            Home
          </StyledNavLink>
        </MenuItem>
       </Menu>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu  iconShape="circle">
          <MenuItem onClick={handleMenuItemClick}
            icon={<FaExchangeAlt />}
            
          >
           <StyledNavLink  className="sideBarItem" id={`stake-nav-link`}  to={'/swap'}>
            Swap
          </StyledNavLink>
          </MenuItem>
          <MenuItem onClick={handleMenuItemClick} icon={<FaDatabase />}> 
          <StyledNavLink className="sideBarItem" id={`stake-nav-link`}  to={'/pool'}>
            Pool
          </StyledNavLink></MenuItem>

          <SubMenu
            // suffix={<span className="badge yellow">3</span>}
            title= 'Earn' 
            icon={<FaMoneyBillWave />}
          >
            <MenuItem onClick={handleMenuItemClick} className="sideBarItem" icon={<FaTractor />}> 
          <StyledNavLink id={`stake-nav-link`}  to={'/farm'}>
             Farm
          </StyledNavLink>
          </MenuItem>

          <MenuItem onClick={handleMenuItemClick} 
          suffix={<span className="badge yellow">Volt</span>}
          className="sideBarItem" icon={<FaPiggyBank />}> 
          <StyledNavLink id={`stake-nav-link`}  to={'/staking'}>
             Staking
          </StyledNavLink>
          </MenuItem>

          </SubMenu>

          

          <SubMenu
            // suffix={<span className="badge yellow">3</span>}
            title= 'Charts' 
            icon={<BarChart />}
          >
            <MenuItem>
            <StyledExternalLink id={`gov-nav-link`} href={`https://info.voltswap.finance/#/home?network=${chainId === 361 ? 'theta':'meter'}`}>
          Overview <span style={{ fontSize: '11px' }}>↗</span>
          </StyledExternalLink>
            </MenuItem>
            <MenuItem> 
            <StyledExternalLink id={`gov-nav-link`} href={`https://info.voltswap.finance/#/tokens?network=${chainId === 361 ? 'theta':'meter'}`}>
          Tokens <span style={{ fontSize: '11px' }}>↗</span>
          </StyledExternalLink>
            </MenuItem>
            <MenuItem>
            <StyledExternalLink id={`gov-nav-link`} href={`https://info.voltswap.finance/#/pairs?network=${chainId === 361 ? 'theta':'meter'}`}>
          Pairs <span style={{ fontSize: '11px' }}>↗</span>
          </StyledExternalLink>
            </MenuItem>
            <MenuItem>
            <StyledExternalLink id={`gov-nav-link`} href={`https://info.voltswap.finance/#/accounts?network=${chainId === 361 ? 'theta':'meter'}`}>
          Accounts <span style={{ fontSize: '11px' }}>↗</span>
          </StyledExternalLink>
            </MenuItem>
          </SubMenu>

          

          <MenuItem icon={<FaPassport />}> 
          <StyledExternalLink id={`gov-nav-link`} href={'https://passport.meter.io'}>
          Passport <span style={{ fontSize: '11px' }}>↗</span>
          </StyledExternalLink>
          </MenuItem>


          <MenuItem icon={<FaGamepad />}> 
          <StyledExternalLink id={`gov-nav-link`} href={'https://golucky.io'}>
              Lottery <span style={{ fontSize: '11px' }}>↗</span>
              </StyledExternalLink>
          </MenuItem>

          <MenuItem icon={<FaWallet />}> 
          <StyledExternalLink id={`gov-nav-link`} href={'https://wallet.meter.io'}>
          Wallet <span style={{ fontSize: '11px' }}>↗</span>
          </StyledExternalLink>
          </MenuItem>
         



         
        </Menu>
      
      </SidebarContent>

      <SidebarFooter style={{ textAlign: 'center', display:'inline-flex' }}>
        <div
          
          style={{
            padding: '20px 24px',
          }}
        >
          <a
            href="https://github.com/meterio/voltswap/tree/voltswap"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
           
          >
            <FaGithub  color='white'  size={20} />
           
          </a>

         
        </div>
        <div
         
          style={{
            padding:  '20px 24px',
          }}
        >
      <a  target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
             href="https://docs.voltswap.finance/">
            <BookOpen  color='white' size={20} />
         
          </a>
        </div>
        <div
         
          style={{
            padding:  '20px 24px',
          }}
        >
           <a 
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"

            href="https://t.me/Meter_IO">
            <MessageCircle  color='white' size={20} />
          
          </a>
          
        </div>
       

        
         
         
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Aside;
