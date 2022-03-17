import React, {FunctionComponent, ReactElement} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import Breed from "../models/Breed";
import Text from "../components/Text";
import Cat from "../models/Cat";

const ModalContent = styled.div`
  padding: 2rem;
`;

const BreedLink = styled(Link)`
  font-family: ${p => p.theme.fontFamily.primary};
`;

interface Props {
    cat: Cat
}

const CatDetails: FunctionComponent<Props> = (props: Props): ReactElement => {
    const {cat} = props;

    return (
        <ModalContent>
            {cat.breeds && cat.breeds.length ?
                cat.breeds.map((breed: Breed) => (
                    <BreedLink
                        to={`/breeds?breed_id=${breed.id}`}
                    >
                        {breed.name}
                    </BreedLink>
                ))
                : <Text>No information about breed is available :(</Text>}
        </ModalContent>
    )
}

export default CatDetails;