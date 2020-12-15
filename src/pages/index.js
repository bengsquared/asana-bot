import * as React from 'react'

// import Menu from '../components/Menu'
import WebhooksPage from "../scenes/webhooks"

import useBreakpoint from '../hooks/useBreakpoint'

export default function HomeScene() {
  const [isClosed, setClosed] = React.useState(true)

  const isStatic = useBreakpoint('sm')

  return (
    // <Menu isStatic={isStatic} isClosed={isClosed} setClosed={setClosed}>
      <WebhooksPage />
    // </Menu>
  )
}