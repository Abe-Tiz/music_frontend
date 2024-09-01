import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  CloseButton,
  ModalTitle,
} from "../styles/Modal";
import { updateSong } from "../redux/songSlice";  
import { GrClose } from "react-icons/gr"; 

interface ModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  song: any;  
}

const EditModal: React.FC<ModalProps> = ({ setIsModalOpen, song }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [album, setAlbum] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("rock");

  useEffect(() => {
    // Fill the fields with the selected song's data
    if (song) {
      setTitle(song.title);
      setAlbum(song.album);
      setArtist(song.artist);
      setGenre(song.genre);
    }
  }, [song]);

  // close the modal
  const handleClose = () => {
    setIsModalOpen(false);
  };

  // handle submit button
  const handleSubmit = (e:any) => {
    e.preventDefault();
    const updatedSong = { ...song, title, album, artist, genre }; 
    dispatch(updateSong(updatedSong)); 
    setIsModalOpen(false);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Edit Song</ModalTitle>
          <CloseButton onClick={handleClose}>
            {" "}
            <GrClose />
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              Album:
              <input
                type="text"
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
              />
            </label>
            <label>
              Artist:
              <input
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
              />
            </label>
            <label>
              Genre:
              <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                <option value="Rock">Rock</option>
                <option value="Pop">Pop</option>
                <option value="Jazz">Jazz</option>
                <option value="Traditional">Traditional</option>
                <option value="Reggae">Reggae</option>
                <option value="cork">cork</option>
                <option value="Folk">Folk</option>
              </select>
            </label>
            <button type="submit">Update</button>
          </form>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EditModal;
