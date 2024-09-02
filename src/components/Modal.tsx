import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  CloseButton,
  ModalTitle,
} from "../styles/Modal";
import { createSong } from "../redux/songSlice";
import { GrClose } from "react-icons/gr";
import { z } from "zod";

 interface ModalProps {
   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
 }

const Modal: React.FC<ModalProps> = ({ setIsModalOpen }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [album, setAlbum] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("Rock");
  const [errors, setErrors] = useState<string[]>([]);

  // Zod schema for form validation
 const nonNumericString = z.string().refine((val) => {
   return /^[a-zA-Z\s]+$/.test(val);
 }, "Invalid input: only alphabetic characters and spaces are allowed");

 const songSchema = z.object({
   title: nonNumericString,
   album: nonNumericString,
   artist: nonNumericString,
   genre: z.enum([
     "Rock",
     "Pop",
     "Jazz",
     "Traditional",
     "Reggae",
     "cork",
     "Folk",
   ]),
 });

  // handle close events
  const handleClose = () => {
    setIsModalOpen(false);
  };

  // handle submit button events
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form data using Zod
    const validationResult = songSchema.safeParse({
      title,
      album,
      artist,
      genre,
    });

    if (!validationResult.success) {
      const errorMessages = validationResult.error.errors.map(
        (error) => error.message
      );
      setErrors(errorMessages);
      return;
    }

    const newSong = { title, album, artist, genre };
    dispatch(createSong(newSong));
    setIsModalOpen(false);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Register Song</ModalTitle>
          <CloseButton onClick={handleClose}>
            <GrClose />
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          {errors.length > 0 && (
            <ul>
              {errors.map((error, index) => (
                <li key={index} style={{ color: "red" }}>
                  {error}
                </li>
              ))}
            </ul>
          )}
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
                <option value="">Select Genre</option>
                <option value="Rock">Rock</option>
                <option value="Pop">Pop</option>
                <option value="Jazz">Jazz</option>
                <option value="Traditional">Traditional</option>
                <option value="Reggae">Reggae</option>
                <option value="cork">cork</option>
                <option value="Folk">Folk</option>
              </select>
            </label>
            <button type="submit">Submit</button>
          </form>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
