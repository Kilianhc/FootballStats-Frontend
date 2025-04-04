import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";

const StatChart = ({ title, data, dataKey1, dataKey2, unit, color1, color2, isSmallScreen }) => {
  return (
    <Card sx={{ boxShadow: 3, borderRadius: "20px", background: "rgba(0, 255, 255, 0.7)", backdropFilter: "blur(8px)", height: "100%" }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Typography variant="h6" mb={2}>{title}</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis fontSize="12px" dataKey="name" tick={!isSmallScreen} tickLine={!isSmallScreen} axisLine={!isSmallScreen} />
            <YAxis unit={unit} />
            <Tooltip />
            <Legend />
            <Bar dataKey={dataKey1} fill={color1} />
            {dataKey2 && <Bar dataKey={dataKey2} fill={color2} />}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default StatChart;
