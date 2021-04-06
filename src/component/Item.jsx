import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import {Link} from 'react-router-dom'
  import ReactAudioPlayer from 'react-audio-player';



export class Item extends Component {
    render() {

        return (
                    <Card className="col-12 col-lg-3 mt-5  m-lg-5 p-2" style={{minWidth:'200px'}}>
                        <CardBody>
                            <CardTitle className="h3 text-danger">{this.props.surah}</CardTitle>
                            <CardSubtitle className="text-secondary">Jumlah Ayat : {this.props.ayat}</CardSubtitle>
                            <CardText>{this.props.keterangan.replace(/['<i>','</i>']/g,'').slice(0,100)}<Link to={`/surah/${this.props.nomor}`}>...ReadMore</Link></CardText>
                            <ReactAudioPlayer className="w-100"
                                src={this.props.audio}
                                controls
                                />

                        </CardBody>
                    </Card>
        )
    }
}

export default Item
