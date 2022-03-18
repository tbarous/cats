import React, {FunctionComponent, ReactElement, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/useRedux";
import {fetchBreeds, searchByBreed} from "../store/actions/BreedsActions";
import {setBreed, setBreedImages} from "../store/slices/BreedsSlice";
import styled from "styled-components";
import Modal from "../components/Modal";
import Breed from "../models/Breed";
import {useNavigate} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import {getParams} from "../helpers/URL";
import Layout from "../layout/Layout";
import ImageComponent from "../components/Image";
import Image from "../models/Image";
import Header from "../components/styled/Header";
import StyledLink from "../components/styled/Link";
import Text from "../components/styled/Text";

const BreedItem = styled(Text)`
  cursor: pointer;
  margin-bottom: 1rem;
`

const CatImage = styled(ImageComponent)`
  height: 200px;
  margin-bottom: 1rem;
`;

const Title = styled(Text)`
  padding: 1rem;
`;

interface Props {}

const Breeds: FunctionComponent<Props> = (props: Props): ReactElement => {
    const {breeds, breed, breedImages} = useAppSelector((state) => state.breeds);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!breeds.length) {
            dispatch(fetchBreeds());
        }
    }, [])

    useEffect(() => {
        const breedId = getParams().breed_id;

        if (breedId) {
            const breedFound = breeds.find((breed: Breed) => breed.id === breedId);

            if (breedFound) {
                activate(breedFound);
            }
        }
    }, [breeds])

    function activate(breed: Breed) {
        dispatch(setBreed(breed));

        dispatch(searchByBreed(breed.id));

        navigate(`/breeds?breed_id=${breed.id}`);
    }

    function onClose() {
        dispatch(setBreed(null));

        dispatch(setBreedImages([]));

        navigate(`/breeds`);
    }

    function onImageSelect(image: Image) {
        onClose();

        navigate(`/?image_id=${image.id}`);
    }

    return (
        <Layout>
            <Header>Breeds</Header>

            <hr/>

            <Row>
                {breeds.map((breed: Breed) => (
                    <Col
                        key={breed.id}
                        xs={12}
                        lg={4}
                    >
                        <BreedItem
                            onClick={() => activate(breed)}
                        >
                            {breed.name}
                        </BreedItem>
                    </Col>
                ))}
            </Row>

            {breed &&
                <Modal
                    onClose={onClose}
                >
                    <Title>{breed.name}</Title>

                    <Container>
                        <Row>
                            {breedImages.map((image: Image) => (
                                <Col
                                    key={image.id}
                                    xs={6}
                                >
                                    <StyledLink
                                        onClick={() => onImageSelect(image)}
                                    >
                                        <CatImage
                                            src={image.url}
                                        />
                                    </StyledLink>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </Modal>
            }
        </Layout>
    )
}

export default Breeds;