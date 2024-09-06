import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSong, fetchSongs, fetchSongsByGenre } from "../../redux/songSlice";
import { Song } from "../../redux/types";
import { EditButton, FilterLabel, FilterLabelLeft, FilterOption, FilterSelect, ListContainer, ListHeader, MusicList, ShowVideo, SongContainer, SongList, Spinner, SpinnerContainer, VideoPlayer } from "./List";
import { HiMusicalNote } from "react-icons/hi2";
import EditModal from "../../components/EditModal";
import { RootState } from "../../redux/store";
import ConfirmationModal from "../../components/ConfirmationModal";
import axios from "axios";
import YouTube from "react-youtube";

const ListSong: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(); 
   const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState<boolean>(false);
  const [songToDelete, setSongToDelete] = useState(null);

   const [videoId, setVideoId] = useState<string | null>(null);
   const [musicLoading, setMusicLoading] = useState<boolean>(false);
  
  const genres = ["Traditional", "Pop", "Reggae", "cork", "Folk", "Jazz", "Rock"]; 
  
  const dispatch = useDispatch();
   const { songs, loading } = useSelector((state: RootState) => state.songs);

  useEffect(() => { 
        if (selectedGenre) {
          dispatch(fetchSongsByGenre(selectedGenre));
        } else {
          dispatch(fetchSongs());
        }
  }, [dispatch, selectedGenre]);

  // console.log("env",import.meta.env.VITE_YOUTUB_API_KEY);

  // handle delete opration
   const handleDelete = (id:any) => {
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

    const fetchYouTubeVideo = async (title: string, artist: string) => {
      setMusicLoading(true);

      try {
        const apiKey = import.meta.env.VITE_YOUTUB_API_KEY; 
        const query = `${title} and ${artist} official music video`;
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search`,
          {
            params: {
              part: "snippet",
              maxResults: 1,
              q: query,
              key: apiKey,
              type: "video",
            },
          }
        );

        if (response.data.items.length > 0) {
          const videoId = response.data.items[0].id.videoId;
          setVideoId(videoId); 
          console.log(videoId);
        } else {
          console.error("No video found");
        }
      } catch (error) {
        console.error("Error fetching video:", error);
      } finally {
        setMusicLoading(false);
      }
    };
  
  const handleMusicPlay = (title: string, artist: string) => {
    fetchYouTubeVideo(title, artist);
  };

  return (
    <>
      <ListContainer>
        <VideoPlayer>
          {musicLoading ? (
            <p>Loading ..... </p>
          ) : videoId ? (
            // <VideoPlayer>
            <YouTube
              videoId={videoId}
              opts={{
                width: "600",
                height: "150",
                borderRadius: "2rem",
                playerVars: {
                  autoplay: 1,
                  controls: 1,
                  modestbranding: 1,
                },
              }}
            />
          ) : (
            // </VideoPlayer>
            <ShowVideo>Display Video</ShowVideo>
          )}
        </VideoPlayer>

        {/* filter  and statistics button  */}
        <ListHeader>
          <FilterLabelLeft to="/statistics">Statistics</FilterLabelLeft>
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
          {loading ? (
            <SpinnerContainer>
              <Spinner />
            </SpinnerContainer>
          ) : (
            songs.map((song: Song, index: number) => (
              <SongList key={index}>
                <MusicList>
                  {" "}
                  <EditButton
                    onClick={() => handleMusicPlay(song.title, song.artist)}
                  >
                    {" "}
                    <HiMusicalNote
                      style={{ marginRight: "5px", color: "white" }}
                    />
                  </EditButton>
                  {song.title} - {song.artist}
                </MusicList>

                <div>
                  <EditButton onClick={() => handleEdit(song)}>Edit</EditButton>
                  <EditButton onClick={() => handleDelete(song._id)}>
                    delete
                  </EditButton>
                </div>
              </SongList>
            ))
          )}
        </SongContainer>
      </ListContainer>

      {/* display edit modal */}
      {isEditModalOpen && (
        <EditModal setIsModalOpen={setIsEditModalOpen} song={selectedSong} />
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
