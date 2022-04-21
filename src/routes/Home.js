import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import styled from "styled-components";

const Header = styled.header`
  h1 {
    display: block;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 48px;
    font-weight: 800;
    color: rgba(0, 0, 0, 0.8);
    text-shadow: 0 30px 60px rgba(50, 50, 93, 0.25),
      0 18px 36px rgba(0, 0, 0, 0.3), 0 -12px 36px rgba(0, 0, 0, 0.025);
  }
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const Loader = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
`;

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(400px, 1fr));
  gap: 100px;
  padding: 60px 50px;
  width: 80%;
  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    width: 100%;
  }
`;

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  console.log(movies);
  return (
    <Container>
      <Header>
        <h1>Movies</h1>
      </Header>
      {loading ? (
        <Loader>
          <span>Loading...</span>
        </Loader>
      ) : (
        <Movies>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              year={movie.year}
              summary={movie.summary}
              genres={movie.genres}
            />
          ))}
        </Movies>
      )}
    </Container>
  );
}

export default Home;
