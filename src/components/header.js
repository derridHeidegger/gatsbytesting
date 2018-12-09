import React from 'react'
import ShtigLink from '../components/ShtigLink';
import {injectIntl,intlShape,FormattedMessage} from 'react-intl'
import Menu from './menu';
import LanguageSwitcher from './languageSwitcher';


const Header = ({ siteTitle, intl: { locale } }) => (
  <div
    style={{
      background: 'rebeccapurple',
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <h1 style={{ margin: 0 }}>
        <ShtigLink to="/">
        <FormattedMessage id="siteTitle" />
        </ShtigLink>
      </h1>
      <Menu/>
      <LanguageSwitcher/>
    </div>
  </div>
)

Header.prototype = { intl: intlShape.isRequired}

export default injectIntl(Header)
