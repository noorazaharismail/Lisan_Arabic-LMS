# Research and implementation notes

Lisān uses these sources to shape its design. They are linked for review; the app’s lesson wording and exercises are original.

1. **ACTFL Proficiency Guidelines (2024)** — a rationale for separately practising reading, listening, speaking and writing rather than treating grammar completion as fluency.  
   https://www.actfl.org/uploads/files/general/Resources-Publications/ACTFL_Proficiency_Guidelines_2024.pdf

2. **Madinah Arabic course sequence** — a high-level reference for staging early grammar (demonstratives, al-, prepositions, nominal/verbal sentences and iḍāfah).  
   https://www.madinaharabic.com/arabic-language-course/lessons/

3. **Quran Foundation Audio API documentation** — says verse recitation audio is designed for server-side access with credentials; word-level assets are a different browser-safe case. This informs the app’s explicit audio boundary and its production integration plan.  
   https://api-docs.quran.com/docs/sdk/javascript/audio/

4. **Quran Foundation developer terms** — reviewed before proposing any production use of Qur’anic text, translation, metadata or audio.  
   https://qf-api-docs.pages.dev/legal/developer-terms/

5. **Al-Muqaddimah al-Jazariyyah (public-domain scan)** — a classical anchor for the Tajwīd pathway. The app does not substitute this for a teacher’s explanation or ijāzah.  
   https://commons.wikimedia.org/wiki/File:Shar%E1%B8%A5_al-muqaddimah_al-Jazar%C4%AByah_f%C4%AB_al-tajw%C4%ABd.pdf

6. **Quranic Arabic Corpus licensing page** — a future option for morphology tooling, subject to GPL obligations and a full source/licence review before integration.  
   https://corpus.quran.com/license.jsp

## Sunni / Shāfiʿī scope

The Arabic language track is not a fiqh product. The Tajwīd route is labelled **Ḥafṣ ʿan ʿĀṣim** and avoids presenting contested detail as an app-generated verdict. The product should be reviewed by a qualified Sunni teacher; Shāfiʿī fiqh content, if later added, needs review by a recognised Shāfiʿī scholar before publication.
