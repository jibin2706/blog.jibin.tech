import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/layout'

import { graphql } from 'gatsby'
import BlogList from './blogList'
import SEO from '../components/SEO'

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { totalCount } = data.allMdx.edges

  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`

  return (
    <Layout>
      <SEO
        title={`Filter blog posts by ${tag}`}
        description="Filtered blog post according to tags"
      />
      <BlogList data={data} templateTitle={`#${tag}`} />
    </Layout>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM D, YYYY")
            info
          }
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
