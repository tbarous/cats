import React, {FunctionComponent, ReactElement, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/useRedux";
import {fetchCats} from "../store/AppSlice";
import styled from "styled-components";
import Image from "../models/Image";
import Button, {Variations} from "../components/Button";
import Loader from "../components/Loader";

interface Props {

}

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const CatImage = styled.img`
  width: 300px;
  height: 300px;
`;

const Cats: FunctionComponent<Props> = (props: Props): ReactElement => {
    const dispatch = useAppDispatch();

    const {cats, loading} = useAppSelector((state) => state.cats);

    useEffect(() => {
        dispatch(fetchCats())
    }, []);

    return (
        <>
            {loading ? <Loader/> :
                <List>
                    {cats.map((cat: Image) => <CatImage src={cat.url}/>)}

                    <Button variation={Variations.primary}>Load More</Button>
                </List>
            }
        </>
    )
}

export default Cats;