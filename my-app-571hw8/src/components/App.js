import React from 'react'
import TopNavbar from './TopNavbar'
import NewsCard from './NewsCards'
import { render } from '@testing-library/react'
import axios from 'axios'
import { Route, Switch } from 'react-router-dom'
import NYThome from './NYThome'
import NYTworld from './NYTworld'
import NYTpolitics from './NYTpolitics'
import NYTbusiness from './NYTbusiness'
import NYTtechnology from './NYTtechnology'
import NYTsports from './NYTsports'
import DetailNews from './DetailNews'
import SearchSec from './SearchSec'
import GuardianHome from './GuardianHome'
import GuardianSection from './GuardianSection'
import Favorites from './Favorites'

import '../style.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
// import NavLink from 'react-bootstrap/NavLink'
import { Link, BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaBookmark, FaRegBookmark } from "react-icons/fa"
import RtSwitch from "react-switch";
import ReactTooltip from 'react-tooltip'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import _ from "lodash";
import AsyncSelect from 'react-select/lib/Async'
import { isCompositeComponent } from 'react-dom/test-utils'
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet'
// import debounce from 'lodash/debounce';
const debounce = require('debounce-promise')

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            response: [],
            isGuardian: localStorage.getItem('isGuardian') === null ? false : (JSON.parse(localStorage.getItem('isGuardian'))),
            // checked: true,
            selectedResult: null,
            selectedOption: {},
            isInDetail: false,
            isInFav: false,
            isInSearch: false,
            enpend: false
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleSwitch = this.handleSwitch.bind(this)
        this.fetchData = this.fetchData.bind(this)
        this.bookmarkClick = this.bookmarkClick.bind(this)
        this.resetBmNSwitch = this.resetBmNSwitch.bind(this)
        this.NewsClickNSearch = this.NewsClickNSearch.bind(this)
        this.setNavExpanded = this.setNavExpanded.bind(this)
        this.closeNav = this.closeNav.bind(this)
    }

    handleClick() {

    }
    setNavExpanded(expanded) {
        this.setState({ enpend: expanded });
    }
    closeNav() {
        this.setState({ enpend: false });
    }

    handleSwitch() {
        this.setState(()=>{return {
            isGuardian: !(this.state.isGuardian)}}, 
            ()=>{
                localStorage.setItem('isGuardian', this.state.isGuardian);
                var test = localStorage.getItem('isGuardian');
                console.log("current isGuardian: " + test)
                console.log(this.state.isGuardian)
            }
        )
        // console.log(`outside: ` + this.state.isGuardian)
    }

    fetchData = (inputValue, callback) => {
        if (!inputValue) {
          callback([]);
        } else {
            // axios.get(`https://api.cognitive.microsoft.com/bing/v7.0/suggestions?&q=${inputValue}`, {
            //     headers: {"Ocp-Apim-Subscription-Key": "df28f417c933408d95e694cf05165c21"}
            // })
            axios.get(`https://honggang.cognitiveservices.azure.com/bing/v7.0/suggestions?&q=${inputValue}`, {
                headers: {"Ocp-Apim-Subscription-Key": "df28f417c933408d95e694cf05165c21"}
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
            }, ()=>{console.log(this.state.selectedOption)});
        this.setState({isInFav: false})
        this.setState({isInDetail: true})
        this.setState({isInSearch: true})
        }
        const searchContent = selectedOption.label
        console.log("label:" + selectedOption.label)
        
        const url = "/search?q=" + searchContent
        const { history } = this.props;
        history.push(url)

        // window.location="/search?q=" + searchContent
        // return (
        //     <Link 
        //         to={'/search?q='+ searchContent}
        //     ></Link>
        // )
    }

    // componentDidMount() {
    //     axios.get('http://localhost:3030/nytimes')
    //         .then(res => {
    //             this.setState({response: res.data})
    //         })
    // }
    NewsClickNSearch(){
        this.setState({isInFav: false})
        this.setState({isInSearch: false})
        this.setState({isInDetail: true},
            ()=>{
                console.log('detail: ' + this.state.isInDetail + ' Fav: ' + this.state.isInFav)
            })
    }
    bookmarkClick() {
        this.setState({isInDetail: true})
        this.setState({isInSearch: false})
        this.setState({ isInFav: true },
            ()=>{
                console.log('detail: ' + this.state.isInDetail + ' Fav: ' + this.state.isInFav)
            })
    }
    resetBmNSwitch() {
        this.setState({isInDetail: false})
        this.setState({isInSearch: false})
        this.setState({isInFav: false},
            () => {
                console.log('detail: ' + this.state.isInDetail + ' Fav: ' + this.state.isInFav)
            }
            )
    }
    render() {
        // if (!this.state.response.results) {
        //     return <p>LOADING...</p>
        // }
        if(typeof(Storage) === undefined){
            console.log('local storage is undefined')
        } else {
            var test = localStorage.getItem('isGuardian');
            console.log(test)
            console.log('local storage is NOT empty')
        }

        const labelNYT = <div className='nac-bm-switch' style={{color: 'white'}}>NYTimes</div>
        const labelSwitch =
            <RtSwitch 
                className='nac-bm-switch'
                onChange={this.handleSwitch} 
                checked={this.state.isGuardian} 
                onColor='#1188ea'
                offColor='#d3d3d3' 
                checkedIcon={false} 
                uncheckedIcon={false} 
            />
        const labelGuar = <div className='nac-bm-switch' style={{color: 'white'}}>Guardian</div> 

        return (
            <div>
                <Helmet>
                    <title>CSCI 571 NewsApp</title>
                </Helmet>
                {/* <TopNavbar /> */}
                {/* <div> */}
                <Navbar collapseOnSelect bg="bggg" variant="dark" expand="lg" >
                    {/* <div className ="col-sm-3"> */}
                    {/* onToggle={this.setNavExpanded} expanded={this.state.enpend} */}
                        <Col xs={10} lg={2}  style={{marginLeft: '-15px', marginRight: '-15px'}}>
                            <AsyncSelect
                                // cacheOptions
                                placeholder="Enter keyword .." 
                                value={this.state.isInSearch ? this.state.selectedOption : null}
                                loadOptions={this.fetchData}
                                onChange={(e) => {
                                    this.onSearchChange(e);
                                }}
                                defaultOptions={false}
                            />
                            {/* {console.log(this.state.selectedOption)} */}
                        </Col>
                    {/* </div> */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {/* css actice style */}
                        {/* onSelect={this.closeNav} */}
                        <Nav className="mr-auto" onClick={this.resetBmNSwitch} >
                            <Nav.Link as={Link} activeClassName='active' activeStyle='active-test' to={'/'} exact>Home</Nav.Link>
                            <Nav.Link as={Link} to="/world">World</Nav.Link>
                            <Nav.Link as={Link} to="/politics">Politics</Nav.Link>
                            <Nav.Link as={Link} to="/business">Business</Nav.Link>
                            <Nav.Link as={Link} to="/technology">Technology</Nav.Link>
                            <Nav.Link as={Link} to="/sports">Sports</Nav.Link>
                        </Nav>
                        
                        <Link 
                            to="/favorites"
                            // className='news-card-text'
                            // style={{ width: '98%', margin: 'auto', cursor: 'pointer' }}
                        >
                            <div className='nac-bm-switch' data-tip data-for='bm' onClick={this.bookmarkClick}>
                                {this.state.isInFav ? <FaBookmark className="bookmark-color"/> : 
                                                    <FaRegBookmark className="bookmark-color" onClick={() => { ReactTooltip.hide(); }} />}
                            </div>
                            <ReactTooltip id='bm' place="bottom" effect="solid" eventOff='click'>Bookmark</ReactTooltip>

                        </Link>
                        {this.state.isInDetail ? (<div></div>) : (labelNYT)}
                        {this.state.isInDetail ? (<div></div>) : (labelSwitch)}
                        {this.state.isInDetail ? (<div></div>) : (labelGuar)}
                       
                    </Navbar.Collapse>
                </Navbar>
                {/* </div> */}
                {/* <TopNavbar /> */}
                {/* column span total as 12 */}
                <Switch>
                    <Route path="/" component={this.state.isGuardian ? (m)=> <GuardianHome nctodetail={this.NewsClickNSearch} /> : (m)=> <NYThome nctodetail={this.NewsClickNSearch} /> } exact />
                    <Route path="/world" component={this.state.isGuardian ? ((m)=> <GuardianSection match={m} nctodetail={this.NewsClickNSearch} />) : ((m)=> <NYTworld nctodetail={this.NewsClickNSearch} />)} />
                    <Route path='/politics' component={this.state.isGuardian ? ((m)=> <GuardianSection match={m} nctodetail={this.NewsClickNSearch} />) : ((m)=> <NYTpolitics nctodetail={this.NewsClickNSearch} />)} /> 
                    <Route path='/business' component={this.state.isGuardian ? ((m)=> <GuardianSection match={m} nctodetail={this.NewsClickNSearch} />) : ((m)=> <NYTbusiness nctodetail={this.NewsClickNSearch} />)} />
                    <Route path='/technology' component={this.state.isGuardian ? ((m)=> <GuardianSection match={m} nctodetail={this.NewsClickNSearch}/>) : ((m)=> <NYTtechnology nctodetail={this.NewsClickNSearch} />)} />
                    <Route path='/sports' component={this.state.isGuardian ? ((m)=> <GuardianSection match={m} nctodetail={this.NewsClickNSearch} />) :  ((m)=> <NYTsports nctodetail={this.NewsClickNSearch} />)} />
                    <Route path='/article' component={(match)=> <DetailNews match={match} /> } />
                    <Route path="/search" component={(match)=> <SearchSec match={match} history={this.props.history} nctodetail={this.NewsClickNSearch} /> } />
                    <Route path="/favorites" exact component={(match)=> <Favorites match={match} handle={this.NewsClickNSearch} /> } />
                </Switch>
            </div>
        )
    }
}

// export default App
export default withRouter(App)