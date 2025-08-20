import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { validateUrl, validateShortcode } from './utils/validators';
import { createShortUrl } from './services/api';

function ShortenForm({ showShortUrl }) {
  const [longUrl, setLongUrl] = useState('');
  const [validity, setValidity] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateUrl(longUrl)) {
      setError('Invalid URL');
      return;
    }
    if (shortcode && !validateShortcode(shortcode)) {
      setError('Custom code must be 4-12 chars, alphanumeric/hyphen/underscore');
      return;
    }
    if (validity && (isNaN(validity) || validity <= 0)) {
      setError('Validity must be a positive number');
      return;
    }
    try {
      const data = createShortUrl({ longUrl, validity: validity ? +validity : undefined, shortcode });
      setError('');
      showShortUrl(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ p:2, gap:2 }}>
      <TextField label="Original URL" value={longUrl} onChange={e => setLongUrl(e.target.value)} required fullWidth />
      <TextField label="Validity (mins)" value={validity} onChange={e => setValidity(e.target.value)} placeholder="Default 30" fullWidth />
      <TextField label="Custom Shortcode" value={shortcode} onChange={e => setShortcode(e.target.value)} fullWidth />
      {error && <Box sx={{ color: 'red', my: 1 }}>{error}</Box>}
      <Button variant="contained" type="submit">Shorten</Button>
    </Box>
  );
}

export default ShortenForm;
