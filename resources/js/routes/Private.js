import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import { getAuthorityLevel } from '../utils/functions'

const PrivateRoute = ({ component: Component, isAuthenticated, authority, ...rest }) => {
  const userAuthority = getAuthorityLevel(useSelector(state => state.user.authority))
  return <Route {...rest} render={props => (
    isAuthenticated
      ? (userAuthority >= getAuthorityLevel(authority)) ? <Component {...props}/> : <NoAuthority/>
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location },
      }}/>
  )}/>
  
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  authority: PropTypes.string,
}

const NoAuthority = () => {
  return <div>Você não tem autorização para acessar essa rota</div>
}

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    isAuthenticated: store.auth.isAuthenticated,
  }
}

export default connect(mapStateToProps)(PrivateRoute)
