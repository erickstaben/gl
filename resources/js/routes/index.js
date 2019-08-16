// import libs
import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
// import components
import routes from './routes'
import PrivateRoute from './Private'
import PublicRoute from './Public'
import Layout from '../layout'

const Routes = () => {
  const getRoutes = (availableRoutes) => {
    return availableRoutes.map(route => {
      if(route.routes){
        return getRoutes(route.routes)
      }
      else {
        if (route.auth) {
          return <PrivateRoute key={route.path} {...route} />
        }
        return <PublicRoute key={route.path} {...route} />
      }
    })
  }
  return (
    <Router>
      <Layout>
        <Switch>
          {getRoutes(routes)}
        </Switch>
      </Layout>
    </Router>
  )
}

export default Routes
