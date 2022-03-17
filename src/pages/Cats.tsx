import React, {FunctionComponent, ReactElement, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/useRedux";
import {fetchCats} from "../store/AppSlice";
import styled from "styled-components";
import Cat from "../models/Cat";
import Button, {Variations} from "../components/Button";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import Breed from "../models/Breed";
import {Link, useNavigate} from "react-router-dom";
import Text from "../components/Text";
import {Col, Container, Row} from "react-bootstrap";

interface Props {

}

const Wrapper = styled.div`

`;

const ImageWrapper = styled.div`
  width: 300px;
  height: 300px;
  margin: 0 2rem;
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

const Cats: FunctionComponent<Props> = (props: Props): ReactElement => {
    const dispatch = useAppDispatch();

    let navigate = useNavigate();

    const {cats, loading} = useAppSelector((state) => state.cats);

    const [cat, setCat] = useState<Cat | null>(null);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        if (cat) {
            navigate(`?cat=${cat.id}`)
        }

        navigate("/");
    }, [cat])

    useEffect(() => {
        dispatch(fetchCats(page));
    }, [page])

    return (
        <Container>
            <Row>
                {cats.map((cat: Cat) => <Col xs={12} lg={4}>
                    <ImageWrapper>
                        <CatImage
                            onClick={() => setCat({...cat})}
                            key={cat.id}
                            src={cat.url}
                        />
                    </ImageWrapper>
                </Col>)}
            </Row>

            {loading && <Loader/>}

            {!loading &&
                <LoadMoreButton
                    onClick={() => setPage(page + 1)}
                    variation={Variations.primary}
                >
                    Load More
                </LoadMoreButton>
            }

            {cat && <Modal onClose={() => setCat(null)}>
                <ModalImageWrapper>
                    <ModalCatImage src={cat.url}/>
                </ModalImageWrapper>

                <ModalContent>
                    {cat.breeds && cat.breeds.length ?
                        cat.breeds.map((breed: Breed) => <Link to="/breeds">{breed.name}</Link>)
                        : <Text>No information about breed is available</Text>}
                </ModalContent>
            </Modal>}
        </Container>
    )
}

export default Cats;