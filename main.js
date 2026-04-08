// ===== YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== CUSTOM CURSOR =====
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
if (window.innerWidth > 480 && dot && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        dot.style.left = `${mx}px`; dot.style.top = `${my}px`;
    });
    (function animRing() {
        rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
        ring.style.left = `${rx}px`; ring.style.top = `${ry}px`;
        requestAnimationFrame(animRing);
    })();
    // Enhanced hover detection for interactive elements
    const interactiveElements = 'a,button,.project-card,.sk-chip,.form-input,.ach-card,.highlight-item,.tech-tags span,.btn';
    document.querySelectorAll(interactiveElements).forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
}

// ===== ENHANCED BUTTON INTERACTIONS =====
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px) scale(1.04)';
    });
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    btn.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(-1px) scale(1.02)';
    });
    btn.addEventListener('mouseup', function() {
        this.style.transform = 'translateY(-4px) scale(1.04)';
    });
});
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const depthShapes = document.querySelectorAll('.depth-shape');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 40);
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(s => { if (scrollY >= s.offsetTop - 130) current = s.id; });
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
    
    // Parallax background effect
    depthShapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.15;
        shape.style.transform = `translateY(${scrollY * speed}px)`;
    });
}, { passive: true });

// ===== MOBILE MENU =====
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger?.addEventListener('click', () => mobileMenu.classList.toggle('open'));
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => mobileMenu.classList.remove('open')));

// ===== TYPEWRITER =====
const typedEl = document.getElementById('typewriter');
if (typedEl) {
    const words = ['Machine Learning', 'Data Science', 'Problem Solving', 'Web Development'];
    let wi = 0, ci = 0, del = false;
    function type() {
        const w = words[wi];
        typedEl.textContent = del ? w.slice(0, ci - 1) : w.slice(0, ci + 1);
        del ? ci-- : ci++;
        let t = del ? 45 : 110;
        if (!del && ci === w.length)   { t = 2200; del = true; }
        else if (del && ci === 0)       { del = false; wi = (wi + 1) % words.length; t = 460; }
        setTimeout(type, t);
    }
    type();
}

// ===== SCROLL REVEAL WITH ENHANCED ANIMATION =====
const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { 
        if (e.isIntersecting) { 
            e.target.classList.add('in');
            // Add staggered animation for child elements
            const children = e.target.querySelectorAll('[data-reveal-child]');
            children.forEach((child, i) => {
                setTimeout(() => child.classList.add('in'), i * 100);
            });
            obs.unobserve(e.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// ===== CONTACT FORM =====
document.getElementById('contact-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = `<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg> Sent!`;
    btn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
    setTimeout(() => { e.target.reset(); btn.innerHTML = orig; btn.style.background = ''; }, 3500);
});

// ===== HERO & ABOUT PHOTO INTERACTION =====
(function initPhotoCarousels() {
    const carousels = [
        { selector: '.photo-slide', interval: 2000 },
        { selector: '.about-photo-slide', interval: 5000 }
    ];

    carousels.forEach(carousel => {
        const slides = Array.from(document.querySelectorAll(carousel.selector));
        if (!slides.length) return;

        let index = 0;
        const activate = activeIndex => {
            slides.forEach((slide, i) => {
                const isActive = i === activeIndex;
                slide.classList.toggle('active', isActive);
                slide.style.zIndex = isActive ? '2' : '1';
            });
        };

        activate(index);
        setInterval(() => {
            index = (index + 1) % slides.length;
            activate(index);
        }, carousel.interval);
    });

    // ===== PREMIUM 3D TILT EFFECT — HERO PHOTO =====
    const heroWrapperEl = document.getElementById('hero-photo-wrapper');
    const heroFrameEl   = document.getElementById('hero-photo-frame');
    if (heroWrapperEl && heroFrameEl) {
        heroWrapperEl.addEventListener('mousemove', e => {
            const rect = heroWrapperEl.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const x = (e.clientX - rect.left - centerX) / centerX;
            const y = (e.clientY - rect.top - centerY) / centerY;
            
            const rotX = (-y * 8).toFixed(2);
            const rotY = (x * 8).toFixed(2);
            
            heroFrameEl.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
            heroFrameEl.style.boxShadow = `
                0 25px 60px rgba(0,0,0,.6),
                0 0 60px rgba(79,70,229,.4),
                0 0 100px rgba(34,211,238,.2)
            `;
        });
        heroWrapperEl.addEventListener('mouseleave', () => {
            heroFrameEl.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
            heroFrameEl.style.boxShadow = '0 0 40px rgba(79,70,229,.2)';
        });
    }

    // ===== PREMIUM 3D TILT EFFECT — ABOUT PHOTO =====
    const aboutWrapperEl = document.getElementById('about-photo-wrapper');
    const aboutWrapEl    = document.getElementById('about-photo-wrap');
    if (aboutWrapperEl && aboutWrapEl) {
        aboutWrapperEl.addEventListener('mousemove', e => {
            const rect = aboutWrapperEl.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const x = (e.clientX - rect.left - centerX) / centerX;
            const y = (e.clientY - rect.top - centerY) / centerY;
            
            const rotX = (-y * 10).toFixed(2);
            const rotY = (x * 10).toFixed(2);
            
            aboutWrapEl.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04)`;
        });
        aboutWrapperEl.addEventListener('mouseleave', () => {
            aboutWrapEl.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    }

    // ===== PREMIUM 3D TILT EFFECT — PROJECT CARDS =====
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const x = (e.clientX - rect.left - centerX) / centerX;
            const y = (e.clientY - rect.top - centerY) / centerY;
            
            const rotX = (-y * 6).toFixed(2);
            const rotY = (x * 6).toFixed(2);
            
            card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02) translateY(-10px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = ''; // let CSS handle the reset
        });
        // Click effect: zoom forward
        card.addEventListener('click', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.08) translateZ(30px)`;
            card.style.transition = 'transform 0.2s ease-out';
            setTimeout(() => {
                card.style.transition = '';
                card.style.transform = '';
            }, 300);
        });
    });
})();

// =============================================================
//  SKILL MODAL ENGINE
// =============================================================
const modal    = document.getElementById('skill-modal');
const modalBody= document.getElementById('skm-body');
const modalFile= document.getElementById('skm-filename');
const closeBtn = document.getElementById('skm-close');

// ---- helper: build a code block with line numbers ----
function codeBlock(lines) {
    const nums  = lines.map((_,i) => i+1).join('\n');
    const code  = lines.join('\n');
    return `<div class="code-block"><pre class="line-nums">${nums}</pre><pre class="code-lines">${code}</pre></div>`;
}

// ---- helper: info card (soft skills / non-code tools) ----
function infoCard({ emoji, title, body, tags }) {
    return `<div class="skm-info">
        <div class="skm-info-badge">${emoji}</div>
        <h4>${title}</h4>
        <p>${body}</p>
        <div class="skm-tags">${tags.map(t=>`<span class="skm-tag">${t}</span>`).join('')}</div>
    </div>`;
}

