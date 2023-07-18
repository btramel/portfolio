/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import AnimatedNav from '/components/AnimatedNav'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import CustomCursor from '../components/CustomCursor'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import {
  FiLinkedin,
  FiTwitter,
  FiGithub,
  FiMessageSquare,
  FiExternalLink,
} from 'react-icons/fi'
import jaden from '../public/images/jaden.png'
import medium from '../public/images/medium.jpg'
import minn from '../public/images/MINN.jpeg'
import pokedex from '../public/images/pokedex.jpg'
import allstar from '../public/images/new.gif'
import avi from '../public/images/avi.jpeg'
import UTMWrapper from '../components/UTMWrapper'

const Home = () => {
  const navItems = [
    {
      name: 'home',
      link: 'home',
      key: '01.',
    },
    { name: 'about', link: 'about', key: '02.' },
    { name: 'work', link: 'work', key: '03.' },
    { name: 'contact', link: 'contact', key: '04.' },
  ]
  const fonts = {
    accent: 'text-[#05BFDB] text-sm font-mono',
    primaryHeading:
      'whitespace-nowrap text-gray-200 font-bold leading-tight font-sans',
    secondaryHeading: 'text-gray-400 font-bold leading-tight font-sans',
    base: 'text-gray-400 text-base font-sans',
  }

  const [active, setActive] = useState(navItems[0].name)

  const [ref, inView, entry] = useInView()
  const [ref2, inView2, entry2] = useInView({ initialInView: false })
  const [ref3, inView3, entry3] = useInView({ initialInView: false })
  const [ref4, inView4, entry4] = useInView({ initialInView: false })

  useEffect(() => {
    inView && !inView2
      ? setActive(entry.target.id)
      : inView2
      ? setActive(entry2.target.id)
      : inView3 && !inView4
      ? setActive(entry3.target.id)
      : inView4
      ? setActive(entry4.target.id)
      : null
  }, [entry, entry2, entry3, entry4])

  return (
    <div className={`h-screen flex`}>
      <AnimatedNav
        fonts={fonts}
        navItems={navItems}
        active={active}
        setActive={setActive}
      />
      <CustomCursor />
      <SocialsSidebar />
      <EmailSidebar />

      <main className='bg-[#0B192E] h-max w-screen flex flex-col cursor-none relative'>
        <section
          id='home'
          ref={ref}
          className='mt-[1px] min-h-[800px] h-[100vh] w-full bg-[#0B192E] px-[2rem] sm:px-[5%] lg:px-[15%]'
        >
          <Hero fonts={fonts} />
        </section>
        <section
          id='about'
          ref={ref2}
          className='mt-[3px] min-h-[800px] h-full w-full bg-[#0B192E] px-[2rem] sm:px-[5%] lg:px-[15%]'
        >
          <About fonts={fonts} />
        </section>
        <section
          id='work'
          ref={ref3}
          className='mt-[1px] min-h-[800px] sm:h-full w-full bg-[#0B192E] px-[2rem] sm:px-[5%] lg:px-[15%]'
        >
          <Projects fonts={fonts} />
        </section>
        <section
          id='contact'
          ref={ref4}
          className='mt-[1px] min-h-[800px] h-[101vh] w-full bg-[#0B192E] px-[2rem] sm:px-[5%] lg:px-[15%]'
        >
          <Contact fonts={fonts} />
        </section>
        <section className='absolute bottom-2 w-full flex flex-col gap-1 font-mono text-gray-200 text-center'>
          <p className='text-[.5rem]'>Built with &#128153; by Brad Tramel</p>
          <p className='text-[.5rem]'>
            <UTMWrapper defaults={'?defaults'} href={'https://www.google.com'}>
              Design inspired by
            </UTMWrapper>
            <a
              href='https://brittanychiang.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Brittany Chiang
            </a>
          </p>
        </section>
      </main>
    </div>
  )
}

