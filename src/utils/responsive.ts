import { useMediaQuery } from 'react-responsive'

const R = () => {
  const xxs  = useMediaQuery({ query: '(min-width:320px)' })
  const xs  = useMediaQuery({ query: '(min-width:481px)' })
  const s  = useMediaQuery({ query: '(min-width:641px)' })
  const m  = useMediaQuery({ query: '(min-width:961px)' })
  const l  = useMediaQuery({ query: '(min-width:1025px)' })
  const xl  = useMediaQuery({ query: '(min-width:1281px)' })

  return [xxs, xs, s, m, l, xl]
}

export default R