// ---- helper: dashboard ----
function dashboard({ title, subtitle, kpis, bars }) {
    const kpiHTML = kpis.map(k=>`<div class="skm-kpi">
        <span class="skm-kpi-label">${k.label}</span>
        <span class="skm-kpi-val">${k.val}</span>
        <span class="skm-kpi-delta">${k.delta}</span>
    </div>`).join('');
    const barHTML = bars.map(b=>`<div class="skm-bar-row">
        <span class="skm-bar-label">${b.label}</span>
        <div class="skm-bar-track"><div class="skm-bar-fill" style="width:${b.pct}%"></div></div>
        <span>${b.pct}%</span>
    </div>`).join('');
    return `<div class="skm-dashboard">
        <div><div class="skm-db-title">${title}</div><div class="skm-db-subtitle">${subtitle}</div></div>
        <div class="skm-kpis">${kpiHTML}</div>
        <div class="skm-bar-chart">${barHTML}</div>
    </div>`;
}

// ---- helper: git log ----
function gitLog(commits) {
    const colors = ['#4f46e5','#7c3aed','#22d3ee','#10b981','#ffa657'];
    const rows = commits.map((c,i)=>`<div class="skm-commit">
        <div class="skm-commit-dot" style="background:${colors[i%colors.length]}"></div>
        <div class="skm-commit-info">
            <span class="skm-commit-msg">${c.msg}</span>
            <span class="skm-commit-meta">${c.author} · ${c.time}<span class="skm-commit-hash">${c.hash}</span></span>
        </div>
    </div>`).join('');
    return `<div class="skm-git"><div class="skm-git-header">📁 parth-ahire / projects</div>${rows}</div>`;
}

// ---- helper: flow diagram ----
function flow(steps) {
    return `<div class="skm-flow">${steps.map((s,i)=>`<div class="skm-flow-step">${s}</div>${i<steps.length-1?'<span class="skm-flow-arrow">→</span>':''}`).join('')}</div>`;
}

// --------------------------------------------------------
//  SKILL CONTENT DATABASE
// --------------------------------------------------------
const kw=s=>`<span class="c-kw">${s}</span>`;
const fn=s=>`<span class="c-fn">${s}</span>`;
const st=s=>`<span class="c-str">${s}</span>`;
const nm=s=>`<span class="c-num">${s}</span>`;
const cm=s=>`<span class="c-cmt">${s}</span>`;
const cl=s=>`<span class="c-cls">${s}</span>`;
const op=s=>`<span class="c-op">${s}</span>`;
const sk=s=>`<span class="c-sql-kw">${s}</span>`;
const sf=s=>`<span class="c-sql-fn">${s}</span>`;