const Button = ({ children, to }) => {
  return (
    <a href={to}>
      <div className='relative text-[#05BFDB] text-sm font-mono'>
        <button
          className={`hover:cursor-none absolute z-20 border-2 border-[#05BFDB] px-8 py-3 bg-[#0B192E] rounded-md hover:translate-x-1 hover:translate-y-1 transition-all top-0 left-0 whitespace-nowrap`}
        >
          {children}
        </button>
        <div className='absolute z-10 rounded-md whitespace-nowrap bg-[#05BFDB] px-8 py-3 top-0 left-0'>
          {children}
        </div>
      </div>
    </a>
  )
}

const Hero = ({ fonts }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        delay: 0.7,
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: -10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: 'easeOut',
        duration: 0.4,
      },
    },
  }

  return (
    <motion.div
      variants={container}
      initial='hidden'
      animate='show'
      className='flex flex-col gap-6 items-start min-h-[600px] h-screen justify-center'
    >
      <motion.p variants={item} className={fonts.accent}>
        Hi, my name is
      </motion.p>
      <div
        style={{
          fontSize: 'clamp(40px, 9vw, 64px)',
        }}
      >
        <motion.h1 variants={item} className={fonts.primaryHeading}>
          Brad Tramel.
        </motion.h1>
        <motion.h1 variants={item} className={fonts.secondaryHeading}>
          I build cool websites.
        </motion.h1>
      </div>
      <motion.p variants={item} className={`md:max-w-[65%] ${fonts.base} pb-4`}>
        More formally, I&apos;m a Front End Developer for the Minnesota
        Timberwolves & Lynx. I design and build engaging interactive
        experiences.
      </motion.p>
      <motion.div
        variants={item}
        className='relative text-[#05BFDB] text-sm font-mono'
      >
        <Button to={'#about'}>Learn More!</Button>
        <div className='absolute z-10 rounded-md whitespace-nowrap bg-[#05BFDB] px-8 py-3 top-0 left-0'>
          Learn More!
        </div>
      </motion.div>
    </motion.div>
  )
}

const SocialsSidebar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: 'easeOut', duration: 0.3, delay: 2.2 }}
      className='invisible lg:visible z-50 fixed bottom-0 left-[40px] w-[40px] cursor-none'
    >
      <ul className='w-full h-full cursor-none flex flex-col gap-4 items-center justify-center after:content-[""] after:block after:w-[1px] after:h-[90px] after:bg-gray-200/80'>
        <a
          className='group cursor-none'
          title='GitHub'
          aria-label='GitHub'
          href='https://www.github.com/btramel'
        >
          <li className='text-gray-200 group-hover:text-[#05BFDB] hover:-translate-y-1 transition-transform cursor-none p-2'>
            <FiGithub className='h-[20px] w-[20px]' />
          </li>
        </a>

        <a
          className='group cursor-none'
          title='Twitter'
          aria-label='Twitter'
          href='https://twitter.com/uhhhbrad'
        >
          {' '}
          <li className='text-gray-200 group-hover:text-[#05BFDB]  hover:-translate-y-1 transition-transform cursor-none p-2'>
            <FiTwitter className='h-[20px] w-[20px]' />
          </li>
        </a>

        <a
          className='group cursor-none'
          title='LinkedIn'
          aria-label='LinkedIn'
          href='https://www.linkedin.com/in/bradtramel/'
        >
          <li className='text-gray-200 group-hover:text-[#05BFDB] hover:-translate-y-1 transition-transform cursor-none p-2'>
            <FiLinkedin className='h-[20px] w-[20px]' />
          </li>
        </a>

        <a
          className='group cursor-none'
          aria-label='Email'
          title='Email'
          href='mailto:bradtramel@gmail.com?&subject=Hey Brad&body=Cool portfolio website!'
        >
          <li className='text-gray-200 group-hover:text-[#05BFDB] hover:-translate-y-1 transition-transform cursor-none mb-[1rem] p-2'>
            <FiMessageSquare className='h-[20px] w-[20px]' />
          </li>
        </a>
      </ul>
    </motion.div>
  )
}

