import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const StatContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  gap: 1.5rem;
  padding:1rem 5rem;

  
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`;

export const SubContainer = styled.div`
     width: 100%;
     display: flex;
     flex-direction: column;
     padding-bottom: 2rem;
     padding-top: 2rem;
`

export const Title = styled.h2`
  font-size: 20px;
  font-family: sans-serif;
  font-weight: 400;
  color: "#000000";


  @media (max-width: 768px) {
   padding-top: 2rem;
   
  }
`;

export const BackLink = styled(Link)`
  cursor: pointer;
  background-color: transparent;
  width: 2rem;
  height: 1rem;
  text-align: center;
  padding: 5px 10px;
  color:white;
  text-decoration: none;
  border: 2px solid gray;

  &:hover {
    background-color: rgb(40, 29, 52);
    color: white;
  }
`;