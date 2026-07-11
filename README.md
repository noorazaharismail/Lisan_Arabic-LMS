# Lisān — Classical Arabic Studio

A visual, mobile-first Classical Arabic and Tajwīd learning studio. It is deliberately **teacher-first**: it helps a learner practise, record, retrieve and track progress; it does not claim to certify tajwīd, issue religious rulings, or replace qualified scholars.

## What is included

- **87 fully guided, sequenced lessons in 9 stages**: every lesson now has a target, teacher lens, observation prompt, deliberate drill, visual board, production task, retrieval check and a Qur’anic listening card.
- **Visual learning system**: pattern cards, articulation prompts, colour-coded Tajwīd diagrams, progression map and responsive mobile UI.
- **Audio**:
  - authentic streamed Qur’anic references from **Mishary Rashid Alafasy** (murattal) or **Abdul Basit Abdus-Samad** (mujawwad), selectable in the Speaking Studio;
  - a mapped Qur’anic listening card in all 87 lessons and every Tajwīd rule card;
  - **no synthetic-speech fallback** for Qur’an or Tajwīd practice;
  - private microphone recording, playback and IndexedDB storage of practice takes.

For ordinary non-Qur’anic vocabulary, the app intentionally does not mislabel a qārī recording as a general spoken-Arabic model. A future release should add human-recorded Arabic teacher clips for those items.
- **Progress tracking**: local lesson completion, minutes, streak, saved vocabulary and daily rhythm.
- **Dictionary**: searchable English → Arabic starter lexicon, Arabic search, saved review stack, and personal entries.
- **Tajwīd**: foundational, applied and advanced Hafṣ ʿan ʿĀṣim study prompts, with clear teacher-review boundaries.
- **ASWJ / Shāfiʿī boundary**: the app’s language and recitation materials do not issue fatwā. Any Shāfiʿī fiqh or creed content must be reviewed by qualified scholars before publication.

## Run locally

This is a dependency-free static site. Serve the folder with any static web server, then open the displayed local URL.

## Deploy to Vercel

1. Import this directory as a static project (framework: **Other**).
2. Set the root directory to this folder.
3. Deploy. `vercel.json` includes basic browser security headers and microphone permission scope.

## Progress and recordings

By default, all learner progress stays in browser storage and recordings are stored in the browser’s IndexedDB on that device. This is intentional: no personal audio leaves the device without the learner opting into a cloud setup.

### Optional Supabase cloud sync

`supabase/schema.sql` is an RLS-protected starting schema for authenticated learner progress and recordings. Apply it only to a dedicated Supabase project or an explicitly approved existing project. Do **not** use a service-role key in the browser.

A production cloud-sync release should add:

1. Supabase Auth (email/OAuth—not anonymous-only for durable cross-device ownership);
2. browser client using a **publishable** key only;
3. RLS-tested `learner_progress` upserts;
4. encrypted-at-rest Storage bucket access for `lisan-recordings`;
5. a privacy notice and account/recording deletion flow.

## Qur’anic source and audio policy

- The app displays only short teaching excerpts.
- Do not bundle recitations unless their licence explicitly permits redistribution.
- The app streams documented Quran Foundation verse-reference URLs; it does not package recitation files locally.
- For a fuller production Qur’anic text, translation, morphology and recitation integration, use the Quran Foundation API through a server-side integration with the required credentials.

## Quality boundaries

“Native-level” speaking and independent scholarly reading are multi-year outcomes requiring sustained interaction with native speakers and qualified teachers. The app builds the deliberate practice loop and a traditional study pathway; it does not promise automatic fluency or automated tajwīd certification.

## Key sources

See [RESEARCH.md](./RESEARCH.md) for the course-design, audio and Tajwīd implementation references.
