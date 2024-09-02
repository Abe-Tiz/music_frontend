import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTotalSongsAlbumArtistRequest,
  fetchTotalSongsGenreRequest,
  fetchTotalSongsRequest,
} from "../../redux/songAlbumSlice";
import { RootState } from "../../redux/store";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { SubContainer } from "../../styles/Statistics";
import {   Title } from "../../styles/BarGraph";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AlbumList: React.FC = () => {
  const dispatch = useDispatch();
  const {
    totalSongByAlbum,
    // totalSongByGenre,
    totalSongAlbumByArtist,
    loading,
    error,
  } = useSelector((state: RootState) => state.album);

  useEffect(() => {
    dispatch(fetchTotalSongsRequest());
    dispatch(fetchTotalSongsAlbumArtistRequest());
    dispatch(fetchTotalSongsGenreRequest());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <SubContainer>
      <div>
        {/* Total Songs by Album */}
        <Title>The total number of songs found in each album.</Title>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={totalSongByAlbum}
              dataKey="totalSong"
              nameKey="_id"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {totalSongByAlbum.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="vertical" align="right" verticalAlign="middle" />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Total Songs and Albums by Artist */}
      <Title>The total number of songs and album for each artist. </Title>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={totalSongAlbumByArtist}
          margin={{ top: 5, right: 30, left: 20, bottom: 55 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="_id"
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            interval={0}
          />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="totalSongs" fill="#8884d8" name="Total Songs" />
          <Bar dataKey="totalAlbums" fill="#82ca9d" name="Total Albums" />
        </BarChart>
      </ResponsiveContainer>
    </SubContainer>
  );
};

export default AlbumList;
