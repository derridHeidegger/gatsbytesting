import React from 'react'
import ShtigLink from './ShtigLink';
import {injectIntl,intlShape,FormattedMessage} from 'react-intl'

const Menu = ({intl: { locale }}) => {
  return (
    <nav>
      <ul>
        <li>
          <ShtigLink to="/">
            <FormattedMessage id="menuHome" />
          </ShtigLink>
        </li>
        <li>
          <ShtigLink to="/blog">
            <FormattedMessage id="menuBlog" />
          </ShtigLink>
        </li>
        <li>
          <ShtigLink to="/page-2">
            <FormattedMessage id="menuPage2" />
          </ShtigLink>
        </li>
      </ul>
    </nav>
  )
}

Menu.prototype = { intl: intlShape.isRequired}

export default injectIntl(Menu)