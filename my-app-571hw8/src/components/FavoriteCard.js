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
import { ToastContainer, toast, Slide, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal'
import Nav from 'react-bootstrap/Nav'
import { Link, Redirect } from 'react-router-dom';
// import DetailNews from './DetailNews'
import { MdDelete } from "react-icons/md";

class FavoriteCard extends React.Component {
    // const test = async () => {
    //     const data = await axios.get('http://localhost:3030/newsapi')
    //     console.log(data)
    // }
    // const gettest = test()
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            setShow: false,
            isSaved: true
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }
    
    handleClick() {
        // console.log('card clicked!')
        // console.log(`/artical?id=${this.props.url}`)
        // console.log(this.props.url)
        window.location.href="/article?id="+this.props.url
        const linkUrl = "/article_id="+this.props.url
        // return(
        //     <div>
        //         <Nav.Link as={Link} to={linkUrl} />           
        //     </div>
        // )
    }
    
    handleDelete() {
        this.props.handleDeleteClick()
        const storage = localStorage.getItem('myFavorite')
        let arr = []
        for(let i=0; i<(JSON.parse(storage)).length; i++){
            arr.push((JSON.parse(storage))[i])
        }
        let newArr = []
        for(let i=0; i<(JSON.parse(storage)).length; i++){
            if((JSON.parse(storage))[i].title !== this.props.title){
                newArr.push((JSON.parse(storage))[i])
            }
        }
        console.log(newArr.length)
        console.log(newArr)
        localStorage.setItem('myFavorite', JSON.stringify(newArr))
        toast('Removing - ' + this.props.title, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: true,
            autoClose: 2000,
            closeOnClick: false,  
            draggable: false,
            transition: Zoom,
            hideProgressBar: true,
            pauseOnHover: false,
            className: 'toast-text'
        })
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
            else if(sectionString === 'GUARDIAN'){
                return <Badge className='badge-guardian'>{props.section}</Badge>
            }
            else if(sectionString === 'NYTIMES'){
                return <Badge className='badge-nytimes'>{props.section}</Badge>
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
        console.log(this.props.handle)
        return (

            <div>
                <Link 
                    to={this.props.id === undefined ? ("/article?id="+this.props.url) : ("/article?id="+this.props.id)}
                    // bsPrefix ='shadow p-3 mb-5 bg-white rounded'
                    className='news-card-text'
                    // style={{ width: '98%', margin: 'auto', cursor: 'pointer' }}
                    onClick={()=> {this.props.handle(); console.log('onclick triggered')}}
                >
                <Card 
                    bsPrefix ='shadow p-3 mb-5 bg-white rounded'
                    style={{ margin: 'auto', cursor: 'pointer' }}
                    className={'small-card-border'}
                    // onClick={this.handleClick}
                >
                    <Card.Body>
                        <Row>
                        <Card.Title>
                            {this.props.title}
                            <MdShare onClick={(e)=>{ this.setState({show: true}); e.stopPropagation(); e.preventDefault() }} />
                            <MdDelete onClick={(e)=> {e.stopPropagation(); e.preventDefault(); this.setState({isSaved: false}); this.handleDelete(); } } />
                            <ShowShare 
                                show={this.state.show} 
                                onHide={(e)=>{ this.setState({show: false}) }} 
                                title={this.props.title}
                                url={this.props.url}   
                            />
                        </Card.Title> 
                        </Row>
                        <Row>
                            <Card.Img bsPrefix='img-thumbnail' src={this.props.image} />
                        </Row>
                        <Row>
                            <Col>
                                <Card.Text>{this.props.date}</Card.Text>
                            </Col>
                            <Col style={{ textAlign: 'right' }}>
                                <NewBadge section={this.props.section} />
                                <NewBadge section={this.props.isGuardian ? 'GUARDIAN' : 'NYTIMES' } />
                            </Col>
                        </Row>
                    </Card.Body>
                    
                </Card>
                </Link>
            </div>
        )
    }
}

export default FavoriteCard