import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { getStats } from "./services/api";

function UrlStats({ short }) {
  const stats = getStats(short);
  return (
    <Card sx={{ mt:2 }}>
      <CardContent>
        <Typography variant="h6">Stats for {short}</Typography>
        <Typography>Total Clicks: {stats.length}</Typography>
        <ul>
          {stats.map((s, i) => (
            <li key={i}>{new Date(s.time).toLocaleString()} – Source: {s.source}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default UrlStats;
