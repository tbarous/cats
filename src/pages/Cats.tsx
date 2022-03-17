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

interface Props {

}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const CatImage = styled.img`
  width: 300px;
  height: 100px;
  margin-top: 1rem;
  border-radius: 8px;
  cursor: pointer;
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
        <Wrapper>
            <List>
                {cats.map((cat: Cat) => <CatImage onClick={() => setCat({...cat})} key={cat.id} src={cat.url}/>)}

                {!loading && <LoadMoreButton onClick={() => setPage(page + 1)} variation={Variations.primary}>Load
                    More</LoadMoreButton>}

                {loading && <Loader/>}
            </List>

            {cat && <Modal onClose={() => setCat(null)}>
                <CatImage src={cat.url}/>

                {cat.breeds.map((breed: Breed) => <Link to="/breeds">{breed.name}</Link>)}
            </Modal>}
        </Wrapper>
    )
}

export default Cats;