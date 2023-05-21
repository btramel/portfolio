/* eslint-disable react/prop-types */
import React from 'react'
// import { Link } from 'react-scroll'
import Image from 'next/legacy/image'
// import { useOnInView } from '/utils/useOnInView'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(faClose)

const MobileNav = ({
  logo,
  logoColor,
  logoUrl,
  navItems,
  theme,
  handleMobileMenu,
  children,
}) => {
  // animation refs & controls
  // const { ref: navRef, controls: navControls } = useOnInView()

  const textStyle =
    theme === 'brad' &&
    'font-mono font-normal font-extrabold text-[20px] no-underline hover:no-underline'

  return (
    <motion.nav
      // ref={navRef}
      className='fixed z-front flex h-screen w-screen items-center justify-center bg-wolvesMidnight p-12 font-futuraCond text-3xl font-extrabold uppercase italic tracking-wider text-wolvesFrost'
      initial='hidden'
    >
      <a
        href={logoUrl ? logoUrl : 'https://www.nba.com/timberwolves'}
        target={'_blank'}
        rel={'noreferrer'}
      >
        <div
          className={`${
            logo ? 'aspect-[13/4] p-3' : 'aspect-square p-6'
          } absolute top-0 left-0 h-[3rem] hover:scale-90 transition-all duration-300`}
        >
          <Image
            src={
              logo
                ? logo
                : logoColor === 'black'
                ? '/timberwolves/images/logo/Wolves_Primary_Black.png'
                : logoColor === 'white'
                ? '/timberwolves/images/logo/Wolves_Primary_White.png'
                : logoColor === 'bw'
                ? '/timberwolves/images/logo/Wolves_Primary_BW.png'
                : '/timberwolves/images/logo/Wolves_Primary_Color.png'
            }
            alt='Timberwolves Logo'
            layout={'responsive'}
            width={logo ? 60 : 20}
            height={20}
          />
        </div>
      </a>
      <button
        className='absolute top-0 right-2 p-2 text-wolvesFrost'
        onClick={handleMobileMenu}
      >
        <FontAwesomeIcon icon={faClose} className='w-5' />
      </button>
      <ul className='show mx-auto my-auto flex max-w-6xl flex-col items-center justify-around sm:hidden'>
        {navItems.map((item) => (
          <li
            key={item.name}
            className={`${textStyle} cursor-pointer py-[12px] uppercase text-wolvesFrost`}
          >
            <a href={item.link} onClick={handleMobileMenu}>
              {item.name}
            </a>
          </li>
        ))}
        {children}
      </ul>
    </motion.nav>
  )
}

export default MobileNav
