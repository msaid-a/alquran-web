import React, { Component } from 'react'
import axios from 'axios'
import ReactAudioPlayer from 'react-audio-player';

class Detail extends Component {

    state={
        data : null,
        data2 : null
    }

    getData = () =>{
        axios.get(`https://al-quran-8d642.firebaseio.com/surat/${this.props.match.params.nomor}.json?print=pretty`)
            .then(res=>{
                this.setState({data : res.data})
                console.log(this.state.data)
            })
            axios.get('https://al-quran-8d642.firebaseio.com/data.json?print=pretty')
                .then(res=>{
                    this.setState({data2 : res.data[this.props.match.params.nomor - 1]})
                    console.log(this.state.data2)
                })
    }

    componentDidMount(){
        this.getData()
    }

    render() {
        if(this.state.data===null || this.state.data2 ===null){
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
            <div className="container" style={{marginTop:100}}>
                <div className="row">
                    <div className="col-12 col-lg-3 h-100 border rounded py-4 mb-5">
                        <h4>{this.state.data2.nama}</h4>
                        <ReactAudioPlayer className="w-100"
                                src={this.state.data2.audio}
                                controls
                                />
                        <p>Diturunkan di {this.state.data2.type}</p>
                        <p>Jumlah Ayat :{this.state.data2.ayat}</p>
                        <p>{this.state.data2.keterangan.replace(/['<i>','</i>']/g,'')}</p>
                    </div>
                    <div className="col-12 col-lg-8 h-100 border rounded ml-lg-4 py-3 mb-5">
                        {this.state.data.map(val =>{
                            return (<div>
                                <h2 className="mt-3 font-arab">{val.ar}</h2>
                                <h5 className="mt-3">{val.id}</h5>
                                </div>)
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail
