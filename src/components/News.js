import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        };
    }
    // this will run after render method is loaded
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=65941f1c0cfd44d09f52195b4ec8be1e&page=1&pageSize=${this.props.pageSize}`;
        // using fetch api
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading:false })

    }

    handleNextClick = async () => {
        this.setState({
            page: this.state.page + 1,
        })
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {
            
        } else {
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=65941f1c0cfd44d09f52195b4ec8be1e&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            // using fetch api
            this.setState({loading:true})
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({ articles: parsedData.articles,
                loading:false})
        }

    };

    handlePreviousClick = async () => {
        this.setState({
            page: this.state.page - 1,
        })
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=65941f1c0cfd44d09f52195b4ec8be1e&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // using fetch api
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, loading:false })
    }
    render() {
        return (
            <div className="container my-3">
                <h2>Newsify - Top Headlines</h2>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return (
                            <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""}
                                    description={element.description ? element.description : ""}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url} />
                            </div>
                        )

                    })}
                </div>
                <div className="container d-flex justify-content-between my-3">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        );
    }
}

export default News;
