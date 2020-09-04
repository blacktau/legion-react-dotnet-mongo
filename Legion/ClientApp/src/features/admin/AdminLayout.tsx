import React from 'react'
import AdminHeader from './AdminHeader'
import { Classes } from '@blueprintjs/core'

interface AdminLayoutProps { children: JSX.Element | JSX.Element[] }

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className={Classes.DARK}>
      <AdminHeader />
      {children}
    </div>
  )
}

export default AdminLayout
