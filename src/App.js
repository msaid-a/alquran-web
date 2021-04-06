import React, { Component } from 'react'
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Navbar from './component/Navbar'
import Home from './component/Home'
import Detail from './component/Detail'
import Search from './component/Search';
import Footer from './component/Footer';

export class App extends Component {

  state={
    check : false
  }

  componentDidMount(){
    this.setState({check:true})
  }

  render() {
    if(this.state.check === false){
      return <h1>Loading</h1>
    }

    return (
    <BrowserRouter>
      <div>
          <Navbar></Navbar>
            <Route exact path="/" component={Home}></Route>
            <Route path="/surah/:nomor" component={Detail}></Route>
            <Route path="/search" component={Search}></Route>
          <Footer></Footer>
      </div>
      </BrowserRouter>
    )
  }
}

export default App
