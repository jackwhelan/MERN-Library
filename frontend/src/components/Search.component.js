import React, { Component } from 'react';
import FormInput from '../components/FormInput.component';
import axios from 'axios';
import StarRatings from 'react-star-ratings';

class Search extends Component {
    state = {
        search: '',
        showAmt: 10
    }

    handleSearchChange = (event) => {
        this.setState({
            search: event.target.value,
            showAmt: 10
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
                </div>
                <div className="core-cont border-secondary rounded">
                    <ul className="list-group">
                        {this.state.results ? this.state.results.map((item, i) => {
                            return (
                                <li key={i} className="list-group-item mb-3">
                                    <h4 className="h4">{item.title}</h4>
                                    <span className="text-muted vertical-align-super">Written by {item.authors}</span>
                                    <hr className="bg-black" />
                                    <StarRatings
                                        rating={parseFloat(item.average_rating)}
                                        starDimension="35px"
                                        starSpacing="5px"
                                        starRatedColor="rgb(212, 175, 55)"
                                    />
                                    <sup className="text-muted"> (Average of {item.ratings_count} ratings)</sup>
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
