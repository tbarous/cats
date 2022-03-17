import React, {FunctionComponent, ReactElement, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/useRedux";
import {fetchBreeds, searchByBreed, setBreed} from "../store/AppSlice";
import styled from "styled-components";
import Cat from "../models/Cat";
import Modal from "../components/Modal";
import Breed from "../models/Breed";
import {useNavigate} from "react-router-dom";
import Text from "../components/Text";
import {Col, Row} from "react-bootstrap";
import {getParams} from "../helpers/URL";
import Layout from "../layout/Layout";
import Image from "../components/Image";
import Header from "../components/Header";
import StyledLink from "../components/Link";

const BreedItem = styled(Text)`
  cursor: pointer;
  margin-bottom: 1rem;
`

const CatImage = styled(Image)`
  height: 200px;
  margin-bottom: 1rem;
`;

const Title = styled(Text)`
  padding: 1rem;
`;

interface Props {}

const Breeds: FunctionComponent<Props> = (props: Props): ReactElement => {
    const {breeds, loading, breed, breedCats} = useAppSelector((state) => state.app);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchBreeds());
    }, [])

    useEffect(() => {
        const breedId = getParams().breed_id;

        if (breedId) {
            const breedFound = breeds.find(b => b.id === breedId);

            if (breedFound) activate(breedFound);
        }
    }, [breeds])

    function activate(breed: Breed) {
        dispatch(setBreed(breed));

        dispatch(searchByBreed(breed.id));
    }

    function onClose() {
        dispatch(setBreed(null));
    }

    function onClickCat(cat: Cat) {
        console.log(cat);

        navigate(`/?cat_id=${cat.id}`);
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
                    <Title>{breed.name}</Title>

                    {breedCats.map((cat: Cat) => (
                        <StyledLink
                            onClick={() => onClickCat(cat)}
                            key={cat.id}
                        >
                            <CatImage
                                src={cat.url}
                            />
                        </StyledLink>
                    ))}
                </Modal>
            }
        </Layout>
    )
}

export default Breeds;