const SKILLS = {
    python: {
        filename: 'fraud_detection.py',
        content: codeBlock([
            `${cm('# Credit Card Fraud Detection — ML Pipeline')}`,
            `${kw('import')} pandas ${kw('as')} pd`,
            `${kw('from')} sklearn.model_selection ${kw('import')} ${fn('train_test_split')}`,
            `${kw('from')} sklearn.ensemble ${kw('import')} ${cl('RandomForestClassifier')}`,
            `${kw('from')} sklearn.metrics ${kw('import')} ${fn('classification_report')}`,
            ``,
            `${cm('# Load & prepare dataset')}`,
            `df ${op('=')} pd.${fn('read_csv')}(${st('"creditcard.csv"')})`,
            `X ${op('=')} df.${fn('drop')}(columns${op('=')}[${st('"Class"')}])`,
            `y ${op('=')} df[${st('"Class"')}]`,
            ``,
            `${cm('# Train / test split')}`,
            `X_train, X_test, y_train, y_test ${op('=')} ${fn('train_test_split')}(`,
            `    X, y, test_size${op('=')}${nm('0.2')}, random_state${op('=')}${nm('42')}`,
            `)`,
            ``,
            `${cm('# Train model')}`,
            `model ${op('=')} ${cl('RandomForestClassifier')}(n_estimators${op('=')}${nm('100')})`,
            `model.${fn('fit')}(X_train, y_train)`,
            ``,
            `${cm('# Evaluate')}`,
            `preds ${op('=')} model.${fn('predict')}(X_test)`,
            `${fn('print')}(${fn('classification_report')}(y_test, preds))`,
        ])
    },
    java: {
        filename: 'StudentManager.java',
        content: codeBlock([
            `${cm('// OOP: Student Management System')}`,
            `${kw('public class')} ${cl('Student')} {`,
            `    ${kw('private')} ${cl('String')} name;`,
            `    ${kw('private')} ${kw('int')} rollNo;`,
            `    ${kw('private')} ${kw('double')} cgpa;`,
            ``,
            `    ${kw('public')} ${fn('Student')}(${cl('String')} name, ${kw('int')} roll, ${kw('double')} cgpa) {`,
            `        ${kw('this')}.name  ${op('=')} name;`,
            `        ${kw('this')}.rollNo ${op('=')} roll;`,
            `        ${kw('this')}.cgpa  ${op('=')} cgpa;`,
            `    }`,
            ``,
            `    ${kw('public')} ${cl('String')} ${fn('getGrade')}() {`,
            `        ${kw('if')} (cgpa ${op('>=')} ${nm('9.0')}) ${kw('return')} ${st('"A+"')};`,
            `        ${kw('else if')} (cgpa ${op('>=')} ${nm('8.0')}) ${kw('return')} ${st('"A"')};`,
            `        ${kw('else')} ${kw('return')} ${st('"B"')};`,
            `    }`,
            ``,
            `    ${kw('public static void')} ${fn('main')}(${cl('String')}[] args) {`,
            `        ${cl('Student')} s ${op('=')} ${kw('new')} ${fn('Student')}(${st('"Parth"')}, ${nm('42')}, ${nm('8.7')});`,
            `        ${cl('System')}.out.${fn('println')}(s.${fn('getGrade')}()); ${cm('// A')}`,
            `    }`,
            `}`,
        ])
    },
    javascript: {
        filename: 'interactiveUI.js',
        content: codeBlock([
            `${cm('// Dynamic theme switcher with DOM manipulation')}`,
            `${kw('const')} themes ${op('=')} [${st('"dark"')}, ${st('"light"')}, ${st('"indigo"')}];`,
            `${kw('let')} currentIndex ${op('=')} ${nm('0')};`,
            ``,
            `${kw('const')} btn ${op('=')} document.${fn('querySelector')}(${st('"#theme-btn"')});`,
            `${kw('const')} body ${op('=')} document.body;`,
            ``,
            `btn.${fn('addEventListener')}(${st('"click"')}, () ${op('=>')} {`,
            `    body.classList.${fn('remove')}(themes[currentIndex]);`,
            `    currentIndex ${op('=')} (currentIndex ${op('+')} ${nm('1')}) ${op('%')} themes.length;`,
            `    body.classList.${fn('add')}(themes[currentIndex]);`,
            `    btn.textContent ${op('=')} \`Theme: \${themes[currentIndex]}\`;`,
            `});`,
            ``,
            `${cm('// Smooth scroll reveal with IntersectionObserver')}`,
            `${kw('const')} observer ${op('=')} ${kw('new')} ${cl('IntersectionObserver')}(entries ${op('=>')} {`,
            `    entries.${fn('forEach')}(e ${op('=>')} {`,
            `        ${kw('if')} (e.isIntersecting) e.target.classList.${fn('add')}(${st('"visible"')});`,
            `    });`,
            `}, { threshold: ${nm('0.15')} });`,
            ``,
            `document.${fn('querySelectorAll')}(${st('"[data-reveal]"')}).${fn('forEach')}(el ${op('=>')} observer.${fn('observe')}(el));`,
        ])
    },
    html: {
        filename: 'portfolio_card.html',
        content: codeBlock([
            `${cm('<!-- Semantic HTML5 card component -->')}`,
            `&lt;${kw('article')} class=${st('"project-card"')}&gt;`,
            ``,
            `  &lt;${kw('header')} class=${st('"card-header"')}&gt;`,
            `    &lt;${kw('figure')}&gt;`,
            `      &lt;${kw('img')} src=${st('"project.webp"')} alt=${st('"Project screenshot"')}&gt;`,
            `    &lt;/${kw('figure')}&gt;`,
            `    &lt;${kw('h2')}&gt;Fraud Detection System&lt;/${kw('h2')}&gt;`,
            `  &lt;/${kw('header')}&gt;`,
            ``,
            `  &lt;${kw('section')} class=${st('"card-body"')}&gt;`,
            `    &lt;${kw('p')}&gt;ML pipeline using Random Forest.&lt;/${kw('p')}&gt;`,
            `    &lt;${kw('ul')} role=${st('"list"')}&gt;`,
            `      &lt;${kw('li')}&gt;Python · Scikit-learn&lt;/${kw('li')}&gt;`,
            `    &lt;/${kw('ul')}&gt;`,
            `  &lt;/${kw('section')}&gt;`,
            ``,
            `  &lt;${kw('footer')} class=${st('"card-footer"')}&gt;`,
            `    &lt;${kw('a')} href=${st('"#"')} aria-label=${st('"View on GitHub"')}&gt;GitHub&lt;/${kw('a')}&gt;`,
            `  &lt;/${kw('footer')}&gt;`,
            ``,
            `&lt;/${kw('article')}&gt;`,
        ])
    },
    css: {
        filename: 'design_tokens.css',
        content: codeBlock([
            `${cm('/* Design token system — modern CSS variables */')}`,
            `${kw(':root')} {`,
            `  ${op('--color-bg')}:      ${nm('#0a0a0a')};`,
            `  ${op('--color-surface')}: ${nm('#161616')};`,
            `  ${op('--color-accent')}:  ${nm('#4F46E5')};`,
            `  ${op('--color-text')}:    ${nm('#f5f5f5')};`,
            `  ${op('--radius')}:        ${nm('12px')};`,
            `  ${op('--shadow')}:        ${nm('0 8px 32px rgba(0,0,0,.5)')};`,
            `}`,
            ``,
            `${cm('/* Glassmorphism card */')}`,
            `.${fn('card')} {`,
            `  background:     rgba(${nm('255,255,255,.04')});`,
            `  backdrop-filter: blur(${nm('16px')});`,
            `  border:          ${nm('1px')} solid rgba(${nm('255,255,255,.1')});`,
            `  border-radius:   var(${op('--radius')});`,
            `  box-shadow:      var(${op('--shadow')});`,
            `  transition:      transform ${nm('.3s')} ease;`,
            `}`,
            ``,
            `.${fn('card')}:hover {`,
            `  transform: translateY(-${nm('8px')});`,
            `  border-color: var(${op('--color-accent')});`,
            `}`,
        ])
    },
    responsive: {
        filename: 'responsive.css',
        content: codeBlock([
            `${cm('/* Mobile-first responsive layout */')}`,
            ``,
            `${cm('/* Base: mobile */')}`,
            `.grid {`,
            `  display: grid;`,
            `  grid-template-columns: ${nm('1fr')};`,
            `  gap: clamp(${nm('12px')}, ${nm('3vw')}, ${nm('24px')});`,
            `}`,
            ``,
            `${cm('/* Tablet ≥ 640px */')}`,
            `${kw('@media')} (min-width: ${nm('640px')}) {`,
            `  .grid { grid-template-columns: repeat(${nm('2')}, ${nm('1fr')}); }`,
            `}`,
            ``,
            `${cm('/* Desktop ≥ 1024px */')}`,
            `${kw('@media')} (min-width: ${nm('1024px')}) {`,
            `  .grid { grid-template-columns: repeat(${nm('3')}, ${nm('1fr')}); }`,
            `}`,
            ``,
            `${cm('/* Fluid typography */')}`,
            `h1 { font-size: clamp(${nm('2rem')}, ${nm('5vw')}, ${nm('4rem')}); }`,
            ``,
            `${cm('/* Container query (modern) */')}`,
            `${kw('@container')} (min-width: ${nm('400px')}) {`,
            `  .card { flex-direction: row; }`,
            `}`,
        ])
    },
    frontend: {
        filename: 'components.js',
        content: codeBlock([
            `${cm('// Reusable component pattern (Vanilla JS)')}`,
            ``,
            `${kw('function')} ${fn('createCard')}({ title, desc, tags }) {`,
            `  ${kw('const')} card ${op('=')} document.${fn('createElement')}(${st('"article"')});`,
            `  card.className ${op('=')} ${st('"project-card"')};`,
            ``,
            `  card.innerHTML ${op('=')} \``,
            `    &lt;h3&gt;\${title}&lt;/h3&gt;`,
            `    &lt;p&gt;\${desc}&lt;/p&gt;`,
            `    &lt;div class="tags"&gt;`,
            `      \${tags.map(t ${op('=>')} \`&lt;span&gt;\${t}&lt;/span&gt;\`).join(${st('"  "')})}`,
            `    &lt;/div&gt;`,
            `  \`;`,
            ``,
            `  ${cm('// Intersection reveal')}`,
            `  observer.observe(card);`,
            `  ${kw('return')} card;`,
            `}`,
            ``,
            `${cm('// Usage')}`,
            `document.${fn('querySelector')}(${st('"#grid"')}).${fn('append')}(`,
            `  ${fn('createCard')}({`,
            `    title: ${st('"Fraud Detection"')},`,
            `    desc:  ${st('"ML pipeline using RandomForest"')},`,
            `    tags:  [${st('"Python"')}, ${st('"Sklearn"')}]`,
            `  })`,
            `);`,
        ])
    },
    numpy: {
        filename: 'numpy_ops.py',
        content: codeBlock([
            `${kw('import')} numpy ${kw('as')} np`,
            ``,
            `${cm('# Create & manipulate arrays')}`,
            `data ${op('=')} np.${fn('array')}([${nm('1')}, ${nm('2')}, ${nm('3')}, ${nm('4')}, ${nm('5')}, ${nm('6')}])`,
            `matrix ${op('=')} data.${fn('reshape')}(${nm('2')}, ${nm('3')})   ${cm('# 2×3 matrix')}`,
            ``,
            `${cm('# Statistical operations')}`,
            `${fn('print')}(f${st('"Mean:  {np.mean(data):.2f}"')})       ${cm('# 3.50')}`,
            `${fn('print')}(f${st('"Std:   {np.std(data):.2f}"')})        ${cm('# 1.87')}`,
            `${fn('print')}(f${st('"Shape: {matrix.shape}"')})            ${cm('# (2, 3)')}`,
            ``,
            `${cm('# Linear algebra')}`,
            `A ${op('=')} np.${fn('random.randn')}(${nm('3')}, ${nm('3')})`,
            `eigenvalues, eigenvectors ${op('=')} np.linalg.${fn('eig')}(A)`,
            ``,
            `${cm('# Broadcasting (no loops needed!)')}`,
            `X ${op('=')} np.${fn('linspace')}(${nm('0')}, ${nm('2')} ${op('*')} np.pi, ${nm('100')})`,
            `Y ${op('=')} np.${fn('sin')}(X) ${op('*')} np.${fn('exp')}(-X ${op('/')} ${nm('4')})`,
            ``,
            `${fn('print')}(f${st('"Damped sine range: [{Y.min():.2f}, {Y.max():.2f}]"')})`,
        ])
    },
    pandas: {
        filename: 'accident_eda.py',
        content: codeBlock([
            `${kw('import')} pandas ${kw('as')} pd`,
            ``,
            `${cm('# US Accident Data Analysis')}`,
            `df ${op('=')} pd.${fn('read_csv')}(${st('"US_Accidents.csv"')})`,
            ``,
            `${cm('# Quick overview')}`,
            `${fn('print')}(df.${fn('shape')}())          ${cm('# (3M+ rows, 47 cols)')}`,
            `${fn('print')}(df.${fn('isnull')}().${fn('sum')}())   ${cm('# missing values')}`,
            ``,
            `${cm('# Feature engineering')}`,
            `df[${st('"Hour"')}] ${op('=')} pd.${fn('to_datetime')}(df[${st('"Start_Time"')}]).dt.hour`,
            `df[${st('"Month"')}] ${op('=')} pd.${fn('to_datetime')}(df[${st('"Start_Time"')}]).dt.month`,
            ``,
            `${cm('# Analysis: peak accident hours')}`,
            `hourly ${op('=')} df.${fn('groupby')}(${st('"Hour"')})[${st('"ID"')}].${fn('count')}()`,
            `peak ${op('=')} hourly.${fn('idxmax')}()`,
            `${fn('print')}(f${st('"Peak hour: {peak}:00 ({hourly[peak]:,} accidents)"')})`,
            ``,
            `${cm('# State-wise severity')}`,
            `severity_by_state ${op('=')} (',',df.${fn('groupby')}(${st('"State"')})`,
            `    [${st('"Severity"')}].${fn('mean')}().${fn('sort_values')}(ascending${op('=')}${kw('False')}))`,
        ])
    },
    matplotlib: {
        filename: 'visualization.py',
        content: codeBlock([
            `${kw('import')} matplotlib.pyplot ${kw('as')} plt`,
            `${kw('import')} seaborn ${kw('as')} sns`,
            `${kw('import')} numpy ${kw('as')} np`,
            ``,
            `${cm('# Multi-plot dashboard')}`,
            `fig, axes ${op('=')} plt.${fn('subplots')}(${nm('1')}, ${nm('3')}, figsize${op('=')}(${nm('15')}, ${nm('5')}))`,
            `fig.${fn('suptitle')}(${st('"Accident Analysis Dashboard"')}, fontsize${op('=')}${nm('14')})`,
            ``,
            `${cm('# 1. Distribution plot')}`,
            `sns.${fn('histplot')}(data${op('=')}df[${st('"Temperature"')}], ax${op('=')}axes[${nm('0')}],`,
            `             kde${op('=')}${kw('True')}, color${op('=')}${st('"#4F46E5"')})`,
            ``,
            `${cm('# 2. Time series')}`,
            `monthly ${op('=')} df.${fn('groupby')}(${st('"Month"')})[${st('"ID"')}].${fn('count')}()`,
            `axes[${nm('1')}].${fn('plot')}(monthly.index, monthly.values, color${op('=')}${st('"#7C3AED"')}, lw${op('=')}${nm('2')})`,
            ``,
            `${cm('# 3. Heatmap')}`,
            `corr ${op('=')} df[[${st('"Severity"')}, ${st('"Temperature"')}, ${st('"Hour"')}]].${fn('corr')}()`,
            `sns.${fn('heatmap')}(corr, ax${op('=')}axes[${nm('2')}], annot${op('=')}${kw('True')}, cmap${op('=')}${st('"viridis"')})`,
            ``,
            `plt.${fn('tight_layout')}()`,
            `plt.${fn('savefig')}(${st('"dashboard.png"')}, dpi${op('=')}${nm('300')}, bbox_inches${op('=')}${st('"tight"')})`,
        ])
    },
    sklearn: {
        filename: 'ml_pipeline.py',
        content: codeBlock([
            `${kw('from')} sklearn.pipeline ${kw('import')} ${cl('Pipeline')}`,
            `${kw('from')} sklearn.preprocessing ${kw('import')} ${cl('StandardScaler')}`,
            `${kw('from')} sklearn.ensemble ${kw('import')} ${cl('RandomForestClassifier')}`,
            `${kw('from')} sklearn.model_selection ${kw('import')} ${fn('cross_val_score')}`,
            ``,
            `${cm('# Build end-to-end ML pipeline')}`,
            `pipeline ${op('=')} ${cl('Pipeline')}([`,
            `    (${st('"scaler"')},  ${cl('StandardScaler')}()),`,
            `    (${st('"model"')},   ${cl('RandomForestClassifier')}(`,
            `        n_estimators${op('=')}${nm('200')},`,
            `        max_depth${op('=')}${nm('8')},`,
            `        random_state${op('=')}${nm('42')}`,
            `    ))`,
            `])`,
            ``,
            `${cm('# 5-fold cross validation')}`,
            `scores ${op('=')} ${fn('cross_val_score')}(pipeline, X, y, cv${op('=')}${nm('5')}, scoring${op('=')}${st('"f1_macro"')})`,
            `${fn('print')}(f${st('"F1: {scores.mean():.3f} ± {scores.std():.3f}"')})`,
            ``,
            `${cm('# Fit & predict')}`,
            `pipeline.${fn('fit')}(X_train, y_train)`,
            `y_pred ${op('=')} pipeline.${fn('predict')}(X_test)`,
        ])
    },
    dataanalysis: {
        filename: 'eda_pipeline.py',
        content: codeBlock([
            `${cm('# Exploratory Data Analysis template')}`,
            `${kw('import')} pandas ${kw('as')} pd`,
            `${kw('import')} numpy ${kw('as')} np`,
            ``,
            `${kw('def')} ${fn('quick_eda')}(df):`,
            `    ${fn('print')}(${st('"=== Shape ==="')}, df.shape)`,
            `    ${fn('print')}(${st('"\\n=== Dtypes ==="')})`,
            `    ${fn('print')}(df.dtypes)`,
            `    ${fn('print')}(${st('"\\n=== Missing % ==="')})`,
            `    ${fn('print')}((df.${fn('isnull')}().sum() ${op('/')} ${fn('len')}(df) ${op('*')} ${nm('100')}).${fn('round')}(${nm('2')}))`,
            `    ${fn('print')}(${st('"\\n=== Stats ==="')})`,
            `    ${fn('print')}(df.${fn('describe')}().T)`,
            `    ${kw('return')} df.${fn('dropna')}().${fn('drop_duplicates')}()`,
            ``,
            `${cm('# Outlier detection using IQR')}`,
            `${kw('def')} ${fn('remove_outliers')}(df, col):`,
            `    Q1 ${op('=')} df[col].${fn('quantile')}(${nm('0.25')})`,
            `    Q3 ${op('=')} df[col].${fn('quantile')}(${nm('0.75')})`,
            `    IQR ${op('=')} Q3 ${op('-')} Q1`,
            `    ${kw('return')} df[(df[col] ${op('>=')} Q1 ${op('-')} ${nm('1.5')} ${op('*')} IQR) ${op('&')}`,
            `             (df[col] ${op('<=')} Q3 ${op('+')} ${nm('1.5')} ${op('*')} IQR)]`,
        ])
    },
    dataviz: {
        filename: 'dataviz_gallery.py',
        content: codeBlock([
            `${kw('import')} plotly.express ${kw('as')} px`,
            `${kw('import')} plotly.graph_objects ${kw('as')} go`,
            ``,
            `${cm('# Interactive choropleth map')}`,
            `fig ${op('=')} px.${fn('choropleth')}(`,
            `    df_state,`,
            `    locations${op('=')}${st('"State"')},`,
            `    locationmode${op('=')}${st('"USA-states"')},`,
            `    color${op('=')}${st('"Severity"')},`,
            `    color_continuous_scale${op('=')}${st('"Viridis"')},`,
            `    scope${op('=')}${st('"usa"')},`,
            `    title${op('=')}${st('"US Accidents by State Severity"')}`,
            `)`,
            ``,
            `${cm('# Animated scatter: accidents over time')}`,
            `fig2 ${op('=')} px.${fn('scatter')}(`,
            `    df, x${op('=')}${st('"Longitude"')}, y${op('=')}${st('"Latitude"')},`,
            `    color${op('=')}${st('"Severity"')}, animation_frame${op('=')}${st('"Month"')},`,
            `    size${op('=')}${st('"Count"')}, opacity${op('=')}${nm('0.5')}`,
            `)`,
            ``,
            `fig.${fn('show')}()`,
        ])
    },
    featureeng: {
        filename: 'feature_engineering.py',
        content: codeBlock([
            `${kw('import')} pandas ${kw('as')} pd`,
            `${kw('from')} sklearn.preprocessing ${kw('import')} ${cl('LabelEncoder')}, ${cl('StandardScaler')}`,
            ``,
            `${cm('# 1. Extract datetime features')}`,
            `df[${st('"hour"')}]    ${op('=')} pd.${fn('to_datetime')}(df[${st('"timestamp"')}]).dt.hour`,
            `df[${st('"weekday"')}]  ${op('=')} pd.${fn('to_datetime')}(df[${st('"timestamp"')}]).dt.weekday`,
            `df[${st('"is_weekend"')}] ${op('=')} df[${st('"weekday"')}] ${op('>=')} ${nm('5')}`,
            ``,
            `${cm('# 2. Encode categoricals')}`,
            `le ${op('=')} ${cl('LabelEncoder')}()`,
            `df[${st('"weather_enc"')}] ${op('=')} le.${fn('fit_transform')}(df[${st('"Weather_Condition"')}])`,
            ``,
            `${cm('# 3. Scale numerical features')}`,
            `num_cols ${op('=')} [${st('"Temperature"')}, ${st('"Wind_Speed"')}, ${st('"Visibility"')}]`,
            `df[num_cols] ${op('=')} ${cl('StandardScaler')}().${fn('fit_transform')}(df[num_cols])`,
            ``,
            `${cm('# 4. Interaction feature')}`,
            `df[${st('"temp_wind"')}] ${op('=')} df[${st('"Temperature"')}] ${op('*')} df[${st('"Wind_Speed"')}]`,
            ``,
            `${fn('print')}(f${st('"Features: {list(df.columns)}"')})`,
        ])
    },
    modeleval: {
        filename: 'model_evaluation.py',
        content: codeBlock([
            `${kw('from')} sklearn.metrics ${kw('import')} (`,
            `    ${fn('accuracy_score')}, ${fn('precision_score')},`,
            `    ${fn('recall_score')}, ${fn('f1_score')}, ${fn('roc_auc_score')}`,
            `)`,
            `${kw('from')} sklearn.model_selection ${kw('import')} ${fn('cross_val_score')}`,
            ``,
            `${cm('# Comprehensive evaluation')}`,
            `metrics ${op('=')} {`,
            `    ${st('"Accuracy"')}:  ${fn('accuracy_score')}(y_test, y_pred),`,
            `    ${st('"Precision"')}: ${fn('precision_score')}(y_test, y_pred, average${op('=')}${st('"macro"')}),`,
            `    ${st('"Recall"')}:    ${fn('recall_score')}(y_test, y_pred, average${op('=')}${st('"macro"')}),`,
            `    ${st('"F1"')}:        ${fn('f1_score')}(y_test, y_pred, average${op('=')}${st('"macro"')}),`,
            `    ${st('"ROC-AUC"')}:   ${fn('roc_auc_score')}(y_test, y_prob, multi_class${op('=')}${st('"ovr"')})`,
            `}`,
            ``,
            `${kw('for')} name, score ${kw('in')} metrics.${fn('items')}():`,
            `    ${fn('print')}(f${st('"  {name:<12}: {score:.4f}"')})`,
            ``,
            `${cm('# Cross-validation')}`,
            `cv_scores ${op('=')} ${fn('cross_val_score')}(model, X, y, cv${op('=')}${nm('10')})`,
            `${fn('print')}(f${st('"CV Mean: {cv_scores.mean():.4f} ± {cv_scores.std():.4f}"')})`,
        ])
    },
    mysql: {
        filename: 'queries.sql',
        content: codeBlock([
            `${cm('-- Labour Management System — core queries')}`,
            ``,
            `${cm('-- 1. Monthly payroll summary')}`,
            `${sk('SELECT')}`,
            `    e.name,`,
            `    ${sf('SUM')}(a.hours_worked) ${sk('AS')} total_hours,`,
            `    ${sf('SUM')}(a.hours_worked ${op('*')} e.hourly_rate) ${sk('AS')} gross_pay`,
            `${sk('FROM')} employees e`,
            `${sk('JOIN')} attendance a ${sk('ON')} e.id ${op('=')} a.employee_id`,
            `${sk('WHERE')} ${sf('MONTH')}(a.date) ${op('=')} ${sf('MONTH')}(${sf('CURDATE')}())`,
            `${sk('GROUP BY')} e.id, e.name`,
            `${sk('ORDER BY')} gross_pay ${sk('DESC')};`,
            ``,
            `${cm('-- 2. Find top performers')}`,
            `${sk('SELECT')} e.name,`,
            `    ${sf('AVG')}(p.rating) ${sk('AS')} avg_rating`,
            `${sk('FROM')} employees e`,
            `${sk('JOIN')} performance_reviews p ${sk('ON')} e.id ${op('=')} p.employee_id`,
            `${sk('HAVING')} avg_rating ${op('>')} ${nm('4.5')}`,
            `${sk('ORDER BY')} avg_rating ${sk('DESC')};`,
        ])
    },
    git: {
        filename: 'git_activity',
        content: gitLog([
            { msg: '✨ feat: add credit card fraud ML pipeline',    author: 'Parth Ahire', time: '2 days ago',  hash: '#a3f7c2' },
            { msg: '📊 feat: US accident EDA with Plotly charts',   author: 'Parth Ahire', time: '5 days ago',  hash: '#b92e1f' },
            { msg: '🐛 fix: responsive layout on mobile breakpoint', author: 'Parth Ahire', time: '1 week ago',  hash: '#d0f4a1' },
            { msg: '🎨 style: update design tokens — indigo theme',  author: 'Parth Ahire', time: '2 weeks ago', hash: '#e7a832' },
            { msg: '📝 docs: update README with project overview',   author: 'Parth Ahire', time: '3 weeks ago', hash: '#f1c340' },
        ])
    },
    powerbi: {
        filename: 'PowerBI_Dashboard',
        content: dashboard({
            title: '📊 Labour Management Dashboard',
            subtitle: 'Power BI — Monthly KPIs & Workforce Analytics',
            kpis: [
                { label: 'Total Employees', val: '248',    delta: '▲ 12 this month' },
                { label: 'Avg Attendance',  val: '92.4%',  delta: '▲ 3.1% vs last month' },
                { label: 'Payroll Expense', val: '₹28.4L', delta: '▼ 2% vs budget' },
            ],
            bars: [
                { label: 'Operations',  pct: 88 },
                { label: 'Engineering', pct: 75 },
                { label: 'Marketing',   pct: 62 },
                { label: 'HR & Admin',  pct: 55 },
            ]
        })
    },
    tableau: {
        filename: 'Tableau_Dashboard',
        content: dashboard({
            title: '📉 US Accident Analysis Dashboard',
            subtitle: 'Tableau — Geospatial & Temporal Accident Insights',
            kpis: [
                { label: 'Total Records', val: '3.07M',  delta: '2016–2023 dataset' },
                { label: 'Avg Severity',  val: '2.3/4',  delta: 'Most: Severity 2' },
                { label: 'States Covered',val: '49',     delta: 'Nationwide coverage' },
            ],
            bars: [
                { label: 'California',  pct: 92 },
                { label: 'Florida',     pct: 78 },
                { label: 'Texas',       pct: 71 },
                { label: 'New York',    pct: 60 },
            ]
        })
    },
    excel: {
        filename: 'formulas.xlsx',
        content: codeBlock([
            `${cm('-- Excel: Advanced data analysis formulas')}`,
            ``,
            `${cm('# Conditional aggregation')}`,
            `=SUMIFS(C2:C100, B2:B100, ${st('"Marketing"')}, D2:D100, ${st('"Q4"')})`,
            ``,
            `${cm('# Dynamic lookup with XLOOKUP')}`,
            `=XLOOKUP(G2, A:A, C:C, ${st('"Not found"')}, ${nm('0')})`,
            ``,
            `${cm('# Nested IF for grade classification')}`,
            `=IFS(A2>=${nm('90')}, ${st('"A+"')}, A2>=${nm('80')}, ${st('"A"')},`,
            `    A2>=${nm('70')}, ${st('"B"')}, A2>=${nm('60')}, ${st('"C"')}, ${kw('TRUE')}, ${st('"F"')})`,
            ``,
            `${cm('# Pivot-style aggregation with UNIQUE + SUMIF')}`,
            `=SUMIF(B:B, UNIQUE(B2:B100), C:C)`,
            ``,
            `${cm('# Running total')}`,
            `=SUM($C$2:C2)`,
            ``,
            `${cm('# Volatility (standard deviation %)')}`,
            `=STDEV(B2:B13)/AVERAGE(B2:B13)*100`,
        ])
    },
    figma: {
        filename: 'design_process',
        content: `<div class="skm-info">
            <div class="skm-info-badge">🎨</div>
            <h4>Figma — UI/UX Design Process</h4>
            <p>Used Figma to design wireframes, UI components, and interactive prototypes for web projects. Familiar with components, auto-layout, and design tokens for consistent interfaces.</p>
            ${flow(['Research & Brief','Wireframes','UI Design','Component Library','Prototype','Handoff to Dev'])}
            <div class="skm-tags">
                <span class="skm-tag">Auto Layout</span>
                <span class="skm-tag">Components</span>
                <span class="skm-tag">Design Tokens</span>
                <span class="skm-tag">Prototyping</span>
                <span class="skm-tag">Handoff</span>
            </div>
        </div>`
    },
    powerpoint: infoCard({
        emoji: '📋',
        title: 'PowerPoint — Presentation Design',
        body: 'Designed data-driven, structured presentations for academic and club events. Proficient in slide layouts, charts, animations, and speaker notes. Created decks for Club Avinya campaigns and project demos.',
        tags: ['Data storytelling', 'Slide design', 'Charts & graphs', 'Brand consistency', 'Animations']
    }),
    word: infoCard({
        emoji: '📝',
        title: 'Microsoft Word — Documentation',
        body: 'Used extensively for academic reports, project documentation, and technical write-ups. Skilled in structured formatting, table of contents, citation styles, and templates.',
        tags: ['Technical reports', 'Formatting', 'Templates', 'Tables & figures', 'Documentation']
    }),
    analytical: infoCard({
        emoji: '🧠',
        title: 'Analytical Thinking',
        body: 'Ability to break down complex datasets and business problems into structured, logical components. Applied in EDA of 3M+ US accident records and fraud detection projects — identifying patterns that drive real decisions.',
        tags: ['Root cause analysis', 'Pattern recognition', 'Data-driven insight', 'Structured thinking']
    }),
    problemsolving: infoCard({
        emoji: '💡',
        title: 'Problem Solving',
        body: 'Methodical, research-driven approach to overcoming technical and analytical challenges. Whether debugging a ML pipeline or designing a UI from scratch — I approach each problem with a systematic mindset.',
        tags: ['Debugging', 'Research', 'Iterative approach', 'Creative solutions']
    }),
    logical: infoCard({
        emoji: '🔗',
        title: 'Logical Reasoning',
        body: 'Strong foundation in logical thinking developed through academic coursework and hands-on projects. Applied in algorithm design, feature engineering decisions, and database query optimization.',
        tags: ['Algorithm design', 'Critical thinking', 'Deductive reasoning', 'Decision trees']
    }),
    teamwork: infoCard({
        emoji: '🤝',
        title: 'Teamwork & Collaboration',
        body: 'Head of Marketing at Club Avinya — coordinated cross-functional teams to execute technical events and digital campaigns. Comfortable in agile, collaborative environments using GitHub for team code workflows.',
        tags: ['Team leadership', 'Cross-functional work', 'Communication', 'GitHub workflows']
    }),
    adaptability: infoCard({
        emoji: '🔄',
        title: 'Adaptability',
        body: 'Quickly ramp up on new tools, frameworks, and domains. Moved from web development to machine learning and data visualization projects within the same semester — adapting tech stacks as needed.',
        tags: ['Fast learner', 'Tech flexibility', 'Multi-domain', 'Continuous growth']
    }),
};

