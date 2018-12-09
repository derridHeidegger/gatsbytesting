import React from 'react';
import {graphql} from 'gatsby';
import {FormattedMessage} from 'react-intl';
import Layout from '../components/layout'
import ShtigLink from '../components/ShtigLink';
const _ = require('lodash');



const Blog = ({ data, pageContext }) => {

  const isFirst = pageContext.currentPage === 1
  const isLast = pageContext.currentPage === pageContext.totalPages
  const prevPage = pageContext.currentPage - 1 === 1 ? "blog" : `blog/${(pageContext.currentPage - 1).toString()}`
  const nextPage = (pageContext.currentPage + 1).toString()


  return (
    <Layout locale={pageContext.locale}>
      <h1>Latest Posts</h1>
      <FormattedMessage id="hello" />
      {data.allMarkdownRemark.edges.map(post => (
        <div key={post.node.id}>
          <h3>{post.node.frontmatter.title}</h3>
          <small>Posted By {post.node.frontmatter.author} on {post.node.frontmatter.date}</small>
          <br/>
          <br/>
          <ShtigLink to={`/blog/post/${_.kebabCase(post.node.frontmatter.title)}/`}>
          Read More
          </ShtigLink>
          <br/>
          <br/>
          <hr/>
        </div>
      ))}

      {!isFirst && (
        <ShtigLink to={`/${prevPage}`} rel="prev">
          ← Previous Page
        </ShtigLink>
      )}
      {!isLast && (
        <ShtigLink to={`/blog/${nextPage}`} rel="next">
          Next Page →
        </ShtigLink>
      )}


    </Layout>
  )
}

export default Blog

export const BlogQuery = graphql`
query($locale : String , $limit : Int , $skip: Int ) {
  allMarkdownRemark(
    filter: {frontmatter: {locale: {eq: $locale}}},
    sort: { fields: [frontmatter___date], order: DESC },
    limit: $limit,
    skip: $skip
  ) {
    totalCount
    edges {
        node {
          id
          frontmatter {
            path
            title
            date
            author
            tags
            locale
        }
      }
    }
  }
}
`