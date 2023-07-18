import { useRouter } from 'next/dist/client/router'
import { React, useEffect, useRef, useState } from 'react'

const UTMWrapper = ({ href, children, defaults }) => {
  const [params, setParams] = useState()
  const router = useRouter()
  const queryString = useRef('string')

  // side effect parses url to find UTM parameters
  useEffect(() => {
    let params = router.query
    let string = ''
    // for each parameter, add it to string
    for (let i = 0; i < Object.keys(params).length; i++) {
      if (i !== 0) {
        string += '&' + Object.keys(params)[i] + '=' + Object.values(params)[i]
      } else
        string += '?' + Object.keys(params)[i] + '=' + Object.values(params)[i]
    }
    queryString.current = string
    setParams(params)
  }, [router.query])

  // if there are no query parameters, add defaults to link; otherwise add query parameters to link
  const utm =
    queryString.current == '' && defaults !== undefined
      ? href + defaults
      : href + queryString.current

  return (
    <a
      href={utm}
      target='_blank'
      rel='noopener noreferrer'
      className='hover:no-underline'
    >
      {children}
    </a>
  )
}

export default UTMWrapper
