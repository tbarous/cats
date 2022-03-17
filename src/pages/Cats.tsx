import React, {FunctionComponent, ReactElement, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/useRedux";
import {fetchCat, fetchCats, fetchFavorites, like, removeFromFavorites, setCat} from "../store/AppSlice";
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
import favorites from "./Favorites";
import Favorite from "../models/Favorite";
import Text from "../components/Text";

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

const StyledHeart = styled(Heart)<{ onClick: () => void }>`
  width: 30px;
  height: 30px;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: white;
  cursor: pointer;
  padding: .5rem;
  box-sizing: content-box;
  border-radius: 8px;
`;

const CatImage = styled(Image)`
  height: 300px;
  margin-bottom: 2rem;
`;

const Info = styled.div`
  position: absolute;
  bottom: 0;
  background: green;
  color: white;
  width: 100%;
  padding: 1rem 0;
  text-align: center;
`;

interface Props {}

const Cats: FunctionComponent<Props> = (props: Props): ReactElement => {
    const {cats, cat, page, loading, favorites} = useAppSelector((state) => state.app);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const [likedInfo, setLikedInfo] = useState(false);

    useEffect(() => {
        if (likedInfo) {
            setTimeout(() => {
                setLikedInfo(false);
            }, 3000)
        }
    }, [likedInfo]);

    useEffect(() => {
        if (!cats.length) {
            dispatch(fetchCats());
        }

        const catId = getParams().cat_id;

        if (catId) {
            const existingCat = cats.find(cat => cat.id === catId);

            if (existingCat) {
                setCat({...existingCat});

                return;
            }

            dispatch(fetchCat(catId));
        }
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
                        <StyledHeart onClick={() => {
                            dispatch(like(cat));
                            setLikedInfo(true);
                        }}/>

                        <ModalCatImage src={cat.url}/>
                    </ModalImageWrapper>

                    <CatDetails cat={cat}/>

                    {likedInfo && <Info><Text>Added to favorites!</Text></Info>}
                </Modal>
            }
        </Layout>
    )
}

export default Cats;