import React, {FunctionComponent, ReactElement} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import Breed from "../models/Breed";
import {useAppDispatch} from "../hooks/useRedux";
import Image from "../models/Image";
import {setImage} from "../store/slices/ImagesSlice";
import StyledLink from "./styled/Link";
import Text from "./styled/Text";

const Wrapper = styled.div`
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
        <Wrapper>
            {image.breeds && image.breeds.length ?
                image.breeds.map((breed: Breed) => (
                    <>
                        <StyledLink
                            key={breed.id}
                            onClick={() => onClick(breed.id)}
                        >
                            {breed.name}
                        </StyledLink>

                        <Text className="mt-2">
                            {breed.description}
                        </Text>

                        <Text>
                            {breed.temperament}
                        </Text>
                    </>
                ))
                : <Text>No information about breed is available :(</Text>}
        </Wrapper>
    )
}

export default ImageDetails;