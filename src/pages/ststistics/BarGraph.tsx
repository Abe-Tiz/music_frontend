import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ChartContainer, Title } from "../../styles/BarGraph";
import { RootState } from "@reduxjs/toolkit/query";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalAlbumsStart, fetchTotalArtistsStart, fetchTotalGenresStart, fetchTotalSongsStart } from "../../redux/statSlice";
import { fetchTotalSongsGenreRequest } from "../../redux/songAlbumSlice";

const BarGraph: React.FC = () => {
  const dispatch = useDispatch();
  const { totalSongs, totalArtists, totalAlbums, totalGenres, loading, error } =
    useSelector((state: RootState) => state.stat);
  const {totalSongByGenre } =
    useSelector((state: RootState) => state.album);

  useEffect(() => {
    dispatch(fetchTotalSongsStart());
    dispatch(fetchTotalArtistsStart());
    dispatch(fetchTotalAlbumsStart());
    dispatch(fetchTotalGenresStart());
      dispatch(fetchTotalSongsGenreRequest());
  }, [dispatch]);

  const data = [
    { name: "Total Songs", value: totalSongs },
    { name: "Total Artists", value: totalArtists },
    { name: "Total Albums", value: totalAlbums },
    { name: "Total Genres", value: totalGenres },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
 
  const COLORS = ["#3a7cb6", "#0e7663", "#f0c567", "#b3430b"];

  return (
    <ChartContainer>
      <Title>
        The total Number of songs, albums, artists and genre registered in the
        music.
      </Title>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 35 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12 }}
          angle={-45}
          textAnchor="end"
          interval={0}
        />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>

      <div>
        <Title>The total Number of songs for each genres .</Title>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={totalSongByGenre}
              dataKey="totalSongs"
              nameKey="_id"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {totalSongByGenre.map((entry:string,index:number) => (
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
    </ChartContainer>
  );
};

export default BarGraph;
