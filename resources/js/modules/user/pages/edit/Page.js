// import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import ReeValidate from 'ree-validate'
import { dispatcher } from '../../../../store/actions'
// import components
import Form from './components/Form'
import { Button } from 'antd';

class Page extends Component {    
  constructor(props) {
    super(props)
    this.validator = new ReeValidate({
      'name': 'required|min:3',
      'email': 'required|email',
      'phone': 'min:8|numeric',
      'about': 'min:10|max:1024',
    })    
    
    this.state = {
      user: this.props.user.toJson(),
      errors: this.validator.errors
    }
  }

  static displayName = 'User_config_page'
  static propTypes = {
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    savingInProgress: PropTypes.bool,
  } 

  static getDerivedStateFromProps(props,state){
    const user = props.user.toJson()
    
    if (!_.isEqual(state.user, user)) {
      return {...state, user}
    }
    return state
  }
  
  handleChange = (name,value) => {
    const { errors } = this.validator
    
    this.setState({ user: { ...this.props.user, [name]: value} })
    
    errors.remove(name)
    
    this.validator.validate(name, value)
      .then(() => {
          this.setState({ errors })
      })
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    const user = this.state.user
    const { errors } = this.validator
    
    this.validator.validateAll(user)
      .then((success) => {
        if (success) {
          this.submit(user)
        } else {
          this.setState({ errors })
        }
      })
  }
  
  submit = (user) => {
    this.props.dispatch(dispatcher({ 
      params: user,
      path: `users/${user.id}`,
      action: 'userUpdate',
      method: `PATCH`
    })).catch(({ error, statusCode }) => {
        const { errors } = this.validator
        
        if (statusCode === 422) {
          _.forOwn(error, (message, field) => {
            errors.add(field, message);
          });
        }
        
        this.setState({ errors })
      })
  }
  
  render = () => {
    return <main className="col-sm-9 ml-sm-auto col-md-10 pt-3" role="main">
      <h1>Profile</h1>
      {this.props.savingInProgress && <h1>Salvando...</h1>}
      <section className="row">
        <div className="col-12 col-md-9 col-sm-12">
          <Form {...this.state}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}/>
        </div>
        <Button>Oi</Button>
      </section>
    </main>
  }
}

export default Page
