/* Curriculum content is original study scaffolding. Qur'anic text is displayed only in short teaching excerpts. */
window.LISAN_DATA = (() => {
  const lesson = (id,title,ar,objective,focus,minutes=14) => ({id,title,ar,objective,focus,minutes});
  const stages = [
    {id:'s1',n:'01',title:'Sound & script',tag:'FOUNDATION · 10 LESSONS',description:'Articulation, vowels, joining and confident, vowelled reading.',lessons:[
      lesson('L01','The sound map','بَ تَ ثَ','Meet the mouth and letter families before transliteration.','Articulation: begin with the lips, tongue-tip and breath.'),
      lesson('L02','The throat and tongue','ح خ ع غ','Separate the Arabic sounds English does not carry.','Makhraj: the throat has distinct points, not one “h” sound.'),
      lesson('L03','Dots and shape families','ب ت ث ن ي','Read dot patterns without guessing.','Visual pattern: one skeleton, different dots, distinct letters.'),
      lesson('L04','Short vowels','بَ بِ بُ','Attach fatḥah, kasrah and ḍammah accurately.','Harakāt: the short vowel belongs to the consonant before it.'),
      lesson('L05','Sukūn and shaddah','مْ مّ','Hear stillness and doubling in a single beat.','Timing: a shaddah is held then released, not merely “stronger”.'),
      lesson('L06','Tanwīn and long vowels','ـٌ ـٍ ـً / ا و ي','Read endings and natural vowel length.','Count: natural madd is a steady two-count reference.'),
      lesson('L07','Joining letters','بـ ـبـ ـب','Recognise initial, medial and final forms.','Script: letter identity remains even as the form connects.'),
      lesson('L08','Sun and moon letters','الشَّمْس / الْقَمَر','Read the definite article in connected speech.','Assimilation: the lām is heard with moon letters and assimilates with sun letters.'),
      lesson('L09','Read your first words','كِتَابٌ بَيْتٌ قَلَمٌ','Decode fully vowelled nouns with confidence.','Reading routine: scan vowels, read slowly, then repeat naturally.'),
      lesson('L10','Foundation check','اَلْحَمْدُ لِلّٰهِ','Consolidate sound, script and short reading.','Mastery: accuracy and calm pace matter more than speed.')
    ]},
    {id:'s2',n:'02',title:'Words & living phrases',tag:'VOCABULARY · 10 LESSONS',description:'High-frequency words, pronouns and useful fuṣḥā patterns.',lessons:[
      lesson('L11','Meaning lives in roots','ك ت ب','See how a three-letter root connects a word family.','Root lens: consonants carry a core field of meaning.'),
      lesson('L12','People and pronouns','أَنَا أَنْتَ هُوَ','Name who is acting or being described.','Pronouns: match person, number and gender.'),
      lesson('L13','This and that','هٰذَا هٰذِهِ','Point precisely in masculine and feminine.','Agreement: the demonstrative learns the noun’s gender.'),
      lesson('L14','Everyday nouns','بَيْتٌ مَاءٌ بَابٌ','Build a useful visual vocabulary base.','Noun cue: notice the final vowel without overthinking it yet.'),
      lesson('L15','Definiteness','كِتَابٌ / الْكِتَابُ','Distinguish “a book” from “the book”.','Al-: definiteness changes how Arabic points to a known thing.'),
      lesson('L16','Possession','كِتَابُ الطَّالِبِ','Express “the student’s book”.','Iḍāfah: two nouns become one meaning-unit.'),
      lesson('L17','Adjectives agree','بَيْتٌ كَبِيرٌ','Make a noun and adjective agree.','Agreement: gender, number, definiteness and case travel together.'),
      lesson('L18','Prepositions in space','فِي الْبَيْتِ','Place people and things in relation.','Prepositions: the next noun changes its ending.'),
      lesson('L19','Questions that open speech','مَا هٰذَا؟','Ask simple, accurate questions.','Conversation: ask, answer and point to a real object.'),
      lesson('L20','Vocabulary review','هٰذَا كِتَابُ الْمُعَلِّمِ','Retrieve words without an English prompt.','Recall: recognition becomes usable language through retrieval.')
    ]},
    {id:'s3',n:'03',title:'Nouns, sentences & iʿrāb',tag:'NAḤW · 12 LESSONS',description:'Nominal sentences, cases, attached pronouns and sound parsing.',lessons:[
      lesson('L21','The nominal sentence','اللّٰهُ غَفُورٌ','Identify mubtadaʾ and khabar.','Pattern: a statement can begin with a noun; both parts are normally raised.'),
      lesson('L22','Rafʿ in view','مُسْلِمٌ مُسْلِمَانِ','Recognise common nominative markers.','Case: endings are meaning signals, not decoration.'),
      lesson('L23','Naṣb in view','رَأَيْتُ كِتَابًا','Recognise common accusative markers.','Object: the action reaches a noun, and its ending marks the role.'),
      lesson('L24','Jarr in view','فِي كِتَابٍ','Recognise common genitive markers.','Jarr: prepositions and possession pull nouns into genitive.'),
      lesson('L25','Singular, dual, plural','مُسْلِمٌ مُسْلِمَانِ مُسْلِمُونَ','Read number without relying on translation.','Number: learn forms as visual chunks.'),
      lesson('L26','Sound feminine plural','مُسْلِمَاتٌ','Track the feminine plural endings.','Agreement: plural patterns affect adjective and verb choices.'),
      lesson('L27','Broken plurals','كُتُبٌ رِجَالٌ','Meet internal plural patterns.','Sarf lens: not every plural uses a suffix.'),
      lesson('L28','Attached pronouns','كِتَابُهُ بَيْتُهَا','Express “his/her/our” efficiently.','Attachment: a suffix can carry an entire possessive phrase.'),
      lesson('L29','Relative clauses','الَّذِي جَاءَ','Link a known noun to more information.','Connection: a relative pronoun opens a complete descriptive clause.'),
      lesson('L30','Kāna and its sisters','كَانَ اللّٰهُ غَفُورًا','Watch how one verb reshapes the sentence.','Governance: particles and verbs cause endings to change.'),
      lesson('L31','Inna and its sisters','إِنَّ اللّٰهَ غَفُورٌ','Read emphasis without losing the syntax.','Governance: inna makes its noun accusative and leaves the predicate raised.'),
      lesson('L32','Iʿrāb practice','إِنَّ فِي ذٰلِكَ لَعِبْرَةً','Name each role and its case.','Parsing: ask what each word does before translating.')
    ]},
    {id:'s4',n:'04',title:'Verbs & morphology',tag:'ṢARF · 12 LESSONS',description:'Verb systems, derived forms, participles and weak roots.',lessons:[
      lesson('L33','The perfect verb','كَتَبَ','Read completed action and its root.','Perfect: the basic past form is a three-letter pattern.'),
      lesson('L34','Who did it?','كَتَبْتُ كَتَبُوا','Attach perfect-tense endings.','Conjugation: the ending tells you the subject.'),
      lesson('L35','The imperfect verb','يَكْتُبُ','Read ongoing or future action.','Imperfect: prefix and ending work together.'),
      lesson('L36','Mood in the imperfect','لَمْ يَكْتُبْ','Recognise indicative, subjunctive and jussive patterns.','Mood: particles change the final vowel or remove it.'),
      lesson('L37','The imperative','اُكْتُبْ','Form a clear command.','Command: derive the imperative from the jussive imperfect.'),
      lesson('L38','Negation','لَا يَكْتُبُ','Choose the appropriate negative particle.','Meaning: Arabic distinguishes “does not”, “did not” and “will not”.'),
      lesson('L39','Form I patterns','فَعَلَ يَفْعَلُ','Notice vowel-pattern variation in the basic form.','Pattern: dictionaries list perfect and imperfect together for a reason.'),
      lesson('L40','Derived Forms II–V','عَلَّمَ تَعَلَّمَ','Recognise intensity, causation and reflexivity.','Form cue: added letters systematically shift the root’s meaning.'),
      lesson('L41','Derived Forms VI–X','تَعَاوَنَ اسْتَغْفَرَ','Read further meaning families.','Form cue: do not translate a pattern mechanically—read it in context.'),
      lesson('L42','Active participles','كَاتِبٌ','Describe the doer as a noun.','Ism al-fāʿil: a verb idea can become a persistent descriptor.'),
      lesson('L43','Passive voice','كُتِبَ','Separate actor from action received.','Passive: vowel pattern changes when the actor is not named.'),
      lesson('L44','Weak roots','قَالَ يَقُولُ','Track roots with weak letters.','Weakness: look for the root behind surface vowel changes.')
    ]},
    {id:'s5',n:'05',title:'Classical reading craft',tag:'READING · 9 LESSONS',description:'Build confidence with fully-vowelled prose, hadith and adab texts.',lessons:[
      lesson('L45','Reading a paragraph','طَلَبُ الْعِلْمِ','Move from word-by-word to thought-by-thought reading.','Reading: identify clauses before translating each word.'),
      lesson('L46','The ḥadīth sentence','إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ','Read a short prophetic saying with grammar cues.','Text discipline: distinguish language analysis from fiqh ruling.'),
      lesson('L47','Verbal sentence order','خَلَقَ اللّٰهُ السَّمَاوَاتِ','Track verb, subject and object in classical order.','Verb first: the subject may follow the verb and has a visible role.'),
      lesson('L48','Circumstantial clauses','جَاءَ الطَّالِبُ مُبْتَسِمًا','Recognise the ḥāl.','Ḥāl: an accusative word paints the state during the action.'),
      lesson('L49','Specification','اِزْدَادَ زَيْدٌ عِلْمًا','Recognise tamyīz.','Tamyīz: a following noun clarifies an otherwise broad meaning.'),
      lesson('L50','Conditionals','إِنْ تَصْدُقْ تُفْلِحْ','Read cause and consequence.','Condition: jussive forms signal “if … then …”.'),
      lesson('L51','Oaths and emphasis','وَاللّٰهِ لَأَفْعَلَنَّ','See the layers of strengthening.','Emphasis: particles, lām and nūn add rhetorical force.'),
      lesson('L52','A guided passage','رَبِّ زِدْنِي عِلْمًا','Read a compact text with a word lens.','Method: word, phrase, grammar, then connected meaning.'),
      lesson('L53','Reading portfolio','مَنْ جَدَّ وَجَدَ','Read aloud, parse, gloss and retell a short passage.','Mastery: explain what you read in simple Arabic and English.')
    ]},
    {id:'s6',n:'06',title:'Qur’anic Arabic & balāghah',tag:'QUR’ANIC LANGUAGE · 10 LESSONS',description:'Guided comprehension, rhetorical awareness and responsible tafsīr boundaries.',lessons:[
      lesson('L54','Al-Fātiḥah: word lens','الْحَمْدُ لِلّٰهِ','Connect syntax, vocabulary and meaning.','Scope: grammar explains structure; tafsīr needs reliable scholarly sources.'),
      lesson('L55','Qur’anic word families','رَحْمَة رَحِيم رَحْمٰن','Trace a root across related words.','Semantics: root helps, context decides the precise meaning.'),
      lesson('L56','Ellipsis and emphasis','إِيَّاكَ نَعْبُدُ','Notice order chosen for force.','Balāghah: fronting can focus and restrict meaning.'),
      lesson('L57','Oaths in the Qur’an','وَالضُّحَىٰ','Recognise the opening form and its response.','Rhetoric: a form may prepare the listener for a central claim.'),
      lesson('L58','Parables and imagery','مَثَلُ نُورِهِ','Read comparison as a meaning device.','Bayān: imagery is studied with tafsīr, not invented from grammar alone.'),
      lesson('L59','Sound and meaning','الطَّارِقِ','Hear how phonetic texture supports a passage.','Adab: appreciate rhetorical texture without making unsupported claims.'),
      lesson('L60','Particles that matter','قَدْ لَنْ لَمْ','Let particles guide tense and force.','Precision: a small particle can reshape the whole sentence.'),
      lesson('L61','Guided tafsīr workflow','قُلْ هُوَ اللّٰهُ أَحَدٌ','Read text, morphology, grammar, then a reliable tafsīr.','Method: app notes are study aids, not independent tafsīr.'),
      lesson('L62','Qur’anic reading journal','آيَاتٌ','Record vocabulary, syntax, one verified tafsīr point and reflection.','Reflection: keep personal response distinct from textual interpretation.'),
      lesson('L63','Comprehension checkpoint','إِنَّ مَعَ الْعُسْرِ يُسْرًا','Read a short āyah with disciplined steps.','Mastery: parse, translate cautiously and cite your tafsīr source.')
    ]},
    {id:'s7',n:'07',title:'Tajwīd foundation',tag:'TAJWĪD · 8 LESSONS',description:'Makharij, ṣifāt, madd, ghunnah and controlled recitation.',lessons:[
      lesson('L64','Makharij map','أ ه ع ح غ خ','Locate the main articulation regions.','Teacher check: a visual mouth map cannot replace live correction.'),
      lesson('L65','Ṣifāt of letters','ق ط ب ج د','Hear qualities that distinguish similar letters.','Sound: learn contrasts in pairs at a slow pace.'),
      lesson('L66','Madd ṭabīʿī','قَالَ','Maintain a natural, even two-count extension.','Count: use a stable internal beat, not a rushed vowel.'),
      lesson('L67','Ghunnah','إِنَّ','Control nasal resonance without swallowing the consonant.','Resonance: ghunnah belongs to nūn and mīm in its places.'),
      lesson('L68','Qalqalah','أَحَدْ','Create a controlled bounce without an extra vowel.','Release: the echo is brief and clean.'),
      lesson('L69','Nūn sākinah & tanwīn','مِنْ رَبِّهِمْ','Classify iẓhār, idghām, iqlāb and ikhfāʾ.','Workflow: first identify the next letter, then choose the rule.'),
      lesson('L70','Mīm sākinah','هُمْ بِهِ','Practise iẓhār shafawī, idghām shafawī and ikhfāʾ shafawī.','Lips: watch the mīm’s articulation before applying the label.'),
      lesson('L71','Foundation recitation check','سُورَةُ الْفَاتِحَةِ','Read a short passage slowly for teacher review.','Evidence: a saved recording lets a teacher give specific feedback.')
    ]},
    {id:'s8',n:'08',title:'Tajwīd mastery',tag:'TAJWĪD · 8 LESSONS',description:'Applied rules, stopping, heavy/light letters and recitation preparation.',lessons:[
      lesson('L72','Heavy and light letters','صِرَاطَ','Apply tafkhīm and tarqīq in context.','Contrast: heavy is not simply louder; it changes resonance.'),
      lesson('L73','Rāʾ and lām','رَحِيمٌ / اللّٰه','Read the contexts for heavy and light.','Care: conditions need a teacher-led rule chart.'),
      lesson('L74','Connected madd','جَاءَ','Recognise madd within one word.','Hafs note: length choices should follow the method taught by your qārī.'),
      lesson('L75','Separated madd','إِنَّا أَعْطَيْنَاكَ','Recognise madd across a word boundary.','Consistency: choose and maintain the count taught in your riwāyah.'),
      lesson('L76','Lāzim and ʿāriḍ','الضَّالِّينَ','Distinguish permanent and stop-created causes.','Waqf: stopping can create a temporary sukūn.'),
      lesson('L77','Waqf and ibtidāʾ','وَاللّٰهُ غَفُورٌ','Stop and begin without harming the meaning.','Meaning: pauses are part of responsible recitation.'),
      lesson('L78','Ḥafṣ application clinic','الْفَلَقِ','Apply multiple rules in a short passage.','Sequence: slow, accurate, then fluent; never invert the order.'),
      lesson('L79','Teacher review recording','الْإِخْلَاصِ','Prepare a clean recording for a qualified listener.','Adab: request specific correction and record the correction notes.')
    ]},
    {id:'s9',n:'09',title:'Scholarly reading pathway',tag:'ADVANCED · 8 LESSONS',description:'A structured bridge toward the traditional grammar, rhetoric and reading canon.',lessons:[
      lesson('L80','Al-Ājurrūmiyyah map','الْكَلَامُ هُوَ اللَّفْظُ','Orient yourself to the core introductory naḥw text.','Text study: memorise short matn sections with a qualified explanation.'),
      lesson('L81','Qatr al-Nadā preparation','الْمُعْرَبُ','Move from rule recognition to argument and exception.','Depth: collect examples, counterexamples and parsing evidence.'),
      lesson('L82','Alfiyyah pathway','كَلامُنا لَفْظٌ','Meet the thousand-line grammar poem responsibly.','Rhythm: memorisation supports analysis; it does not replace it.'),
      lesson('L83','Advanced ṣarf','اِسْتِخْرَاجٌ','Analyse forms, weak roots and derivation.','Method: return every form to a root and a pattern.'),
      lesson('L84','Maʿānī','إِنَّمَا','Study sentence force and context.','Balāghah: maʿānī studies how construction serves context.'),
      lesson('L85','Bayān and badīʿ','كَأَنَّ','Study comparison and rhetorical ornament.','Restraint: identify devices, then read scholarly explanation.'),
      lesson('L86','Reading with commentary','قَالَ الشَّارِحُ','Navigate matn, sharḥ, gloss and evidence.','Scholarly habit: separate author text, commentator text and your notes.'),
      lesson('L87','Independent reading plan','طَلَبُ الْعِلْمِ فَرِيضَةٌ','Design a teacher-supervised reading portfolio.','Outcome: sustained reading, speaking practice and regular scholarly correction.')
    ]}
  ];

  const lexicon = [
    ['mercy','رَحْمَة','raḥmah','ر ح م','mercy, compassion'],['merciful','رَحِيم','raḥīm','ر ح م','merciful; compassionate'],['book','كِتَاب','kitāb','ك ت ب','book; writing'],['write','كَتَبَ','kataba','ك ت ب','to write'],['knowledge','عِلْم','ʿilm','ع ل م','knowledge'],['learn','تَعَلَّمَ','taʿallama','ع ل م','to learn'],['teach','عَلَّمَ','ʿallama','ع ل م','to teach'],['teacher','مُعَلِّم','muʿallim','ع ل م','teacher'],['student','طَالِب','ṭālib','ط ل ب','student; seeker'],['seek','طَلَبَ','ṭalaba','ط ل ب','to seek'],['house','بَيْت','bayt','ب ي ت','house; home'],['door','بَاب','bāb','ب و ب','door; gate'],['water','مَاء','māʾ','م و ه','water'],['light','نُور','nūr','ن و ر','light'],['heart','قَلْب','qalb','ق ل ب','heart'],['soul','نَفْس','nafs','ن ف س','self; soul'],['prayer','صَلَاة','ṣalāh','ص ل و','prayer'],['mosque','مَسْجِد','masjid','س ج د','mosque; place of prostration'],['prostrate','سَجَدَ','sajada','س ج د','to prostrate'],['lord','رَبّ','rabb','ر ب ب','Lord; nurturing master'],['god','إِلٰه','ilāh','أ ل ه','god; deity'],['Allah','اللّٰه','Allāh','أ ل ه','the proper name Allah'],['Quran','قُرْآن','Qurʾān','ق ر أ','the Qur’an; recitation'],['read','قَرَأَ','qaraʾa','ق ر أ','to read; recite'],['say','قَالَ','qāla','ق و ل','to say'],['word','كَلِمَة','kalimah','ك ل م','word'],['speech','كَلَام','kalām','ك ل م','speech; utterance'],['language','لُغَة','lughah','ل غ و','language'],['Arabic','عَرَبِيّ','ʿarabiyy','ع ر ب','Arabic'],['good','خَيْر','khayr','خ ي ر','good; goodness'],['evil','شَرّ','sharr','ش ر ر','evil; harm'],['truth','حَقّ','ḥaqq','ح ق ق','truth; right'],['patience','صَبْر','ṣabr','ص ب ر','patience; steadfastness'],['thank','شَكَرَ','shakara','ش ك ر','to thank'],['praise','حَمْد','ḥamd','ح م د','praise'],['forgive','غَفَرَ','ghafara','غ ف ر','to forgive'],['forgiveness','مَغْفِرَة','maghfirah','غ ف ر','forgiveness'],['guidance','هُدًى','hudā','ه د ي','guidance'],['guide','هَدَى','hadā','ه د ي','to guide'],['day','يَوْم','yawm','ي و م','day'],['night','لَيْل','layl','ل ي ل','night'],['sun','شَمْس','shams','ش م س','sun'],['moon','قَمَر','qamar','ق م ر','moon'],['earth','أَرْض','arḍ','أ ر ض','earth'],['sky','سَمَاء','samāʾ','س م و','sky'],['sea','بَحْر','baḥr','ب ح ر','sea'],['mountain','جَبَل','jabal','ج ب ل','mountain'],['man','رَجُل','rajul','ر ج ل','man'],['woman','اِمْرَأَة','imraʾah','م ر أ','woman'],['child','وَلَد','walad','و ل د','child'],['friend','صَدِيق','ṣadīq','ص د ق','friend'],['love','حُبّ','ḥubb','ح ب ب','love'],['fear','خَوْف','khawf','خ و ف','fear'],['hope','رَجَاء','rajāʾ','ر ج و','hope'],['peace','سَلَام','salām','س ل م','peace'],['submit','أَسْلَمَ','aslama','س ل م','to submit; become Muslim'],['believer','مُؤْمِن','muʾmin','أ م ن','believer'],['faith','إِيمَان','īmān','أ م ن','faith'],['world','دُنْيَا','dunyā','د ن و','this world'],['hereafter','آخِرَة','ākhirah','أ خ ر','hereafter'],['great','كَبِير','kabīr','ك ب ر','great; large'],['small','صَغِير','ṣaghīr','ص غ ر','small'],['new','جَدِيد','jadīd','ج د د','new'],['old','قَدِيم','qadīm','ق د م','old'],['open','فَتَحَ','fataḥa','ف ت ح','to open'],['close','أَغْلَقَ','aghlaqa','غ ل ق','to close'],['come','جَاءَ','jāʾa','ج ي أ','to come'],['go','ذَهَبَ','dhahaba','ذ ه ب','to go'],['sit','جَلَسَ','jalasa','ج ل س','to sit'],['stand','قَامَ','qāma','ق و م','to stand'],['eat','أَكَلَ','akala','أ ك ل','to eat'],['drink','شَرِبَ','shariba','ش ر ب','to drink'],['beautiful','جَمِيل','jamīl','ج م ل','beautiful'],['wise','حَكِيم','ḥakīm','ح ك م','wise'],['clear','مُبِين','mubīn','ب ي ن','clear; manifest'],['first','أَوَّل','awwal','أ و ل','first'],['last','آخِر','ākhir','أ خ ر','last'],['this','هٰذَا','hādhā','—','this (masculine)'],['this feminine','هٰذِهِ','hādhihi','—','this (feminine)'],['who','مَنْ','man','—','who'],['what','مَا','mā','—','what'],['where','أَيْنَ','ayna','—','where'],['in','فِي','fī','—','in; inside'],['from','مِنْ','min','—','from'],['to','إِلَى','ilā','—','to; toward'],['on','عَلَى','ʿalā','—','on; upon'],['with','مَعَ','maʿa','—','with'],['for','لِ','li','—','for; belonging to']
  ].map(([english,arabic,transliteration,root,note])=>({english,arabic,transliteration,root,note}));

  const tajweed = {
    foundation:[
      {id:'makharij',title:'Makhārij',arabic:'مَخَارِجُ الْحُرُوفِ',visual:'مَخْرَج',tone:'mint',summary:'Map where sounds emerge: jawf, throat, tongue, lips and nasal passage.',example:'حَ / هَ',highlight:'حَ',cue:'Feel the difference in place and breath. Do not collapse distinct throat letters into one English “h”.',teacher:'Ask a qualified teacher to hear each throat and emphatic letter in isolation.'},
      {id:'short',title:'Harakāt & sukūn',arabic:'حَرَكَات',visual:'بَ بِ بُ',tone:'blue',summary:'Read short vowels as part of the consonant, then identify a still letter.',example:'مِنْهُ',highlight:'نْ',cue:'Move only where the vowel asks you to move; the sukūn ends the letter cleanly.',teacher:'Have a teacher correct any added “uh” vowel after a sukūn.'},
      {id:'madd',title:'Madd ṭabīʿī',arabic:'مَدّ طَبِيعِيّ',visual:'ـَا ـُو ـِي',tone:'gold',summary:'A natural madd extends evenly for a stable two-count reference.',example:'قَالَ',highlight:'قَا',cue:'Keep the count even and connected; do not turn it into a new syllable.',teacher:'Your qārī should set the exact pacing used in your recitation practice.'},
      {id:'ghunnah',title:'Ghunnah',arabic:'غُنَّة',visual:'نّ مّ',tone:'peach',summary:'Train controlled nasal resonance with nūn and mīm in their places.',example:'إِنَّ',highlight:'نَّ',cue:'Hold the resonance without losing the letter’s articulation.',teacher:'Use a teacher to distinguish a correct ghunnah from a swallowed consonant.'}
    ],
    applied:[
      {id:'nun',title:'Nūn sākinah & tanwīn',arabic:'أَحْكَامُ النُّونِ السَّاكِنَةِ',visual:'مِنْ رَبِّهِمْ',tone:'lilac',summary:'Classify iẓhār, idghām, iqlāb and ikhfāʾ by the following letter.',example:'مِنْ رَبِّهِمْ',highlight:'نْ ر',cue:'First see the next letter. Rule labels are a result of close reading, not a substitute for it.',teacher:'Practise each category from a marked Hafs muṣḥaf with a teacher.'},
      {id:'meem',title:'Mīm sākinah',arabic:'أَحْكَامُ الْمِيمِ السَّاكِنَةِ',visual:'هُمْ بِهِ',tone:'mint',summary:'Differentiate clear mīm, lip assimilation and lip concealment.',example:'هُمْ بِهِ',highlight:'مْ ب',cue:'Close the lips correctly for mīm before the following letter changes the sound.',teacher:'Ask for correction of lip timing, especially before bāʾ.'},
      {id:'qalqalah',title:'Qalqalah',arabic:'قَلْقَلَة',visual:'ق ط ب ج د',tone:'peach',summary:'Release a still qalqalah letter with a clean controlled echo.',example:'أَحَدْ',highlight:'دْ',cue:'It is a brief rebound, not an extra vowel after the word.',teacher:'Record a stop and ask whether the bounce is clean or overextended.'},
      {id:'heavy',title:'Tafkhīm & tarqīq',arabic:'تَفْخِيم وَتَرْقِيق',visual:'ص / س',tone:'gold',summary:'Hear resonance contrasts between heavy and light letters.',example:'صِرَاطَ',highlight:'صِ',cue:'A heavy letter is a resonant articulation—not higher volume.',teacher:'Have a teacher listen for tongue and mouth-shape differences.'}
    ],
    advanced:[
      {id:'ra',title:'Rāʾ & the name of Allah',arabic:'الرَّاء وَاللَّفْظُ الْجَلَالَة',visual:'ر / اللّٰه',tone:'lilac',summary:'Apply heavy and light readings through the conditions you have learned.',example:'بِسْمِ اللّٰهِ',highlight:'اللّٰهِ',cue:'Read the local vowel context before choosing the quality.',teacher:'Use one teacher’s clearly identified Hafs curriculum for conditions and exceptions.'},
      {id:'madd-far',title:'Extended madd',arabic:'الْمَدُّ الْفَرْعِيّ',visual:'جَاءَ',tone:'gold',summary:'Separate connected, separated, necessary and stop-created lengthening.',example:'الضَّالِّينَ',highlight:'ضَّا',cue:'The cause and the riwāyah determine the practice; never guess from visual length alone.',teacher:'Match count and consistency to your qārī’s approved Hafs method.'},
      {id:'waqf',title:'Waqf & ibtidāʾ',arabic:'وَقْف وَابْتِدَاء',visual:'وَقْف',tone:'blue',summary:'Pause and restart in ways that protect the intended meaning.',example:'وَاللّٰهُ غَفُورٌ رَحِيمٌ',highlight:'غَفُورٌ',cue:'A convenient breath is not always a sound stopping place.',teacher:'Study the pause marks in a reliable muṣḥaf with a teacher.'},
      {id:'review',title:'Teacher review protocol',arabic:'عَرْضُ التِّلَاوَة',visual:'◉',tone:'mint',summary:'Prepare short, clean recordings and request one correction target at a time.',example:'قُلْ هُوَ اللّٰهُ أَحَدٌ',highlight:'قُلْ',cue:'Slow recitation reveals more than speed. Keep notes on corrected rules.',teacher:'An ijāzah-bearing teacher is the appropriate route for formal recitation verification.'}
    ]
  };

  const sources=[
    {title:'Quran Foundation API documentation',copy:'Used as the implementation boundary for Qur’anic text and recitation integration. Its audio API requires backend credentials for verse recitation; Lisān therefore labels streamed reference audio separately from on-device speech synthesis.',url:'https://api-docs.quran.com/docs/sdk/javascript/audio/'},
    {title:'ACTFL Proficiency Guidelines (2024)',copy:'The product tracks reading, listening, speaking and writing as distinct skills rather than treating grammar completion as “fluency”. This shapes the lesson loop: notice → comprehend → produce → reflect.',url:'https://www.actfl.org/uploads/files/general/Resources-Publications/ACTFL_Proficiency_Guidelines_2024.pdf'},
    {title:'Madinah Arabic course sequence',copy:'Used only as a high-level sequencing reference for early nominal-sentence, definiteness, preposition and iḍāfah work; Lisān’s wording and exercises are original.',url:'https://www.madinaharabic.com/arabic-language-course/lessons/'},
    {title:'Al-Muqaddimah al-Jazariyyah',copy:'A classical Tajwīd study anchor for later teacher-guided work. The app provides visual introductory practice and explicitly does not present itself as an ijāzah or automated recitation authority.',url:'https://commons.wikimedia.org/wiki/File:Shar%E1%B8%A5_al-muqaddimah_al-Jazar%C4%AByah_f%C4%AB_al-tajw%C4%ABd.pdf'},
    {title:'Quranic Arabic Corpus',copy:'A future licensed/open-data option for word-level morphology and grammar tooling; verify GPL obligations before incorporating its data into a distributed app.',url:'https://corpus.quran.com/license.jsp'},
    {title:'Method boundary',copy:'The language curriculum is compatible with Sunni traditional study. Fiqh and creed are not generated by the app; any Shāfiʿī fiqh or ASWJ doctrinal study should be reviewed and taught by qualified scholars.',url:'https://quran.foundation/'}
  ];

  const reciters = {
    alafasy:{id:'alafasy',name:'Mishary Rashid Alafasy',style:'Murattal',base:'https://verses.quran.foundation/Alafasy/mp3/'},
    abdulbaset:{id:'abdulbaset',name:'Abdul Basit Abdus-Samad',style:'Mujawwad',base:'https://verses.quran.foundation/AbdulBaset/Mujawwad/mp3/'}
  };

  // These are listening cards—not substitute translations or tajwīd certification.
  // Every lesson receives one authentic Qur'anic recitation reference from a renowned qārī.
  const quranListeningCards = [
    {key:'1:1',code:'001001',arabic:'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',label:'Al-Fātiḥah 1:1',purpose:'clear letter articulation and connected recitation'},
    {key:'2:2',code:'002002',arabic:'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ هُدًى لِّلْمُتَّقِينَ',label:'Al-Baqarah 2:2',purpose:'word boundaries, nouns and vowel endings'},
    {key:'2:30',code:'002030',arabic:'وَإِذْ قَالَ رَبُّكَ لِلْمَلَائِكَةِ إِنِّي جَاعِلٌ فِي الْأَرْضِ خَلِيفَةً',label:'Al-Baqarah 2:30',purpose:'verb structure and connected classical Arabic'},
    {key:'20:114',code:'020114',arabic:'رَبِّ زِدْنِي عِلْمًا',label:'Ṭā Hā 20:114',purpose:'guided classical reading and a concise supplication'},
    {key:'94:5',code:'094005',arabic:'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا',label:'Ash-Sharḥ 94:5',purpose:'Qur’anic grammar, emphasis and disciplined reflection'},
    {key:'112:1',code:'112001',arabic:'قُلْ هُوَ اللَّهُ أَحَدٌ',label:'Al-Ikhlāṣ 112:1',purpose:'stopping, qalqalah and precise recitation'},
    {key:'113:1',code:'113001',arabic:'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',label:'Al-Falaq 113:1',purpose:'applied tajwīd and teacher-review preparation'}
  ];

  const stageCardIndex=[0,1,1,2,3,4,0,5,3];
  const studyBlueprints=[
    {observe:'Trace the letter or mark before you say it. Notice its place, dots and vowel sign.',drill:'Read the target in three calm passes: isolated, joined, then within a word.',produce:'Record the target once slowly, leaving a short silence after it.',check:'Identify the exact written target without transliteration.'},
    {observe:'Name what the word points to, then notice its root, gender or relation.',drill:'Cover the English gloss and recall the Arabic form from the visual cue.',produce:'Use the target in one short fuṣḥā phrase about your surroundings.',check:'Match the Arabic target to its function or meaning.'},
    {observe:'Locate the word role before translating: starter, predicate, object, possessive or prepositional noun.',drill:'Underline the ending and say what caused it to be raised, accusative or genitive.',produce:'Explain the sentence skeleton aloud using the Arabic grammar terms you know.',check:'Choose the target pattern and state one visible role signal.'},
    {observe:'Find the root letters, then separate them from the added pattern letters.',drill:'Say the form, its root and its tense or derivational cue in that order.',produce:'Make one parallel example with the same pattern, then verify it with a teacher or dictionary.',check:'Recognise the visible form before giving an English gloss.'},
    {observe:'Read one clause at a time. Mark the connector, verb or noun phrase that starts each unit.',drill:'Read the passage once for structure and once for sense; do not translate word by word on the first pass.',produce:'Retell the central idea in a short English sentence, then reuse one Arabic chunk.',check:'Select the exact phrase studied and explain what it contributes.'},
    {observe:'Keep three layers separate: Arabic structure, a verified tafsīr source and your own reflection.',drill:'Mark roots and particles first; only then consult a reliable tafsīr for meaning.',produce:'Write one observation about grammar and one separately labelled personal reflection.',check:'Identify the textual cue without presenting an independent tafsīr claim.'},
    {observe:'Look at the marked letters and the following letter before naming a tajwīd rule.',drill:'Listen to the qārī, follow the text, then trace the rule on a printed or digital muṣḥaf.',produce:'Record a short attempt and name one feature you want a teacher to correct.',check:'Choose the written target and name the first observation needed for the rule.'},
    {observe:'Locate the cause of the rule, then decide your length or quality through the Hafṣ method taught by your qārī.',drill:'Listen once without reading, once while tracking the text, and once while pausing at the marked point.',produce:'Prepare a clean, short recording with one declared rule for teacher review.',check:'Identify the visual cue and distinguish it from a guess based on speed or volume.'},
    {observe:'Separate the original matn, the commentator’s explanation and your own study notes.',drill:'Read a small portion aloud, identify one form, then verify it in a reliable commentary.',produce:'Keep a portfolio entry: text, translation attempt, grammar note and teacher correction.',check:'State which layer—matn, sharḥ or note—you are reading.'}
  ];

  function attachLessonContent(){
    stages.forEach((stage,stageIndex)=>stage.lessons.forEach((item,lessonIndex)=>{
      const b=studyBlueprints[stageIndex];
      item.card=quranListeningCards[stageCardIndex[stageIndex]];
      item.content={
        sequence:`Lesson ${lessonIndex+1} of ${stage.lessons.length}`,
        observe:`${item.focus} ${b.observe}`,
        drill:`${b.drill} Today’s exact focus: ${item.ar}.`,
        produce:`${b.produce} Anchor the attempt in today’s focus: ${item.ar}.`,
        check:`${b.check} Today’s target: ${item.ar}.`,
        target:item.ar
      };
    }));
  }
  attachLessonContent();

  return {stages,lexicon,tajweed,sources,reciters,quranListeningCards};
})();
