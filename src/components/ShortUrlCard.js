import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

function ShortUrlCard({ short, expireAt, onStats }) {
  const shortUrl = `${window.location.origin}/r/${short}`;
  return (
    <Card sx={{ mt:2 }}>
      <CardContent>
        <Typography variant="h6">Short URL: <a href={shortUrl}>{shortUrl}</a></Typography>
        <Typography color="textSecondary">Expires at: {new Date(expireAt).toLocaleString()}</Typography>
        <Button variant="outlined" sx={{ mt:1 }} onClick={() => onStats(short)}>View Stats</Button>
      </CardContent>
    </Card>
  );
}

export default ShortUrlCard;
