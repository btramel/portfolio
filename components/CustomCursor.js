import React, { useEffect, useRef } from 'react'

const CustomCursor = () => {
  const mainCursor = useRef(null)
  const secondaryCursor = useRef(null)
  const positionRef = useRef({
    mouseX: 0, // current position
    mouseY: 0,
    destinationX: 0,
    destinationY: 0,
    distanceX: 0, // between current and destination
    distanceY: 0,
    key: -1,
  })

  // logic for logging mouse position values //
  useEffect(() => {
    document.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e
      const mouseX = clientX
      const mouseY = clientY

      positionRef.current.mouseX =
        mouseX - secondaryCursor.current.clientWidth / 2
      positionRef.current.mouseY =
        mouseY - secondaryCursor.current.clientHeight / 2

      mainCursor.current.style.transform = `translate3d(${
        mouseX - mainCursor.current.clientWidth / 2
      }px, ${mouseY - mainCursor.current.clientHeight / 2}px, 0)`
    })
    return () => {}
  }, [])

  // logic for cursor follow
  useEffect(() => {
    const followMouse = () => {
      positionRef.current.key = requestAnimationFrame(followMouse)
      const {
        mouseX,
        mouseY,
        destinationX,
        destinationY,
        distanceX,
        distanceY,
      } = positionRef.current

      // checking for a current position (start of user session)
      if (!destinationX | !destinationY) {
        positionRef.current.destinationX = mouseX
        positionRef.current.destinationY = mouseY
      } else {
        positionRef.current.distanceX = (mouseX - destinationX) * 0.2
        positionRef.current.distanceY = (mouseY - destinationY) * 0.2

        // checking for negative values
        if (
          Math.abs(positionRef.current.distanceX) +
            Math.abs(positionRef.current.distanceY) <
          0.1
        ) {
          positionRef.current.destinationX = mouseX
          positionRef.current.destinationY = mouseY
        } else {
          positionRef.current.destinationX += distanceX
          positionRef.current.destinationY += distanceY
        }
      }
      secondaryCursor.current.style.transform = `translate3d(${destinationX}px, ${destinationY}px, 0 )`
    }
    followMouse()
  }, [])

  return (
    <div>
      <div
        className='main-cursor invisible sm:visible rounded-full pointer-events-none fixed z-50 h-[1rem] w-[1rem] overflow-hidden bg-white bg-contain bg-no-repeat'
        style={{
          transform: 'translate3d(0, 0, 0)',
        }}
        ref={mainCursor}
      ></div>
      <div
        className='secondary-cursor rounded-full bg-[#05BFDB] pointer-events-none fixed z-50 h-[.75rem] w-[.75rem] overflow-hidden bg-contain bg-center bg-no-repeat'
        style={{
          transform: 'translate3d(0, 0, 0)',
        }}
        ref={secondaryCursor}
      />
    </div>
  )
}

export default CustomCursor
