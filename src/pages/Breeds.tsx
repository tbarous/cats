import React, {FunctionComponent, ReactElement, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/useRedux";
import {fetchBreeds, fetchCat, fetchCats, searchByBreed, setBreed, setCat} from "../store/AppSlice";
import styled from "styled-components";
import Cat from "../models/Cat";
import Button, {Variations} from "../components/Button";
import Modal from "../components/Modal";
import Breed from "../models/Breed";
import {Link, useNavigate} from "react-router-dom";
import Text from "../components/Text";
import {Col, Container, Row} from "react-bootstrap";
import {getParams} from "../helpers/URL";
import Layout from "../layout/Layout";
import Heart from "../icons/Heart";
import HeartEmpty from "../icons/HeartEmpty";
import Image from "../components/Image";
import Header from "../components/Header";

const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  margin-bottom: 2rem;
`;

const CatImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  cursor: pointer;
`;

const ModalImageWrapper = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
`;

const ModalCatImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const ModalContent = styled.div`
  padding: 2rem;
`;

const LoadMoreButton = styled(Button)`
  margin: 2rem 0;
`;

const BreedLink = styled(Link)`
  font-family: ${p => p.theme.fontFamily.primary};
`;

const StyledHeart = styled(Heart)`
  width: 20px;
  height: 20px;
  position: absolute;
  bottom: 0;
  right: 0;
`;

const StyledHeartEmpty = styled(HeartEmpty)`
  width: 20px;
  height: 20px;
  position: absolute;
  bottom: 0;
  right: 0;
`;

const BreedItem = styled(Text)`
  cursor: pointer;
  margin-bottom: 1rem;
`

interface Props {}

const Breeds: FunctionComponent<Props> = (props: Props): ReactElement => {
    const {breeds, loading, breed, breedCats} = useAppSelector((state) => state.app);

    const dispatch = useAppDispatch();

    let navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchBreeds());
    }, [])

    useEffect(() => {
        const breedId = getParams().breed_id;

        if (breedId) {
            const breedFound = breeds.find(b => b.id === breedId);

            if (breedFound) {
                activate(breedFound);
            }
        }
    }, [breeds])

    function activate(breed: Breed) {
        dispatch(setBreed(breed));
        dispatch(searchByBreed(breed.id));
    }

    function onClose() {
        dispatch(setBreed(null));
    }

    return (
        <Layout>
            <Header>Breeds</Header>

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
                    <Text>{breed.name}</Text>

                    {breedCats.map((cat: Cat) => (
                        <Link to={`/?cat_id=${cat.id}`}>
                            <Image src={cat.url}/>
                        </Link>
                    ))}
                </Modal>
            }
        </Layout>
    )
}

export default Breeds;