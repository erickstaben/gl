import Model from '../../utils/Model'

class User extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    this.name = props.name || ''
    this.email = props.email || ''
    this.phone = props.phone || ''
    this.about = props.about || ''
    this.authority = props.authority || 'admin' //change to guest on prod
  }
}

export default User
