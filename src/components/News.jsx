import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import data from "../data.json";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 10,
    category: "general",
  };

  constructor(props) {
    super(props);
    this.state = {
      articals: [],
      loading: false,
      startPage: 1,
      pageSize: this.props.pageSize,
    };
  }

  async componentDidMount() {
    this.updateNews(this.state.startPage);
    this.setState({ articals: data.articles });
  }

  updateNews = async (startPage) => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b139f36e0d8844b8a77347a536ac3588&page=${startPage}&pageSize=${this.state.pageSize}`;
    this.setState({ loading: true });

    await fetch(url).then((response) => {
      response.json().then((result) => {
        this.setState({
          articals: result.articles,
          totalResults: result.totalResults,
          loading: false,
        });
      });
    });
  };

  handlePrevClick = () => {
    this.updateNews(this.state.startPage - 1);
    this.setState({ startPage: this.state.startPage - 1 });
  };
  handleNextClick = () => {
    if (
      this.state.startPage + 1 <=
      Math.ceil(this.state.totalResults / this.state.pageSize)
    ) {
      this.updateNews(this.state.startPage + 1);
      this.setState({ startPage: this.state.startPage + 1 });
    }
  };

  render() {
    return (
      <div className="container mt-3">
        <h3 className="text-center">NewsMonkey - Top Headlines</h3>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articals.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://s.yimg.com/os/creatr-uploaded-images/2021-09/ce75dad0-1c7e-11ec-bfec-eab60949ca08"
                    }
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between mt-3">
          <button
            type="button"
            disabled={this.state.startPage <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            disabled={
              this.state.startPage + 1 >
              Math.ceil(this.state.totalResults / this.state.pageSize)
            }
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
