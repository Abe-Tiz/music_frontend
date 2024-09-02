import styled from "@emotion/styled";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
     
export const ModalContent = styled.div`
  background-color: #fff;
  padding: 3rem;
  margin-top: 1rem;
  color: rgb(0, 0, 0);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
`;

export const ModalBody = styled.div`
  padding: 0 1rem;

  form {
    display: grid;
    gap: 1rem;

    label {
      display: block;
      font-weight: bold;
    }

    input,
    select {
      width: 100%;
      padding: 0.5rem;
      margin-top: 0.5rem;
    }

    button {
      padding: 0.5rem 1rem;
      background-color: #333;
      color: #fff;
      border: none;
      cursor: pointer;
    }
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: red !important;
  border: 1px solid gray !important;
  padding: 8px;
  font-size: 20px;
  font-weight: bold;
  margin-top: -6rem;
  margin-right: -2rem;
`;

export const ModalTitle = styled.h2`
  font-size: 25px;
  font-family: sans-serif;
  text-align: start;
  /* margin-bottom: 2rem; */
`
