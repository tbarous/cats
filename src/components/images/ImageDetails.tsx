import React, {FunctionComponent, ReactElement} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import Breed from "../models/Breed";
import Cat from "../models/Cat";
import {useAppDispatch} from "../hooks/useRedux";
import {setCat} from "../store/AppSlice";
import StyledLink from "./Link";
import Text from "../components/Text";
import Image from "../models/Image";

const ModalContent = styled.div`
  padding: 2rem;
`;

interface Props {
    image: Image
}

const ImageDetails: FunctionComponent<Props> = (props: Props): ReactElement => {
    const {image} = props;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function onClick(breedId: string) {
        dispatch(setImage(null));

        navigate(`/breeds?breed_id=${breedId}`);
    }

    return (
        <ModalContent>
            {image.breeds && image.breeds.length ?
                image.breeds.map((breed: Breed) => (
                    <StyledLink
                        key={breed.id}
                        onClick={() => onClick(breed.id)}
                    >
                        {breed.name}
                    </StyledLink>
                ))
                : <Text>No information about breed is available :(</Text>}
        </ModalContent>
    )
}

export default ImageDetails;