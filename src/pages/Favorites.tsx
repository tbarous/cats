import React, {useEffect} from "react";
import {FunctionComponent, ReactElement} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/useRedux";
import Layout from "../layout/Layout";
import {fetchFavorites, removeFromFavorites} from "../store/actions/FavoritesActions"
import Image from "../components/Image";
import Favorite from "../models/Favorite";
import {Col, Row} from "react-bootstrap";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import Minus from "../icons/Minus";
import Header from "../components/styled/Header";
import {BasicComponentProps} from "../types";

const Wrapper = styled.div`
  height: 300px;
  margin-bottom: 2rem;
`;

const StyledHeartEmpty = styled(Minus)<{ onClick: () => void }>`
  width: 30px;
  height: 30px;
  position: absolute;
  bottom: 3rem;
  right: 2rem;
  background: white;
  padding: .5rem;
  box-sizing: content-box;
  border-radius: 8px;
  cursor: pointer;
`;

const ColCat = styled(Col)`
  position: relative;
`;

const Favorites: FunctionComponent<BasicComponentProps> = (props: BasicComponentProps): ReactElement => {
    const {favorites} = useAppSelector((state) => state.favorites);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!favorites.length) {
            dispatch(fetchFavorites());
        }
    }, [])

    function onSelectImage(favorite: Favorite) {
        navigate(`/?image_id=${favorite.image_id}`);
    }

    function onRemoveFromFavorites(e: Event, favorite: Favorite) {
        e.stopPropagation();

        dispatch(removeFromFavorites(favorite));
    }

    return (
        <Layout>
            <Header>Favorites</Header>

            <hr/>

            <Row>
                {favorites.map((favorite: Favorite) => (
                    <ColCat
                        key={favorite.id}
                        xs={12}
                        lg={3}
                        onClick={() => onSelectImage(favorite)}
                    >
                        <Wrapper>
                            <Image
                                src={favorite.image.url}
                            />

                            <StyledHeartEmpty
                                onClick={(e: Event) => onRemoveFromFavorites(e, favorite)}
                            />
                        </Wrapper>
                    </ColCat>
                ))}
            </Row>
        </Layout>
    )
}

export default Favorites;