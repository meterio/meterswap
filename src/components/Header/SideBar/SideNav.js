import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import Layout from './Layout';
import messages from './messages';
import './styles/navStyles.css';

function SideNav({collapsed,chainId,handleToggleCollapse}) {
  const [locale, setLocale] = useState('en');

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Layout collapsed={collapsed} handleToggleCollapse={handleToggleCollapse} chainId={chainId} setLocale={setLocale} />
    </IntlProvider>
  );
}

export default SideNav;
