import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/SEO'
import profilePic from '../images/jibin.jpg'

import '../styles/about.scss'

const timelines = [
  {
    time: '2020 - present',
    place: 'Pepper Content',
    description: '',
  },
  {
    time: '2019 - 2020',
    place: 'The Souled Store',
    description:
      '\
    <li>Migrating the site from SPA into SSR using Next.js for boosting SEO and decreasing the first load time.</li>\
    <li>Transformed the transactional and marketing email templates into improved designs, keeping in line with the brand identity.</li>\
    <li>Collaborated with the SEO team to remodel on-page SEO using best practices.</li>\
    <li>Created new APIs on Falcon (Python) and automate sitemap generation and order health status updates on slack.</li>\
    ',
  },
  {
    time: '2016 - 2019',
    place: 'Mumbai University',
    description:
      '\
    <li>Secured CGPA of 9.01 in Bachelors of Science in Information Technology from Wilson College</li>\
    <li>Co-ordinated IT fest for my department (Backslash2k19)</li>\
    ',
  },
]

const About = () => (
  <Layout>
    <SEO
      title="About Jibin Thomas"
      description="Currently working as a Frontend developer at Pepper Content, building largest content marketplace"
    />

    <main className="about mw-800 mx-auto">
      <div className="overflow-hidden">
        <h1 className="about__heading drop-in--1">About Me</h1>
      </div>

      <div className="overflow-hidden">
        <section className="about__description">
          <img className="about__image" src={profilePic} alt="Jibin Thomas" />
          <p>
            I'm a Frontend developer based in Mumbai, India. I passionate about web development and love to explore new
            technologies.
          </p>
          <p>
            I completed my graduation in 2019 from Wilson College in Bachelors in Science in Information Technology with
            CGPA of 9.01. Currently I work at <a href="https://www.peppercontent.in">Pepper</a> as a Frontend Developer
            where we are building the Indian's largest content marketplace. Recently, I have also started developing
            backend solutions.
          </p>
          <p>
            Here's are the technologies that I have been using recently - Javascript - HTML & CSS3 - Flask & Falcon
            (Python) - Vue.js - Next.js - MJML (mailer)
          </p>
        </section>
      </div>
    </main>

    <section className="mw-1200 mx-auto">
      <ul className="timeline">
        {timelines.map((timeline, index) => (
          <li>
            <span className="timeline__dot"></span>
            <div className={`timeline__section ${index % 2 === 0 ? 'direction-r' : 'direction-l'}`}>
              <h2 className="timeline__place">{timeline.place}</h2>
              <h2 className="timeline__year">{timeline.time}</h2>
              {timeline.description && (
                <p className="timeline__description" dangerouslySetInnerHTML={{ __html: timeline.description }} />
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  </Layout>
)

export default About
