import React, {FunctionComponent, ReactElement, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/useRedux";
import {fetchCat, fetchCats, like, setCat} from "../store/AppSlice";
import styled from "styled-components";
import Cat from "../models/Cat";
import Modal from "../components/Modal";
import {useNavigate} from "react-router-dom";
import {Col, Row} from "react-bootstrap";
import {getParams} from "../helpers/URL";
import Layout from "../layout/Layout";
import Heart from "../icons/Heart";
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

interface Props {}

const Cats: FunctionComponent<Props> = (props: Props): ReactElement => {
    const {cats, cat} = useAppSelector((state) => state.app);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        if (!cats.length) dispatch(fetchCats());

        getCatFromURL();
    }, [])

    function getCatFromURL() {
        const catId = getParams().cat_id;

        if (catId) {
            const existingCat = cats.find(cat => cat.id === catId);

            if (existingCat) {
                setCat({...existingCat});

                return;
            }

            dispatch(fetchCat(catId));
        }
    }

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

            <hr/>

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
                        <StyledHeart onClick={() => dispatch(like(cat))}/>

                        <ModalCatImage src={cat.url}/>
                    </ModalImageWrapper>

                    <CatDetails cat={cat}/>
                </Modal>
            }
        </Layout>
    )
}

export default Cats;