import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { IntlProvider, addLocaleData } from 'react-intl'
import { StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'


// Locale data
import enData from 'react-intl/locale-data/en'
import heData from 'react-intl/locale-data/he'
import frData from 'react-intl/locale-data/fr'

// Messages
import en from '../i18n/en.json'
import he from '../i18n/he.json'
import fr from '../i18n/fr.json'

// Style
// import './reset.css'
//import styles from './style.module.css'

import './layout.css'

// Components
import Header from './header'
import Footer from './footer'

const messages = { en, he , fr}

addLocaleData([...enData, ...heData, ...frData])

const Layout = ({ locale, children }) => (
  <StaticQuery
    query={graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `}
    render={data => (
      <IntlProvider locale={locale} messages={messages[locale]}>
      <Fragment>
      <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: data.site.siteMetadata.description },
            { name: 'keywords', content: data.site.siteMetadata.keywords },
          ]}
        >
          <html lang={locale} />
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
        {children}
        </div>
        <Footer/>
      </Fragment>
    </IntlProvider>
    )}
  />

)

Layout.propTypes = {
  locale: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired
}

export default Layout
