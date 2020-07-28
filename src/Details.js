import React from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";

class Details extends React.Component {
    state = {loading: true};
    /*constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }*/
    componentDidMount() {
        pet.animal(this.props.id)
        .then(({animal}) => {
            this.setState ({
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
    render() {
        if(this.state.loading) {
            return <h1>loading ...</h1>
        }
        const {animal,breed,location,description,name,media} = this.state;
        return (
            <div className="details">
                <Carousel media={media} />
                <div>
                    <h1>{name}</h1>
                    <h2>{`${animal} - ${breed} - ${location}`}</h2>
                    <button>Adopt {name}</button>
                    <p>{description}</p>
                </div>
            </div>
        )
    }
}

export default Details;