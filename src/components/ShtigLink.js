import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import locales from '../constants/locales'

const ShtigLink = ({ to, intl: { locale }, ...props }) => {
  const path = locales[locale].default ? to : `/${locale}${to}`

  return <Link {...props} to={path} />
}

ShtigLink.propTypes = {
  to: PropTypes.string.isRequired,
  intl: intlShape.isRequired
}

export default injectIntl(ShtigLink)
