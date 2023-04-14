import React from 'react'
import '../style.css'
import Card, { CardBody } from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import {EmailShareButton, FacebookShareButton, TwitterShareButton} from "react-share";
import {EmailIcon, FacebookIcon, TwitterIcon,} from "react-share";
import { FaBookmark, FaRegBookmark } from "react-icons/fa"
import axios from 'axios'
import ReactTooltip from 'react-tooltip'
import commentBox from 'commentbox.io';
import { ToastContainer, toast, Slide, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import '../style.css'
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

const override = css`
    margin: auto auto;
`;

class DetailNews extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            response: '',
            isGuardian: null,
            isSaved: false,
            expanded: false
        }
        this.handleBMClick = this.handleBMClick.bind(this)
        this.handleExpand = this.handleExpand.bind(this)
        
    }
    componentDidMount() {
        // commentBox('5729002232741888-proj');
        this.removeCommentBox = commentBox('5729002232741888-proj');
        console.log(this.props.match.location)
        const identifier = this.props.match.location.search.substring(4,8)
        // console.log(identifier)

        if(identifier === 'http'){
            this.setState({isGuardian: false})
            const articleUrl = this.props.match.location.search.slice(4)
            const encodedUrl = encodeURIComponent(articleUrl)
            // console.log(encodedUrl)
            axios.get(`http://ec2-54-205-64-116.compute-1.amazonaws.com:3030/nytimes/${encodedUrl}`)
            .then(res => {
                this.setState(
                    {response: res.data},
                    () => {
                        const local = localStorage.getItem('myFavorite')
                        if(local !== null){
                            const parsed = JSON.parse(local)
                            // console.log(parsed[2].title)
                            // console.log(this.state.response.title)
                            for(let j=0; j<parsed.length; j++){
                                if(parsed[j].title === this.state.response.title){
                                    this.setState({ isSaved: true })
                                }
                            }
                        }
                    }
                )
                // console.log(this.state.response)
                // console.log(res.data)
            })
        } else {
            this.setState({isGuardian: true})
            axios.get(`http://ec2-54-205-64-116.compute-1.amazonaws.com:3030/guardetail/${this.props.match.location.search}`)
            .then(res => {
                this.setState(
                    {response: res.data},
                    () => {
                        const local = localStorage.getItem('myFavorite')
                        if(local !== null){
                            const parsed = JSON.parse(local)
                            // console.log(parsed[2].title)
                            // console.log(this.state.response.title)
                            for(let j=0; j<parsed.length; j++){
                                if(parsed[j].title === this.state.response.title){
                                    this.setState({ isSaved: true })
                                }
                            }
                        }
                    }
                )
            })
        }
        // const local = localStorage.getItem('myFavorite')
        // if(local === null){
        //     this.setState({isSaved: false})
        // }
        // else {
        //     const parsed = JSON.parse(local)
        //     console.log(parsed[2].title)
        //     console.log(this.state.response.title)
        //     for(let j=0; j<parsed.length; j++){
        //         if(parsed[j].title === this.state.response.title){
        //             this.setState({ isSaved: true })
        //         }
        //     }
        // }
    }

    handleBMClick() {
        toast.configure()
        console.log(this.state.response)
        if(this.state.isSaved === false){ //add to book mark
            this.setState({isSaved: true})
            const storage = localStorage.getItem('myFavorite')
            if(storage === null){
                console.log('empty')
                this.state.response['isGuardian'] = this.state.isGuardian
                let array =[]
                array.push(this.state.response)
                localStorage.setItem('myFavorite', JSON.stringify(array))
            }
            else {
                console.log('already have some content in myFavorite')
                this.state.response['isGuardian'] = this.state.isGuardian
                let arr = []
                console.log(JSON.parse(storage))
                for(let i=0; i<(JSON.parse(storage)).length; i++){
                    arr.push((JSON.parse(storage))[i])
                }
                console.log(arr)
                arr.push(this.state.response)
                console.log(arr)
                localStorage.setItem('myFavorite', JSON.stringify(arr))
            }
            toast('Saving ' + this.state.response.title, {
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
            console.log(this.state.response)
        }
        else {
            this.setState({ isSaved: false })
            const storage = localStorage.getItem('myFavorite')
            let arr = []
            for(let i=0; i<(JSON.parse(storage)).length; i++){
                arr.push((JSON.parse(storage))[i])
            }
            let newArr = []
            for(let i=0; i<(JSON.parse(storage)).length; i++){
                if((JSON.parse(storage))[i].title !== this.state.response.title){
                    newArr.push((JSON.parse(storage))[i])
                }
            }
            console.log(newArr.length)
            console.log(newArr)
            localStorage.setItem('myFavorite', JSON.stringify(newArr))
            toast('Removing - ' + this.state.response.title, {
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
    }

    handleExpand() {
        this.setState(
            { expanded: !this.state.expanded},
            ()=>{
                console.log(this.state.expanded)
                if(this.state.expanded){
                    window.scrollBy({
                        top: window.innerHeight,
                        behavior: 'smooth'
                    });
                }
                else{
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })
                }
            }
        )
    }

    componentWillUnmount() {
        
        this.removeCommentBox();
    }

    render(){
        if(this.state.response === ''){
            return (
                <div className='spinner'>
                    <div >
                        <BounceLoader css={override} size={50} color={'blue'} />
                        <h5 className='spinner-text'>Loading</h5>
                    </div>
                    <div style={{display: 'none'}} className="commentbox" id={this.props.match.location.search.slice(4)} />
                </div>
            )
        }

        return(
            <div>
            <Card 
                bsPrefix ='shadow p-3 mb-5 bg-white rounded'
                style={{ width: '98%', margin: 'auto', cursor: 'pointer' }}
                onClick={this.handleClick}
            >
                <Card.Body>
                    <Card.Title>
                        <Row>
                            {this.state.response.title}
                        </Row>
                    </Card.Title>
                    <Row>
                        <Col><Card.Text>{this.state.response.date}</Card.Text></Col>
                        <Col >
                        <Row style={{float: 'right', paddingRight: '15px'}}>
                            <div style={{paddingRight: '30px'}}>
                            <FacebookShareButton url={this.state.response.url} hashtag='#CSCI_571_NewsApp'>
                                <FacebookIcon data-tip data-for='fb' size={30} round={true} />
                                <ReactTooltip id='fb' place="top" effect="solid">Facebook</ReactTooltip>
                            </FacebookShareButton>
                            <TwitterShareButton url={this.state.response.url} hashtags={['CSCI_571_NewsApp']}>
                                <TwitterIcon data-tip data-for='tw' size={30} round={true} />
                                <ReactTooltip id='tw' place="top" effect="solid">Twitter</ReactTooltip>
                            </TwitterShareButton>
                            <EmailShareButton url={this.state.response.url} subject='#CSCI_571_NewsApp'>
                                <EmailIcon data-tip data-for='email' size={30} round={true} />
                                <ReactTooltip id='email' place="top" effect="solid">Email</ReactTooltip>
                            </EmailShareButton>
                            </div>
                        {/* </Col>
                        <Col> */}
                            <div>
                                {this.state.isSaved ? 
                                (<FaBookmark data-tip data-for='bookmark' color="red" size="1.25em" onClick={this.handleBMClick} />) : 
                                (<FaRegBookmark data-tip data-for='bookmark' color="red" size="1.25em" onClick={this.handleBMClick} />)
                                }
                                {/* <FaRegBookmark data-tip="Bookmark" color="red" size="1.25em" onClick={this.handleBMClick} /> */}
                                <ReactTooltip id='bookmark' place="top" effect="solid">Bookmark</ReactTooltip>
                            </div>
                        </Row>
                        </Col>
                    </Row>
                    <Row><Card.Img src={this.state.response.imageUrl} /></Row>
                    <Row className='title-description'><Card.Text style={{textAlign: 'justify'}} className={this.state.expanded ? null : 'detail-description-ellipsis'}>{this.state.response.description}</Card.Text></Row>
                    <Row style={{float: 'right'}}>
                        {this.state.expanded ? <FaChevronUp onClick={this.handleExpand}/> : <FaChevronDown onClick={this.handleExpand} />}
                    </Row>
                    <Row>
                        {/* "for more" arrow */}
                    </Row>
                </Card.Body>
            </Card>

            {/* comment box here key={this.props.match.location.pathname.slice(12)} */}
            <div className="commentbox" id={this.props.match.location.search.slice(4)} />
            </div>
        )
    }
}

export default DetailNews