import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import 'typeface-poiret-one'
import Header from '../components/Header'

class Home extends PureComponent {
  render () {
    return (
      <>
        <Header />
      </>
    )
  }
}

Home.propTypes = {

}
const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps)(Home)
