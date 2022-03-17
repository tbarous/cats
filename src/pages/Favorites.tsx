import React, {useEffect} from "react";
import {FunctionComponent, ReactElement} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/useRedux";
import Layout from "../layout/Layout";
import Header from "../components/Header";
import {fetchFavorites, removeFromFavorites} from "../store/AppSlice";
import Image from "../components/Image";
import Favorite from "../models/Favorite";
import {Col, Row} from "react-bootstrap";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import Minus from "../icons/Minus";

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

interface Props {}

const Favorites: FunctionComponent<Props> = (props: Props): ReactElement => {
    const {favorites} = useAppSelector((state) => state.app);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        if (!favorites.length) {
            dispatch(fetchFavorites());
        }
    }, [])

    function onCatClick(favorite: Favorite) {
        navigate(`/?cat_id=${favorite.image_id}`);
    }

    return (
        <Layout>
            <Header>Favorites</Header>

            <hr/>

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

                        <StyledHeartEmpty
                            onClick={(e: Event) => {
                            e.stopPropagation();

                            dispatch(removeFromFavorites(favorite))
                        }}/>
                    </Wrapper>
                </ColCat>)}
            </Row>
        </Layout>
    )
}

export default Favorites;