import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  font-weight: 300;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  background-color: whitesmoke;
  padding: 20px;
  text-decoration: none;
  display: grid;
  border-radius: 5px;
  grid-template-columns: minmax(150px, 1fr) 2fr;
  gap: 20px;
  margin-bottom: 70px;
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);

  img {
    position: relative;
    top: -50px;
    max-width: 150px;
    width: 100%;
    margin-right: 30px;
    box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25),
      0 18px 36px -18px rgba(0, 0, 0, 0.3),
      0 -12px 36px -8px rgba(0, 0, 0, 0.025);
  }
  div {
    h2 {
      a {
        font-size: 24px;
        color: #2c2c2c;
        text-decoration: none;
      }
    }
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
      }
    }
  }
`;

function Movie({ id, coverImg, title, year, summary, genres }) {
  return (
    <Wrapper>
      <img src={coverImg} />
      <div>
        {" "}
        <h2>
          <Link to={`/movie/${id}`}>{title}</Link>
        </h2>
        <h3>{year}</h3>
        <p>{summary.length > 235 ? `${summary.slice(0, 235)}...` : summary}</p>
        <ul>
          {genres.map((genre) => (
            <li key={genre}>{genre}</li>
          ))}
        </ul>
      </div>
    </Wrapper>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
