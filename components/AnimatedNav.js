/* eslint-disable react/prop-types */
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import React from 'react'
import MobileNav from './MobileNav'
library.add(faBars)

const Nav = ({ fonts, navItems, active, setActive }) => {
  const [showMobile, setShowMobile] = useState(false)
  const handleMobileMenu = () => {
    setShowMobile(!showMobile)
  }
  const motionContainer = {
    hidden: {
      opacity: 0,
      y: -10,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: 'easeOut',
        staggerChildren: 0.15,
        duration: 0.3,
      },
    },
  }
  const child = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { ease: 'anticipate', duration: 0.4 },
    },
  }

  return (
    <nav className=' cursor-none fixed z-40 flex w-full h-[4rem] items-center justify-between bg-[#0B192E] py-6 px-[40px]'>
      <div
        className={fonts.accent}
        style={{
          fontSize: 'clamp(14px, 5vw, 24px)',
        }}
      >
        B
      </div>
      <motion.ul
        variants={motionContainer}
        initial='hidden'
        animate='show'
        className='hidden max-w-6xl flex-row gap-4 px-2 sm:visible sm:flex cursor-none'
      >
        {navItems.map((item) => (
          <a
            onClick={() => setActive(item.link)}
            key={item.name}
            className='relative py-1 text-white transition-all hover:no-underline cursor-none'
            href={`#${item.link}`}
          >
            <motion.li
              variants={child}
              className={`${fonts.accent} font-sans no-underline hover:no-underline hover:cursor-none px-4`}
              style={{
                fontSize: 'clamp(10px, 1.5vw, 14px)',
              }}
            >
              {active === item.link && (
                <motion.div
                  layoutId='pill'
                  style={{ borderRadius: 9999 }}
                  className='absolute inset-0 bg-[#05BFDB]'
                  transition={{ duration: 0.4, type: 'spring' }}
                ></motion.div>
              )}
              <span
                className={`${
                  active === item.link
                    ? 'text-[#0B192E]'
                    : 'hover:text-gray-300'
                } relative z-10 font-mono`}
              >
                <div className='flex flex-row gap-1'>
                  <div
                    className={`${
                      active === item.link
                        ? 'text-[#0B192E]'
                        : 'hover:text-gray-300 text-[#05BFDB]'
                    }`}
                  >
                    {item.key}
                  </div>
                  <div
                    className={`${
                      active === item.link
                        ? 'text-[#0B192E]'
                        : 'hover:text-gray-300 text-gray-400 '
                    } capitalize`}
                  >
                    {item.name}
                  </div>
                </div>
              </span>
            </motion.li>
          </a>
        ))}
      </motion.ul>
      <button
        className='absolute top-0 right-0 flex flex-row p-6 text-[#05BFDB] sm:hidden'
        onClick={handleMobileMenu}
      >
        <FontAwesomeIcon
          icon={faBars}
          className='flex w-6 items-center justify-center'
        />
      </button>
      {1 + 1 == 3 && showMobile && (
        <MobileNav
          navItems={navItems}
          handleMobileMenu={handleMobileMenu}
          theme='brad'
        />
      )}
    </nav>
  )
}
export default Nav