// ---- modal open / close logic ----
let activeChip = null;

function openModal(skillKey, chipEl) {
    const skillData = SKILLS[skillKey];
    if (!skillData) return;

    if (activeChip) activeChip.classList.remove('active');
    chipEl.classList.add('active');
    activeChip = chipEl;

    const content = typeof skillData === 'string' ? skillData : skillData.content;
    const filename = skillData.filename || skillKey;

    modalFile.textContent = filename;
    modalBody.innerHTML = content;
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Animate bar fills after render
    requestAnimationFrame(() => {
        document.querySelectorAll('.skm-bar-fill').forEach(bar => {
            const target = bar.style.width;
            bar.style.width = '0';
            requestAnimationFrame(() => { bar.style.width = target; });
        });
    });
}

function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (activeChip) { activeChip.classList.remove('active'); activeChip = null; }
}

// Attach click listeners to all chips with data-skill
document.querySelectorAll('.sk-chip[data-skill]').forEach(chip => {
    chip.addEventListener('click', () => {
        const key = chip.dataset.skill;
        if (activeChip === chip && modal.classList.contains('open')) { closeModal(); return; }
        openModal(key, chip);
    });
});

closeBtn?.addEventListener('click', closeModal);
modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// =============================================================
//  GITHUB PROJECTS ENGINE
// =============================================================

