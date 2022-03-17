import React, {FunctionComponent, ReactElement} from "react";
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import Breed from "../models/Breed";
import Cat from "../models/Cat";
import {useAppDispatch} from "../hooks/useRedux";
import {setCat} from "../store/AppSlice";
import StyledLink from "./Link";
import Text from "../components/Text";

const ModalContent = styled.div`
  padding: 2rem;
`;

interface Props {
    cat: Cat
}

const NoInfo = () => <Text>No information about breed is available :(</Text>;

const CatDetails: FunctionComponent<Props> = (props: Props): ReactElement => {
    const {cat} = props;

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    function onClick(breedId: string) {
        dispatch(setCat(null));

        navigate(`/breeds?breed_id=${breedId}`);
    }

    return (
        <ModalContent>
            {cat.breeds && cat.breeds.length ?
                cat.breeds.map((breed: Breed) => (
                    <StyledLink
                        key={breed.id}
                        onClick={() => onClick(breed.id)}
                    >
                        {breed.name}
                    </StyledLink>
                ))
                : <NoInfo/>}
        </ModalContent>
    )
}

export default CatDetails;