import React, {useEffect} from "react";
import {FunctionComponent, ReactElement} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/useRedux";
import Cat from "../models/Cat";
import Layout from "../layout/Layout";
import Header from "../components/Header";
import {fetchFavorites, removeFromFavorites} from "../store/AppSlice";
import Text from "../components/Text";
import Image from "../components/Image";
import Favorite from "../models/Favorite";
import {Col, Row} from "react-bootstrap";
import styled from "styled-components";
import HeartEmpty from "../icons/HeartEmpty";
import {useNavigate} from "react-router-dom";

interface Props {

}

const Wrapper = styled.div`
  height: 300px;
  margin-bottom: 2rem;
`;

const StyledHeartEmpty = styled(HeartEmpty)<{ onClick: () => void }>`
  width: 30px;
  height: 30px;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: white;
  padding: .5rem;
  box-sizing: content-box;
  border-radius: 8px;
  cursor: pointer;
`;

const ColCat = styled(Col)`
  position: relative;

`;

const Favorites: FunctionComponent<Props> = (props: Props): ReactElement => {
    const {favorites} = useAppSelector((state) => state.app);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();


    useEffect(() => {
        if (!favorites.length) {
            dispatch(fetchFavorites());
        }
    }, [])

    function onCatClick(e, favorite: Favorite) {
        e.stopPropagation();
        e.preventDefault();
        navigate(`/?cat_id=${favorite.image_id}`);
    }

    return (
        <Layout>
            <Header>Favorites</Header>

            <Row>
                {favorites.map((favorite: Favorite) => <ColCat
                    key={favorite.id}
                    xs={12}
                    lg={3}
                    onClick={() => onCatClick(favorite)}
                >
                    <Wrapper>
                        <Image
                            src={favorite.url || favorite.image.url}
                        />

                        <StyledHeartEmpty onClick={() => dispatch(removeFromFavorites(favorite))}/>
                    </Wrapper>
                </ColCat>)}
            </Row>
        </Layout>
    )
}

export default Favorites;