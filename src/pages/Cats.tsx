import React, {FunctionComponent, ReactElement, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/useRedux";
import {fetchCat, fetchCats, setCat} from "../store/AppSlice";
import styled from "styled-components";
import Cat from "../models/Cat";
import Button, {Variations} from "../components/Button";
import Modal from "../components/Modal";
import Breed from "../models/Breed";
import {Link, useNavigate} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import {getParams} from "../helpers/URL";
import Layout from "../layout/Layout";
import Heart from "../icons/Heart";
import HeartEmpty from "../icons/HeartEmpty";
import Image from "../components/Image";
import CatDetails from "../components/CatDetails";
import LoadMoreCats from "../components/LoadMoreCats";
import Header from "../components/Header";

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

const CatImage = styled(Image)`
  height: 300px;
  margin-bottom: 2rem;
`;

interface Props {}

const Cats: FunctionComponent<Props> = (props: Props): ReactElement => {
    const {cats, cat, page, loading} = useAppSelector((state) => state.app);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCats(page + 1));

        const catId = getParams().cat_id;

        if (catId) dispatch(fetchCat(catId));
    }, [])

    function onOpen(cat: Cat) {
        dispatch(setCat(cat));

        navigate(`?cat_id=${cat.id}`);
    }

    function onClose() {
        dispatch(setCat(null));

        navigate(`/`);
    }

    return (
        <Layout>
            <Header>Cats</Header>

            <Row>
                {cats.map((cat: Cat) => <Col
                    key={cat.id}
                    xs={12}
                    lg={3}
                    onClick={() => onOpen(cat)}
                >
                    <CatImage
                        src={cat.url}
                    />
                </Col>)}
            </Row>

            <LoadMoreCats/>

            {cat &&
                <Modal
                    onClose={onClose}
                >
                    <ModalImageWrapper>
                        <StyledHeartEmpty/>
                        <StyledHeart/>

                        <ModalCatImage src={cat.url}/>
                    </ModalImageWrapper>

                    <CatDetails cat={cat}/>
                </Modal>
            }
        </Layout>
    )
}

export default Cats;