/* eslint-disable react/prop-types */
import React from "react";
// import { Link } from 'react-scroll'
// import { useOnInView } from '/utils/useOnInView'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faClose, faX } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
library.add(faClose);

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MobileNav = ({ navItems, handleMobileMenu }) => {
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3, delay: 0.2 },
    },
  };

  const menuVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 300,
      },
    },
    exit: {
      x: "100%",
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 300,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.08,
        duration: 0.4,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    }),
  };

  const mockNavItems = [
    { name: "About", link: "about", key: ".01" },
    { name: "Experience", link: "experience", key: ".02" },
    { name: "Projects", link: "projects", key: ".03" },
    { name: "Contact", link: "contact", key: ".04" },
  ];

  const items = navItems || mockNavItems;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <motion.div
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={handleMobileMenu}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Menu Panel */}
      <motion.nav
        variants={menuVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-[#0B192E] shadow-2xl"
      >
        {/* Close Button */}
        <motion.button
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          onClick={handleMobileMenu}
          className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-[#05BFDB]/10 text-[#05BFDB] transition-all hover:bg-[#05BFDB]/20 active:scale-95"
          aria-label="Close menu"
        >
          <FontAwesomeIcon icon={faX} className="h-5 w-5" />
        </motion.button>

        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="px-8 pt-7 pb-12"
        >
          <div className="text-5xl font-bold font-mono text-[#05BFDB]">B</div>
        </motion.div>

        {/* Navigation Items */}
        <div className="px-6">
          <ul className="space-y-2">
            {items.map((item, i) => (
              <motion.li
                key={item.name}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <a
                  href={`#${item.link}`}
                  onClick={handleMobileMenu}
                  className="group relative flex items-center gap-4 rounded-xl px-4 py-4 transition-all hover:bg-[#05BFDB]/5"
                >
                  {/* Number Indicator */}
                  <span className="font-mono text-sm text-[#05BFDB] transition-all group-hover:translate-x-1">
                    {item.key}
                  </span>

                  {/* Item Name */}
                  <span className="text-lg font-medium text-white transition-all capitalize group-hover:translate-x-1">
                    {item.name}
                  </span>

                  {/* Hover Indicator */}
                  <motion.div
                    className="absolute right-4 h-1.5 w-1.5 rounded-full bg-[#05BFDB] opacity-0 group-hover:opacity-100"
                    initial={false}
                    transition={{ duration: 0.2 }}
                  />
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Footer/Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="absolute bottom-0 left-0 right-0 border-t border-white/5 p-6"
        >
          <p className="font-mono text-xs text-gray-400">
            Let&apos;s build something together
          </p>
          <a
            href="mailto:bradtramel@gmail.com"
            className="mt-2 inline-block font-mono text-sm text-[#05BFDB] hover:underline"
          >
            Get in touch →
          </a>
        </motion.div>

        {/* Decorative Element */}
        <div className="absolute top-1/2 -left-20 h-40 w-40 rounded-full bg-[#05BFDB]/5 blur-3xl" />
      </motion.nav>
    </div>
  );
};

export default MobileNav;
