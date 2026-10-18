import { Article } from './chronicles';

export const articles83: Article[] = [
  {
    title: 'A Native Android Remote for My Bravia, Built From a Python Kit',
    date: '2026-10-18',
    week: 'Oct 18, 2026',
    category: 'Building With Agents',
    readTime: '3 min read',
    excerpt: 'Turned a Python TV-control kit into a signed native APK: full remote, voice commands, and ADB tuning, with the wire protocol verified byte-identical against protocol mocks.',
    tags: ['Android', 'ADB', 'Sony Bravia', 'Networking'],
    body: [
      'I had a working Python kit for my Sony Bravia KD-43X8000G: bravia_remote.py for the remote and tv_tune.sh for speed and bloat tuning. It needed a laptop or Termux. The build today turns it into a standalone Android app, Ankit\u2019s Bravia Remote (minSdk 24, targetSdk 34), that talks to the TV directly from the phone.',
      '## Why native, not a web app',
      'Three hard platform walls decided it. The TV\u2019s IP control speaks plain HTTP only, and an installable PWA must be served over HTTPS, so browsers block the calls as mixed content. Voice through the Web Speech API is unreliable inside an installed WebView, while the native SpeechRecognizer works. And the tuning needs raw TCP sockets for ADB-over-network, which no browser context allows.',
      '## The remote',
      'Full parity with the kit: swipe touchpad with tap and hold-repeat, hold-repeat volume and channel keys, an app launcher with streaming apps first, keyboard text into TV search boxes, power with a status dot, HDMI and live-TV switching, and voice plus typed commands using the kit\u2019s full parser, including chained commands like \u201Cmute and then channel 7\u201D. Authentication is the TV\u2019s pre-shared key: an X-Auth-PSK header on the /sony REST and /sony/IRCC SOAP endpoints, kept byte-identical to the known-good script. IP and key are entered once and stored on the phone only.',
      '## The tune tab',
      'The tuning runs over ADB-over-network from the phone, no Termux. The app carries a minimal classic-ADB client (CNXN, AUTH, OPEN, WRTE) with the RSA key generated on the phone; the TV shows its usual allow-debugging prompt once, and Android TV 9 means no TLS layer. Applying, undoing and rebooting are separate explicit taps, each after a package review list, and reboot is never automatic.',
      '## Testing and packaging',
      'Forty-eight of forty-eight tests pass against a mock TV with PSK-checked /sony endpoints and a mock adbd running the full RSA handshake and shell streams, including wrong-key REST and IRCC cases and a Normal-only auth mode case. The 33 KB APK is signed (CN=Ankit Samriwal) and apksigner-verified, and the hosted download was verified end to end: correct content type, byte count, and a SHA-256 match against the build.',
      '## First run on the real TV',
      'The first real-TV connect returned 403. A protocol audit showed the wire format byte-identical to the working script, so the rejection sits on the TV side, in the authentication mode setting. v0.1.1 adds a gear that reopens the key screen at any time and maps 401 and 403 to a message that names the TV-side fix (IP control, Authentication set to Normal and Pre-Shared Key). Real-device verification is still in progress; the mocks prove the protocol, not the television.'
    ],
    takeaways: [
      'When the target device speaks plain HTTP and raw TCP, native is the only honest packaging; PWAs and WebViews hit hard platform walls.',
      'Mock the device protocol exactly, down to PSK-checked endpoints and the adbd handshake, so tests prove the wire format, then label real-device verification as pending.',
      'Map auth errors precisely: 401 and 403 come from different TV-side settings, and the error message should say which.'
    ],
    note: 'v0.1.1 tested against protocol mocks; first real-TV key exchange is being sorted, with the app side verified byte-identical to the known-good script.'
  }
];
