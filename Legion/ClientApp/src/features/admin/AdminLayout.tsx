import { AppBar, Divider, Drawer, IconButton, Link, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core'
import {
  Home as HomeIcon,
  Menu as MenuIcon,
  ExitToApp as ExitToAppIcon,
  VpnKey as VpnKeyIcon,
  CloudUpload as CloudUploadIcon,
  PhotoLibrary as PhotoLibraryIcon
} from '@material-ui/icons'
import { isAuthenticated, logout } from 'features/authentication/AuthenticationSlice'
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

interface AdminLayoutProps { children: JSX.Element | JSX.Element[] }

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const dispatch = useDispatch()
  const authenticated = useSelector(isAuthenticated)
  const history = useHistory()

  const handleLogout = useCallback(() => {
    dispatch(logout)
    history.push('/')
  }, [history, dispatch])

  const navigateTo = useCallback((path) => {
    setDrawerOpen(false)
    history.push(path)
  }, [history])

  return (
    <div>
      <AppBar position='static' color='primary'>
        <Toolbar variant='dense'>
          {authenticated && (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => setDrawerOpen(true)}
                edge="start">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
              Blacktau Photography Admin
              </Typography>
            </>
          )}
        </Toolbar>
      </AppBar>
      {authenticated && (
        <Drawer
          variant='temporary'
          anchor='left'
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}>
          <List component="nav">
            <ListItem button onClick={() => navigateTo('/admin')} >
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText>Home</ListItemText>
            </ListItem>
            <Divider />
            <ListItem button onClick={() => navigateTo('admin/photographs/manage')} >
              <ListItemIcon><PhotoLibraryIcon /></ListItemIcon>
              <ListItemText>Manage Photos</ListItemText>
            </ListItem>
            <ListItem button onClick={() => navigateTo('/admin/photographs/upload')} >
              <ListItemIcon><CloudUploadIcon /></ListItemIcon>
              <ListItemText>Upload</ListItemText>
            </ListItem>
            <Divider />
            <ListItem button onClick={() => navigateTo('/admin/change-password')} >
              <ListItemIcon><VpnKeyIcon /></ListItemIcon>
              <ListItemText>Change Password</ListItemText>
            </ListItem>
            <ListItem button onClick={handleLogout} >
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <ListItemText>Log-out</ListItemText>
            </ListItem>
          </List>
        </Drawer>)}
      {children}
    </div>
  )
}

export default AdminLayout
