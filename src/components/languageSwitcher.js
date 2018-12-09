import React from 'react'
import {injectIntl,intlShape} from 'react-intl'
import {Link} from 'gatsby';
import locales from '../constants/locales'



const LanguageSwitcher = ({intl: { locale }}) => {
  return (
    <nav>
      <ul>
        {Object.keys(locales).map(key => (
          <li key={locales[key].locale}>
            <Link
              className={key === locale ? 'active' : ''}
              key={locales[key].locale}
              to={locales[key].default ? '/' : `/${locales[key].path}`}
            >
              {locales[key].locale}
            </Link>
          </li>
        ))}
      </ul>

  </nav>
  )
}

LanguageSwitcher.prototype = { intl: intlShape.isRequired}

export default injectIntl(LanguageSwitcher)