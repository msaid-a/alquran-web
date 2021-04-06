import React, { Component } from 'react'
import axios from 'axios'
import Item from './Item'
import { Paginator } from 'primereact/paginator';

import Header from '../lib/header.jpg'


 class Home extends Component {
    state={
        data : null,
        first: 0,
        rows: 9,
        lastIndex : 9
    }

    getData = () =>{
        axios.get('https://al-quran-8d642.firebaseio.com/data.json?print=pretty')
            .then(res=>{
                this.setState({data : res.data})
            })
    }

    componentDidMount(){
        this.getData()
    }

    onPageChange(event) {
        this.setState({
            first: event.first,
            rows: event.rows,
            lastIndex : event.first + event.rows
        });
    }

    render() {
        if(this.state.data === null){
                return <div className="d-flex justify-content-center" style={{marginTop:'25vh', marginBottom:'25vh'}}>
                    <div className="spinner-grow text-warning" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-info" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-danger" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>

        }
        return (
            <div>
      <div id="carouselExampleSlidesOnly" className="carousel slide mt-lg-0 mt-5" data-ride="carousel">
      <div className="carousel-inner">
          <div className="carousel-item active">
              <img src={Header} className="d-block w-100 h-75" alt="..." />
              <div className="carousel-caption d-none d-md-block mt-lg-0">
                  <h1 className="mt-lg-0 mt-md-5">Alqur'an Web</h1>
                  <p>Don't forget the Qur'an as a referral to life.</p>
              </div>
          </div>
      </div>
        <div className="body container-fluid bg-dark">
            <div className="row card-deck-wrapper mb-5 mx-lg-0 mx-4">
                {
                    this.state.data.slice(this.state.first, this.state.lastIndex).map(val=>{
                    return <Item surah={val.nama} ayat={val.ayat} keterangan={val.keterangan} audio={val.audio} nomor={val.nomor} ></Item>
                    })
                }
            </div>
            <Paginator
						first={this.state.first}
						rows={this.state.rows}
						totalRecords={this.state.data.length}
						rowsPerPageOptions={[10, 20, 30]}
                        onPageChange={(e)=>this.onPageChange(e)}
                        template='FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink'
                        

					/>
        </div>

      </div>
  
            </div>
        )
    }
}

export default Home