const EmailSidebar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: 'easeOut', duration: 0.3, delay: 2.2 }}
      className='invisible lg:visible z-50 block fixed bottom-0 right-[40px] w-[40px] cursor-none'
    >
      <a
        aria-label='Email'
        title='Email'
        href='mailto:bradtramel@gmail.com?&subject=Hey Brad&body=Cool portfolio website!'
        className='group relative cursor-none h-full w-full flex flex-col justify-start items-center after:content-[""] after:block after:w-[1px] after:h-[90px] after:bg-gray-200/80'
      >
        <div
          style={{ writingMode: 'vertical-lr' }}
          className='pb-[25px] tracking-widest text-gray-400 text-sm group-hover:text-[#05BFDB] cursor-none font-mono group-hover:-translate-y-1 transition-transform'
        >
          bradtramel@gmail.com
        </div>
      </a>
    </motion.div>
  )
}

const NumberedHeading = ({ number, title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ ease: 'easeOut', duration: 0.5, delay: 0.25 }}
      style={{
        fontSize: 'clamp(22px, 4vw, 28px)',
      }}
      className='flex flex-row flex-nowrap whitespace-nowrap gap-2 items-center pb-6 tracking-tight'
    >
      <div className={`text-[#05BFDB] text-lg font-mono`}>{number}</div>
      <div className={`text-gray-400 font-bold font-sans`}>{title}</div>
      <div
        className={`w-[50%] justify-center items-center h-[1px] bg-[#05BFDB]/10`}
      ></div>
    </motion.div>
  )
}

