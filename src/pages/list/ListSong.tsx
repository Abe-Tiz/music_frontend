import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSong, fetchSongs, fetchSongsByGenre } from "../../redux/songSlice";
import { Song } from "../../redux/types";
import { EditButton, FilterLabel, FilterLabelLeft, FilterOption, FilterSelect, ListContainer, ListHeader, MusicList, SongContainer, SongList } from "./List";
import { HiMusicalNote } from "react-icons/hi2";
import EditModal from "../../components/EditModal";
import { RootState } from "../../redux/store";
import ConfirmationModal from "../../components/ConfirmationModal";

const ListSong: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(""); 
   const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState<boolean>(false);
  const [songToDelete, setSongToDelete] = useState<string | null>(null);
  
  const genres = ["Traditional", "Pop", "Reggae", "cork", "Folk", "Jazz", "Rock"]; 
  
  const dispatch = useDispatch();
  const songs = useSelector((state: RootState) => state.songs.songs);

  useEffect(() => { 
        if (selectedGenre) {
          dispatch(fetchSongsByGenre(selectedGenre));
        } else {
          dispatch(fetchSongs());
        }
  }, [dispatch, selectedGenre]);

  // handle delete opration
   const handleDelete = (id:string) => {
     setSongToDelete(id);
     setIsConfirmDeleteOpen(true);
  };
  
  // confirm delete opration
    const confirmDelete = () => {
      if (songToDelete) {
        dispatch(deleteSong(songToDelete));
        setSongToDelete(null);
      }
      setIsConfirmDeleteOpen(false);
    };

  // cancel delete function
    const cancelDelete = () => {
      setSongToDelete(null);
      setIsConfirmDeleteOpen(false);
    };

  // handle edit function
  const handleEdit = (song: any) => {
    setSelectedSong(song);
    setIsEditModalOpen(true);
  };

   const handleGenreChange = (e:any) => {
     setSelectedGenre(e.target.value);  
   };

  return (
    <>
      <ListContainer>

        {/* filter  and statistics button  */}
        <ListHeader>
          <FilterLabelLeft to="/statistics" >
            Statistics
          </FilterLabelLeft>
          <FilterLabel>
            Filter by Genre:
            <FilterSelect value={selectedGenre} onChange={handleGenreChange}>
              <FilterOption value="">All</FilterOption>
              {genres.map((genre) => (
                <FilterOption key={genre} value={genre}>
                  {genre}
                </FilterOption>
              ))}
            </FilterSelect>
          </FilterLabel>
        </ListHeader>

        {/* list of songs */}
        <SongContainer>
          {songs.map((song: Song, index: number) => (
            <SongList key={index}>
              <MusicList>
                {" "}
                <HiMusicalNote style={{ marginRight: "5px", color: "white" }} />
                {song.title} - {song.artist}
              </MusicList>

              <div>
                <EditButton onClick={() => handleEdit(song)}>Edit</EditButton>
                <EditButton onClick={() => handleDelete(song._id)}>
                  delete
                </EditButton>
              </div>
            </SongList>
          ))}
        </SongContainer>
      </ListContainer>

      {/* display edit modal */}
      {isEditModalOpen && (
        <EditModal
          setIsModalOpen={setIsEditModalOpen}
          song={selectedSong} 
        />
      )}

      {/* display the delete confimation message */}
      {isConfirmDeleteOpen && (
        <ConfirmationModal
          message="Are you sure you want to delete this song?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </>
  );
};

export default ListSong;
