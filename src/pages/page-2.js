import React from 'react'
import {FormattedMessage} from 'react-intl'
import ShtigLink from '../components/ShtigLink';
import { Helmet } from "react-helmet"
import PageLayout from '../components/pagelayout';

const SecondPage = ({ pageContext }) => {

  return(
    <PageLayout locale={pageContext.locale}>
      <Helmet>
        <meta name="description" content="this is page 2!!!"></meta>
      </Helmet>
    <FormattedMessage id="hello" />
      <h1>Hi from the second page</h1>
      <p>Welcome to page 2</p>
      <ShtigLink to="/">
      Go to page 2
      </ShtigLink>
    </PageLayout>
  )

}

export default SecondPage
