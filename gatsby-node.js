const path = require(`path`)
const _ = require('lodash')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
  return graphql(`
    {
      allMdx(sort: { fields: [frontmatter___date], order: DESC }, filter: { frontmatter: { listing: { ne: false } } }) {
        edges {
          node {
            frontmatter {
              title
              tags
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    const posts = result.data.allMdx.edges

    createBlogPages(posts, createPage)
    createTagPages(posts, createPage)
    createRedirectFile(createRedirect)
  })
}

function createBlogPages(posts, createPage) {
  posts.forEach(({ node }, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blogPostTemplate.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
        previous,
        next,
      },
    })
    return posts
  })
}

function createTagPages(posts, createPage) {
  const tagTemplate = path.resolve(`./src/templates/tagsTemplate.js`)

  // Tag pages:
  let tags = []
  // Iterate through each post, putting all found tags into `tags`
  _.each(posts, edge => {
    if (_.get(edge, 'node.frontmatter.tags')) {
      tags = tags.concat(edge.node.frontmatter.tags)
    }
  })
  // Eliminate duplicate tags
  tags = _.uniq(tags)

  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: tagTemplate,
      context: {
        tag,
      },
    })
  })
}

function createRedirectFile(createRedirect) {
  createRedirect({
    fromPath: 'https://blog.jibin.tech/',
    toPath: 'https://jibin.tech/blog',
    isPermanent: true,
    force: true,
  })

  createRedirect({
    fromPath: 'https://blog.jibin.tech/contact/',
    toPath: 'https://jibin.tech/contact/',
    isPermanent: true,
    force: true,
  })

  createRedirect({
    fromPath: 'https://blog.jibin.tech/tags/',
    toPath: 'https://jibin.tech/tags/',
    isPermanent: true,
    force: true,
  })

  createRedirect({
    fromPath: 'https://blog.jibin.tech/*',
    toPath: 'https://jibin.tech/:splat',
    isPermanent: true,
    force: true,
  })
}
