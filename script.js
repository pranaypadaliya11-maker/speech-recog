class VoiceTranscribe {
    constructor() {
        this.isRecording = false;
        this.recognition = null;
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.finalTranscript = '';

        // DOM elements
        this.micButton = document.getElementById('micButton');
        this.stopButton = document.getElementById('stopButton');
        this.transcriptionText = document.getElementById('transcriptionText');
        this.copyButton = document.getElementById('copyButton');
        this.languageSelect = document.getElementById('languageSelect');
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = document.getElementById('themeIcon');
        this.recordingStatus = document.getElementById('recordingStatus');
        this.toast = document.getElementById('toast');
        this.toastText = document.getElementById('toastText');
        this.translateButton = document.getElementById('translateButton');
        this.targetLanguage = document.getElementById('targetLanguage');
        this.transcriptionContainer = document.getElementById('transcriptionContainer');
        this.translateContainer = document.getElementById('translationControls');

        this.init();
    }

    init() {
        this.setupSpeechRecognition();
        this.setupEventListeners();
        this.applyTheme();
    }

    setupSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            this.showToast('Speech recognition not supported in this browser', 'error');
            this.micButton.disabled = true;
            return;
        }

        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true; // continuous listening
        this.recognition.interimResults = true; // live transcription
        this.recognition.lang = this.languageSelect.value;

        this.recognition.onstart = () => {
            this.isRecording = true;
            this.micButton.disabled = true;
            this.stopButton.style.display = 'inline-block';
            this.updateStatus('Listening... Speak now');
        };

        this.recognition.onresult = (event) => this.handleRecognitionResult(event);

        this.recognition.onerror = (event) => {
            console.error('Recognition error:', event.error);
            this.showToast(`Recognition error: ${event.error}`, 'error');
        };

        this.recognition.onend = () => {
            if (this.isRecording) {
                // Restart automatically if still recording
                try { this.recognition.start(); } catch (e) { console.error(e); }
            } else {
                this.micButton.disabled = false;
                this.stopButton.style.display = 'none';
                this.updateStatus('Tap the microphone to start speaking');
            }
        };
    }

    setupEventListeners() {
        this.micButton.addEventListener('click', () => this.startRecording());
        this.stopButton.addEventListener('click', () => this.stopRecording());
        this.copyButton.addEventListener('click', () => this.copyText(this.transcriptionText));
        this.translateButton.addEventListener('click', () => this.openGoogleTranslate());

        this.languageSelect.addEventListener('change', () => {
            if (this.recognition) this.recognition.lang = this.languageSelect.value;
            this.showToast(`Recognition language set to ${this.languageSelect.value}`);
        });

        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    startRecording() {
        if (!this.recognition) return;
        this.isRecording = true;
        this.finalTranscript = ''; // reset for new recording session
        this.transcriptionText.textContent = '';
        this.transcriptionContainer.classList.remove('visible');
        this.copyButton.style.display = 'none';
        this.translateContainer.style.display = 'none';
        this.recognition.start();
    }

    stopRecording() {
        this.isRecording = false; // tells onend not to restart
        this.stopButton.style.display = 'none';
        this.micButton.disabled = false;
        if (this.recognition) {
            try { this.recognition.stop(); } catch (e) { console.error(e); }
        }
    }

    handleRecognitionResult(event) {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                this.finalTranscript += transcript + ' ';
            } else {
                interimTranscript += transcript;
            }
        }

        this.transcriptionText.textContent = this.finalTranscript + interimTranscript;

        // Show copy & translate buttons if any text exists
        if (this.finalTranscript.trim() || interimTranscript.trim()) {
            this.transcriptionContainer.classList.add('visible');
            this.copyButton.style.display = 'inline-block';
            this.translateContainer.style.display = 'flex';
        }
    }

    copyText(element) {
        const text = element.textContent;
        if (!text.trim()) return this.showToast('No text to copy', 'error');
        navigator.clipboard.writeText(text).then(() => this.showToast('Text copied!'));
    }

    openGoogleTranslate() {
        const text = this.finalTranscript.trim();
        if (!text) return this.showToast('No text to translate', 'error');
        const target = this.targetLanguage.value;
        const url = `https://translate.google.com/?sl=auto&tl=${target}&text=${encodeURIComponent(text)}&op=translate`;
        const win = window.open(url, '_blank');
        if (win) win.focus();
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

    showToast(message, type = 'success') {
        this.toastText.textContent = message;
        this.toast.className = `toast show ${type}`;
        setTimeout(() => this.toast.classList.remove('show'), 3000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new VoiceTranscribe();
});
