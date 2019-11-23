module.exports = {
  siteMetadata: {
    title: `Blog — Jibin Thomas`,
    siteUrl: `https://blog.jibin.tech`,
    description: `I mainly write about web technologies like react, javascript, css and random stuffs that I come across while programming`,
    author: {
      name: `Jibin Thomas`,
    },
    social: {
      twitter: '@real_jibin',
    },
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    // sitemap generation
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: ['/success', '/tags/*'],
      },
    },
    // robots.txt generation
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        configFile: 'robots-txt.config.js',
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    // rss feed at /rss.xml
    {
      resolve: `gatsby-plugin-feed-generator`,
      rss: true,
      siteQuery: ` {
        site {
          siteMetadata {
            title
            description
            siteUrl
            site_url: siteUrl
          }
        }
      }`,
      feeds: [
        {
          name: 'rss.xml',
          query: `{
            allMdx(
              limit: 1000,
              sort: { order: DESC, fields: [frontmatter___date] },
              
            ) {
              edges {
                node {
                  excerpt(pruneLength: 50)
                  body
                  fields { slug }
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }
          }`,
          normalize: ({ query: { site, allMdx } }) => {
            return allMdx.edges.map(edge => {
              return {
                title: edge.node.frontmatter.title,
                date: edge.node.frontmatter.date,
                url: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                html: edge.node.html,
              }
            })
          },
          // normalize: ({ query: { site, allMdx } }) => {
          //   return allMdx.edges.map(edge => {
          //     const siteUrl = site.siteMetadata.siteUrl
          //     const postText = `
          //     <div style="margin-top=55px; font-style: italic;">(This is an article posted to my blog at blog.jibin.tech . You can read it online by <a href="${siteUrl +
          //       edge.node.fields.slug}">clicking here</a>.)</div>
          //   `
          //     return Object.assign({}, edge.node.frontmatter, {
          //       description: edge.node.excerpt,
          //       date: edge.node.frontmatter.date,
          //       url: site.siteMetadata.siteUrl + edge.node.fields.slug,
          //       guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
          //       custom_elements: [
          //         { 'content:encoded': edge.node.html + postText },
          //       ],
          //     })
          //   })
          // },
          title: "Jibin Thomas' Personal Blog RSS Feed",
        },
      ],
    },
    // markdown file are in that directory (/content/)
    {
      resolve: `gatsby-source-filesystem`,
      options: { name: `blog`, path: `${__dirname}/content/blog` },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Blog by Jibin Thomas`,
        short_name: `Blog`,
        start_url: `/`,
        background_color: `#F1F1F1`,
        theme_color: `#F1F1F1`,
        display: `standalone`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
        include_favicon: true,
      },
    },
    // google Analytics
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-133322442-4',
        // Puts tracking script in the head instead of the body
        head: true,
      },
    },
    // transforming markdown in html
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          // using images in markdown file
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 800,
              quality: 100,
              withWebp: true,
            },
          },
          // adding id to headers in markdown
          // {
          //   resolve: `gatsby-remark-autolink-headers`,
          //   options: {
          //     maintainCase: false,
          //     removeAccents: true,
          //     icon: `<svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24"><path d="M22.548 9l.452-2h-5.364l1.364-6h-2l-1.364 6h-5l1.364-6h-2l-1.364 6h-6.184l-.452 2h6.182l-1.364 6h-5.36l-.458 2h5.364l-1.364 6h2l1.364-6h5l-1.364 6h2l1.364-6h6.185l.451-2h-6.182l1.364-6h5.366zm-8.73 6h-5l1.364-6h5l-1.364 6z"/></svg>`,
          //   },
          // },
          // code highlighting
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: true,
            },
          },
          // copying gif and other files
          'gatsby-remark-copy-linked-files',
        ],
        plugins: [`gatsby-remark-images`],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    'gatsby-plugin-offline',
  ],
}
