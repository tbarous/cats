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

interface Props {}

const Breeds: FunctionComponent<Props> = (props: Props): ReactElement => {
    const dispatch = useAppDispatch();

    let navigate = useNavigate();

    const {breeds, loading, breed, breedCats} = useAppSelector((state) => state.app);

    useEffect(() => {
        const breedId = getParams().breed_id;

        if (breedId) {
            dispatch(setBreed(breeds.find(b => b.id === breedId)))
        }
    }, [])

    useEffect(() => {
        if (breed) {
            navigate(`?breed_id=${breed.id}`, {replace: true});

            return;
        }

        navigate("/");
    }, [breed])

    useEffect(() => {
        dispatch(fetchBreeds());
    }, [])


    function onClick(breed: Breed) {
        dispatch(setBreed(breed));
        dispatch(searchByBreed(breed.id));
    }

    return (
        <Layout>
            <Row>
                {breeds.map((breed: Breed) => (
                    <Col
                        key={breed.id}
                        xs={12}
                        lg={4}
                    >
                        <Text
                            onClick={() => onClick(breed)}
                        >
                            {breed.name}
                        </Text>
                    </Col>
                ))}
            </Row>

            {breed &&
                <Modal
                    onClose={() => dispatch(setBreed(null))}
                >
                    {breed.name}

                    {breedCats.map(breedCat => <Link to={`/?cat_id=${breedCat.id}`}><Image src={breedCat.url}/></Link>)}
                </Modal>
            }
        </Layout>
    )
}

export default Breeds;