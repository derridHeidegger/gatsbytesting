import React from 'react'
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import ShtigLink from '../components/ShtigLink';

const _ = require('lodash');


const Tag = ({data,pageContext}) => {


  const { tag ,currentPage , totalPages } = pageContext;
  const totalCount = data.allMarkdownRemark.edges.length ? data.allMarkdownRemark.edges.length : 0;
  const subline = `${data.allMarkdownRemark.totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${tag}"`;


  const isFirst = currentPage === 1
  const isLast = currentPage === totalPages
  const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()


  return (
    <Layout locale={pageContext.locale}>
      <h1>Tag &ndash; {tag}</h1>
      <p>{subline} (See <ShtigLink to="/tags">all tags</ShtigLink>)</p>
      <hr/>
      {data.allMarkdownRemark.edges.map(post => (
        
      <div key={post.node.id}>
        <h3>{post.node.frontmatter.title}</h3>
        <small>Posted By {post.node.frontmatter.author} on {post.node.frontmatter.date}</small>
        <br/>
        <br/>
        <ShtigLink to={`/blog/post/${_.kebabCase(post.node.frontmatter.title)}/`}>Read More</ShtigLink>
        <br/>
        <br/>
        <hr/>
      </div>
      ))}

    {!isFirst && (
        <ShtigLink to={`/tags/${_.kebabCase(tag)}/${prevPage}`} rel="prev">
          ← Previous Page
        </ShtigLink>
      )}
      {!isLast && (
        <ShtigLink to={`/tags/${_.kebabCase(tag)}/${nextPage}`} rel="next">
          Next Page →
        </ShtigLink>
      )}

    </Layout>
  )
}

export default Tag

export const BlogQuery = graphql`
query($skip: Int!, $limit: Int!,$tag: String!,$locale: String!) {
  allMarkdownRemark(
    filter: {
      frontmatter: { tags: { eq: $tag },locale: {eq: $locale} }
      }
    sort: { fields: [frontmatter___date], order: DESC }, 
    limit: $limit, 
    skip: $skip,
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
        }
      }
    }
}
}
`;