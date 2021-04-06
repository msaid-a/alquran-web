import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './style.css'
class Navbar extends Component {

    state={
        search:''
    }
    render() {
        return (
            <div>
                <div className="col-12 navbar text-white navbar-custom fixed-top d-flex">
                    <Link className="font-navbar-custom h1 text-white" to="/">Alqur'an Web</Link>
                    <form onSubmit={e=>  e.preventDefault() } className="form-inline">
                        <div className=" form-group mx-sm-3 mb-2">
                             <input className="form-control-plaintext bg-white p-1 " onEnter={<Link to={"/search?surat="+this.state.search}  onClick={this.search}>Search</Link>} placeholder="Search Surat" onChange={text=>{this.setState({search:text.target.value})}}></input>
                        </div>
                        <Link className="btn btn-dark mb-2" to={"/search?surat="+this.state.search}  onClick={this.search}>Search</Link>
                    </form>
                </div>
            </div>
        )
    }
}

export default Navbar
