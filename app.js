(() => {
  'use strict';
  const DATA = window.LISAN_DATA;
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const esc = (s='') => String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const stripArabic = (s='') => s.normalize('NFD').replace(/[\u064B-\u065F\u0670]/g,'').replace(/[إأآ]/g,'ا').replace(/ى/g,'ي');
  const today = () => new Date().toISOString().slice(0,10);
  const blankState = () => ({completed:[],saved:[],custom:[],minutes:0,streak:1,lastStudy:null,lessonHistory:[],recordedToday:false});
  let state;
  try { state = {...blankState(), ...JSON.parse(localStorage.getItem('lisan-learning-state-v2') || '{}')}; } catch { state=blankState(); }
  const save = () => { localStorage.setItem('lisan-learning-state-v2', JSON.stringify(state)); renderStats(); };
  const toast = (message) => { const t=$('#toast'); t.textContent=message; t.classList.add('show'); clearTimeout(toast.timer); toast.timer=setTimeout(()=>t.classList.remove('show'),2800); };
  const allLessons = DATA.stages.flatMap((s,stageIndex)=>s.lessons.map((l,lessonIndex)=>({...l,stageIndex,lessonIndex,stage:s}))); 
  let currentLesson = null, lessonStep = 0, selectedSound = '';
  let currentTakeURL = null, recorder = null, recorderStream = null, chunks = [];
  let selectedReciter = localStorage.getItem('lisan-reciter') || 'alafasy';
  if(!DATA.reciters[selectedReciter]) selectedReciter='alafasy';
  const getReciter = () => DATA.reciters[selectedReciter];
  const qariAudioUrl = card => `${getReciter().base}${card.code}.mp3`;
  function playQari(card){
    if(!card){ toast('This listening card is not available yet.'); return; }
    const audio=new Audio(qariAudioUrl(card));
    audio.addEventListener('error',()=>toast(`${getReciter().name}'s reference stream is unavailable. No synthetic fallback is used for recitation.`),{once:true});
    audio.play().catch(()=>toast('The qārī reference needs a network connection and a browser play gesture.'));
  }
  function lessonQariCard(lesson,buttonId='lesson-qari'){
    const card=lesson.card, reciter=getReciter();
    return `<aside class="qari-card"><div><p class="eyebrow">AUTHENTIC QUR’ANIC LISTENING CARD</p><h3>${esc(card.label)}</h3><p class="qari-card-ar" dir="rtl">${esc(card.arabic)}</p><p>${esc(card.purpose)}. This is a qārī reference for recitation—not a device-generated pronunciation.</p></div><button class="btn outline" id="${buttonId}">▷ Play ${esc(reciter.name)}</button></aside>`;
  }
  function ruleQariCard(rule){
    const cards={makharij:0,short:0,madd:0,ghunnah:0,nun:1,meem:1,qalqalah:5,heavy:6,ra:0,'madd-far':5,waqf:5,review:5};
    return DATA.quranListeningCards[cards[rule.id] ?? 0];
  }
  function updateQariControls(){
    const r=getReciter();
    $('#play-reference')?.replaceChildren(document.createTextNode(`▷ Play ${r.name}`));
    $('#reciter-select') && ($('#reciter-select').value=selectedReciter);
  }

  function studyToday(){
    if(state.lastStudy !== today()){
      if(state.lastStudy){ const prev=new Date(Date.now()-86400000).toISOString().slice(0,10); state.streak=state.lastStudy===prev ? (state.streak||1)+1 : 1; }
      state.lastStudy=today();
    }
  }
  function totalStageDone(index){ return DATA.stages[index].lessons.filter(l=>state.completed.includes(l.id)).length; }
  function stageUnlocked(index){ if(index===0) return true; const prev=DATA.stages[index-1]; return prev.lessons.filter(l=>state.completed.includes(l.id)).length >= Math.ceil(prev.lessons.length*.7); }
  function lessonUnlocked(l){ return stageUnlocked(l.stageIndex) && (l.lessonIndex===0 || state.completed.includes(l.stage.lessons[l.lessonIndex-1].id)); }
  function firstNext(){ return allLessons.find(l=>lessonUnlocked(l) && !state.completed.includes(l.id)) || allLessons.find(l=>!state.completed.includes(l.id)) || allLessons[allLessons.length-1]; }
  function goalProgress(){
    const tasks=[state.lessonHistory.includes(today()),state.recordedToday,state.saved.some(x=>x.savedOn===today())];
    return Math.round((tasks.filter(Boolean).length/tasks.length)*100);
  }
  function renderStats(){
    const complete=state.completed.length, percent=goalProgress();
    $('#streak-count').textContent=state.streak||1; $('#metric-streak').textContent=state.streak||1;
    $('#metric-minutes').textContent=state.minutes||0; $('#metric-words').textContent=state.saved.length;
    $('#metric-complete').textContent=`${complete}/87`; $('#daily-percent').textContent=`${percent}%`;
    $('.goal-ring').style.setProperty('--goal',`${percent}%`);
    const next=firstNext();
    $('#daily-title').textContent=percent===100?'Today’s rhythm is complete':'One lesson · one recording · three words';
    $('#daily-next').textContent=percent===100?'Review a favourite sentence aloud or keep your streak gentle.':`Next: ${next.title} — ${next.objective}`;
    $('#top-lesson').textContent=`${next.stage.title} · ${next.title}`;
    $('#path-summary-title').textContent=`Stage ${next.stage.n} · ${next.stage.title}`;
    $('#path-summary-copy').textContent=next.stage.description;
    renderSaved();
  }

  function route(id){
    $$('.view').forEach(v=>v.classList.toggle('active',v.id===id));
    $$('[data-route]').forEach(b=>b.classList.toggle('active',b.dataset.route===id));
    const labels={home:'TODAY’S PATH',path:'LEARNING PATH',lesson:'LESSON STUDIO',tajweed:'TAJWĪD LAB',studio:'SPEAKING STUDIO',dictionary:'DICTIONARY',sources:'METHOD & SOURCES'};
    $('#route-label').textContent=labels[id]||'LISĀN';
    window.scrollTo({top:0,behavior:'smooth'});
  }
  $$('[data-route]').forEach(b=>b.addEventListener('click',()=>route(b.dataset.route)));
  $$('[data-start-next]').forEach(b=>b.addEventListener('click',()=>openLesson(firstNext().id)));

  function renderStages(){
    $('#stage-list').innerHTML=DATA.stages.map((stage,index)=>{
      const done=totalStageDone(index), unlocked=stageUnlocked(index), percent=Math.round(done/stage.lessons.length*100);
      return `<article class="stage-card ${unlocked?'':'locked'}" data-stage="${stage.id}" style="--stage-progress:${percent}%">
        <div class="stage-number">${unlocked?stage.n:'🔒'}</div><div><span class="stage-meta">${stage.tag}</span><h2>${stage.title}</h2><p>${stage.description}</p><div class="stage-mini"><i></i><span>${done}/${stage.lessons.length} mastered</span></div></div>
        <button class="btn ${unlocked?'outline':'ghost'}" ${unlocked?'':'disabled'}>${unlocked?(done?'Review':'Begin'):'Build the stage before'}</button>
        <div class="lesson-list">${stage.lessons.map((l,i)=>{
          const full={...l,stageIndex:index,lessonIndex:i,stage}, doneL=state.completed.includes(l.id), ready=lessonUnlocked(full);
          return `<button class="lesson-row ${doneL?'done':''}" data-lesson="${l.id}" ${ready?'':'disabled'}><span class="lesson-status">${doneL?'✓':ready?'→':'·'}</span><span class="lesson-title">${i+1}. ${l.title}</span><span class="lesson-ar">${l.ar}</span><span class="lesson-minutes">${l.minutes} min</span></button>`;
        }).join('')}</div></article>`;
    }).join('');
    $$('.stage-card > .btn').forEach(btn=>btn.addEventListener('click',e=>{const card=e.target.closest('.stage-card');card.classList.toggle('open');}));
    $$('.lesson-row[data-lesson]').forEach(btn=>btn.addEventListener('click',()=>openLesson(btn.dataset.lesson)));
  }

  function openLesson(id){
    currentLesson=allLessons.find(l=>l.id===id); if(!currentLesson) return;
    lessonStep=0; selectedSound=''; renderLesson(); route('lesson');
  }
  function lessonSoundTiles(){
    const tokens=(currentLesson.ar.match(/[^\s/]+/g)||[currentLesson.ar]).slice(0,4);
    return `<div class="sound-tiles static-tiles">${tokens.map((token,i)=>`<span class="sound-tile static">${esc(token)}<small>${i===0?'target':'read in sequence'}</small></span>`).join('')}</div>${lessonQariCard(currentLesson)}`;
  }
  function lessonChoices(){
    const opts=[currentLesson.ar,'كِتَابٌ','رَحْمَةٌ','قَالَ','عِلْمٌ'].filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
    while(opts.length<4) opts.push(['هٰذَا','صَبْرٌ','مَاءٌ'][opts.length]||'هُدًى');
    opts.sort(()=>Math.random()-.5);
    return `<div class="challenge"><p class="eyebrow">GUIDED CHECK</p><h3>${esc(currentLesson.content.check)}</h3><div class="choice-grid">${opts.map(o=>`<button class="choice" data-answer="${esc(o)}">${esc(o)}</button>`).join('')}</div><p class="small muted" id="challenge-feedback">Select the target, then explain the visible cue in your own words.</p></div>`;
  }
  function lessonVisual(l){
    const target=esc(l.ar);
    if(l.stageIndex===0) return `<div class="lesson-visual mouth-visual"><div class="mouth-map"><span class="place one">source</span><span class="place two">release</span></div><div><p class="eyebrow">SOUND PATH</p><p class="ar-example">${target}</p><p>Point, listen, imitate, then compare your own recording.</p></div></div>`;
    if(l.stageIndex===1) return `<div class="lesson-visual vocab-visual"><div class="word-orbit"><b>${target}</b><span>form</span><span>meaning</span><span>context</span></div><div><p class="eyebrow">WORD MAP</p><h3>Link sound to a usable idea.</h3><p>See the Arabic form in the centre, then connect it to meaning and a real-life scene.</p></div></div>`;
    if(l.stageIndex===2) return `<div class="lesson-visual syntax-visual"><div class="syntax-rail"><span>word</span><b>→</b><span>role</span><b>→</b><span>ending</span><b>→</b><span>meaning</span></div><div><p class="eyebrow">IʿRĀB LENS</p><p class="ar-example">${target}</p><p>Read each ending as a role signal before translating.</p></div></div>`;
    if(l.stageIndex===3) return `<div class="lesson-visual sarf-visual"><div class="sarf-flow"><span>ف ع ل<small>root</small></span><b>→</b><span>${target}<small>pattern in context</small></span><b>→</b><span>meaning<small>from the sentence</small></span></div><div><p class="eyebrow">MORPHOLOGY FLOW</p><p>Return the visible form to its root and pattern, then read the meaning in context.</p></div></div>`;
    if(l.stageIndex===4) return `<div class="lesson-visual reading-visual"><div class="reading-flow"><span>1<br/><b>scan</b></span><i>→</i><span>2<br/><b>group</b></span><i>→</i><span>3<br/><b>parse</b></span><i>→</i><span>4<br/><b>retell</b></span></div><div><p class="eyebrow">READING ROUTINE</p><p class="ar-example">${target}</p><p>Move through a clause deliberately instead of translating isolated words.</p></div></div>`;
    if(l.stageIndex===5) return `<div class="lesson-visual quran-visual"><div class="quran-flow"><span>short text</span><b>→</b><span>root & grammar</span><b>→</b><span>reliable tafsīr</span><b>→</b><span>reflection</span></div><div><p class="eyebrow">DISCIPLINED QUR’ANIC STUDY</p><p class="ar-example">${target}</p><p>Grammar is a doorway to meaning—not a substitute for reliable tafsīr.</p></div></div>`;
    if(l.stageIndex===6 || l.stageIndex===7) return `<div class="lesson-visual tajweed-visual"><div class="tajweed-flow"><span>see<br/><b>${target}</b></span><i>→</i><span>hear</span><i>→</i><span>trace</span><i>→</i><span>teacher check</span></div><div><p class="eyebrow">RECITATION LOOP</p><p>Use colour and listening as cues. Confirm rule application with a qualified teacher.</p></div></div>`;
    return `<div class="lesson-visual matn-visual"><div class="matn-columns"><span><b>مَتْن</b><small>author text</small></span><span><b>شَرْح</b><small>commentary</small></span><span><b>فَوَائِد</b><small>your notes</small></span></div><div><p class="eyebrow">SCHOLARLY READING LENS</p><p class="ar-example">${target}</p><p>Keep the original text, commentary and your own notes visibly separate.</p></div></div>`;
  }

  function renderLesson(){
    const l=currentLesson; if(!l)return;
    $('#lesson-kicker').textContent=`${l.stage.title.toUpperCase()} · LESSON ${l.id.replace('L','')}`;
    $('#lesson-title').textContent=l.title; $('#lesson-subtitle').textContent=l.objective;
    $('#lesson-step-label').textContent=`${lessonStep+1} of 4`; $('#lesson-progress-fill').style.width=`${(lessonStep+1)*25}%`;
    const panes=[
      `<div class="lesson-stage-inner"><p class="eyebrow">${esc(l.content.sequence)} · NOTICE</p><div class="mega-arabic">${esc(l.ar)}</div><h2>${esc(l.title)}</h2><p>${esc(l.objective)}</p><div class="challenge"><p class="eyebrow">TEACHER’S LENS</p><h3>${esc(l.focus)}</h3><p>${esc(l.content.observe)}</p></div></div>`,
      `<div class="lesson-stage-inner"><p class="eyebrow">LISTEN WITH A QĀRĪ</p><h2>Hear authentic recitation—then practise deliberately.</h2><p>${esc(l.content.drill)}</p>${lessonSoundTiles()}<p class="small muted">A qārī is an authoritative recitation model for Qur’anic listening. This app does not use synthetic speech as a tajwīd or Qur’an model.</p></div>`,
      `<div class="lesson-stage-inner"><p class="eyebrow">MAKE IT VISUAL</p>${lessonVisual(l)}<div class="challenge"><p class="eyebrow">PATTERN CARD</p><h3>${esc(l.title)}</h3><p>${esc(l.focus)}</p><p class="small muted">${esc(l.content.produce)}</p><button class="btn outline" id="pattern-qari">▷ Hear the selected qārī reference</button></div></div>`,
      `<div class="lesson-stage-inner"><p class="eyebrow">RETRIEVE & REFLECT</p><h2>Can you recognise the form and explain it?</h2><p>${esc(l.content.produce)}</p>${lessonChoices()}<div class="challenge"><p class="eyebrow">SPEAK</p><h3>Record a ten-second reflection</h3><p>Read the target, name one visual cue, then note what you will ask a teacher to correct.</p><button class="btn outline" data-route="studio">Open Speaking Studio →</button></div></div>`
    ];
    $('#lesson-stage').innerHTML=panes[lessonStep];
    $('#prev-step').disabled=lessonStep===0; $('#prev-step').style.opacity=lessonStep===0?'.45':'1';
    const final=lessonStep===3; $('#next-step').innerHTML=final?(state.completed.includes(l.id)?'Back to path <b>→</b>':'Master this lesson <b>✓</b>'):'Continue <b>→</b>';
    $('#lesson-qari')?.addEventListener('click',()=>playQari(l.card));
    $('#pattern-qari')?.addEventListener('click',()=>playQari(l.card));
    $$('.choice').forEach(b=>b.addEventListener('click',()=>{const ok=stripArabic(b.dataset.answer)===stripArabic(l.ar);$$('.choice').forEach(x=>x.disabled=true);b.classList.add(ok?'correct':'wrong'); const correct=$$('.choice').find(x=>stripArabic(x.dataset.answer)===stripArabic(l.ar)); if(correct)correct.classList.add('correct');$('#challenge-feedback').textContent=ok?'Correct. Now say why this is the focus.':'Notice the highlighted answer, then read it aloud once.';}));
    $$('[data-route="studio"]', $('#lesson-stage')).forEach(b=>b.addEventListener('click',()=>route('studio')));
  }
  $('#prev-step').addEventListener('click',()=>{if(lessonStep>0){lessonStep--;renderLesson();}});
  $('#next-step').addEventListener('click',()=>{if(lessonStep<3){lessonStep++;renderLesson();}else if(state.completed.includes(currentLesson.id)){renderStages();route('path');}else{completeLesson(currentLesson);}});
  function completeLesson(l){ studyToday(); state.completed.push(l.id); state.minutes+=(l.minutes||14); if(!state.lessonHistory.includes(today()))state.lessonHistory.push(today()); save();renderStages();toast(`${l.title} mastered — steady work compounds.`);route('path'); }

  function renderTajweed(tab='foundation'){
    $$('.tajweed-tabs button').forEach(b=>b.classList.toggle('active',b.dataset.tajTab===tab));
    $('#tajweed-grid').innerHTML=DATA.tajweed[tab].map(r=>`<button class="tajweed-card" data-rule="${r.id}"><div class="rule-visual ${r.tone}">${r.visual}</div><p class="eyebrow">${r.arabic}</p><h2>${r.title}</h2><p>${r.summary}</p><span class="text-btn">Open visual rule →</span></button>`).join('');
    $$('.tajweed-card').forEach(b=>b.addEventListener('click',()=>openRule(DATA.tajweed[tab].find(r=>r.id===b.dataset.rule))));
  }
  function openRule(r){
    const dots=Array.from({length:r.id==='madd'||r.id==='madd-far'?4:2},(_,i)=>`<i class="${i<2?'active':''}"></i>`).join('');
    const card=ruleQariCard(r);
    $('#tajweed-detail-body').innerHTML=`<div class="rule-detail-content"><div class="rule-diagram"><p class="eyebrow">VISUAL CUE</p><div class="diagram-word">${r.example.replace(r.highlight,`<span class="highlight">${r.highlight}</span>`)}</div><div class="counting">${dots}</div></div><div><p class="eyebrow">${r.arabic}</p><h2>${r.title}</h2><p>${r.summary}</p><p><b>Practice cue:</b> ${r.cue}</p><button class="btn outline" id="rule-qari">▷ Play ${esc(getReciter().name)} · ${esc(card.label)}</button><p class="tiny">This is a Qur’anic listening reference; verify the rule in its marked text with a qualified teacher.</p><div class="teacher-check"><b>Teacher check.</b> ${r.teacher}</div></div></div>`;
    $('#tajweed-detail').classList.add('show'); $('#rule-qari').onclick=()=>playQari(card);
    $('#tajweed-detail').scrollIntoView({behavior:'smooth',block:'nearest'});
  }
  $$('.tajweed-tabs button').forEach(b=>b.addEventListener('click',()=>renderTajweed(b.dataset.tajTab)));
  $('#tajweed-close').addEventListener('click',()=>$('#tajweed-detail').classList.remove('show'));

  // IndexedDB keeps audio blobs separate from simple progress state.
  const audioDB=()=>new Promise((resolve,reject)=>{const req=indexedDB.open('lisan-recordings',1);req.onupgradeneeded=()=>{const db=req.result;if(!db.objectStoreNames.contains('takes'))db.createObjectStore('takes',{keyPath:'id'});};req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});
  async function saveTake(blob){try{const db=await audioDB();const take={id:crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${Math.random()}`,createdAt:Date.now(),blob};await new Promise((resolve,reject)=>{const tx=db.transaction('takes','readwrite');tx.objectStore('takes').put(take);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});return take;}catch(e){console.warn(e);toast('The recording is available for playback but could not be saved.');return null;}}
  async function getTakes(){try{const db=await audioDB();return await new Promise((resolve,reject)=>{const tx=db.transaction('takes','readonly');const req=tx.objectStore('takes').getAll();req.onsuccess=()=>resolve(req.result.sort((a,b)=>b.createdAt-a.createdAt));req.onerror=()=>reject(req.error);});}catch{return [];}}
  async function renderTakes(){const target=$('#take-list');const takes=await getTakes();if(!takes.length){target.innerHTML='<p class="empty-takes">Your saved practice takes will appear here.</p>';return;}target.innerHTML=takes.map((t,i)=>`<div class="take-row"><span>◉</span><b>Take ${takes.length-i} · ${new Date(t.createdAt).toLocaleDateString()}</b><button data-play-take="${t.id}">Play</button></div>`).join('');$$('[data-play-take]').forEach(b=>b.addEventListener('click',()=>{const t=takes.find(x=>x.id===b.dataset.playTake);if(t){const a=new Audio(URL.createObjectURL(t.blob));a.play().catch(()=>toast('Tap play again to hear this recording.'));}}));}
  async function startRecording(){
    if(recorder?.state==='recording'){recorder.stop();return;}
    if(!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder){toast('Recording needs a browser that supports microphone capture.');return;}
    try{recorderStream=await navigator.mediaDevices.getUserMedia({audio:true});chunks=[];recorder=new MediaRecorder(recorderStream);recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};recorder.onstop=async()=>{const blob=new Blob(chunks,{type:recorder.mimeType||'audio/webm'});if(currentTakeURL)URL.revokeObjectURL(currentTakeURL);currentTakeURL=URL.createObjectURL(blob);$('#play-take').disabled=false;$('#record-status').textContent='Your take is ready';$('#record-help').textContent='Use playback for self-review, then save another take after a teacher’s correction.';$('#record-button').innerHTML='<i></i><span>Start recording</span>';$('#record-orb').classList.remove('recording');recorderStream.getTracks().forEach(t=>t.stop());const saved=await saveTake(blob);if(saved){studyToday();state.recordedToday=true;state.minutes+=3;save();renderTakes();toast('Practice take saved privately on this device.');}};recorder.start();$('#record-button').innerHTML='<i></i><span>Stop & save</span>';$('#record-status').textContent='Recording…';$('#record-help').textContent='Recite steadily. Leave a small breath at the end before you stop.';$('#record-orb').classList.add('recording');}catch{toast('Microphone permission is needed to record a take.');}}
  $('#record-button').addEventListener('click',startRecording);$('#play-take').addEventListener('click',()=>{if(!currentTakeURL)return;const a=new Audio(currentTakeURL);a.play().catch(()=>toast('Playback needs a browser gesture.'));});
  $('#reciter-select')?.addEventListener('change',e=>{selectedReciter=e.target.value;localStorage.setItem('lisan-reciter',selectedReciter);updateQariControls();toast(`${getReciter().name} selected for Qur’anic reference audio.`);});
  $('#play-reference').addEventListener('click',()=>playQari(DATA.quranListeningCards[0]));
  const wordLens={
    'بِسْمِ':['In the name','س م و','Preposition + a genitive noun'], 'اللَّهِ':['of Allah','أ ل ه','Proper noun in genitive after bi-'], 'الرَّحْمَٰنِ':['The Most Compassionate','ر ح م','Definite adjective, genitive'], 'الرَّحِيمِ':['The Most Merciful','ر ح م','Definite adjective, genitive']
  };
  $$('.word-pills button').forEach(b=>b.addEventListener('click',()=>{const [gloss,root,cue]=wordLens[b.dataset.word]||['Study word','—','Open it in the dictionary for a fuller card.'];$('#word-lens').innerHTML=`<p class="eyebrow">WORD LENS</p><h2 class="quran-line" style="font-size:34px;text-align:left;margin:4px 0">${b.dataset.word}</h2><p><b>${gloss}</b> · root <span class="root">${root}</span></p><p>${cue}</p>`;}));

  function allWords(){ return [...DATA.lexicon,...state.custom]; }
  function wordMatch(q){ const raw=q.trim().toLowerCase(), ar=stripArabic(q.trim()); if(!raw)return null; return allWords().find(w=>w.english.toLowerCase()===raw||stripArabic(w.arabic)===ar) || allWords().find(w=>w.english.toLowerCase().includes(raw)||stripArabic(w.arabic).includes(ar)||w.transliteration.toLowerCase().includes(raw)); }
  function displayWord(w){
    if(!w){$('#dict-result').innerHTML='<div class="empty-lexicon">؟</div><h2>Not in the starter lexicon yet</h2><p>Add it as a personal word below, or try a base English form (for example “forgive” rather than “forgiveness”).</p>';return;}
    const saved=state.saved.some(s=>s.arabic===w.arabic);
    $('#dict-result').innerHTML=`<div class="dict-card"><div><p class="eyebrow">${esc(w.root==='—'?'FUNCTION WORD':`ROOT · ${w.root}`)}</p><h2>${esc(w.english)}</h2><p class="trans">${esc(w.transliteration)}</p><p class="note">${esc(w.note)}</p><p class="tiny">Pronunciation is practised through teacher feedback and Qur’anic qārī references; this dictionary does not present synthetic speech as a recitation model.</p><div class="dict-actions"><button class="btn ${saved?'ghost':'primary'}" id="dict-save">${saved?'Saved ✓':'Save for review'}</button></div></div><div class="arabic-word" dir="rtl">${esc(w.arabic)}</div></div>`;
    $('#dict-save').onclick=()=>toggleSaved(w);
  }
  function toggleSaved(w){ const ix=state.saved.findIndex(x=>x.arabic===w.arabic); if(ix>=0){state.saved.splice(ix,1);toast('Removed from your review stack.');}else{studyToday();state.saved.push({...w,savedOn:today()});toast(`${w.english} saved for review.`);}save();displayWord(w); }
  function renderSaved(){ const t=$('#saved-words'); if(!t)return;$('#saved-count').textContent=`${state.saved.length} ${state.saved.length===1?'word':'words'}`;t.innerHTML=state.saved.length?state.saved.map((w,i)=>`<article class="saved-word"><div><span class="s-en">${esc(w.english)}</span><small>${esc(w.transliteration)}</small></div><span class="s-ar">${esc(w.arabic)}</span><button data-remove-saved="${i}" aria-label="Remove ${esc(w.english)}">×</button></article>`).join(''):'<p class="muted small">Save useful words to turn this into your own review stack.</p>';$$('[data-remove-saved]').forEach(b=>b.addEventListener('click',()=>{state.saved.splice(Number(b.dataset.removeSaved),1);save();toast('Removed from review.');})); }
  $('#dict-form').addEventListener('submit',e=>{e.preventDefault();const q=$('#dict-input').value;displayWord(wordMatch(q));});
  $('#custom-word-form').addEventListener('submit',e=>{e.preventDefault();const form=new FormData(e.currentTarget);const word={english:String(form.get('english')).trim(),arabic:String(form.get('arabic')).trim(),transliteration:'personal entry',root:'—',note:String(form.get('note')).trim()||'Personal study word'}; if(!word.english||!word.arabic)return;state.custom.push(word);save();e.currentTarget.reset();displayWord(word);toast('Personal dictionary word added.');});

  function renderSources(){ $('#source-list').innerHTML=DATA.sources.map(s=>`<article class="source-card card"><p class="eyebrow">SOURCE & METHOD</p><h2>${s.title}</h2><p>${s.copy}</p><a href="${s.url}" target="_blank" rel="noreferrer">Open source ↗</a></article>`).join(''); }
  // Add a visible source route from the method note without cluttering primary navigation.
  $('.teacher-note').insertAdjacentHTML('beforeend',' <button class="text-btn" data-route="sources">Method & sources →</button>');
  $('.teacher-note [data-route="sources"]').addEventListener('click',()=>route('sources'));

  renderStages(); renderStats(); renderTajweed(); renderSources(); renderTakes(); updateQariControls();
  if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});
})();
