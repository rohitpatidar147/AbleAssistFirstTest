# Subject Architecture

The application is organized around user-facing subjects rather than file types.

- `features/onboarding` owns the onboarding flow and slide screens.
- `features/home` owns the home experience and action cards.
- `features/chat` owns the assistant conversation and Gemini integration.
- `features/text-to-speech` owns speech playback and image OCR input.
- `features/speech-to-text` owns recording and transcription.
- `shared` contains reusable UI primitives and the design system.
- `core` contains navigation, routes, runtime configuration, and asset registration.

Feature `index.js` files are the public boundary for each subject. The app shell imports
from `core`, while feature modules consume shared capabilities through `shared`.
