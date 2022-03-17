import React, {useEffect} from "react";
import {FunctionComponent, ReactElement} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/useRedux";
import Cat from "../models/Cat";
import Layout from "../layout/Layout";
import Header from "../components/Header";
import {fetchFavorites} from "../store/AppSlice";
import Text from "../components/Text";
import Image from "../components/Image";
import Favorite from "../models/Favorite";
import {Col, Row} from "react-bootstrap";

interface Props {

}

const Favorites: FunctionComponent<Props> = (props: Props): ReactElement => {
    const {favorites} = useAppSelector((state) => state.app);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!favorites.length) {
            dispatch(fetchFavorites());
        }
    }, [])

    return (
        <Layout>
            <Header>Favorites</Header>

            <Row>
                {favorites.map((favorite: Favorite) => <Col
                    key={favorite.id}
                    xs={12}
                    lg={3}
                    // onClick={() => onOpen(cat)}
                >
                    <Image
                        src={favorite.image.url}
                    />
                </Col>)}
            </Row>
        </Layout>
    )
}

export default Favorites;