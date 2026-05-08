
// CURSOR
const cursor = document.getElementById('cursor');
const ring = document.getElementById('ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
});
(function animRing() {
  rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animRing);
})();

// LOADER
document.body.style.overflow = 'hidden';
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loaderScreen').classList.add('hidden');
    document.body.style.overflow = '';
  }, 2200);
});

// NAV
window.addEventListener('scroll', () => document.getElementById('nav').classList.toggle('scrolled', scrollY > 50));

// FADE IN
const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); }), { threshold: 0.08 });
document.querySelectorAll('.fi').forEach(el => obs.observe(el));

// POSTS
const posts = [
  { id: 1, client: 'client1', label: 'Feed Post', bg: 'pb1' },
  { id: 2, client: 'client2', label: 'Story Design', bg: 'pb2' },
  { id: 3, client: 'client3', label: 'Promo Banner', bg: 'pb3' },
];
const clabels = { client1: 'Client 01', client2: 'Client 02', client3: 'Client 03' };
function renderPosts(filter) {
  const g = document.getElementById('postsGrid');
  if (!g) return;
  const f = filter === 'all' ? posts : posts.filter(p => p.client === filter);
  g.innerHTML = f.map(p => `
    <div class="post-item fi" data-client="${p.client}">
      <div class="post-placeholder ${p.bg}">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="2" stroke="#7a7790" stroke-width="1.2"/><circle cx="8" cy="8" r="2" fill="#7a7790" fill-opacity="0.5"/><path d="M2 16l5-4 4 3 3-2 8 5" stroke="#7a7790" stroke-width="1.2"/></svg>
        Add Image
        <div class="post-hover">
          <div class="post-hover-label">${p.label}</div>
          <div class="post-hover-client">${clabels[p.client]}</div>
        </div>
      </div>
    </div>`).join('');
  g.querySelectorAll('.fi').forEach(el => setTimeout(() => el.classList.add('vis'), 50));
}
renderPosts('all');
function filterPosts(f, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderPosts(f);
}