// ┌─ CONFIG ────────────────────────────────────────────────┐
//  Replace the value below with your real GitHub username.  │
//  Example: const GITHUB_USERNAME = 'torvalds';             │
const GITHUB_USERNAME = 'Ahireparth';                        //│
// └────────────────────────────────────────────────────────-┘

const GH_API       = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;
const ghGrid       = document.getElementById('gh-grid');
const ghStatus     = document.getElementById('gh-status');
const ghFiltersEl  = document.getElementById('gh-filters');
const ghSortEl     = document.getElementById('gh-sort');

// Language → CSS class map
function langClass(lang) {
    if (!lang) return 'lang-default';
    const key = lang.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'');
    return `lang-${key}`;
}

// Relative time formatter
function relativeTime(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 60)   return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24)   return `${h}h ago`;
    const d = Math.floor(h / 24);
    if (d < 30)   return `${d}d ago`;
    const mo = Math.floor(d / 30);
    if (mo < 12)  return `${mo}mo ago`;
    return `${Math.floor(mo/12)}y ago`;
}

// Build a single repo card element
function buildCard(repo) {
    const card = document.createElement('div');
    card.className = 'gh-card';
    card.dataset.lang = (repo.language || 'other').toLowerCase();

    const desc    = repo.description || 'No description provided.';
    const lang    = repo.language || '';
    const updated = relativeTime(repo.updated_at);
    const stars   = repo.stargazers_count;
    const forks   = repo.forks_count;

    card.innerHTML = `
        <div class="gh-card-top">
            <span class="gh-card-name" title="${repo.name}">${repo.name}</span>
            <a href="${repo.html_url}" target="_blank" rel="noopener" class="gh-card-link" aria-label="Open on GitHub">
                <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a>
        </div>
        <p class="gh-card-desc">${desc}</p>
        <div class="gh-card-footer">
            ${lang ? `<div class="gh-lang">
                <span class="gh-lang-dot ${langClass(lang)}"></span>
                <span>${lang}</span>
            </div>` : ''}
            ${stars ? `<div class="gh-stat">
                <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ${stars}
            </div>` : ''}
            ${forks ? `<div class="gh-stat">
                <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>
                ${forks}
            </div>` : ''}
            <span class="gh-date">${updated}</span>
        </div>`;

    return card;
}

