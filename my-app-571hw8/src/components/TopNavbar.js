import React from 'react'
import '../style.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
// import NavLink from 'react-bootstrap/NavLink'
import { Link, BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaBookmark, FaRegBookmark } from "react-icons/fa"
import Switch from "react-switch";
import ReactTooltip from 'react-tooltip'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import _ from "lodash";
import AsyncSelect from 'react-select/lib/Async'
import axios from 'axios';
// import debounce from 'lodash/debounce';
const debounce = require('debounce-promise')

class TopNavbar extends React.Component {
    constructor() {
        super()
        this.state = { 
            isGuardian: true,
            // checked: true,
            selectedResult: null,
            selectedOption: {}
        }
        this.handleSwitch = this.handleSwitch.bind(this)
        this.fetchData = this.fetchData.bind(this)
    }
    
    handleSwitch() {
        this.setState(()=>{return {isGuardian: !(this.state.isGuardian)}}, ()=>{console.log(this.state.isGuardian)})
        console.log(`outside: ` +this.state.isGuardian)
    }

    fetchData = (inputValue, callback) => {
        if (!inputValue) {
          callback([]);
        } else {
            axios.get(`https://api.cognitive.microsoft.com/bing/v7.0/suggestions?&q=${inputValue}`, {
                headers: {"Ocp-Apim-Subscription-Key": "042c54ea2f1f497bb0cee6aaad4df385"}
            })
            .then((resp) => {
                const data = resp.data.suggestionGroups[0].searchSuggestions
                console.log(resp)
                console.log(data)
                return data
            }) 
            .then((data) => {
                const tempArray = [];
                data.map((element) => {tempArray.push({ label: `${element.displayText}`, value: element.url })})
                console.log(tempArray)
                callback(tempArray);            
            })
            .catch((error) => {
                console.log(error, "catch the hoop")
            })
        }
    }
    test = debounce(this.fetchData,100)
    
    onSearchChange = (selectedOption) => {
        if (selectedOption) {
            this.setState({
                selectedOption
            });
        }
        const searchContent = selectedOption.label
        console.log("label:" + selectedOption.label)
        window.location.href="/search?q=" + searchContent
    }

    render(){

        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                    {/* <div className ="col-sm-3"> */}
                        <Col xs={10} lg={2} >
                            <AsyncSelect
                                placeholder="Enter keyword .." 
                                // value={this.state.selectedOption}
                                loadOptions={this.fetchData}
                                onChange={(e) => {
                                    this.onSearchChange(e);
                                }}
                                defaultOptions
                            />
                            {/* {console.log(this.state.selectedOption)} */}
                        </Col>
                    {/* </div> */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav defaultActiveKey="/" className="mr-auto">
                            <Nav.Link as={Link} to="/" exact={true}>Home</Nav.Link>
                            <Nav.Link as={Link} to="/nytworld">World</Nav.Link>
                            <Nav.Link as={Link} to="/nytpolitics">Politics</Nav.Link>
                            <Nav.Link as={Link} to="/nytbusiness">Business</Nav.Link>
                            <Nav.Link as={Link} to="/nyttechnology">Technology</Nav.Link>
                            <Nav.Link as={Link} to="/nytsports">Sports</Nav.Link>
                        </Nav>
                        
                        <a data-tip="Bookmark"><FaRegBookmark className="bookmark-color"/></a>
                        <ReactTooltip place="bottom" effect="solid"/>
                        <div style={{color: 'white'}}>NYTimes{' '}</div>
                        <Switch onChange={this.handleSwitch} checked={this.state.isGuardian} onColor='#1188ea'
                                offColor='#d3d3d3' checkedIcon={false} uncheckedIcon={false} />
                        <div style={{color: 'white'}}>Guardian</div>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default TopNavbar