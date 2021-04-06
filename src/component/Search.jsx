import React, { Component } from 'react'
import axios from 'axios'
import Item from './Item'
import { Paginator } from 'primereact/paginator';

export class Search extends Component {
    state={
        data : null,
        data2 : null,
        search: '' ,
        first: 0,
        rows: 9,
        lastIndex : 9
    }

    getData = () =>{
        axios.get('https://al-quran-8d642.firebaseio.com/data.json?print=pretty')
            .then(res=>{
                let hasil = res.data.filter(val=>{
                    return val.nama.toLowerCase().includes(this.props.location.search.split('=')[1].toLowerCase())
                })
                if(hasil.length === 0){
                    alert('Tidak ada')
                    this.setState({data:res.data, search:this.props.location.search.split('=')[1], first:0, lastIndex:9})
                }else{
                    this.setState({data : hasil, search:this.props.location.search.split('=')[1], first:0, lastIndex:9})
                }
            })
    }

    componentDidMount(){
        this.getData()
    }

    componentDidUpdate(){
        if(this.props.location.search.split('=')[1] !== this.state.search){
            this.getData()
        }
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
              <img src="https://wallpaperplay.com/walls/full/2/f/d/325748.jpg" className="d-block w-100 h-75" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                  <h1>Alqur'an Web</h1>
                  <p>Don't forget the Qur'an as a referral to life.</p>
              </div>
          </div>
      </div>
        <div className="body container-fluid bg-dark">
            <div className="row card-deck-wrapper">
                {
                    this.state.data.slice(this.state.first, this.state.lastIndex).map(val=>{
                    return <Item surah={val.nama} ayat={val.ayat} keterangan={val.keterangan} audio={val.audio} nomor={val.nomor} ></Item>
                    })
                }
            </div>
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
        )
    }
}

export default Search
