import styled from "@emotion/styled";

export const NavComponent = styled.nav`
  display: flex;
  background-color: rgb(57, 5, 113);
  justify-content: space-between;
  align-items: center;
  color: #fff;
  width: 100%;
  /* gap: 35rem; */
  /* @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  } */
`;

export const Logo = styled.a`
  font-size: 1.5rem;
  text-decoration: none;
  color: #fff;
  margin-left: 5rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

export const AddSong = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 1.5rem;
  margin-right: 5rem;
  padding:1rem ;

  span {
    margin-right: 0.5rem;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;
