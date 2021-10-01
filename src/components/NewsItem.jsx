import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date } = this.props;
    return (
      <div className="my-1">
        <div className="card">
          <img
            src={imageUrl}
            className="card-img-top"
            alt={title}
            width="150" 
            height="150"
          />
          <div className="card-body">
            <h5 className="card-title">
              {title} <span className="badge bg-secondary">New</span>
            </h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
