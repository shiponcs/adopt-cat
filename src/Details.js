import React from "react";
import { navigate } from "@reach/router";
import Modal from "./Modal";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundaries from "./ErrorBoundaries";
import ThemeContext from "./ThemeContext";

class Details extends React.Component {
  state = { loading: true, showModal: false };

  async componentDidMount() {
    const { animal } = await pet.animal(+this.props.id);
    this.setState({
      url: animal.url,
      animal: animal.type,
      name: animal.name,
      location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
      description: animal.description,
      media: animal.photos,
      breed: animal.breeds.primary,
      loading: false,
    });
  }
  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => navigate(this.state.url);

  render() {
    if (this.state.loading) {
      return <h1>Loading</h1>;
    }
    const {
      name,
      animal,
      breed,
      location,
      description,
      media,
      showModal,
    } = this.state;
    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {location}
          </h2>
          <ThemeContext.Consumer>
            {(theme) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme[0] }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Are you sure</h1>
                <button onClick={this.adopt}>Yes</button>
                <button onClick={this.toggleModal}>No</button>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default function DetailsWithErrorBoundaries(props) {
  return (
    <ErrorBoundaries>
      <Details {...props} />
    </ErrorBoundaries>
  );
}
