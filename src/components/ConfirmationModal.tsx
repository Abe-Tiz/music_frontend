import React from "react";
import styled from "@emotion/styled";

// interface for confirmation modal
interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: white;
  color: black !important;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Button = styled.button`
  margin: 0 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: ${({ isConfirm }) => (isConfirm ? "#4f057b" : "red")};
  color: #fff;

  &:hover {
    opacity: 0.9;
  }
`;

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  
  return (
    <ModalOverlay>
      <ModalContainer>
        <p>{message}</p>
        <Button onClick={onCancel}>Cancel</Button>
        <Button isConfirm onClick={onConfirm}>
          Delete
        </Button>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ConfirmationModal;
