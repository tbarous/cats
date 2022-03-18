import React, {FunctionComponent, ReactElement, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/useRedux";
import styled from "styled-components";
import Modal from "../components/Modal";
import {useNavigate} from "react-router-dom";
import {Col, Row} from "react-bootstrap";
import {getParams} from "../helpers/URL";
import Layout from "../layout/Layout";
import Heart from "../icons/Heart";
import ImageComponent from "../components/Image";
import {fetchImage, fetchImages} from "../store/actions/ImagesActions";
import Image from "../models/Image";
import {setImage} from "../store/slices/ImagesSlice";
import Header from "../components/styled/Header";
import {addToFavorites} from "../store/actions/FavoritesActions";
import ImageDetails from "../components/ImageDetails";
import Button, {Variations} from "../components/styled/Button";

const CatImage = styled(ImageComponent)`
  height: 300px;
  margin-bottom: 2rem;
`;

const LoadMoreButton = styled(Button)`
  margin: 0 0 2rem 0;
  width: 200px;
`;

const ModalImageWrapper = styled.div`
  height: 80%;
  position: relative;
`;

const ModalCatImage = styled(ImageComponent)`
  border-radius: 8px 8px 0 0;
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

const LoadMoreRow = styled(Row)`
  display: flex;
  justify-content: center;
`;

interface Props {}

const Images: FunctionComponent<Props> = (props: Props): ReactElement => {
    const {images, image} = useAppSelector((state) => state.images);
    const {loading} = useAppSelector((state) => state.app);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!images.length) {
            dispatch(fetchImages());
        }

        const imageId = getParams().image_id;

        if (imageId) {
            const existingImage = images.find(image => image.id === imageId);

            if (existingImage) {
                setImage({...existingImage});

                return;
            }

            dispatch(fetchImage(imageId));
        }
    }, [])

    function onOpen(image: Image) {
        dispatch(setImage(image));

        navigate(`?image_id=${image.id}`);
    }

    function onClose() {
        dispatch(setImage(null));

        navigate(`/`);
    }

    return (
        <Layout>
            <Header>Cats Images</Header>

            <hr/>

            <Row>
                {images.map((image: Image) => (
                    <Col
                        key={image.id}
                        xs={12}
                        lg={3}
                        onClick={() => onOpen(image)}
                    >
                        <CatImage
                            src={image.url}
                        />
                    </Col>
                ))}
            </Row>

            <LoadMoreRow>
                <LoadMoreButton
                    onClick={() => dispatch(fetchImages())}
                    variation={Variations.primary}
                    hide={loading}
                >
                    Load More
                </LoadMoreButton>
            </LoadMoreRow>

            {image &&
                <Modal
                    onClose={onClose}
                >
                    <ModalImageWrapper>
                        <StyledHeart onClick={() => dispatch(addToFavorites(image))}/>

                        <ModalCatImage src={image.url}/>
                    </ModalImageWrapper>

                    <ImageDetails image={image}/>
                </Modal>
            }
        </Layout>
    )
}

export default Images;