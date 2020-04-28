import React, { Component } from 'react';
import FormInput from '../components/FormInput.component';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import jwt from 'jsonwebtoken';
import Alert from './Alert.component';
const ACCESS_TOKEN_SECRET = "bd601f7c72aba3ea7e3ed2f0146891868672148b646b386cc6577e823ff96ae7459ee14a6f4998a9e914f270b627aed8a54bd83d56a7ca3841031fffed194717";

class Search extends Component {
    state = {
        search: '',
        showAmt: 5,
    }

    handleSearchChange = (event) => {
        this.setState({
            search: event.target.value,
            showAmt: 5,
            book_added: undefined
        }, () => {
            this.fetchQuery();
        });
    }

    fetchQuery = () => {
        var showAmt = this.state.showAmt;
        var search = this.state.search;
        axios.get("http://localhost:5000/book?showAmt=" + showAmt + "&search=" + search)
            .then(results => {
                this.setState({
                    results: results.data
                })
            })
    }

    showMore = () => {
        this.setState({
            showAmt: this.state.showAmt + 5
        }, () => {
            this.fetchQuery();
        });
    }

    myBookAdd = (event) => {
        const bookID = event.target.value.split(',');
        const body = {
            book_id: bookID[0],
            user_id: bookID[1]
        }

        axios.post('http://localhost:5000/MyBook/add', body)
        .then(res => {
            this.setState({
                book_added: res.data
            })
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="card bg-light p-5 mt-3">
                <div className="core-cont border-secondary rounded pb-3">
                    <FormInput
                        icon="fa fa-search"
                        type="text"
                        value={this.state.search}
                        onChange={this.handleSearchChange}
                        label="Search..."
                    />
                    {this.state.book_added && <Alert response={this.state.book_added} key={Math.random()}/>}
                </div>
                <div className="core-cont border-secondary rounded">
                    <ul className="list-group">
                        {this.state.results ? this.state.results.map((item, i) => {
                            return (
                                <li key={i} className="list-group-item mb-3">
                                    <span className="h4">{item.title}</span><span className="h6 float-right">Pages: {item.num_pages}</span>
                                    <p><span className="text-muted">Written by {item.authors}</span><span className="text-muted float-right">Published by {item.publisher}</span></p>
                                    <hr className="bg-black" />
                                    <div className="jumbotron" style={{padding: "1em", margin: "0"}}>
                                        <StarRatings
                                            rating={parseFloat(item.average_rating)}
                                            starDimension="35px"
                                            starSpacing="5px"
                                            starRatedColor="rgb(212, 175, 55)"
                                        /><sup className="text-muted"> (Average of {item.ratings_count} ratings)</sup>
                                        <button value={[item._id, jwt.verify(localStorage.getItem('TOKEN'), ACCESS_TOKEN_SECRET).id]} className="float-right btn btn-md btn-secondary" onClick={this.myBookAdd}>Add to MyBooks</button>
                                    </div>
                                </li>
                            )
                        }) : <h4>Search using the box above for real-time results!</h4>}
                    </ul>
                    {this.state.results && <button className="btn btn-secondary btn-lg float-right" onClick={this.showMore}>Show More</button>}
                </div>
            </div>
        )
    }
}

export default Search;
