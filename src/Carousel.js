import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  };
  static getDerivedStateFromProps({ media }) {
    let photos = ["http://placecorgi.com/600/600"]; //default image,if it doesn't have any

    if (media.length) {
      photos = media.map(({ large }) => large);
    }

    return { photos };
  }
  handleIndexClick = event => {
    this.setState({
      active: +event.target.dataset.index  //Unary + operator converts it to number as we want active to be a number
    });
  };
  render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              onClick={this.handleIndexClick}
              data-index={index}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;