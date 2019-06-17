import React from 'react'
import Header from './Header'
import { Classes } from '@blueprintjs/core'

const AdminLayout = (props) => {
  return (
    <div className={Classes.DARK}>
      <Header />
      {props.children}
    </div>
  )
}

export default AdminLayout
