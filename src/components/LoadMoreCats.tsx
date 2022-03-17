import React from "react";
import styled from "styled-components";
import Button, {Variations} from "./Button";
import {useAppDispatch, useAppSelector} from "../hooks/useRedux";
import {useNavigate} from "react-router-dom";
import {fetchCats} from "../store/AppSlice";

const LoadMoreButton = styled(Button)`
  margin: 2rem 0;
`;

const LoadMoreCats = () => {
    const {page, loading} = useAppSelector((state) => state.app);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <LoadMoreButton
            onClick={() => dispatch(fetchCats(page + 1))}
            variation={Variations.primary}
            hide={loading}
        >
            Load More
        </LoadMoreButton>
    )
}

export default LoadMoreCats;