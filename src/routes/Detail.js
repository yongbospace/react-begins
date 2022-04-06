import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Loader = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
`;

const Wrapper = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  display: grid;
  grid-template-columns: repeat(2, minmax(400px, 1fr));
  gap: 50px;
  max-width: max-content;
  margin: auto;
  padding: 50px;
  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    width: 100%;
  }

  img {
    width: 100%;
    box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25),
      0 18px 36px -18px rgba(0, 0, 0, 0.3),
      0 -12px 36px -8px rgba(0, 0, 0, 0.025);
  }
`;

const Contents = styled.div`
  background-color: whitesmoke;
  padding: 20px;
  width: 100%;
  h1 {
    font-size: 36px;
    text-transform: uppercase;
  }
  p {
    margin: 50px 0px;
  }
  box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25),
    0 18px 36px -18px rgba(0, 0, 0, 0.3), 0 -12px 36px -8px rgba(0, 0, 0, 0.025);
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    margin: 5px 0px;
    li {
      margin-right: 10px;
      font-size: 14px;
      text-transform: uppercase;
    }
  }
`;

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json.data.movie);
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return loading ? (
    <Loader>Loading...</Loader>
  ) : (
    <Wrapper>
      <img src={movie.large_cover_image} />
      <Contents>
        <h1>{movie.title_long}</h1>
        <p>{movie.description_full}</p>
        <ul>
          {movie.genres.map((genre) => (
            <li key={genre}>{genre}</li>
          ))}
        </ul>
      </Contents>
    </Wrapper>
  );
}
export default Detail;
