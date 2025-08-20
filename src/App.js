import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import ShortenForm from './components/ShortenForm';
import ShortUrlCard from './components/ShortUrlCard';
import UrlStats from './components/UrlStats';
import { getLongUrl, logClick } from "./Services/Api";
import { useNavigate, Routes, Route } from 'react-router-dom';

function RedirectRoute() {
  const navigate = useNavigate();
  const { short } = useParams();
  try {
    const longUrl = getLongUrl(short);
    logClick(short, "browser");
    window.location.href = longUrl;
    return null;
  } catch (err) {
    return <Typography color="error" variant="h4">Invalid or expired link.</Typography>;
  }
}

function App() {
  const [lastShort, setLastShort] = useState(null);
  const [showStats, setShowStats] = useState(null);

  return (
    <Container maxWidth="sm" sx={{ mt:3 }}>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      <Routes>
        <Route path="/" element={
          <>
            <ShortenForm showShortUrl={setLastShort} />
            {lastShort && <ShortUrlCard {...lastShort} onStats={setShowStats} />}
            {showStats && <UrlStats short={showStats} />}
          </>
        } />
        <Route path="/r/:short" element={<RedirectRoute />} />
      </Routes>
    </Container>
  );
}

export default App;

