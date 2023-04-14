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
// import DetailNews from './DetailNews'
import FavoriteCard from './FavoriteCard'

class Favorites extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            response: {},
            isSaved: true
        }
        this.handleDeleteClick = this.handleDeleteClick.bind(this)
    }
    
    handleDeleteClick() {
        this.setState(
            { isSaved: false },
            ()=> {
                console.log('successfully deleted')
            }
            )
    }
    componentDidMount() {
        // this.props.keyword
        // isGuardian
        // const favoriteStorage = JSON.parse(localStorage.getItem('myFavorite'))
        // console.log(favoriteStorage)
        // console.log(favoriteStorage.length)
    }
    
    render() {
        // console.log(this.props.match)
        // if (!this.state.response.results) {
        //     return <p>LOADING...</p>
        // }
        // console.log(this.props)
        const favoriteStorage = JSON.parse(localStorage.getItem('myFavorite'))
        console.log(favoriteStorage)
        if(favoriteStorage === null || favoriteStorage.length === 0){
            return(
                <h3 style={{textAlign: 'center'}}>You have no saved articles</h3>
            )
        }
        else{
            return (
                <div style={{paddingLeft: '15px', paddingRight: '15px', paddingTop: '10px'}}>
                    <h2>Favorites</h2>
                    <Row xs={1}>
                        {favoriteStorage.map((item, key) => {
                                return (
                                    <Col key={key} md={3}>
                                        <FavoriteCard
                                            key={key}
                                            id={item.id} 
                                            title={item.title}
                                            image={item.imageUrl}
                                            date={item.date}
                                            description={item.description}
                                            section={item.section}
                                            url={item.url}
                                            isGuardian={item.isGuardian}
                                            handleDeleteClick={this.handleDeleteClick}
                                            handle={this.props.handle}
                                        />
                                    </Col>
                                )
    
                        })}
                    </Row>
                </div>
            )
        }
    }
}

export default Favorites