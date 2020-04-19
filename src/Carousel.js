import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0,
  };

  static getDerivedStateFromProps({ media }) {
    let photos = ["http://placecorgi.com/600/600"];
    if (media.length) {
      photos = media.map(({ large }) => large);
    }
    return { photos };
  }

  handleIndexClick = (e) => {
    this.setState({
      active: +e.target.dataset.index,
    });
    console.log(e.target.dataset);
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
              onClick={this.handleIndexClick}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  this.handleIndexClick();
                }
              }}
              key={photo}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal"
              data-index={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
