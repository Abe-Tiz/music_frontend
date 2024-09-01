import React, { useState } from "react";
import { AddSong, Logo, NavComponent } from "../styles/Nav";
import Modal from "./Modal";
import { FaPlusCircle } from "react-icons/fa";

const Nav: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // register new song
  const handleAddNew = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <NavComponent>
        <Logo href="#">Music App</Logo>
        <div>
          <AddSong onClick={handleAddNew}>
            <span>
              <FaPlusCircle />
            </span>
            Add New
          </AddSong>
        </div>
      </NavComponent>

      {/* display register new song modal */}
      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
    </>
  );
};

export default Nav;
