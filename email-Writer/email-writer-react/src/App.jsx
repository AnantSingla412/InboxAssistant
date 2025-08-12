// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css'
// import { Container, Typography, Box, TextField, FormControl, InputLabel, Select, MenuItem, CircularProgress, Button } from '@mui/material';
// // ...existing code...
// function App() {
//   const [emailContent, setEmailContent] = useState('');
//   const [tone, setTone] = useState('');
//   const [generatedReply, setGeneratedReply] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.post("http://localhost:8080/api/email/generate",{
//         emailContent,
//         tone
//       });
//       setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
//     }catch (error){
//       setError('Error generating reply');
//       console.error(error); 
//     }finally{
//       setLoading(false);
//     }
//   };
//   return (
//     <Container maxWidth="md" sx={{py:4}}>
//       <Typography variant="h3" component="h1" gutterBottom>
//         Email Reply Generator
//       </Typography>

//       <Box sx={{mx: 3}}>
//         <TextField
//         fullWidth
//         multiline
//         rows={4}
//         variant="outlined"
//         label="Email Content"
//         value={emailContent || ''}
//         onChange={(e) => setEmailContent(e.target.value)}
//         sx={{mb: 2}}
//         />
        
//         <FormControl fullWidth sx={{mb: 2}}>
//           <InputLabel>Tone(Optional)</InputLabel>
//           <Select
//             value={tone || ''}
//             label="Tone(Optional)"
//             onChange={(e) => setTone(e.target.value)}>
//             <MenuItem value="friendly">Friendly</MenuItem>
//             <MenuItem value="professional">Professional</MenuItem>
//             <MenuItem value="casual">Casual</MenuItem>
//             </Select>
//         </FormControl>
      
//         <Button
//           variant = 'contained'
//           onClick={handleSubmit}
//           disabled={!emailContent || loading}
//           fullWidth>
//           {loading ? <CircularProgress size={24}/> : "Generate Reply"}
//         </Button>
//       </Box>
//         {error && (
//           <Typography color="error" sx={{mt: 2}}>
//             EmailReplyGenerator
//           </Typography>
//         )}

//         {generatedReply && (
//           <Box sx={{mt: 3}}>
//             <Typography variant = 'h6' gutterBottom>
//             Generated Reply:
//             </Typography>
//             <TextField 
//              fullWidth
//              multiline
//              rows={6}
//              variant="outlined"
//              value={generatedReply || ''}
//              inputProps = {{readOnly: true}}/>
            
//             <Button
//             variant="contained"
//             sx={{mt: 2}}
//             onClick={() => navigator.clipboard.writeText(generatedReply)}>
//               Copy to Clipboard
//             </Button>
//             </Box>

//         )}
//       </Container>
//   )
// }

// export default App

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import {
  Container,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Button,
  Paper,
  Divider,
} from '@mui/material';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (error) {
      setError('Error generating reply');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          📧 Email Reply Generator
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 3 }}>
          Generate smart and contextual email responses in seconds
        </Typography>

        <Box>
          <TextField
            fullWidth
            multiline
            rows={5}
            variant="outlined"
            label="Paste the email content here"
            value={emailContent || ''}
            onChange={(e) => setEmailContent(e.target.value)}
            sx={{ mb: 3 }}
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Tone (Optional)</InputLabel>
            <Select
              value={tone || ''}
              label="Tone (Optional)"
              onChange={(e) => setTone(e.target.value)}
            >
              <MenuItem value="friendly">Friendly</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!emailContent || loading}
            fullWidth
            sx={{ py: 1.5 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Generate Reply"}
          </Button>
        </Box>

        {error && (
          <Typography color="error" sx={{ mt: 3, textAlign: 'center' }}>
            {error}
          </Typography>
        )}

        {generatedReply && (
          <>
            <Divider sx={{ my: 4 }} />

            <Box>
              <Typography variant="h6" gutterBottom>
                ✍️ Generated Reply:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                variant="outlined"
                value={generatedReply || ''}
                inputProps={{ readOnly: true }}
              />
              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => navigator.clipboard.writeText(generatedReply)}
              >
                Copy to Clipboard
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
}

export default App;
