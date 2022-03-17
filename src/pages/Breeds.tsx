import React, {FunctionComponent, ReactElement, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/useRedux";
import {fetchBreeds, fetchCat, fetchCats, setCat} from "../store/AppSlice";
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

    const {breeds, loading, breed} = useAppSelector((state) => state.app);

    // useEffect(() => {
    //     const urlCatId = getParams().cat_id;
    //
    //     if (urlCatId) {
    //         dispatch(fetchCat(urlCatId))
    //     }
    // }, [])

    // useEffect(() => {
    //     if (cat) {
    //         navigate(`?cat_id=${cat.id}`, {replace: true});
    //
    //         return;
    //     }
    //
    //     navigate("/");
    // }, [cat])

    useEffect(() => {
        dispatch(fetchBreeds());
    }, [])

    return (
        <Layout>
            <Row>
                {breeds.map((breed: Breed) => <Col key={breed.id} xs={12} lg={4}>
                        <div>
                            {breed.name}
                        </div>
                </Col>)}
            </Row>

            {breed && 1
                // <Modal onClose={() => dispatch(setCat(null))}>
                //     <ModalImageWrapper>
                //         <StyledHeartEmpty/>
                //         <StyledHeart />
                //
                //         <ModalCatImage src={cat.url}/>
                //     </ModalImageWrapper>
                //
                //     <ModalContent>
                //         {cat.breeds && cat.breeds.length ?
                //             cat.breeds.map((breed: Breed) => <BreedLink to="/breeds">{breed.name}</BreedLink>)
                //             : <Text>No information about breed is available</Text>}
                //     </ModalContent>
                // </Modal>
            }
        </Layout>
    )
}

export default Breeds;