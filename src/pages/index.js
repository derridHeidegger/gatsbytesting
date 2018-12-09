import React from 'react'
import {FormattedMessage} from 'react-intl'
import Layout from '../components/layout'
import Image from '../components/image'
import ShtigLink from '../components/ShtigLink';
import { Helmet } from "react-helmet"


const IndexPage = ({ pageContext }) => {
  return(
    <Layout locale={pageContext.locale}>
      <Helmet>
        <meta name="description" content="this is HOME page!!!"></meta>
      </Helmet>
    <FormattedMessage id="hello" />
      <h1><FormattedMessage id="welcomeMsg"/></h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: '300px', marginBottom: '1.45rem' }}>
        <Image />
      </div>
      <ShtigLink to="/page-2">
      Go to page 2
      </ShtigLink>
    </Layout>
  )

  }

export default IndexPage
