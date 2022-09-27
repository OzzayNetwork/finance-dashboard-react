import React, { Component } from 'react'



class ErrorBoundary extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         hasError:false
      }
    }
    static getDerivedStateFromErrror(error){
        return{
            hasError: true
        }
    }

    componentDidCatch(error,info){
        console.log(error)
        console.log(info)
    }

   

  render() {
    if(this.state.hasError){
        return(
          <>
            <div className="container">
              <div className="row">
                  <div className="col-12 h-100 d-flex align-items-center justiify-content-center">
                      <h1>Something went wrong</h1>
                      <button className="btn btn-primary" onClick={window.location.reload()}>Refresh Page</button>
                  </div>
              </div>
            </div>
          </>
        )
    }
    return this.props.children
  }
}

export default ErrorBoundary