// MODAL DATA
const cases = {
  runday: {
    eyebrow: 'Health App · 22 Days',
    title: 'RunDay',
    role: 'UX Researcher & UI/UX Designer',
    team: 'Team of 1 designer + 4 coders',
    content: `
      <div style="margin-bottom: 32px;">
        <img src="runday-assets/banner runday.png" alt="RunDay Banner" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.2);">
      </div>

      <div class="modal-sec-title">1. The Spark (The Problem)</div>
      <p class="modal-text">The project began with a recurring frustration. A close friend of mine wanted to start running, but she was stuck in a painful cycle: she would run, feel great, but then end up sick or exhausted for days after. She didn't know what was happening inside her body or how to choose the right day to push herself.</p>
      <p class="modal-text" style="margin-top: 12px;">I realized she wasn't alone. Beginner runners often rely on "gut feeling," which is notoriously unreliable for gauging recovery. Without clear guidance, they face:</p>
      <ul class="modal-text" style="margin-top: 12px; padding-left: 24px; line-height: 1.8;">
        <li>A 29-58% higher risk of injury.</li>
        <li>Overtraining, which can slash performance by 20-30%.</li>
        <li>Burnout, making it impossible to maintain a consistent habit.</li>
      </ul>
      

      <div class="modal-sec-title">2. The Deep Dive (Design Process)</div>
      <p class="modal-text">As the sole UX Researcher and Designer in a team of four coders, I had 22 learning days to solve this. I started with a 5W1H analysis to pinpoint exactly where beginners lose their way.</p>
      <p class="modal-text" style="margin-top: 12px;">I investigated the "Big Five" of recovery metrics: TRIMP, HR, HRV, HRR, and Sleep. My goal was to understand how these contribute to Training Stress Balance (TSB)—the sweet spot where long-term fitness meets short-term fatigue. I found that while the data existed, it was too complex for a beginner to interpret while staring at a post-run screen.</p>
      

      <div class="modal-sec-title">3. Decoding the Science (How I Found the Solution)</div>
      <p class="modal-text">To move from "raw data" to "actionable advice," I mapped out an Information Architecture that prioritized the Next Day Recommendation.</p>
      <p class="modal-text" style="margin-top: 12px;">Instead of just showing a heart rate graph, the app needed to answer the runner's most urgent questions: "Should I run again tomorrow?" "Am I recovered enough?" The solution was a system that calculates a Fatigue Level (e.g., "Level C" or "50%") by comparing recent training loads with long-term baseline fitness.</p>

      <div class="process-img-row" style="grid-template-columns: 1fr; margin-top: 24px;">
         <img src="runday-assets/runday-research.png" style="width: 100%; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" alt="RunDay Chart UI">
         <img src="runday-assets/image.png" style="width: 100%; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" alt="RunDay Chart UI">
      </div>

      <div class="modal-sec-title">4. The Translation (Turning Metrics into Visuals)</div>
      <p class="modal-text">My main challenge was turning intimidating health markers into "gentle guidance". I focused on three pillars:</p>
      <ul class="modal-text" style="margin-top: 12px; padding-left: 24px; line-height: 1.8;">
        <li><strong style="color: var(--purple-light);">The Triadic Scheme:</strong> I used a triadic color palette—Red for Training Load, Orange for Heart Rate, and Blue for Sleep. This gives each category equal visual weight, making it easy for users to scan complex data without feeling overwhelmed.</li>
        <li><strong style="color: var(--purple-light);">The "Supportive Nudge":</strong> Orange was chosen for heart rate metrics specifically to add a soft sense of energy and optimism, motivating the user while remaining empathetic.</li>
        <li><strong style="color: var(--purple-light);">Native Familiarity:</strong> By following Apple’s Human Interface Guidelines and using SF Pro Typography, I ensured the UI felt like a natural extension of the user's phone. If they don’t have to "learn" the interface, they can focus entirely on understanding their body.</li>
      </ul>

      <div class="modal-sec-title">5. Visual Key Highlights</div>
      <ul class="modal-text" style="margin-top: 12px; padding-left: 24px; line-height: 1.8;">
        <li><strong style="color: var(--text);">Approachable Forms:</strong> I used rounded characters and shapes throughout the design system to keep the interface consistent and "easy to digest".</li>
        <li><strong style="color: var(--text);">Smart Recommendations:</strong> If the data shows minor fatigue, the app doesn't just say "Stop." It suggests a "Slower or shorter run" or "Quality sleep" to repair the body.</li>
        <li><strong style="color: var(--text);">Status at a Glance:</strong> Using high-fidelity cards, users can immediately see if their training load is "Just Right" or if they are "Within Normal Range," removing the guesswork from their fitness journey.</li>
      </ul>
      
      <div class="modal-sec-title" style="margin-top: 48px;">Download Document Detail</div>
      <div style="background: var(--surface); padding: 24px; border: 1px dashed var(--border); border-radius: 8px; display: flex; flex-direction: column; align-items: flex-start; gap: 16px;">
        <p class="modal-text" style="font-size: 0.85rem; margin: 0;">Want to dive deeper into the complete research framework, architecture, and high-fidelity screens? Download the full PDF case study below.</p>
        <a href="runday-assets/Tuffahati Sholihah_Portofolio Runday.pdf" download class="nav-cta" style="display: inline-flex; align-items: center; gap: 8px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 16L12 4M12 16L16 12M12 16L8 12M4 20H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Download PDF
        </a>
      </div>
    `
  },
  trackta: {
    eyebrow: 'Design System · 12 Days',
    title: 'Trackta',
    role: 'UX Researcher & UI/UX Designer',
    team: 'Team of 2 designers + 3 coders',
    content: `
      <div style="margin-bottom: 32px;">
        <img src="trackta-assets/banner-trackta.png" alt="Trackta Banner" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.2);">
      </div>

      <p class="modal-text">Building a design system is often about finding that perfect balance between visual flair and technical logic. For Trackta, a task management app, I spent 12 days as a UX Researcher & UI/UX Designer within a team of two designers and three coders.</p>
      <p class="modal-text" style="font-style: italic; margin-top: 12px; font-weight: 500; color: var(--purple-light);">Here is the story of how I used Trackta to master the language of design systems.</p>

      <div class="modal-sec-title">1. The Problem: The Consistency Gap</div>
      <p class="modal-text">The primary challenge wasn't just making a "to-do list"; it was solving the "Consistency Gap". In a collaborative environment, design decisions can easily get lost in translation. My goals were:</p>
      <ul class="modal-text" style="margin-top: 12px; padding-left: 24px; line-height: 1.8;">
        <li>Create a single source of truth so the product remains consistent regardless of who is designing or coding it.</li>
        <li>Bridge the communication gap with developers by defining shared rules for how components behave.</li>
        <li>Speed up the workflow by grounding decisions in a structured, reusable system.</li>
      </ul>

      <div class="modal-sec-title">2. The Design Process: The Component Playground</div>
      <p class="modal-text">I chose a task management app as my "playground" because it is the ultimate test for a design system. These apps rely on a high density of diverse UI components and repeated interaction patterns, such as:</p>
      <ul class="modal-text" style="margin-top: 12px; padding-left: 24px; line-height: 1.8;">
        <li>Input fields and checkboxes that must signal different states (checked, focused, disabled).</li>
        <li>Modals and alerts that need clear hierarchy for quick user decisions.</li>
        <li>Calendars and navigation that require rigid spacing and functional consistency.</li>
      </ul>

      <div class="modal-sec-title">3. Developing the Solution: A Shared Language</div>
      <p class="modal-text">To move from "pretty screens" to a "functional system," I focused on creating a shared understanding of behavior. I shifted my focus from purely visual aesthetics to defining the rules and behavior behind the components. By creating reusable building blocks, I was able to communicate with the development team more confidently, ensuring that every list, tag, and modal functioned exactly as intended.</p>

      <div class="modal-sec-title">4. Turning the System into Visuals: The Foundations</div>
      <p class="modal-text">As a designer, I translated complex system principles into three core visual foundations:</p>
      <ul class="modal-text" style="margin-top: 12px; padding-left: 24px; line-height: 1.8;">
        <li><strong style="color: var(--purple-light);">Solid Color Strategy:</strong> I opted for solid colors to ensure users can recognize buttons and statuses instantly. This provides clear contrast and keeps the interface clean, which is vital for users moving fast to stay organized.</li>
        <li><strong style="color: var(--purple-light);">Typographic Hierarchy:</strong> I utilized a single font family (SF Pro) and manipulated weights to create a clean, unified layout. This allows users to scan large amounts of text without feeling visually overwhelmed.</li>
        <li><strong style="color: var(--purple-light);">Intentional Spacing:</strong> Elements that are related are grouped tightly, while separate sections are given breathing room. This use of white space helps users process information faster and makes the app more comfortable for daily use.</li>
      </ul>

      <div class="modal-sec-title">5. Visual Key Highlight Findings</div>
      <ul class="modal-text" style="margin-top: 12px; padding-left: 24px; line-height: 1.8;">
        <li><strong style="color: var(--text);">Context-Aware Alerts:</strong> I designed a flexible Alert component with both horizontal and vertical layouts. Horizontal layouts are used when users need detailed context (title + description), while vertical layouts are reserved for simple, quick messages.</li>
        <li><strong style="color: var(--text);">Dynamic States:</strong> Every interactive element, like checkboxes, was defined through multiple states—Default, Hover, Focus, and Selected—to provide immediate feedback to the user.</li>
        <li><strong style="color: var(--text);">Expressive Illustrations:</strong> I integrated rounded, approachable illustrations that change based on the user's status (like a happy calendar for "task done") to make the productivity journey feel more personal and encouraging.</li>
      </ul>

      <div class="modal-sec-title" style="margin-top: 48px;">Download Document Detail</div>
      <div style="background: var(--surface); padding: 24px; border: 1px dashed var(--border); border-radius: 8px; display: flex; flex-direction: column; align-items: flex-start; gap: 16px;">
        <p class="modal-text" style="font-size: 0.85rem; margin: 0;">Curious about how I built this design system from scratch? Download the full PDF case study to view my component layouts, spacing rules, and visual architecture.</p>
        <a href="trackta-assets/trackta-design.pdf" download class="nav-cta" style="display: inline-flex; align-items: center; gap: 8px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 16L12 4M12 16L16 12M12 16L8 12M4 20H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Download PDF
              loopa: {
                eyebrow: 'Brain Training App · 35 Days',
                title: 'Loopa V2',
                role: 'UX Researcher & UI/UX Designer',
                team: 'Team of 2 designers + 3 coders',
                content: `
      < div style="margin-bottom: 32px;" >
        <img src="loopa-assets/banner-loopav2.png" alt="Loopa Banner" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.2);">
      </div>

      <p class="modal-text">Reinventing Loopa was about more than just "fixing an app"—it was about humanizing a neuropsychological test to help urban dwellers reclaim their sense of direction. Here is the story of how I transformed a clinical assessment into a playful daily habit.</p>

      <div class="modal-sec-title">1. The Invisible Barrier (The Problem)</div>
      <p class="modal-text">The spark for Loopa came from observing a friend who constantly struggled to remember where she placed her objects and frequently became disoriented while navigating on her motorbike. My research into Street Network Entropy (SNE) confirmed a fascinating pattern: adults living in urban environments with repetitive routines often have poorer spatial memory than those in rural areas.</p>
      <p class="modal-text" style="font-style: italic; margin-top: 12px; font-weight: 500; color: var(--purple-light);">For these users, weak spatial ability is a barrier to independence that causes:</p>
      <ul class="modal-text" style="margin-top: 12px; padding-left: 24px; line-height: 1.8;">
        <li><strong style="color: var(--text);">Safety Risks:</strong> Getting lost or confused while navigating urban spaces.</li>
        <li><strong style="color: var(--text);">Emotional Stress:</strong> Feelings of embarrassment and anxiety when others have to remind them of things repeatedly.</li>
        <li><strong style="color: var(--text);">A Lack of Engagement:</strong> My usability testing with 18 testers on TestFlight revealed that previous versions felt "flat" because the game loop was endless and instructions were unclear.</li>
      </ul>

      <div class="modal-sec-title">2. The Gamified Evolution (Design Process)</div>
      <p class="modal-text">As a UX Researcher & UI/UX Designer over 35 learning days, I led the effort to "Redefine Loopa" into something users actually wanted to use. We moved beyond the technical problem by mapping an Empathy Map to understand why users were frustrated.</p>
      <p class="modal-text" style="margin-top: 12px;">The core of our process involved:</p>
      <ul class="modal-text" style="margin-top: 12px; padding-left: 24px; line-height: 1.8;">
        <li><strong style="color: var(--purple-light);">Deconstructing Clinical Tests:</strong> We used the Corsi Block Span test as our scientific engine.</li>
        <li><strong style="color: var(--purple-light);">Iterative Testing:</strong> Identifying that users didn't feel a sense of progress, which led us to build a system of Daily Challenges and milestones.</li>
        <li><strong style="color: var(--purple-light);">Competitive Analysis:</strong> Learning that users wanted to improve but needed the training to be "simple and not stressful".</li>
      </ul>

      <div class="modal-sec-title">3. Science Meets Play (The Solution)</div>
      <p class="modal-text">The breakthrough was making the training "invisible". We turned a clinical measurement of spatial short-term memory into a vibrant game loop.</p>
      <ul class="modal-text" style="margin-top: 12px; padding-left: 24px; line-height: 1.8;">
        <li><strong style="color: var(--text);">Meaningful Milestones:</strong> I introduced a gamification layer with XP, high scores, and a Streak Calendar to give users a clear sense of achievement.</li>
        <li><strong style="color: var(--text);">Diverse Challenges:</strong> We expanded the game into four distinct modes—Pattern Flip, Rotating Maze, Dots Sequence, and 3D Matching—to exercise different facets of spatial processing.</li>
      </ul>

      <div class="modal-sec-title">4. The Translation (From Matrix to Visual)</div>
      <p class="modal-text">Turning complex neuropsychology into a friendly interface required a complete visual overhaul:</p>
      <ul class="modal-text" style="margin-top: 12px; padding-left: 24px; line-height: 1.8;">
        <li><strong style="color: var(--text);">Geometric Friendliness:</strong> I adopted a style with rounded edges, flat colors, and no outlines to ensure the app felt approachable rather than academic.</li>
        <li><strong style="color: var(--text);">Theme-Based Unity:</strong> We used a pastel color palette where each game has its own theme and "distinct personality," but the consistent palette keeps the entire app feeling like a unified experience.</li>
        <li><strong style="color: var(--text);">Optimized Typography:</strong> I selected SF Pro Rounded specifically for its "friendly feel" and high legibility.</li>
      </ul>

      <div class="modal-sec-title">5. Visual Key Highlights</div>
      <ul class="modal-text" style="margin-top: 12px; padding-left: 24px; line-height: 1.8;">
        <li><strong style="color: var(--text);">Satisfying Feedback:</strong> To solve the "flat" feel of the previous version, I integrated haptic and sound effects to provide a rewarding response to every user action.</li>
        <li><strong style="color: var(--text);">Clearer Guidance:</strong> I redesigned the onboarding and instructions to guide users through their first interaction, removing the confusion that caused them to drop off early.</li>
        <li><strong style="color: var(--text);">Emotional Resilience:</strong> By adding "Last Chance!" and "Keep Us Alive!" states, we used playful urgency to keep users motivated to maintain their daily streaks.</li>
      </ul>

      <div class="modal-sec-title" style="margin-top: 48px;">Download Document Detail</div>
      <div style="background: var(--surface); padding: 24px; border: 1px dashed var(--border); border-radius: 8px; display: flex; flex-direction: column; align-items: flex-start; gap: 16px;">
        <p class="modal-text" style="font-size: 0.85rem; margin: 0;">Want to explore how I transformed a clinical assessment into a gamified mobile app? Download the full PDF case study below.</p>
        <a href="loopa-assets/loopa-v2.pdf" download class="nav-cta" style="display: inline-flex; align-items: center; gap: 8px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 16L12 4M12 16L16 12M12 16L8 12M4 20H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Download PDF
        </a>
      </div>
    `
            }
        };

        function openModal(id) {
            const d = cases[id];
            let customBody = '';
            if (d.content) {
                customBody = d.content;
            } else {
                customBody = `
    < div class= "modal-sec-title" > The Brief</div>
      <p class="modal-text">${d.brief}</p>

      <div class="modal-sec-title">The Problem</div>
      <p class="modal-text">${d.problem}</p>

      <div class="modal-sec-title">Design Process</div>
      <div class="process-steps">
        ${d.steps.map(s => `<div class="process-step"><div class="ps-num">${s.n}</div><div class="ps-title">${s.t}</div><div class="ps-desc">${s.d}</div></div>`).join('')}
      </div>

      <div class="modal-sec-title">Process Snapshots</div>
      <p class="modal-text" style="margin-bottom:12px;font-size:0.82rem;">Replace these placeholders with your actual sketches, wireframes, and screenshots.</p>
      <div class="process-img-row">
        <div class="pimg"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="1" y="1" width="18" height="18" rx="2" stroke="#7a7790" stroke-width="1"/><circle cx="6" cy="6" r="2" fill="#7a7790" fill-opacity="0.4"/><path d="M1 14l4-3 3 2.5 3-2 8 4" stroke="#7a7790" stroke-width="1"/></svg>Research / Sketch</div>
        <div class="pimg"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="1" y="1" width="18" height="18" rx="2" stroke="#7a7790" stroke-width="1"/><circle cx="6" cy="6" r="2" fill="#7a7790" fill-opacity="0.4"/><path d="M1 14l4-3 3 2.5 3-2 8 4" stroke="#7a7790" stroke-width="1"/></svg>Lo-Fi / Mid-Fi</div>
        <div class="pimg"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="1" y="1" width="18" height="18" rx="2" stroke="#7a7790" stroke-width="1"/><circle cx="6" cy="6" r="2" fill="#7a7790" fill-opacity="0.4"/><path d="M1 14l4-3 3 2.5 3-2 8 4" stroke="#7a7790" stroke-width="1"/></svg>Iteration / Notes</div>
      </div>

      <div class="modal-sec-title">Key Design Insight</div>
      <p class="modal-text" style="font-style:italic;border-left:2px solid var(--purple-dim);padding-left:20px;color:var(--purple-light);">${d.insight}</p>

      <div class="modal-sec-title">Tools Used</div>
      <div class="result-tags">${d.tools.map(t => `<span class="result-tag">${t}</span>`).join('')}</div>

      <div class="modal-sec-title">Final Result</div>
      <div class="final-img">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="2" y="2" width="24" height="24" rx="3" stroke="#7a7790" stroke-width="1.2"/><circle cx="8" cy="8" r="2.5" fill="#7a7790" fill-opacity="0.4"/><path d="M2 20l6-5 5 4 4-3 9 6" stroke="#7a7790" stroke-width="1.2"/></svg>
        Add Final Design Image
      </div>
`;
            }

            document.getElementById('modalContent').innerHTML = `
  < div class="modal-header" >
      <div>
        <div class="modal-eyebrow">${d.eyebrow}</div>
        <div class="modal-title">${d.title}</div>
        <div class="modal-meta">
          <div class="modal-meta-item"><strong>Role</strong>${d.role}</div>
          <div class="modal-meta-item"><strong>Team</strong>${d.team}</div>
        </div>
      </div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div >
  <div class="modal-body">
    ${customBody}
  </div>`;
            document.getElementById('modalOverlay').classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        function closeModal() {
            document.getElementById('modalOverlay').classList.remove('active');
            document.body.style.overflow = '';
        }
        function handleOvClick(e) { if (e.target === document.getElementById('modalOverlay')) closeModal(); }
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
    