const About = ({ fonts }) => {
  return (
    <div className='flex flex-col gap-4 min-h-screen justify-center'>
      <NumberedHeading number={'02.'} title={'About Me'} />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ ease: 'easeOut', duration: 1, delay: 0.75 }}
        className={`flex flex-col gap-6 ${fonts.base}`}
      >
        <div className='flex flex-col sm:flex-row gap-8'>
          <div className='flex flex-col gap-6 max-w-[600px] leading-relaxed tracking-[.01rem]'>
            <p className=' font-light'>
              Hey there! My name is Brad and I build web experiences for the
              Minnesota Timberwolves & Lynx digital marketing team. I assume you
              want to know a little something about how I got here.
            </p>
            <p className=' font-light'>
              My professional life used to be an amalgam of side gigs — I
              managed projects for a construction company, wrote copy for an
              e-commerce giant, and even detoured to law school! I taught myself
              web development a few years ago and finally found the spark I had
              been searching for. Coding enabled me to solve real-world
              problems, scratched my creative itch, and empowered me to learn
              constantly. I never looked back.
            </p>
            <p className=' font-light'>
              Now I use my writing chops, eye for design, and endless curiosity
              every day to build and design pixel-perfect websites. I have
              developed a knack for developing beautiful, performant, responsive
              React UIs that leverage API data.
            </p>
            <p className=' font-light'>
              A few technologies I&apos;ve been working with recently:
              JavaScript (ES6+), React, Next, Tailwind, Framer Motion, Figma.
              Going forward I aim add animation libraries like ThreeJS, data
              visualization libraries like D3, and low-code tools like Webflow
              to my ever-growing toolbelt.
            </p>
          </div>
          <div className='relative aspect-square my-auto w-full h-full rounded-lg bg-[#05BFDB]/50'>
            <Image
              src={avi}
              alt='brad tramel'
              className='rounded-lg mix-blend-overlay'
              fill
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const Projects = ({ fonts }) => {
  const projects = [
    {
      image: minn,
      title: 'City Edition Unveil',
      description:
        'This microsite, built to reveal the 2022-23 City-Edition uniform, is a style guide made interactive.',
      techStack: ['NextJS', 'Tailwind', 'Framer Motion', 'APIs'],
      link: 'https://timberwolves.com/canvas',
    },
    {
      image: jaden,
      title: 'All-Defense Campaign',
      description:
        "Minnesota Timberwolves forward Jaden McDaniels said he loves making the NBA's best players have a 'bad night.' This microsite, built to encourage his inclusion on the All-Defensive team, takes that quote and runs with it.",
      techStack: ['NextJS', 'Tailwind', 'Framer Motion'],
      link: 'https://timberwolves.com/badnight',
    },
    {
      image: allstar,
      title: 'All-Star Campaign',
      description:
        'This microsite was part of the campaign that helped send Anthony Edwards to the 2023 All-Star Game. Site has since been redirected.',
      techStack: ['NextJS', 'Tailwind', 'Airtable', 'Framer Motion', 'APIs'],
    },
    {
      image: pokedex,
      title: 'Pokedex',
      description:
        'Pokemon API data organized in a beautiful UI. Light/Dark mode toggle. Dynamic routes. Sleek animations.',
      techStack: ['SvelteKit', 'Tailwind', 'Pokemon API'],
      github: 'https://github.com/btramel/svelte-pokedex',
      link: 'https://svelte-pokedex-lovat.vercel.app/',
    },
    {
      image: medium,
      title: 'Medium Clone',
      description:
        'I built a mock Medium blogging platform to check out NextJS server-side rendering and incremental static regeneration. Likes and comments.',
      techStack: ['NextJS', 'TypeScript', 'Sanity', 'Tailwind'],
      github: 'https://github.com/btramel/blog',
      link: 'https://blog-btramel.vercel.app',
    },
  ]
  return (
    <div className='flex flex-col min-h-screen justify-center py-40'>
      <NumberedHeading number='.03' title="Things I've Built" />

      {/* mobile screens */}
      <div className='flex md:hidden flex-col gap-24'>
        {projects.map((project, i) => (
          <div key={i} className='flex flex-col text-white'>
            <div className={`py-4`}>
              <div className={`flex flex-col gap-4 h-[80%] w-full`}>
                <div className={`flex flex-col gap-1`}>
                  <div className={fonts.accent}>Featured Project</div>
                  <div className={`${fonts.primaryHeading} text-2xl`}>
                    {project.title}
                  </div>
                </div>
                <div className={`relative aspect-video z-3 rounded-xl `}>
                  <a
                    href={project.link}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Image
                      src={project.image}
                      alt='image'
                      className='rounded-lg'
                      fill
                    />
                  </a>
                </div>
                <div
                  className={`${fonts.base} w-full z-20 bg-[#011f38] p-6 aspect-4/5 rounded-md shadow-md shadow-black/70 leading-relaxed tracking-[.01rem]`}
                >
                  {project.description}
                </div>
                <ul className='flex flex-row gap-5 font-mono text-gray-400 text-sm z-4'>
                  {project.techStack.map((tech, i) => (
                    <li key={i}>{tech}</li>
                  ))}
                </ul>
                <div className='flex flex-row gap-6'>
                  {project.github ? (
                    <a
                      className='text-gray-200 cursor-none'
                      aria-label='GitHub'
                      title='GitHub'
                      target='_blank'
                      rel='noopener noreferrer'
                      href={project.github}
                    >
                      <FiGithub className='h-[20px] w-[20px]' />
                    </a>
                  ) : null}
                  {project.link ? (
                    <a
                      className='text-gray-200 cursor-none'
                      aria-label='External Link'
                      title='External Link'
                      target='_blank'
                      rel='noopener noreferrer'
                      href={project.link}
                    >
                      <FiExternalLink className='h-[20px] w-[20px]' />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* desktop screens */}
      <div className='hidden md:flex flex-col gap-24'>
        {projects.map((project, i) => (
          <div
            key={project.title}
            className='flex flex-col lg:grid lg:grid-cols-10 text-white'
          >
            {i % 2 !== 0 ? (
              <div
                className={`relative col-span-6 aspect-video z-3 rounded-xl `}
              >
                <a
                  href={project.link}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Image
                    src={project.image}
                    alt='image'
                    className='hover:translate-x-2 hover:translate-y-2 transition ease-in-out rounded-lg'
                    fill
                  />
                </a>
                <div className='bg-[#05BFDB] h-full w-full rounded-xl' />
              </div>
            ) : null}
            <div
              className={`py-4 col-span-4 ${
                i % 2 !== 0 ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`flex flex-col gap-4 ${
                  i % 2 !== 0 ? 'items-end' : 'items-start'
                } h-[80%] w-full`}
              >
                <div
                  className={`flex flex-col gap-1 ${
                    i % 2 !== 0 ? 'items-end' : 'items-start'
                  }`}
                >
                  <div className={fonts.accent}>Featured Project</div>
                  <div className={`${fonts.primaryHeading} text-2xl`}>
                    {project.title}
                  </div>
                </div>
                {i % 2 !== 0 ? (
                  <div
                    className={`relative col-span-6 aspect-video z-3 rounded-xl `}
                  >
                    <a
                      href={project.link}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Image
                        src={project.image}
                        alt='image'
                        className='hover:translate-x-2 hover:translate-y-2 transition ease-in-out rounded-lg'
                        fill
                      />
                    </a>
                    <div className='bg-[#05BFDB] h-full w-full rounded-xl' />
                  </div>
                ) : null}
                <div
                  className={`${fonts.base} w-full lg:w-[110%] ${
                    i % 2 !== 0 ? 'text-right' : 'text-left'
                  } z-20 bg-[#011f38] p-6 aspect-4/5 rounded-md shadow-md shadow-black/70 leading-relaxed tracking-[.01rem]`}
                >
                  {project.description}
                </div>
                <ul className='flex flex-row gap-5 font-mono text-gray-400 text-sm z-4'>
                  {project.techStack.map((tech, i) => (
                    <li key={i}>{tech}</li>
                  ))}
                </ul>
                <div className='flex flex-row gap-6'>
                  {project.github ? (
                    <a
                      className='text-gray-200 hover:text-[#05BFDB] cursor-none'
                      aria-label='GitHub'
                      title='GitHub'
                      target='_blank'
                      rel='noopener noreferrer'
                      href={project.github}
                    >
                      <FiGithub className='h-[20px] w-[20px]' />
                    </a>
                  ) : null}
                  {project.link ? (
                    <a
                      className='text-gray-200 hover:text-[#05BFDB] cursor-none'
                      aria-label='External Link'
                      title='External Link'
                      target='_blank'
                      rel='noopener noreferrer'
                      href={project.link}
                    >
                      <FiExternalLink className='h-[20px] w-[20px]' />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
            {i % 2 == 0 ? (
              <div
                className={`relative col-span-6 aspect-video z-3 rounded-xl `}
              >
                <a
                  href={project.link}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Image
                    src={project.image}
                    alt='image'
                    className='hover:-translate-x-2 hover:-translate-y-2 transition ease-in-out rounded-lg'
                    fill
                  />
                </a>
                <div className='bg-[#05BFDB] h-full w-full rounded-xl' />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

const Contact = ({ fonts }) => {
  return (
    <div className='h-full w-full flex flex-col items-center justify-center gap-4'>
      <div className='group w-1/2 flex flex-col items-start justify-start gap-6 text-left'>
        <h1 className={`${fonts.accent}`}>04. What&apos;s Next?</h1>
        <h2 className={`${fonts.primaryHeading} text-[2.25rem]`}>
          Don&apos;t Be Shy
        </h2>
        <p className={`${fonts.base} leading-relaxed tracking-[.01rem]`}>
          My inbox is open. I&apos;m always happy to answer a question or chat
          about code.
        </p>
        <Button
          to={
            'mailto:bradtramel@gmail.com?&subject=Hey Brad&body=Cool portfolio website!'
          }
        >
          Say Hello
        </Button>
      </div>
    </div>
  )
}
export default Home
