// import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../../modules/auth/service'
import { collapseSidebar, uncollapseSidebar } from '../../layout/store/actions';
import { Icon } from 'antd';
// import components
import { Link } from 'react-router-dom'
import { Navbar, NavbarToggler } from 'reactstrap';
import PrivateHeader from './PrivateHeader'
import PublicHeader from './PublicHeader'

class Navigation extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    layout: PropTypes.string.isRequired,
  }
  
  constructor(props) {
    super(props)
    
    this.state = {
      showNavigation: false,
      showDropdown: false,
    }
  
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.logout = this.logout.bind(this);
  }
  
  toggleNavbar() {
    this.setState({
      showNavigation: !this.state.showNavigation,
    });
  }
  
  toggleDropdown() {
    this.setState({
      showDropdown: !this.state.showDropdown,
    })
  }
  
  logout(e) {
    e.preventDefault()
    
    this.props.dispatch(logout())
  }
  handleLayoutChange = () => {
    if(this.props.layout.sidebarCollapsed){
      return this.props.dispatch(uncollapseSidebar())
    }
    return this.props.dispatch(collapseSidebar())
  } 
  
  render() {
    return (
      <Navbar className="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
        <span onClick={this.handleLayoutChange}><Icon type="menu" /></span>
        <Link to="/" className="navbar-brand">MOEEN.ME</Link>
        <NavbarToggler className="navbar-toggler d-lg-none" onClick={this.toggleNavbar} />
        {
          this.props.isAuthenticated
            ? <PrivateHeader user={this.props.user}
                             showNavigation={this.state.showNavigation}
                             toggleDropdown={this.toggleDropdown}
                             showDropdown={this.state.showDropdown}
                             logout={this.logout} />
            : <PublicHeader showNavigation={this.state.showNavigation} />
        }
      </Navbar>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.user,
    layout: state.layout,
  }
}

export default connect(mapStateToProps)(Navigation)
