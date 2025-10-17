# VoiceTranscribe WebApp

A modern, user-friendly web application that allows users to record their speech via microphone and see the transcribed text instantly.

## Features

### Core Features ✅
- **Central Mic Button**: Visually prominent mic button in the center of the page
- **Recording Animation**: Modern pulsing circle and waveform animations during recording
- **Auto Stop**: Recording stops automatically when user stops speaking
- **Transcription Display**: Shows recognized text immediately below the mic after recording
- **Copy Text Button**: Appears after transcription; clicking copies text to clipboard
- **Dark/Light Mode Toggle**: Switch between dark and light UI themes
- **Modern UI**: Clean, minimal design with intuitive layout and smooth animations

### Additional Features ✅
- **Keyboard Shortcuts**: Space to record, Esc to stop, Ctrl+C to copy
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Accessibility**: ARIA labels and keyboard navigation support
- **Error Handling**: Comprehensive error messages and fallback mechanisms
- **Theme Persistence**: Remembers your preferred theme
- **Toast Notifications**: User feedback for actions and errors

## Getting Started

### Prerequisites
- Modern web browser with Web Speech API support (Chrome, Edge, Safari)
- Microphone access permissions
- Internet connection (for speech recognition)

### Installation

1. **Download the files**: All files are already in the `newbie` folder
2. **Open in browser**: Simply open `index.html` in your web browser
3. **Allow microphone access**: Grant permission when prompted
4. **Start transcribing**: Click the mic button and start speaking!

### File Structure
```
newbie/
├── index.html          # Main HTML structure
├── styles.css          # CSS with dark/light themes and animations
├── script.js           # JavaScript with Web Speech API integration
└── README.md           # This file
```

## How to Use

1. **Open the app** in your web browser
2. **Click the microphone button** in the center of the screen
3. **Start speaking** - you'll see recording animations
4. **Stop speaking** - recording will stop automatically
5. **View transcription** - text appears below the mic button
6. **Copy text** - click the copy button to copy to clipboard
7. **Toggle theme** - use the moon/sun icon in the top-right corner

### Keyboard Shortcuts
- **Space Bar**: Start/stop recording
- **Escape**: Stop current recording
- **Ctrl+C** (or Cmd+C): Copy transcription text

## Browser Support

### Fully Supported
- Chrome 25+
- Edge 79+
- Safari 14.1+

### Partially Supported
- Firefox (limited Web Speech API support)
- Opera (based on Chromium)

### Not Supported
- Internet Explorer
- Older mobile browsers

## Technical Details

### Web Speech API
The app uses the browser's native Web Speech API for speech recognition:
- `window.SpeechRecognition` (Chrome/Edge)
- `window.webkitSpeechRecognition` (Safari)

### Features Implemented
- **Speech Recognition**: Real-time transcription with interim results
- **Error Handling**: Comprehensive error messages for different scenarios
- **Accessibility**: ARIA labels, keyboard navigation, focus management
- **Responsive Design**: Mobile-first approach with breakpoints
- **Theme System**: CSS custom properties for easy theme switching
- **Animations**: CSS animations with reduced motion support
- **Clipboard API**: Modern clipboard access with fallback

### Performance Optimizations
- Efficient event handling with debouncing
- Minimal DOM manipulation
- CSS animations using transform and opacity
- Lazy loading of non-critical features

## Customization

### Themes
The app supports easy theme customization through CSS custom properties. Modify the `:root` and `[data-theme="dark"]` selectors in `styles.css`.

### Language Support
To change the recognition language, modify the `lang` property in `script.js`:
```javascript
this.recognition.lang = 'en-US'; // Change to your preferred language
```

### Styling
All styles are in `styles.css` with clear organization:
- CSS custom properties for theming
- Component-based styling
- Responsive breakpoints
- Animation keyframes

## Troubleshooting

### Common Issues

**"Speech recognition not supported"**
- Use a supported browser (Chrome, Edge, or Safari)
- Ensure you're using a recent version

**"Microphone access denied"**
- Check browser permissions
- Ensure microphone is connected and working
- Try refreshing the page and allowing permissions

**"No speech detected"**
- Speak clearly and at normal volume
- Check microphone levels in system settings
- Ensure you're in a quiet environment

**"Network error"**
- Check your internet connection
- Speech recognition requires internet connectivity

### Browser-Specific Notes

**Chrome/Edge**: Full feature support with best performance
**Safari**: Full support but may require HTTPS in some cases
**Firefox**: Limited support, may not work as expected

## Future Enhancements

### Planned Features
- **Language Selection**: Support for multiple recognition languages
- **Download Transcript**: Export transcription as .txt file
- **Audio Playback**: Play back recorded audio
- **Text Editing**: Edit transcribed text before copying
- **Keyboard Shortcuts Panel**: Visual guide for shortcuts

### Technical Improvements
- **Offline Support**: Local speech recognition when available
- **PWA Features**: Install as a web app
- **Voice Commands**: Control app with voice commands
- **Export Options**: Multiple export formats (PDF, Word, etc.)

## Contributing

This is a standalone project, but suggestions and improvements are welcome!

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Ensure you're using a supported browser
3. Verify microphone permissions are granted
4. Check your internet connection

---

**Built with ❤️ using Web Speech API, CSS3, and vanilla JavaScript**
