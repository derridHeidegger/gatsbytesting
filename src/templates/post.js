import React from 'react'
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import Layout from '../components/layout'
import ShtigLink from '../components/ShtigLink';
import Share from '../components/share';

const _ = require('lodash');


const Post = ({data,pageContext}) => {
  const dPath = _.kebabCase(data.markdownRemark.frontmatter.title);
  const fullPath = `/blog/post/${dPath}`;
  
  const url = data.site.siteMetadata.url;
  const twitterUsername = data.site.siteMetadata.twitterUsername;

  const tags = data.markdownRemark.frontmatter.tags;

  return (
    <Layout locale={pageContext.locale}>
      <SEO
          title={data.markdownRemark.frontmatter.title}
          description={data.markdownRemark.frontmatter.description || data.markdownRemark.excerpt || 'nothin’'}
          image={data.markdownRemark.frontmatter.image}
          pathname={fullPath}
          article
      />
      <h1>
        {data.markdownRemark.frontmatter.title}
      </h1>
      <div dangerouslySetInnerHTML={{__html: data.markdownRemark.html}} />
      <div>
        <h5>hmmmm</h5>
        <ul>
        {data.markdownRemark.frontmatter.tags.map(tag => (
          <li key={tag}>
            <ShtigLink to={`/tags/${_.kebabCase(tag)}`}>{tag}</ShtigLink>
          </li>
        ))}
    </ul>

    <Share 
      socialConfig={{
        twitterUsername,
        config: {
          url: `${url}${fullPath}`,
          title : data.markdownRemark.frontmatter.title,
        },
      }}
      tags={tags}
    />


      {pageContext.prev && (
        <ShtigLink to={`/blog/post/${_.kebabCase(pageContext.prev.frontmatter.title)}`} rel="prev">
          ← {pageContext.prev.frontmatter.title}
        </ShtigLink>
      )}

      {pageContext.next && (
        <ShtigLink to={`/blog/post/${_.kebabCase(pageContext.next.frontmatter.title)}`} rel="prev">
          ← {pageContext.next.frontmatter.title}
        </ShtigLink>
      )}
      

      </div>
    </Layout>
  )
}

export default Post

export const query=graphql`
query( $pathSlug : String ){
  site {
		siteMetadata {
			url
			twitterUsername
		}
	}
	markdownRemark(frontmatter: {path: {eq: $pathSlug}}){
    html
    frontmatter{
      title
      description
      date
      path
      tags
      published
      author    
    }
  }
}
`