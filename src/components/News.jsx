import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general",
  };

  constructor(props) {
    super(props);
    this.state = {
      articals: [],
      loading: true,
      startPage: 1,
      pageSize: this.props.pageSize,
      totalResults: 0,
    };
  }

  async componentDidMount() {
    this.updateNews(this.state.startPage);
  }

  async updateNews(startPage) {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b139f36e0d8844b8a77347a536ac3588&page=${startPage}&pageSize=${this.state.pageSize}`;
    
    this.setState({ loading: true, startPage: startPage });

    await fetch(url).then((response) => {
      response.json().then((result) => {
        console.log(result);
        this.setState({
          articals: result.articles,
          totalResults: result.totalResults,
          loading: false,
        });
      });
    });
  }

  fetchMoreData = async () => {
    let startPage = this.state.startPage + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b139f36e0d8844b8a77347a536ac3588&page=${startPage}&pageSize=${this.state.pageSize}`;
    this.setState({ startPage: startPage });

    await fetch(url).then((response) => {
      response.json().then((result) => {
        console.log(result);
        this.setState({
          articals: this.state.articals.concat(result.articles),
          totalResults: result.totalResults,
        });
      });
    });
  };

  render() {
    return (
      <>
        <h3 className="text-center">NewsMonkey - Top Headlines</h3>
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articals.length}
          next={this.fetchMoreData}
          hasMore={this.state.articals.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articals.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://s.yimg.com/os/creatr-uploaded-images/2021-09/ce75dad0-1c7e-11ec-bfec-eab60949ca08"
                      }
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
