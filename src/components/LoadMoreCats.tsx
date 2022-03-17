import React from "react";
import styled from "styled-components";
import Button, {Variations} from "./Button";
import {useAppDispatch, useAppSelector} from "../hooks/useRedux";
import {useNavigate} from "react-router-dom";
import {fetchCats} from "../store/AppSlice";

const LoadMoreButton = styled(Button)`
  margin: 0 0 2rem 0;
  width: 200px;
`;

const LoadMoreCats = () => {
    const {page, loading} = useAppSelector((state) => state.app);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <LoadMoreButton
            onClick={() => dispatch(fetchCats())}
            variation={Variations.primary}
            hide={loading}
        >
            Load More
        </LoadMoreButton>
    )
}

export default LoadMoreCats;