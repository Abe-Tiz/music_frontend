import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 65px;
  margin-top: 2rem;
`;

export const ListHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 3px;
  align-items: center;
`;

export const SongContainer = styled.ul`
  list-style: none;
  overflow-y: auto;
  padding: .5rem 2rem;
`;

export const SongList = styled.li`
    padding: 14px;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid gray;
`

export const FilterLabel = styled.label`
  font-family: "sans-serif";
  padding: 2px;
`;

export const FilterLabelLeft = styled(Link)`
  font-family: "sans-serif";
  padding: 2px 10px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid gray;
  color: white;

  &:hover {
    background-color: rgb(57, 5, 113);
    color: white;
    /* border: none; */
  }
`;

export const FilterSelect = styled.select`
  padding: 6px;
  font-family: "sans-serif";
  background-color: transparent;
  color: white;
  border: 1px solid gray;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export const FilterOption = styled.option`
  background-color: white;
  color: rgb(109, 13, 211);
  font-weight: 700;
`;

export const MusicList = styled.div`
  display: flex; 
  gap: 2rem;
`

export const EditButton = styled.button`
  margin-right: 1.5rem;
  padding: .4rem;
  width: auto;
  background-color: transparent;
  color: white;
  font-size: 1rem;
  cursor: pointer;
`

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  border: 16px solid #f3f3f3; 
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${spin} 2s linear infinite;
`;

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
`;
