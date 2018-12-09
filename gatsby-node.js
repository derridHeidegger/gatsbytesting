const locales = require('./src/constants/locales')
const _ = require('lodash');
const fs = require("fs-extra");
const path = require("path");

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  return new Promise(resolve => {
    deletePage(page)

    Object.keys(locales).map(lang => {
      const localizedPath = locales[lang].default
        ? page.path
        : locales[lang].path + page.path

      return createPage({
        ...page,
        path: localizedPath,
        context: {
          locale: lang
        }
      })
    })

    resolve()
  })
}



const testPostPagesNextPrev = ({createPage,langPosts}) => {
  langPosts.forEach(({node}, index) => {
    const next = index === 0 ? null : langPosts[index - 1].node;
    const prev = index === langPosts.length-1 ? null : langPosts[index + 1].node;


    const path = node.frontmatter.path;
    const locale = node.frontmatter.locale

    const localizedPath = locale === 'he' ? '' : locale;

    createPage({
      path: `${localizedPath}/blog/post/${_.kebabCase(node.frontmatter.title)}`,
      component: require.resolve('./src/templates/post.js'),
      context: {
        prev,
        next,
        pathSlug: path,
        locale
      }
    })

  })
}

const testPaginatedForTags = ({graphql,lang,postsPerPage,createPage,langPosts,tags}) => {

  //console.log(typeof(lang))
  //const dlang = lang.toString();
  return graphql(`
  {
    allMarkdownRemark(
      filter: {frontmatter: {locale: {eq: "${lang}"}}}
      sort: {order: DESC, fields: [frontmatter___date]}
    ){
			group(field: frontmatter___tags){
        fieldValue
        totalCount
      }
      edges{
        node{
          excerpt
          id
          frontmatter{
            title
            path
            tags
            author
            date
            description
            published
            locale
          }
        }
      }
    }
  }
  `).then(results => {
    if (results.errors) {
      return Promise.reject(results.errors);
    }
    results.data.allMarkdownRemark.group.forEach(tag => {
      //console.log(`the tag: ${tag.fieldValue} in the language: ${lang} has ${tag.totalCount} posts`);

      const localizedPath = lang === 'he' ? '' : lang;

      const numPages = Math.ceil(tag.totalCount / postsPerPage);
      const tagforPath = _.kebabCase(tag.fieldValue);

      


      Array.from({length: numPages})
      .forEach((_, i) => {
        createPage({
          path: i === 0 ? `${localizedPath}/tags/${tagforPath}` : `${localizedPath}/tags/${tagforPath}/${i+1}`,
          component: require.resolve('./src/templates/tag.js'),
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            totalPages: numPages,
            currentPage: i + 1,
            tag: tag.fieldValue,
            locale: lang
          },
        })
      })



    })
    

  })
}

const testBlogPagesPaginated = ({lang,TotalCount,postsPerPage,createPage,langPosts}) => {
  const numPages = Math.ceil(TotalCount / postsPerPage);
  const localizedPath = lang === 'he' ? '' : lang;

  Array.from({length: numPages})
  .forEach((_, i) => {
    createPage({
      path: i === 0 ? `${localizedPath}/blog` : `${localizedPath}/blog/${i+1}`,
      component: require.resolve('./src/pages/blog.js'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        totalPages: numPages,
        currentPage: i + 1,
        locale: lang
      },
    })
  })

}



const createTagsPageForEachLanguage = ({lang,createPage}) => {

  const localizedPath = lang === 'he' ? '' : lang;
  //create tags pages
  createPage({
    path: `${localizedPath}/tags/`,
    component: require.resolve('./src/pages/tags.js'),
    context: {
      locale: lang
    },
  })
}


exports.createPages = ({actions,graphql}) => {
  const {createPage} = actions;

  return graphql(`
  {
    allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___date]}
    ){
      tags: group(field: frontmatter___tags) {
        fieldValue
        totalCount
        edges{
          node{
            frontmatter {
              locale
              path
              title
            }
          }
        }
      }
      postsPerLanguage: group(field: frontmatter___locale) {
        fieldValue
        totalCount
        edges{
          node{
            excerpt
            id
            frontmatter{
              title
              path
              locale
              tags
            }
          }
        }
      }
      edges{
        node{
          excerpt
          id
          frontmatter{
            title
            path
            tags
            author
            date
            description
            published
            locale
          }
        }
      }
    }
  }
  `).then(results => {
    if (results.errors) {
      return Promise.reject(results.errors);
    }


    const posts = results.data.allMarkdownRemark.edges;
    const tags = results.data.allMarkdownRemark.tags;
    const postsPerLanguage = results.data.allMarkdownRemark.postsPerLanguage;
    const postsPerPage = 3;
    const numPages = Math.ceil(posts.length / postsPerPage);

    postsPerLanguage.forEach((l,i) => {
      const lang = l.fieldValue;
      const TotalCount = l.totalCount;
      const langPosts = l.edges;

      createTagsPageForEachLanguage({lang,createPage})
      testPaginatedForTags({graphql,lang,postsPerPage,createPage,langPosts,tags});
      testBlogPagesPaginated({lang,TotalCount,postsPerPage,createPage,langPosts})

      testPostPagesNextPrev({createPage,langPosts});
    })



  })
}