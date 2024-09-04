import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useAnimation } from 'framer-motion'

export const useOnInView = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({ triggerOnce: true })

  useEffect(() => {
    if (inView) {
      controls.start('show')
    } else {
      controls.start('hidden')
    }
  }, [controls, inView])
  return { ref, controls, inView }
}
