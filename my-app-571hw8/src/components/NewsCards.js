import React from 'react'
import '../style.css'
import Card, { CardBody } from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import axios from 'axios'
import {EmailShareButton, FacebookShareButton, TwitterShareButton} from "react-share";
import {EmailIcon, FacebookIcon, TwitterIcon,} from "react-share";
import {MdShare} from "react-icons/md"
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal'
import Nav from 'react-bootstrap/Nav'
import { Link, Redirect } from 'react-router-dom';
import DetailNews from './DetailNews'

class NewsCard extends React.Component {
    // const test = async () => {
    //     const data = await axios.get('http://localhost:3030/newsapi')
    //     console.log(data)
    // }
    // const gettest = test()
    constructor() {
        super()
        this.state = {
            show: false,
            setShow: false,
            toUrl: null
        }
        this.handleClick = this.handleClick.bind(this)
    }
    
    handleClick() {
        // console.log('card clicked!')
        // console.log(`/artical?id=${this.props.url}`)
        // console.log(this.props.url)
        if(this.props.id === undefined) {
            // window.location.href="/article?id="+this.props.url
            const linkUrl = "/article_id="+this.props.url
            this.setState({ toUrl: linkUrl })
        }
        else{
            window.location.href="/article?id="+this.props.id
            const linkUrl = "/article?id="+this.props.id
            this.setState({ toUrl: linkUrl })
        }
        // return(
        //     <div>
        //         <Nav.Link as={Link} to={linkUrl} />           
        //     </div>
        // )
    }

    render() {
        function NewBadge(props) {
            const sectionString = props.section;
            if (sectionString === 'WORLD') {
              return <Badge className='badge-world'>{props.section}</Badge>
            //   variant='primary'
            } 
            else if(sectionString === 'POLITICS') {
                return <Badge className='badge-politics'>{props.section}</Badge>
            }
            else if(sectionString === 'BUSINESS') {
                return <Badge className='badge-business'>{props.section}</Badge>
            }
            else if(sectionString === 'TECHNOLOGY') {
                return <Badge className='badge-technology'>{props.section}</Badge>
            }
            else if(sectionString === 'SPORTS') {
                return <Badge className='badge-sports'>{props.section}</Badge>
            }
            else {
                return <Badge className='badge-any-other'>{props.section}</Badge>
            }
        }

        function ShowShare(props) {
            return(
                <div>
                    <Modal show={props.show} onHide={props.onHide} onClick={(e) => {e.stopPropagation()}}>
                        <Modal.Header closeButton>
                            <Modal.Title>{props.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='share-content-share-via'>
                            <Modal.Title>Share via</Modal.Title>
                            <Row>
                                <Col>
                                    <FacebookShareButton url={props.url} hashtag='#CSCI_571_NewsApp'>
                                        <FacebookIcon size={60} round={true} />
                                    </FacebookShareButton>
                                </Col>
                                <Col>
                                    <TwitterShareButton url={props.url} hashtags={['CSCI_571_NewsApp']}>
                                        <TwitterIcon size={60} round={true} />
                                    </TwitterShareButton>
                                </Col>
                                <Col>
                                    <EmailShareButton url={props.url} subject='#CSCI_571_NewsApp'>
                                        <EmailIcon size={60} round={true} />
                                    </EmailShareButton>
                                </Col>
                            </Row> 
                        </Modal.Body>
                    </Modal> 
                </div>
            )
        }

        return (
            <div style={{marginTop: '30px',paddingLeft: '15px', paddingRight: '15px'}}>
                {/* <Card 
                    to={"/article_id="+this.props.url}
                    bsPrefix ='shadow p-3 mb-5 bg-white rounded'
                    style={{ width: '98%', margin: 'auto', cursor: 'pointer' }}
                    onClick={this.handleClick}
                > */}
                {/* <Card bsPrefix ='shadow p-3 mb-5 bg-white rounded'
                    style={{ width: '98%', margin: 'auto', cursor: 'pointer' }}> */}
                <Link 

                    to={this.props.id === undefined ? ("/article?id="+this.props.url) : ("/article?id="+this.props.id)}
                    // bsPrefix ='shadow p-3 mb-5 bg-white rounded'
                    className='news-card-text'
                    // style={{ width: '98%', margin: 'auto', cursor: 'pointer' }}
                    // onClick={this.handleClick}
                    onClick={this.props.nctodetail}
                >
                    <Card
                        bsPrefix ='shadow p-3 mb-5 bg-white rounded'
                        style={{ margin: 'auto', cursor: 'pointer',
                                border: '1px solid #e4e4e4'}}
                    >
                    <Row>
                        <Col xs={12} md={3}>
                            <Card.Img bsPrefix='img-thumbnail' src={this.props.image} />
                        </Col>
                        <Col>
                            <Card.Body>
                                <Row className='title-description'>
                                    <Col>
                                        <Card.Title>
                                            {this.props.title}
                                            <MdShare onClick={(e)=>{ this.setState({show: true}); e.stopPropagation(); e.preventDefault() }} />
                                            <ShowShare 
                                                show={this.state.show} 
                                                onHide={(e)=>{ this.setState({show: false}) }} 
                                                title={this.props.title}
                                                url={this.props.url}   
                                            />
                                        </Card.Title> 
                                    </Col>
                                </Row>
                                <Row className='title-description'>
                                    <Col>
                                        <Card.Text className='description-ellipsis'>{this.props.description}</Card.Text>
                                    </Col>
                                    {/* add space between description and date */}
                                    <br></br> 
                                    <br></br>
                                </Row>
                                <Row>
                                    <Col>
                                        <Card.Text>
                                            {this.props.date}
                                            <NewBadge section={this.props.section} />
                                        </Card.Text>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Col>
                    </Row>
                    </Card>
                </Link>
                {/* </Card> */}
                {/* </Card> */}
            </div>
        )
    }
}

export default NewsCard