// State
let allRepos  = [];
let activeFilter = 'all';
let activeSort   = 'updated';

// Render the grid based on current filter + sort
function renderRepos() {
    let repos = [...allRepos];

    // Filter
    if (activeFilter !== 'all') {
        repos = repos.filter(r => (r.language || 'other').toLowerCase() === activeFilter);
    }

    // Sort
    if (activeSort === 'stars')   repos.sort((a,b) => b.stargazers_count - a.stargazers_count);
    else if (activeSort === 'name') repos.sort((a,b) => a.name.localeCompare(b.name));
    else repos.sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at));

    ghGrid.innerHTML = '';

    if (!repos.length) {
        ghStatus.removeAttribute('hidden');
        ghStatus.innerHTML = `No repositories found for language <strong>${activeFilter}</strong>.`;
        return;
    }

    ghStatus.setAttribute('hidden', '');
    repos.forEach((repo, i) => {
        const card = buildCard(repo);
        card.style.animationDelay = `${Math.min(i * 0.04, 0.6)}s`;
        ghGrid.appendChild(card);
    });
}

// Build language filter buttons from unique languages in repos
function buildFilters(repos) {
    const langs = [...new Set(
        repos.map(r => r.language).filter(Boolean)
    )].sort();

    langs.forEach(lang => {
        const btn = document.createElement('button');
        btn.className = 'gh-filter';
        btn.dataset.filter = lang.toLowerCase();
        btn.textContent = lang;
        ghFiltersEl.appendChild(btn);
    });

    ghFiltersEl.addEventListener('click', e => {
        const btn = e.target.closest('.gh-filter');
        if (!btn) return;
        ghFiltersEl.querySelectorAll('.gh-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.filter;
        renderRepos();
    });

    ghSortEl?.addEventListener('change', () => {
        activeSort = ghSortEl.value;
        renderRepos();
    });
}

// Show config notice if username is placeholder
function showConfigNotice() {
    ghGrid.innerHTML = '';
    ghStatus.removeAttribute('hidden');
    ghStatus.innerHTML = `
        <strong style="color:var(--tx-high);display:block;margin-bottom:8px;">⚙️ One quick setup step</strong>
        Open <code style="color:var(--indigo)">main.js</code> and replace
        <code style="color:var(--cyan)">'YOUR_GITHUB_USERNAME'</code>
        with your real GitHub username to load live repositories.
    `;
}

// Main fetch
async function loadGitHubRepos() {
    if (GITHUB_USERNAME === 'YOUR_GITHUB_USERNAME') {
        showConfigNotice();
        return;
    }

    try {
        const res = await fetch(GH_API, {
            headers: { 'Accept': 'application/vnd.github.v3+json' }
        });

        if (!res.ok) {
            throw new Error(res.status === 404
                ? `GitHub user "${GITHUB_USERNAME}" not found.`
                : `GitHub API error ${res.status}. You may have hit the rate limit — try again in a minute.`
            );
        }

        const repos = await res.json();

        // Filter out forks and repos with no useful content
        allRepos = repos.filter(r => !r.fork && r.name !== GITHUB_USERNAME);

        if (!allRepos.length) {
            ghGrid.innerHTML = '';
            ghStatus.removeAttribute('hidden');
            ghStatus.innerHTML = `No public repositories found on <a href="https://github.com/${GITHUB_USERNAME}" target="_blank">github.com/${GITHUB_USERNAME}</a>.`;
            return;
        }

        buildFilters(allRepos);
        renderRepos();

    } catch (err) {
        ghGrid.innerHTML = '';
        ghStatus.removeAttribute('hidden');
        ghStatus.innerHTML = `
            <strong style="color:var(--tx-high)">Could not load GitHub repositories</strong><br>
            <span style="font-size:.82rem;">${err.message}</span><br><br>
            <a href="https://github.com/${GITHUB_USERNAME}" target="_blank">View profile on GitHub →</a>
        `;
    }
}

// Kick off fetch
loadGitHubRepos();

// =============================================================
//  ABOUT PHOTO — ROLE BADGE CYCLING
// =============================================================
(function initRoleBadges() {
    const wrap   = document.getElementById('about-photo-wrap');
    const badges = document.querySelectorAll('#about-role-badges .arb');
    if (!wrap || !badges.length) return;

    let current = 0;

    function nextBadge() {
        const prev = badges[current];
        current = (current + 1) % badges.length;
        const next = badges[current];

        // Fade out old
        prev.classList.remove('arb--active');

        // Small stagger so cross-fade looks intentional
        setTimeout(() => {
            next.classList.add('arb--active');
            // Update glow ring color on the photo wrapper
            const color = next.dataset.color || '#4F46E5';
            wrap.style.setProperty('--arb-color', color);
            // Also update each arb border to its own color on activation
            next.style.borderColor = color;
            next.style.boxShadow = `0 0 14px ${color}44, 0 4px 16px rgba(0,0,0,.5)`;
        }, 420); // slightly before the opacity transition ends
    }

    // kick off
    setInterval(nextBadge, 2200);
})();

// =============================================================
//  HERO CANVAS — NEURAL NETWORK BACKGROUND (VASU_OS STYLE)
// =============================================================
(function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize, { passive: true });
    resize();

    class Node {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 1.5;
            this.vy = (Math.random() - 0.5) * 1.5;
            this.radius = Math.random() * 2 + 1;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(79, 70, 229, 0.7)';
            ctx.fill();
        }
    }

    for (let i = 0; i < 90; i++) particles.push(new Node());

    function loop() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => { p.update(); p.draw(); });
        
        // Draw Neural Network Connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(79, 70, 229, ${1 - dist/130})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(loop);
    }
    loop();
})();

