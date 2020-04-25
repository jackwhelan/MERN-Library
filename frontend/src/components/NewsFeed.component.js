import React, { Component } from 'react';
import axios from 'axios';
import DayJS from 'dayjs';

class News extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newsItems: undefined,
            page: 1,
            limit: 5
        }
    }

    componentDidMount() {
        this.getNews();
    }

    async getNews() {
        var url = 'http://newsapi.org/v2/everything?' +
            'qInTitle=Book&' +
            'sortBy=popularity&' +
            'apiKey=0fd330e74f53414786347f2874bb5729&' +
            'language=en';

        axios.get(url)
        .then(res => {
            this.setState({
                newsItems: res.data.articles
            })
        })
    }

    nextPage = () => {
        window.scrollTo(0, 0);
        if(this.state.page < 4)
        {
            this.setState({
                page: this.state.page + 1
            })
        }
    }

    prevPage = () => {
        window.scrollTo(0, 0);
        if (this.state.page > 1) {
            this.setState({
                page: this.state.page - 1
            })
        }
    }

    render() {
        if (this.state.newsItems)
        {
            return (
                <div>
                    {this.state.newsItems.slice((this.state.page - 1) * this.state.limit, this.state.page * this.state.limit).map((item, i) => {
                    var datetime = item.publishedAt;
                    var date = DayJS(datetime).format('dddd, MMMM D YYYY')
                    var time = DayJS(datetime).format('HH:mm');
                        return (
                        <div key={i} className="core-cont bg-lightgrey mt-4">
                            <h4 className="h4">{item.title}</h4>
                            <span className="text-muted h6">Posted by {item.author} on {date} at {time}.</span>
                            <hr className="bg-black" />
                            <p>{item.description}</p>
                            <a role="button" href={item.url} className="btn btn-secondary float-right">Click here to read more on {item.source.name}</a>
                        </div>
                        )
                    })}
                    <button disabled={this.state.page < 2} className="btn btn-secondary btn-lg float-left mb-2" onClick={this.prevPage}>Previous Page</button><button disabled={ this.state.page > 3 } className="btn btn-secondary btn-lg float-right mb-2" onClick={this.nextPage}>Next Page</button>
                </div>
            )
        }
        else
        {
            return "hi"
        }
    }
}

export default News;