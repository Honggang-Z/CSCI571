import React from 'react'
import NewsCard from './NewsCards'
import ResultCard from './ResultCard'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import '../style.css'

const override = css`
    margin: auto auto;
`;

class SearchSec extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            response: {}
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {

    }
    componentDidMount() {
        // this.props.keyword
        // isGuardian
        const searchKeywords = this.props.match.location.search.slice(3)
        // const encodedUrl = encodeURIComponent(articleUrl)
        axios.get(`http://ec2-54-205-64-116.compute-1.amazonaws.com:3030/search?q=${searchKeywords}`)
            .then(res => {
                this.setState({response: res.data})
                console.log('response: ')
                console.log(this.state.response)
            })
        }
    render() {
        // console.log(this.props.nctodetail)
        if (!this.state.response.results) {
            return (
                <div className='spinner'>
                    <div >
                        <BounceLoader css={override} size={50} color={'blue'} />
                        <h5 className='spinner-text'>Loading</h5>
                    </div>
                </div>
            )
        }
        // console.log(this.props)
        return (
            <div style={{paddingLeft: '15px', paddingRight: '15px'}}>
                <h2>Results</h2>
                <Row xs={1}>
                    {this.state.response.results.map((item, key) => {
                            return (
                                <Col key={key} md={3}>
                                    <ResultCard
                                        key={key} 
                                        title={item.title}
                                        image={item.imageUrl}
                                        date={item.date}
                                        description={item.description}
                                        section={item.section}
                                        url={item.url}
                                        id={item.id}
                                        nctodetail={this.props.nctodetail}
                                    />
                                </Col>
                            )

                    })}
                </Row>
            </div>
        )
    }
}

export default SearchSec