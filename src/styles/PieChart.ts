import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const StatHeader = styled.h2`
    color: white !important;
    font-size: 15px;
    font-family: sans-serif;
    font-weight: bold;
`

export const BackLink = styled(Link)`
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
  }
`;

export const PieChartContainer = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-top: -25rem;
    gap: 15rem;

`