// =============================================================
//  PROJECT CATEGORY FILTER
// =============================================================
(function initProjFilter() {
    const filterBtns = document.querySelectorAll('#proj-filters .proj-filter');
    const cards      = document.querySelectorAll('#all-proj-grid .project-card');
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active tab
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const cat = btn.dataset.cat;

            cards.forEach(card => {
                if (cat === 'all' || card.dataset.cat === cat) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
})();

// =============================================================
//  ABOUT PHOTO — DYNAMIC SLIDER + 3D TILT EFFECT
// =============================================================
(function initAboutPhotoInteraction() {
    const wrap   = document.getElementById('about-photo-wrap');
    const slides = Array.from(document.querySelectorAll('.about-photo-slide'));
    if (!wrap || !slides.length) return;

    let current = 0;
    function activateSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        current = (current + 1) % slides.length;
        activateSlide(current);
    }

    activateSlide(current);
    setInterval(nextSlide, 2200);
})();

// =============================================================
//  NEW ENHANCEMENTS AND ANIMATIONS
// =============================================================

// VASU_OS Text Scramble Effect
const scrambleEl = document.querySelector('.hero-name');
if (scrambleEl) {
    const chars = "!<>-_\\/[]{}—=+*^?#________";
    scrambleEl.addEventListener('mouseover', event => {
        let iteration = 0;
        clearInterval(scrambleEl.dataset.interval);
        
        // Lock layout to prevent text beneath from shattering
        if(!event.target.style.width) {
           event.target.style.width = event.target.offsetWidth + 'px';
           event.target.style.display = 'inline-block';
           event.target.style.whiteSpace = 'nowrap';
        }
        
        scrambleEl.dataset.interval = setInterval(() => {
            const targetVal = event.target.dataset.value || "PARTH AHIRE";
            event.target.innerText = targetVal
                .split("")
                .map((letter, index) => {
                    if (index < iteration || letter === " ") {
                        return targetVal[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");
            
            if (iteration >= targetVal.length) { 
                clearInterval(scrambleEl.dataset.interval);
            }
            // Slower scramble effect
            iteration += 1 / 4;
        }, 50);
    });
    
    // Auto trigger on load
    setTimeout(() => {
        let ev = new Event('mouseover');
        scrambleEl.dispatchEvent(ev);
    }, 500);
}

// Button Ripples
document.querySelectorAll('.ripple-btn').forEach(btn => {
    btn.addEventListener('mousedown', function(e) {
        let x = e.clientX - e.target.getBoundingClientRect().left;
        let y = e.clientY - e.target.getBoundingClientRect().top;
        let ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        let size = Math.max(btn.offsetWidth, btn.offsetHeight);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.marginTop = -(size/2) + 'px';
        ripple.style.marginLeft = -(size/2) + 'px';
        
        btn.appendChild(ripple);
        setTimeout(() => { ripple.remove(); }, 600);
    });
});

// Quotes Slider
const quoteSlides = document.querySelectorAll('.quote-slide');
if (quoteSlides.length > 0) {
    let currentQuote = 0;
    setInterval(() => {
        quoteSlides[currentQuote].classList.remove('active');
        currentQuote = (currentQuote + 1) % quoteSlides.length;
        quoteSlides[currentQuote].classList.add('active');
    }, 4000); 
}
