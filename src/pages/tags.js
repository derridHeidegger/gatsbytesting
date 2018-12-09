import React from 'react';
import {graphql} from 'gatsby';
import Layout from '../components/layout';
import ShtigLink from '../components/ShtigLink';
const _ = require('lodash');


const Tags = ({data,pageContext}) => {

  return(
    <Layout locale={pageContext.locale}>
    <div>
      <h1>Tags</h1>
      <ul>
        {data.allMarkdownRemark.group.map(tag => (
          <li key={tag.fieldValue}>
            <ShtigLink to={`/tags/${_.kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </ShtigLink>
          </li>
        ))}
      </ul>
    </div>
  </Layout>
  )
}

export default Tags

export const TagsQuery = graphql`
query( $locale : String!) {
  allMarkdownRemark(
    filter: {frontmatter: {locale: {eq: $locale}}}
    ) {
      group(field: frontmatter___tags){
        fieldValue
        totalCount
      }
  }
}
`;