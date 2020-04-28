import React, { Component } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import jwt from 'jsonwebtoken';
import Alert from './Alert.component';
const ACCESS_TOKEN_SECRET = "bd601f7c72aba3ea7e3ed2f0146891868672148b646b386cc6577e823ff96ae7459ee14a6f4998a9e914f270b627aed8a54bd83d56a7ca3841031fffed194717";


class MyBooks extends Component {
    state = {
        mybooks: [],
        showAmt: 5
    }

    componentDidMount() {
        this.fetchQuery();
    }

    myBookRemove = (event) => {
        const bookID = event.target.value.split(',');
        const body = {
            book_id: bookID[0],
            user_id: bookID[1]
        }

        axios.post('http://localhost:5000/MyBook/remove', body)
            .then(res => {
                this.setState({
                    book_removed: res.data
                })
            })
            .then(() => {
                this.fetchQuery();
            })
            .catch(err => console.log(err))
    }

    fetchQuery = () => {
        var showAmt = this.state.showAmt;
        var id = jwt.verify(localStorage.getItem('TOKEN'), ACCESS_TOKEN_SECRET).id;
        const body = {
            id: id,
            showAmt: showAmt
        }
        
        axios.post("http://localhost:5000/MyBook", body)
            .then(results => {
                this.setState({
                    mybooks: results.data.data
                })
            })
            .catch(err => console.log(err))
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
                {this.state.book_removed && <Alert response={this.state.book_removed} key={Math.random()} />}
                <div className="core-cont border-secondary rounded">
                    <ul className="list-group">
                        {this.state.mybooks ? this.state.mybooks.map((item, i) => {
                            return (
                                <li key={i} className="list-group-item mb-3">
                                    <span className="h4">{item.title}</span><span className="h6 float-right">Pages: {item.num_pages}</span>
                                    <p><span className="text-muted">Written by {item.authors}</span><span className="text-muted float-right">Published by {item.publisher}</span></p>
                                    <hr className="bg-black" />
                                    <div className="jumbotron" style={{ padding: "1em", margin: "0" }}>
                                        <StarRatings
                                            rating={parseFloat(item.average_rating)}
                                            starDimension="35px"
                                            starSpacing="5px"
                                            starRatedColor="rgb(212, 175, 55)"
                                        /><sup className="text-muted"> (Average of {item.ratings_count} ratings)</sup>
                                        <button value={[item._id, jwt.verify(localStorage.getItem('TOKEN'), ACCESS_TOKEN_SECRET).id]} className="float-right btn btn-md btn-secondary" onClick={this.myBookRemove}>Remove from MyBooks</button>
                                    </div>
                                </li>
                            )
                        }) : <h4>You have no saved books!</h4>}
                    </ul>
                    {this.state.mybooks.length > 0 ? <button className="btn btn-secondary btn-lg float-right" onClick={this.showMore}>Show More</button> : <h2 className="text-center">No books added to MyBooks yet!</h2>}
                </div>
            </div>
        )
    }
}

export default MyBooks;
