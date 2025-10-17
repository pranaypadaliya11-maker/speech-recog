// VoiceTranscribe WebApp - Updated JavaScript
class VoiceTranscribe {
    constructor() {
        this.isRecording = false;
        this.recognition = null;
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.isInitialized = false;
        
        // DOM elements
        this.micButton = document.getElementById('micButton');
        this.micIcon = document.getElementById('micIcon');
        this.pulseRing = document.getElementById('pulseRing');
        this.waveAnimation = document.getElementById('waveAnimation');
        this.recordingStatus = document.getElementById('recordingStatus');
        this.transcriptionContainer = document.getElementById('transcriptionContainer');
        this.transcriptionText = document.getElementById('transcriptionText');
        this.copyButton = document.getElementById('copyButton');
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = document.getElementById('themeIcon');
        this.toast = document.getElementById('toast');
        this.toastText = document.getElementById('toastText');
        this.stopButton = document.getElementById('stopButton');
        
        this.init();
    }
    
    init() {
        if (this.isInitialized) return;

        this.setupSpeechRecognition();
        this.setupEventListeners();
        this.applyTheme();
        this.isInitialized = true;
        console.log('VoiceTranscribe initialized successfully');
    }

    setupSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            this.showError('Speech recognition is not supported in this browser.');
            this.micButton.disabled = true;
            return;
        }

        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';
        this.recognition.maxAlternatives = 1;

        this.recognition.onstart = () => this.startRecording();
        this.recognition.onresult = (event) => this.handleRecognitionResult(event);
        this.recognition.onerror = (event) => this.handleRecognitionError(event);
        this.recognition.onend = () => this.stopRecording();
    }

    setupEventListeners() {
        // Mic button click: start recording
        this.micButton.addEventListener('click', () => {
            if (!this.isRecording) {
                try {
                    this.recognition.start(); // Directly triggers mic permission
                } catch (error) {
                    console.error('Failed to start recording:', error);
                    this.showError('Could not start recording');
                }
            }
        });

        // Stop button click
        this.stopButton.addEventListener('click', () => {
            if (this.isRecording) {
                this.recognition.stop();
            }
        });

        // Copy button click
        this.copyButton.addEventListener('click', () => this.copyToClipboard());

        // Theme toggle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                if (!this.isRecording) this.recognition.start();
            }
            if (e.code === 'Escape' && this.isRecording) this.recognition.stop();
            if ((e.ctrlKey || e.metaKey) && e.code === 'KeyC' && this.transcriptionContainer.classList.contains('visible')) {
                e.preventDefault();
                this.copyToClipboard();
            }
        });
    }

    startRecording() {
        this.isRecording = true;

        // Update UI
        this.micButton.classList.add('recording');
        this.recordingStatus.classList.add('recording');
        this.pulseRing.classList.add('active');
        this.waveAnimation.classList.add('active');
        this.updateStatus('Listening... Speak now');

        // Show Stop button
        this.stopButton.style.display = 'inline-block';

        // Hide transcription area
        this.transcriptionContainer.classList.remove('visible');
        this.transcriptionText.textContent = '';
    }

    stopRecording() {
        this.isRecording = false;

        // Update UI
        this.micButton.classList.remove('recording');
        this.recordingStatus.classList.remove('recording');
        this.pulseRing.classList.remove('active');
        this.waveAnimation.classList.remove('active');
        this.updateStatus('Tap the microphone to start recording');

        // Hide Stop button
        this.stopButton.style.display = 'none';
    }

    handleRecognitionResult(event) {
        let finalTranscript = '';
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) finalTranscript += transcript;
            else interimTranscript += transcript;
        }

        const displayText = finalTranscript || interimTranscript;
        if (displayText) {
            this.transcriptionText.textContent = displayText;
            this.transcriptionContainer.style.display = 'block';
            this.transcriptionContainer.classList.add('visible');
        }

        if (finalTranscript) this.showToast('Recording completed!');
    }

    handleRecognitionError(event) {
        console.error('Recognition error:', event.error);
        switch (event.error) {
            case 'no-speech':
                this.showError('No speech detected. Please try again.');
                break;
            case 'audio-capture':
            case 'not-allowed':
                this.showError('Microphone access denied. Please enable microphone permissions.');
                this.micButton.disabled = true;
                break;
            default:
                this.showError(`Recognition error: ${event.error}`);
        }
        this.stopRecording();
    }

    copyToClipboard() {
        const text = this.transcriptionText.textContent;
        if (!text) return this.showError('No text to copy');

        navigator.clipboard.writeText(text).then(() => {
            this.showToast('Text copied!');
            this.copyButton.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => this.copyButton.innerHTML = '<i class="fas fa-copy"></i>', 2000);
        }).catch(() => this.showError('Failed to copy text.'));
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        localStorage.setItem('theme', this.currentTheme);
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.themeIcon.className = this.currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    updateStatus(message) {
        this.recordingStatus.querySelector('.status-text').textContent = message;
    }

    showToast(message) {
        this.toastText.textContent = message;
        this.toast.className = 'toast show';
        setTimeout(() => this.toast.classList.remove('show'), 3000);
    }

    showError(message) {
        this.showToast(message);
        console.error(message);
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    new VoiceTranscribe();
});
