
import ListSong from './pages/list/ListSong'
import { Container } from './globalStyle/Container'
import Nav from './components/Nav'
import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
function App() {

  const backgroundImageUrl =
    "https://w0.peakpx.com/wallpaper/799/178/HD-wallpaper-moon-in-dark-purple-black-cloudy-sky-background-dark-purple-thumbnail.jpg";

  const StyledBody = styled.div`
    height: 100vh;
    background-image: url(${backgroundImageUrl});
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: "sans-serif";
    font-size: 20px;
  `;
  
  return (
    <>
      <Global
        styles={css`
          body {
            margin: 0;
          }
        `}
      />
      <StyledBody>
        <Nav />
        <Container>
          <ListSong />
        </Container>
      </StyledBody>
    </>
  );
}

export default App
