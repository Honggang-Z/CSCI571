import React from 'react'
import NewsCard from './NewsCards'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import '../style.css'

const override = css`
    margin: auto auto;
`;

class GuardianSection extends React.Component {
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
        let currentPath = this.props.match.location.pathname.slice(1)
        if(currentPath === 'sports'){
            currentPath = 'sport'
        }
        console.log("current path: " + currentPath)
        axios.get(`http://ec2-54-205-64-116.compute-1.amazonaws.com:3030/guardian/${currentPath}`)
            .then(res => {
                this.setState({response: res.data})
                console.log(this.state.response)
            })
    }
    render() {
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
        // console.log(this.props.match)

        return (
            // <h1>This is Guardian Section</h1>
            <div>
                {/* nav bar state */}
                <Row xs={1} className='justify-content-center'>
                    {this.state.response.results.map((item, key) => {
                        return (
                            <Col key={key}>
                                <NewsCard 
                                    nctodetail={this.props.nctodetail}
                                    key={key} 
                                    id={item.id}
                                    title={item.title}
                                    image={item.imageUrl}
                                    date={item.date}
                                    description={item.description}
                                    section={item.section}
                                    url={item.url}
                                />
                            </Col>
                        )
                    })}
                </Row>
            </div>
        )
    }
}

export default GuardianSection