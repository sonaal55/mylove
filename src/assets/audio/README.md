# Audio Folder

Place your background music file here.

## Supported Formats:
- **MP3** (recommended) - `song.mp3`
- **OGG** - `song.ogg`
- **WAV** - `song.wav`

## Instructions:

1. **Add your song file** to this folder
2. **Name it**: `song.mp3` (or `song.ogg`)
3. **Recommended**: 
   - Duration: 2-5 minutes
   - File size: Under 10MB for faster loading
   - Romantic/love songs work best!

## To use a different filename:

Edit `src/ScratchCard.jsx` and uncomment the import line:
```javascript
import backgroundMusic from './assets/audio/YOUR_FILENAME.mp3';
```

Then update the audio source:
```javascript
<source src={backgroundMusic} type="audio/mpeg" />
```

## Popular Romantic Songs Suggestions:
- Perfect by Ed Sheeran
- All of Me by John Legend
- A Thousand Years by Christina Perri
- Thinking Out Loud by Ed Sheeran
- Make You Feel My Love by Adele

**Note**: Make sure you have the rights to use the song!
