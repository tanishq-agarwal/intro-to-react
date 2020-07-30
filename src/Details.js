import React from "react";
import pet from "@frontendmasters/pet";
import {navigate} from "@reach/router";
import Modal from "./Modal"
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";

class Details extends React.Component {
    state = {loading: true , showModal: false};
    /*constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }*/
    componentDidMount() {  //this will allow u to clean up things before the component leaves the DOM
        pet.animal(this.props.id)
        .then(({animal}) => {
            this.setState ({
                url: animal.url,
                name: animal.name,
                animal: animal.type,
                location: `${animal.contact.address.city},
                ${animal.contact.address.state}`,
                description: animal.description,
                media: animal.photos,
                breed: animal.breeds.primary,
                loading: false
            });
        },console.error); //if there is any error in the API, so it will just log out to the console
    }
    toggleModal = () => this.setState({ showModal: !this.state.showModal }); //shows the opposite of whatever showModal was
    adopt = () => navigate(this.state.url);
    render() {
        if(this.state.loading) {
            return <h1>loading ...</h1>
        }
        const {animal,breed,location,description,name,media,showModal} = this.state;
        return (
            <div className="details">
                <Carousel media={media} />
                <div>
                    <h1>{name}</h1>
                    <h2>{`${animal} - ${breed} - ${location}`}</h2>
                    <ThemeContext.Consumer>
                        {([theme]) => (
                        <button 
                        onClick={this.toggleModal} 
                        style={{ backgroundColor: theme }}>
                            Adopt {name}</button>
                        )}
                    </ThemeContext.Consumer>
                    <p>{description}</p>
                    { showModal ? (
                        <Modal>
                            <div>
                                <h1>Would you like to adopt{name}</h1>
                                <div className="buttons">
                                    <button onClick={this.adopt}>Yes</button>
                                    <button onClick={this.toggleModal}>No, I am a monster</button>
                                </div>
                            </div>
                        </Modal>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default function DetailsWithErrorBoundary(props) {
    return (
        <ErrorBoundary>
            <Details {...props} />
        </ErrorBoundary>
    )
}