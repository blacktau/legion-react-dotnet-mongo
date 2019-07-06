import React from 'react'
import AdminHeader from './AdminHeader'
import { Classes } from '@blueprintjs/core'

const AdminLayout = (props) => {
  return (
    <div className={Classes.DARK}>
      <AdminHeader />
      {props.children}
    </div>
  )
}

export default AdminLayout
