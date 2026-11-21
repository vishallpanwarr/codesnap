(function () {
  'use strict';

  // =====================================================================
  // 1. INLINE SVG LANGUAGE LOGOS & EXTENSION MAP
  // =====================================================================
  const FALLBACK_FILE_SVG = `
    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <path stroke-linecap="round" stroke-linejoin="round" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M9.5 13.5L7.5 15.5l2 2m5-4l2 2-2 2" />
    </svg>
  `;

  const EXT_REGISTRY = {
    js: {
      lang: 'javascript',
      label: 'JavaScript',
      svg: `<svg class="w-4 h-4" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#F7DF1E"/><path d="M10.8 17.6c.3.5.7.9 1.4.9.6 0 1-.3 1-.7 0-.5-.4-.7-1.1-1l-.4-.2c-1.1-.5-1.9-1-1.9-2.3 0-1.2.9-2.1 2.3-2.1 1 0 1.7.3 2.2 1.2l-1.2.8c-.3-.5-.6-.7-1-.7-.4 0-.7.3-.7.6 0 .4.3.6 1.2 1l.4.2c1.3.6 2.1 1.1 2.1 2.5 0 1.4-1.1 2.2-2.6 2.2-1.5 0-2.4-.7-2.9-1.7l1.8-1.6zm-4.9.2c.2.4.4.7.9.7.4 0 .7-.2.7-.8v-5.4h1.7v5.5c0 1.6-.9 2.3-2.3 2.3-1.2 0-2-.6-2.4-1.4l1.4-1.3z" fill="#111827"/></svg>`
    },
    jsx: {
      lang: 'javascript',
      label: 'React JSX',
      svg: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2.1" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="9.5" ry="3.7" stroke="#61DAFB" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="9.5" ry="3.7" transform="rotate(60 12 12)" stroke="#61DAFB" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="9.5" ry="3.7" transform="rotate(120 12 12)" stroke="#61DAFB" stroke-width="1.5"/></svg>`
    },
    ts: {
      lang: 'typescript',
      label: 'TypeScript',
      svg: `<svg class="w-4 h-4" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#3178C6"/><path d="M10.5 12.2H8V19H6.3v-6.8H3.8v-1.4h6.7v1.4zm2.4 4.7c.4.4 1 .7 1.7.7.8 0 1.3-.4 1.3-.9 0-.5-.3-.8-1.4-1.2-1.5-.5-2.3-1.2-2.3-2.4 0-1.4 1.1-2.3 2.8-2.3.9 0 1.6.2 2.1.6l-.5 1.3c-.4-.3-.9-.5-1.6-.5-.7 0-1.1.3-1.1.8 0 .5.4.8 1.5 1.2 1.5.5 2.2 1.2 2.2 2.4 0 1.4-1.1 2.4-3 2.4-1 0-1.9-.3-2.4-.7l.6-1.4z" fill="#fff"/></svg>`
    },
    tsx: {
      lang: 'typescript',
      label: 'React TSX',
      svg: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2.1" fill="#38BDF8"/><ellipse cx="12" cy="12" rx="9.5" ry="3.7" stroke="#38BDF8" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="9.5" ry="3.7" transform="rotate(60 12 12)" stroke="#38BDF8" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="9.5" ry="3.7" transform="rotate(120 12 12)" stroke="#38BDF8" stroke-width="1.5"/></svg>`
    },
    py: {
      lang: 'python',
      label: 'Python',
      svg: `<svg class="w-4 h-4" viewBox="0 0 24 24"><path fill="#3776AB" d="M11.9 2C7.4 2 7.7 4 7.7 4v2h4.3v.6H5.9S3 6.3 3 10.9c0 4.6 2.5 4.4 2.5 4.4H7v-2.1s-.1-2.5 2.5-2.5h4.2s2.4 0 2.4-2.3V4.4S17 2 11.9 2zm-2.4 1.4a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6z"/><path fill="#FFD43B" d="M12.1 22c4.5 0 4.2-2 4.2-2v-2H12v-.6h6.1s2.9.3 2.9-4.3c0-4.6-2.5-4.4-2.5-4.4H17v2.1s.1 2.5-2.5 2.5h-4.2s-2.4 0-2.4 2.3v4s-.4 2.4 4.7 2.4zm2.4-1.4a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6z"/></svg>`
    },
    html: {
      lang: 'html',
      label: 'HTML',
      svg: `<svg class="w-4 h-4" viewBox="0 0 24 24"><path fill="#E34F26" d="M4 3l1.6 17L12 22l6.4-2L20 3H4zm12.6 6.2H9.3l.2 2.1h6.9l-.5 5.6L12 18l-3.9-1.1-.3-3h2l.1 1.4 2.1.6 2.1-.6.2-2.3H7.6L7 7.1h9.8l-.2 2.1z"/></svg>`
    },
    css: {
      lang: 'css',
      label: 'CSS',
      svg: `<svg class="w-4 h-4" viewBox="0 0 24 24"><path fill="#1572B6" d="M4 3l1.6 17L12 22l6.4-2L20 3H4zm12.5 6.3H9.5l.2 2h6.6l-.5 5.6L12 18l-4-1.1-.3-2.9h2l.1 1.3 2.2.6 2.2-.6.2-2.2H7.6l-.5-5.7h9.6l-.2 1.8z"/></svg>`
    },
    scss: {
      lang: 'scss',
      label: 'SCSS',
      svg: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M12 3.5c-5.2 0-9 3.6-9 8.2 0 4.8 4 8.8 9 8.8s9-4 9-8.8c0-4.6-3.8-8.2-9-8.2z" fill="#CD6799"/><path d="M14.7 15.2c-.8.7-1.9 1-3 1-2 0-3.3-1.2-3.3-3 0-2.1 1.6-3.6 3.8-3.6 1 0 1.9.3 2.5.8" stroke="#fff" stroke-width="1.7" stroke-linecap="round"/></svg>`
    },
    json: {
      lang: 'json',
      label: 'JSON',
      svg: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" stroke-width="2.2" stroke-linecap="round"><path d="M8 4c-1.5 0-2.5.8-2.5 2v4c0 1-.8 2-2 2 1.2 0 2 1 2 2v4c0 1.2 1 2 2.5 2"/><path d="M16 4c1.5 0 2.5.8 2.5 2v4c0 1 .8 2 2 2-1.2 0-2 1-2 2v4c0 1.2-1 2-2.5 2"/></svg>`
    },
    sh: {
      lang: 'bash',
      label: 'Shell',
      svg: `<svg class="w-4 h-4" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#1F2937" stroke="#4ADE80" stroke-width="1.4"/><path d="M7.5 8.5L11.5 12l-4 3.5M12.5 16h4" stroke="#4ADE80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    },
    bash: {
      lang: 'bash',
      label: 'Bash',
      svg: `<svg class="w-4 h-4" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#1F2937" stroke="#4ADE80" stroke-width="1.4"/><path d="M7.5 8.5L11.5 12l-4 3.5M12.5 16h4" stroke="#4ADE80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    },
    rs: {
      lang: 'rust',
      label: 'Rust',
      svg: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#F97316" stroke-width="2"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.2" fill="#F97316"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22" stroke-linecap="round"/></svg>`
    },
    go: {
      lang: 'go',
      label: 'Go',
      svg: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none"><rect x="3" y="7" width="18" height="11" rx="5.5" fill="#00ADD8"/><circle cx="14.5" cy="12.2" r="2.2" fill="#fff"/><circle cx="18" cy="12.2" r="1.7" fill="#fff"/><circle cx="15" cy="12.2" r="0.9" fill="#111827"/><circle cx="18.3" cy="12.2" r="0.7" fill="#111827"/></svg>`
    },
    java: {
      lang: 'java',
      label: 'Java',
      svg: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#F89820" stroke-width="2" stroke-linecap="round"><path d="M7 14h9v3a3 3 0 0 1-3 3h-3a3 3 0 0 1-3-3v-3z"/><path d="M16 15h1.5a2 2 0 0 1 0 4H16"/><path d="M9.5 11c0-1.5 1.5-2 1.5-3.5M13 11.5c0-1.2 1.2-1.8 1.2-3"/></svg>`
    },
    c: {
      lang: 'cpp',
      label: 'C',
      svg: `<svg class="w-4 h-4" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#659AD2"/><path d="M15.5 15.2c-.8.8-1.9 1.3-3.2 1.3-2.6 0-4.5-2-4.5-4.5s1.9-4.5 4.5-4.5c1.3 0 2.4.5 3.2 1.3" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>`
    },
    cpp: {
      lang: 'cpp',
      label: 'C++',
      svg: `<svg class="w-4 h-4" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#00599C"/><path d="M12.2 15.2c-.7.7-1.7 1.2-2.9 1.2-2.4 0-4.1-1.9-4.1-4.4s1.7-4.4 4.1-4.4c1.2 0 2.2.5 2.9 1.2M15.5 10.5v3M14 12h3M19.5 10.5v3M18 12h3" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/></svg>`
    },
    sql: {
      lang: 'sql',
      label: 'SQL',
      svg: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" stroke-width="2"><ellipse cx="12" cy="6.5" rx="7" ry="3"/><path d="M5 6.5v11c0 1.66 3.13 3 7 3s7-1.34 7-3v-11"/><path d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3"/></svg>`
    },
    md: {
      lang: 'markdown',
      label: 'Markdown',
      svg: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#A1A1AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 15V9l2.5 3L12 9v6m3.5-3l2 2 2-2m-2-3v5"/></svg>`
    },
    yaml: {
      lang: 'yaml',
      label: 'YAML',
      svg: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#F472B6" stroke-width="2" stroke-linecap="round"><path d="M5 6l4 6v6m4-12l-4 6m6-6l3 6-3 6m3-6h-3"/></svg>`
    },
    yml: {
      lang: 'yaml',
      label: 'YAML',
      svg: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#F472B6" stroke-width="2" stroke-linecap="round"><path d="M5 6l4 6v6m4-12l-4 6m6-6l3 6-3 6m3-6h-3"/></svg>`
    },
    php: {
      lang: 'php',
      label: 'PHP',
      svg: `<svg class="w-4 h-4" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="10" ry="6.5" fill="#777BB4"/><text x="12" y="14.5" text-anchor="middle" fill="#fff" font-size="7.5" font-weight="700" font-family="sans-serif">php</text></svg>`
    },
    rb: {
      lang: 'ruby',
      label: 'Ruby',
      svg: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#FB7185" stroke-width="2" stroke-linejoin="round"><polygon points="6 4 18 4 21 9.5 12 20.5 3 9.5"/><line x1="3" y1="9.5" x2="21" y2="9.5"/></svg>`
    },
    swift: {
      lang: 'swift',
      label: 'Swift',
      svg: `<svg class="w-4 h-4" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#F05138"/><path d="M17.5 16.5c-2.2 1.8-6.4 2-10.5-.5 2.5 0 4.9-.8 6.8-2.2-2.3-1.4-4.5-3.8-5.8-6.5 1.7 1.4 3.5 2.6 5.2 3.4-.9-1.6-1.6-3.2-2-4.6 2.1 1.8 4.4 4.2 5.6 6.6.6-1.4.8-2.8.6-4.1 1.4 2 1.8 4.6.9 6.7z" fill="#fff"/></svg>`
    },
    kt: {
      lang: 'kotlin',
      label: 'Kotlin',
      svg: `<svg class="w-4 h-4" viewBox="0 0 24 24"><defs><linearGradient id="ktGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#F97316"/><stop offset="55%" stop-color="#EC4899"/><stop offset="100%" stop-color="#8B5CF6"/></linearGradient></defs><polygon points="4,4 20,4 12,12 20,20 4,20" fill="url(#ktGrad)"/></svg>`
    }
  };

  const LANG_TO_DEFAULT_EXT = {
    javascript: 'jsx',
    typescript: 'tsx',
    python: 'py',
    html: 'html',
    css: 'css',
    scss: 'scss',
    json: 'json',
    bash: 'sh',
    rust: 'rs',
    go: 'go',
    java: 'java',
    cpp: 'cpp',
    sql: 'sql',
    markdown: 'md',
    yaml: 'yml',
    php: 'php',
    ruby: 'rb',
    swift: 'swift',
    kotlin: 'kt',
    plaintext: 'txt'
  };

  const DEFAULT_SNIPPET = `function Counter() {
  const [count, setCount] = createSignal(0);

  setInterval(
    () => setCount(count() + 1),
    1000
  );

  return <div>The count is {count()}</div>
}`;

  const BG_PRESETS = [
    { name: 'No Background (Transparent)', css: 'transparent', isTransparent: true },
    { name: 'Sunset Rose', css: 'linear-gradient(135deg, #f97316 0%, #ef4444 50%, #db2777 100%)' },
    { name: 'Violet Pulse', css: 'linear-gradient(135deg, #6366f1 0%, #a855f7 55%, #ec4899 100%)' },
    { name: 'Oceanic Blue', css: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 55%, #4f46e5 100%)' },
    { name: 'Mint Emerald', css: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)' },
    { name: 'Amber Glow', css: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)' },
    { name: 'Berry Dusk', css: 'linear-gradient(135deg, #312e81 0%, #701a75 100%)' },
    { name: 'Pastel Sky', css: 'linear-gradient(135deg, #bae6fd 0%, #ddd6fe 50%, #fbcfe8 100%)' },
    { name: 'Seafoam Breeze', css: 'linear-gradient(135deg, #99f6e4 0%, #bfdbfe 100%)' },
    { name: 'Obsidian Night', css: 'linear-gradient(135deg, #18181b 0%, #09090b 100%)' },
    { name: 'Midnight Navy', css: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)' },
    { name: 'Charcoal Solid', css: '#111318' }
  ];

  const VIBE_CONFIGS = {
    sunset: {
      theme: 'github-dark',
      background: BG_PRESETS[1].css,
      gradColorA: '#f97316',
      gradColorB: '#ec4899',
      gradAngle: 135,
      radius: 14,
      padding: 56
    },
    cyber: {
      theme: 'synthwave',
      background: 'linear-gradient(135deg, #7e22ce 0%, #db2777 52%, #06b6d4 100%)',
      gradColorA: '#7e22ce',
      gradColorB: '#06b6d4',
      gradAngle: 135,
      radius: 16,
      padding: 64
    },
    nordic: {
      theme: 'nord',
      background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
      gradColorA: '#3b82f6',
      gradColorB: '#06b6d4',
      gradAngle: 135,
      radius: 14,
      padding: 60
    },
    tokyo: {
      theme: 'tokyo-night',
      background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 55%, #ec4899 100%)',
      gradColorA: '#4f46e5',
      gradColorB: '#ec4899',
      gradAngle: 135,
      radius: 14,
      padding: 60
    },
    daylight: {
      theme: 'solarized-light',
      background: 'linear-gradient(135deg, #bae6fd 0%, #fde68a 100%)',
      gradColorA: '#bae6fd',
      gradColorB: '#fde68a',
      gradAngle: 135,
      radius: 14,
      padding: 56
    }
  };

  const SHADOW_CSS = [
    'none',
    '0 10px 25px -5px rgba(0, 0, 0, 0.45)',
    '0 24px 60px -12px rgba(0, 0, 0, 0.68)',
    '0 32px 80px -10px rgba(0, 0, 0, 0.85)'
  ];
  const SHADOW_NAMES = ['None', 'Soft', 'High', 'Ultra'];

  const FONT_STACKS = {
    jetbrains: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fira: "'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    source: "'Source Code Pro', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace"
  };

  // =====================================================================
  // 2. EXTENSION & AUTOMATIC CODE LANGUAGE DETECTION HELPERS
  // =====================================================================
  function extractExtension(filename) {
    if (!filename || typeof filename !== 'string') return '';
    const cleaned = filename.trim().split('?')[0];
    const base = cleaned.split('/').pop() || '';
    const lastDot = base.lastIndexOf('.');
    if (lastDot <= 0 || lastDot === base.length - 1) return '';
    return base.slice(lastDot + 1).toLowerCase();
  }

  function replaceOrSetExtension(filename, newExt) {
    const trimmed = (filename || 'index').trim() || 'index';
    const parts = trimmed.split('/');
    const base = parts.pop() || 'index';
    const dotIdx = base.lastIndexOf('.');
    const stem = dotIdx > 0 ? base.slice(0, dotIdx) : base;
    const updatedBase = `${stem || 'index'}.${newExt}`;
    parts.push(updatedBase);
    return parts.join('/');
  }

  function detectLanguageFromCode(codeText) {
    const text = (codeText || '').trim();
    if (!text) return null;

    const scores = {
      python: 0,
      typescript: 0,
      javascript: 0,
      html: 0,
      css: 0,
      scss: 0,
      json: 0,
      bash: 0,
      rust: 0,
      go: 0,
      java: 0,
      cpp: 0,
      sql: 0
    };

    if (/^\s*def\s+\w+\s*\(/m.test(text)) scores.python += 4;
    if (/^\s*(from\s+[\w.]+\s+import\s+|import\s+[\w.]+(?:\s+as\s+\w+)?\s*$)/m.test(text)) scores.python += 3;
    if (/:\s*(#.*)?$/m.test(text) && /\b(def|class|if|elif|else|for|while|return|async)\b/.test(text) && !/[{};]/.test(text)) {
      scores.python += 3;
    }
    if (/\b(self|print\s*\(|None|True|False|len\s*\()\b/.test(text)) scores.python += 2;

    if (/\b(const|let|var)\s+[\w[\]{},\s]+\s*=/.test(text)) scores.javascript += 3;
    if (/\bfunction\s+\w+\s*\(/.test(text)) scores.javascript += 3;
    if (/=>/.test(text)) scores.javascript += 2;
    if (/\b(createSignal|createEffect|useState|useEffect|useMemo|console\.log|document\.getElementById|require\s*\(|import\s+.*\s+from\s+['"])/.test(text)) {
      scores.javascript += 4;
    }
    if (/<\/?[A-Za-z][A-Za-z0-9]*(\s+[^>]*)?>/.test(text)) {
      scores.javascript += 3;
    }

    if (/\b(interface|type)\s+[A-Z]\w*\s*=|\binterface\s+[A-Z]\w*\s*\{/.test(text)) scores.typescript += 4;
    if (/:\s*(string|number|boolean|void|any|unknown|never|Promise<[^>]+>)\b/.test(text)) scores.typescript += 4;
    if (/\bas\s+(const|string|number|HTMLElement)\b/.test(text)) scores.typescript += 3;
    if (scores.typescript > 0) scores.typescript += Math.floor(scores.javascript * 0.7);

    if (/^\s*package\s+[a-z_]\w*\s*$/m.test(text)) scores.go += 5;
    if (/\bfunc\s+(\([^)]+\)\s*)?\w+\s*\(/.test(text)) scores.go += 3;
    if (/:=/.test(text) || /\bfmt\.(Print|Sprintf|Println)\b/.test(text)) scores.go += 3;

    if (/\bfn\s+\w+\s*\(/.test(text) && /\b(let\s+mut|println!|impl\b|pub\s+fn|match\b)\b/.test(text)) scores.rust += 5;
    if (/\bprintln!\s*\(/.test(text)) scores.rust += 3;

    if (/^\s*<!DOCTYPE\s+html>|<html\b|<head\b|<body\b|<div\b|<span\b|<p\b/i.test(text) && !/\b(return\s*\(|createSignal|useState)\b/.test(text)) {
      scores.html += 5;
    }

    if (/[.#][\w-]+\s*\{[^}]*:\s*[^;]+;/.test(text)) {
      scores.css += 4;
      if (/\$[\w-]+\s*:|@mixin\b|@include\b|&\s*[:.]/.test(text)) {
        scores.scss += 5;
      }
    }

    if ((text.startsWith('{') || text.startsWith('[')) && /"[\w-]+"/.test(text)) {
      try {
        JSON.parse(text);
        scores.json += 8;
      } catch (_) {
        if (/^\s*"[\w-]+"\s*:/m.test(text)) scores.json += 3;
      }
    }

    if (/^\s*#!.*\b(bash|sh|zsh)\b/m.test(text)) scores.bash += 6;
    if (/^\s*(curl|npm|pnpm|yarn|git|docker|chmod|export|echo)\s+/m.test(text)) scores.bash += 3;

    if (/\bpublic\s+(class|static\s+void\s+main)\b/.test(text)) scores.java += 5;
    if (/\bSystem\.out\.print(ln)?\s*\(/.test(text)) scores.java += 3;

    if (/^\s*#include\s*<[^>]+>/m.test(text)) scores.cpp += 5;
    if (/\b(std::cout|std::string|nullptr|printf\s*\()\b/.test(text)) scores.cpp += 4;

    if (/^\s*(SELECT|INSERT\s+INTO|UPDATE|DELETE\s+FROM|CREATE\s+TABLE)\b/im.test(text)) scores.sql += 5;

    let bestLang = null;
    let bestScore = 2;

    Object.entries(scores).forEach(([lang, score]) => {
      if (score > bestScore) {
        bestScore = score;
        bestLang = lang;
      }
    });

    return bestLang;
  }

  // =====================================================================
  // 3. STATE MANAGEMENT
  // =====================================================================
  let tabCounter = 1;

  function makeTab(opts = {}) {
    const id = opts.id || `tab-${tabCounter++}`;
    const title = opts.title || 'index.jsx';
    const ext = extractExtension(title);
    const langFromExt = ext && EXT_REGISTRY[ext] ? EXT_REGISTRY[ext].lang : null;
    return {
      id,
      title,
      code: opts.code !== undefined ? opts.code : DEFAULT_SNIPPET,
      language: opts.language || langFromExt || 'javascript',
      languagePinned: Boolean(opts.languagePinned)
    };
  }

  function createDefaultState() {
    tabCounter = 2;
    return {
      tabs: [
        makeTab({
          id: 'tab-1',
          title: 'index.jsx',
          code: DEFAULT_SNIPPET,
          language: 'javascript',
          languagePinned: false
        })
      ],
      activeTabId: 'tab-1',
      theme: 'github-dark',
      controls: 'filled',
      showFileLogo: true,
      showWatermark: true,
      radius: 14,
      shadow: 2,
      lineNumbers: true,
      startLine: 1,
      fontFamily: 'jetbrains',
      fontSize: 14,
      background: BG_PRESETS[1].css,
      gradColorA: '#f97316',
      gradColorB: '#ec4899',
      gradAngle: 135,
      padding: 56,
      aspect: 'auto',
      exportScale: 2
    };
  }

  let state = createDefaultState();

  function activeTab() {
    return state.tabs.find((t) => t.id === state.activeTabId) || state.tabs[0];
  }

  // =====================================================================
  // 4. DOM REFERENCES
  // =====================================================================
  const dom = {
    vibePresetsRow: document.getElementById('vibePresetsRow'),
    btnReset: document.getElementById('btnReset'),
    btnCopyImage: document.getElementById('btnCopyImage'),
    btnExportSvg: document.getElementById('btnExportSvg'),
    btnExportPng: document.getElementById('btnExportPng'),
    exportScaleSelect: document.getElementById('exportScaleSelect'),

    extBadge: document.getElementById('extBadge'),
    windowTitleInput: document.getElementById('windowTitleInput'),
    btnAutoDetectNow: document.getElementById('btnAutoDetectNow'),
    btnUnlockAutoLang: document.getElementById('btnUnlockAutoLang'),
    languageSelect: document.getElementById('languageSelect'),
    themeSelect: document.getElementById('themeSelect'),

    trafficStyleGroup: document.getElementById('trafficStyleGroup'),
    trafficLights: document.getElementById('trafficLights'),
    toggleFileLogo: document.getElementById('toggleFileLogo'),
    knobFileLogo: document.getElementById('knobFileLogo'),
    toggleWatermark: document.getElementById('toggleWatermark'),
    knobWatermark: document.getElementById('knobWatermark'),
    windowWatermark: document.getElementById('windowWatermark'),
    radiusSlider: document.getElementById('radiusSlider'),
    radiusValue: document.getElementById('radiusValue'),
    shadowSlider: document.getElementById('shadowSlider'),
    shadowValue: document.getElementById('shadowValue'),

    toggleLineNumbers: document.getElementById('toggleLineNumbers'),
    knobLineNumbers: document.getElementById('knobLineNumbers'),
    btnAddRemoveLines: document.getElementById('btnAddRemoveLines'),
    lineNumStatusText: document.getElementById('lineNumStatusText'),
    startLineRow: document.getElementById('startLineRow'),
    startLineInput: document.getElementById('startLineInput'),
    fontFamilySelect: document.getElementById('fontFamilySelect'),
    fontSizeSlider: document.getElementById('fontSizeSlider'),
    fontSizeValue: document.getElementById('fontSizeValue'),

    bgSwatchesGrid: document.getElementById('bgSwatchesGrid'),
    btnNoBg: document.getElementById('btnNoBg'),
    btnShuffleBg: document.getElementById('btnShuffleBg'),
    gradColorA: document.getElementById('gradColorA'),
    gradColorB: document.getElementById('gradColorB'),
    gradAngleSlider: document.getElementById('gradAngleSlider'),
    gradAngleValue: document.getElementById('gradAngleValue'),
    paddingSlider: document.getElementById('paddingSlider'),
    paddingValue: document.getElementById('paddingValue'),
    aspectSelect: document.getElementById('aspectSelectControl'),

    batchCountBadge: document.getElementById('batchCountBadge'),
    batchNumberSelect: document.getElementById('batchNumberSelect'),
    btnRefreshBatchNumbers: document.getElementById('btnRefreshBatchNumbers'),
    batchStartInput: document.getElementById('batchStartInput'),
    batchStepInput: document.getElementById('batchStepInput'),
    batchCountInput: document.getElementById('batchCountInput'),
    batchReplaceAllSame: document.getElementById('batchReplaceAllSame'),
    batchPreviewRange: document.getElementById('batchPreviewRange'),
    btnGenerateBatch: document.getElementById('btnGenerateBatch'),
    batchProgressWrap: document.getElementById('batchProgressWrap'),
    batchProgressLabel: document.getElementById('batchProgressLabel'),
    batchProgressPct: document.getElementById('batchProgressPct'),
    batchProgressBar: document.getElementById('batchProgressBar'),
    batchResultsList: document.getElementById('batchResultsList'),

    exportCanvas: document.getElementById('exportCanvas'),
    codeWindow: document.getElementById('codeWindow'),
    windowHeader: document.getElementById('windowHeader'),
    tabsContainer: document.getElementById('tabsContainer'),
    editorFlexRow: document.getElementById('editorFlexRow'),
    lineNumbersCol: document.getElementById('lineNumbersCol'),
    codeLinesMeasure: document.getElementById('codeLinesMeasure'),
    codeEditor: document.getElementById('codeEditor'),
    canvasDimensionsLabel: document.getElementById('canvasDimensionsLabel'),
    toastBanner: document.getElementById('toastBanner'),
    toastText: document.getElementById('toastText')
  };

  // =====================================================================
  // 5. TOAST FEEDBACK
  // =====================================================================
  let toastTimer = null;
  function notify(message) {
    dom.toastText.textContent = message;
    dom.toastBanner.classList.remove('opacity-0', 'translate-y-2');
    dom.toastBanner.classList.add('opacity-100', 'translate-y-0');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      dom.toastBanner.classList.remove('opacity-100', 'translate-y-0');
      dom.toastBanner.classList.add('opacity-0', 'translate-y-2');
    }, 2500);
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // =====================================================================
  // 6. TABS & EXTENSION LOGO RENDERING
  // =====================================================================
  function renderTabs() {
    const current = activeTab();
    const ext = extractExtension(current.title);
    dom.extBadge.textContent = ext ? `.${ext}` : 'no ext';
    dom.btnUnlockAutoLang.classList.toggle('hidden', !current.languagePinned);

    dom.tabsContainer.innerHTML = '';

    state.tabs.forEach((tab) => {
      const isActive = tab.id === current.id;
      const tabExt = extractExtension(tab.title);
      const meta = tabExt && EXT_REGISTRY[tabExt] ? EXT_REGISTRY[tabExt] : null;

      const tabEl = document.createElement('div');
      tabEl.className = `mac-tab ${isActive ? 'is-active' : ''}`;
      tabEl.dataset.tabId = tab.id;

      if (state.showFileLogo) {
        const iconBox = document.createElement('span');
        iconBox.className = 'w-4 h-4 inline-flex items-center justify-center shrink-0';
        iconBox.innerHTML = meta ? meta.svg : FALLBACK_FILE_SVG;
        tabEl.appendChild(iconBox);
      }

      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.value = tab.title;
      nameInput.className = 'mac-tab-input';
      nameInput.setAttribute('aria-label', 'Edit tab filename');
      nameInput.title = 'Click to edit filename & extension';
      nameInput.style.width = `${Math.max(52, Math.min(142, tab.title.length * 7.6 + 10))}px`;

      nameInput.addEventListener('focus', () => {
        if (state.activeTabId !== tab.id) {
          selectTab(tab.id);
        }
      });

      nameInput.addEventListener('input', (e) => {
        nameInput.style.width = `${Math.max(52, Math.min(142, e.target.value.length * 7.6 + 10))}px`;
        renameTab(tab.id, e.target.value, 'tab');
      });

      nameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          nameInput.blur();
          dom.codeEditor.focus();
        }
      });

      tabEl.appendChild(nameInput);

      if (state.tabs.length > 1) {
        const closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'mac-tab-close';
        closeBtn.title = 'Close tab';
        closeBtn.setAttribute('aria-label', 'Close tab');
        closeBtn.textContent = '×';
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          removeTab(tab.id);
        });
        tabEl.appendChild(closeBtn);
      }

      tabEl.addEventListener('click', () => {
        if (state.activeTabId !== tab.id) {
          selectTab(tab.id);
        }
      });

      dom.tabsContainer.appendChild(tabEl);
    });

    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'mac-add-tab';
    addBtn.title = 'New tab';
    addBtn.setAttribute('aria-label', 'New tab');
    addBtn.textContent = '+';
    addBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      createNewTab();
    });
    dom.tabsContainer.appendChild(addBtn);
  }

  function renameTab(tabId, newTitle, origin) {
    const tab = state.tabs.find((t) => t.id === tabId);
    if (!tab) return;
    tab.title = newTitle;

    if (tab.id === state.activeTabId && origin !== 'sidebar' && dom.windowTitleInput.value !== newTitle) {
      dom.windowTitleInput.value = newTitle;
    }

    const ext = extractExtension(newTitle);
    if (ext && EXT_REGISTRY[ext]) {
      tab.language = EXT_REGISTRY[ext].lang;
      tab.languagePinned = false;
      if (tab.id === state.activeTabId) {
        dom.languageSelect.value = tab.language;
        renderCodeAndGutter();
      }
    }

    renderTabs();
  }

  function selectTab(tabId) {
    if (!state.tabs.some((t) => t.id === tabId)) return;
    state.activeTabId = tabId;
    const tab = activeTab();
    dom.windowTitleInput.value = tab.title;
    dom.languageSelect.value = tab.language;
    dom.codeEditor.value = tab.code;
    renderTabs();
    renderCodeAndGutter();
  }

  function createNewTab() {
    const num = state.tabs.length + 1;
    const name = num === 2 ? 'script.py' : `file${num}.js`;
    const starter = num === 2
      ? `def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("World"))`
      : `const greet = (name) => \`Hello, \${name}!\`;\nconsole.log(greet("World"));`;
    const created = makeTab({ title: name, code: starter });
    state.tabs.push(created);
    selectTab(created.id);
    notify(`Created ${created.title}`);
  }

  function removeTab(tabId) {
    if (state.tabs.length <= 1) return;
    const idx = state.tabs.findIndex((t) => t.id === tabId);
    if (idx === -1) return;
    state.tabs.splice(idx, 1);
    if (state.activeTabId === tabId) {
      selectTab(state.tabs[Math.max(0, idx - 1)].id);
    } else {
      renderTabs();
    }
  }

  // =====================================================================
  // 7. CODE HIGHLIGHTING & DYNAMIC LINE-HEIGHT-MATCHED GUTTER
  // =====================================================================
  function highlightSingleLine(lineText, lang) {
    if (lang === 'plaintext' || typeof window.hljs === 'undefined') {
      return escapeHtml(lineText) || '&#8203;';
    }
    try {
      const validLang = window.hljs.getLanguage(lang) ? lang : 'plaintext';
      if (validLang === 'plaintext') {
        return escapeHtml(lineText) || '&#8203;';
      }
      const res = window.hljs.highlight(lineText, { language: validLang, ignoreIllegals: true });
      return res.value || '&#8203;';
    } catch (_) {
      return escapeHtml(lineText) || '&#8203;';
    }
  }

  function renderCodeAndGutter() {
    const tab = activeTab();
    const raw = tab.code;
    const lines = raw.split('\n');
    const fontStack = FONT_STACKS[state.fontFamily] || FONT_STACKS.jetbrains;
    const lineHeightPx = Math.round(state.fontSize * 1.55);

    dom.codeLinesMeasure.style.fontFamily = fontStack;
    dom.codeLinesMeasure.style.fontSize = `${state.fontSize}px`;
    dom.codeLinesMeasure.style.lineHeight = `${lineHeightPx}px`;

    dom.codeEditor.style.fontFamily = fontStack;
    dom.codeEditor.style.fontSize = `${state.fontSize}px`;
    dom.codeEditor.style.lineHeight = `${lineHeightPx}px`;

    dom.lineNumbersCol.style.fontFamily = fontStack;
    dom.lineNumbersCol.style.fontSize = `${state.fontSize}px`;
    dom.lineNumbersCol.style.lineHeight = `${lineHeightPx}px`;

    const fragment = document.createDocumentFragment();
    const lineRowEls = [];

    lines.forEach((lineStr) => {
      const span = document.createElement('span');
      span.className = 'code-line-row';
      span.style.minHeight = `${lineHeightPx}px`;
      span.innerHTML = highlightSingleLine(lineStr, tab.language);
      fragment.appendChild(span);
      lineRowEls.push(span);
    });

    dom.codeLinesMeasure.innerHTML = '';
    dom.codeLinesMeasure.appendChild(fragment);

    dom.lineNumbersCol.classList.toggle('hidden', !state.lineNumbers);
    dom.startLineRow.classList.toggle('hidden', !state.lineNumbers);

    if (state.lineNumbers) {
      const startNum = Math.max(1, parseInt(state.startLine, 10) || 1);
      const gutterFrag = document.createDocumentFragment();

      lineRowEls.forEach((rowEl, index) => {
        const measuredHeight = Math.max(lineHeightPx, Math.round(rowEl.getBoundingClientRect().height));
        const numCell = document.createElement('div');
        numCell.className = 'line-num-cell';
        numCell.style.height = `${measuredHeight}px`;
        numCell.textContent = String(startNum + index);
        gutterFrag.appendChild(numCell);
      });

      dom.lineNumbersCol.innerHTML = '';
      dom.lineNumbersCol.appendChild(gutterFrag);
    } else {
      dom.lineNumbersCol.innerHTML = '';
    }

    updateDimensionsLabel();
  }

  function handleCodeInput() {
    const tab = activeTab();
    tab.code = dom.codeEditor.value;

    if (!tab.languagePinned) {
      const detected = detectLanguageFromCode(tab.code);
      if (detected && detected !== tab.language) {
        tab.language = detected;
        dom.languageSelect.value = detected;

        const currentExt = extractExtension(tab.title);
        const currentExtLang = currentExt && EXT_REGISTRY[currentExt] ? EXT_REGISTRY[currentExt].lang : null;
        if (currentExtLang !== detected) {
          const suggestedExt = LANG_TO_DEFAULT_EXT[detected];
          if (suggestedExt) {
            tab.title = replaceOrSetExtension(tab.title, suggestedExt);
            dom.windowTitleInput.value = tab.title;
            renderTabs();
          }
        }
      }
    }

    renderCodeAndGutter();
    populateBatchNumberTokens();
  }

  // =====================================================================
  // 8. CANVAS, THEME, LINE NUMBER CONTROLS & SWATCHES
  // =====================================================================
  function applyVisualSettings() {
    const isTransparent = state.background === 'transparent';

    if (isTransparent) {
      dom.exportCanvas.style.background = 'none';
      dom.exportCanvas.style.backgroundColor = 'transparent';
      dom.exportCanvas.classList.add('transparent-checker');
    } else {
      dom.exportCanvas.classList.remove('transparent-checker');
      dom.exportCanvas.style.background = state.background;
    }
    const effectivePadding = isTransparent ? 0 : state.padding;
    dom.exportCanvas.style.padding = `${effectivePadding}px`;
    dom.paddingValue.textContent = isTransparent ? '0px (No BG)' : `${state.padding}px`;

    if (dom.btnNoBg) {
      dom.btnNoBg.className = isTransparent
        ? 'text-[11px] font-semibold px-2 py-0.5 rounded-md bg-violet-600 text-white border border-violet-400/50 transition cursor-pointer'
        : 'text-[11px] font-medium px-2 py-0.5 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/[0.1] transition cursor-pointer';
    }

    if (state.aspect === 'auto') {
      dom.exportCanvas.style.width = 'auto';
      dom.exportCanvas.style.height = 'auto';
      dom.exportCanvas.style.aspectRatio = '';
    } else {
      dom.exportCanvas.style.aspectRatio = state.aspect;
      dom.exportCanvas.style.width = state.aspect === '16/9' ? 'min(820px, 100%)' : 'min(580px, 100%)';
      dom.exportCanvas.style.height = 'auto';
    }

    dom.codeWindow.className = `code-window theme-${state.theme} relative w-full max-w-[680px] min-w-[300px] sm:min-w-[440px] overflow-hidden`;
    dom.codeWindow.style.borderRadius = `${state.radius}px`;
    dom.codeWindow.style.boxShadow = SHADOW_CSS[state.shadow] || SHADOW_CSS[2];
    dom.radiusValue.textContent = `${state.radius}px`;
    dom.shadowValue.textContent = SHADOW_NAMES[state.shadow] || 'High';

    dom.windowWatermark.classList.toggle('hidden', !state.showWatermark);
    syncSwitchUI(dom.toggleWatermark, dom.knobWatermark, state.showWatermark);
    syncSwitchUI(dom.toggleFileLogo, dom.knobFileLogo, state.showFileLogo);
    syncSwitchUI(dom.toggleLineNumbers, dom.knobLineNumbers, state.lineNumbers);

    dom.btnAddRemoveLines.textContent = state.lineNumbers ? 'Remove' : '+ Add';
    dom.lineNumStatusText.textContent = state.lineNumbers
      ? 'Enabled • Auto-aligned per line'
      : 'Hidden • Clean unnumbered view';
    dom.lineNumStatusText.className = state.lineNumbers
      ? 'text-[10px] text-emerald-400'
      : 'text-[10px] text-zinc-500';

    dom.fontSizeValue.textContent = `${state.fontSize}px`;
    renderTrafficLights();
    renderCodeAndGutter();
  }

  function syncSwitchUI(btn, knob, enabled) {
    if (!btn || !knob) return;
    btn.setAttribute('aria-checked', String(enabled));
    if (enabled) {
      btn.className = 'w-10 h-5 rounded-full bg-violet-600 p-0.5 transition-colors cursor-pointer flex items-center';
      knob.className = 'w-4 h-4 rounded-full bg-white shadow transform translate-x-5 transition-transform';
    } else {
      btn.className = 'w-10 h-5 rounded-full bg-zinc-700 p-0.5 transition-colors cursor-pointer flex items-center';
      knob.className = 'w-4 h-4 rounded-full bg-white shadow transform translate-x-0 transition-transform';
    }
  }

  function renderTrafficLights() {
    const validStyles = ['filled', 'outline', 'grayscale', 'hidden'];
    const normalized = state.controls === 'mono' ? 'grayscale' : state.controls;
    const currentStyle = validStyles.includes(normalized) ? normalized : 'filled';
    state.controls = currentStyle;

    dom.trafficStyleGroup.querySelectorAll('.ctrl-btn').forEach((btn) => {
      const active = btn.dataset.controls === currentStyle;
      const isNoneBtn = btn.dataset.controls === 'hidden';
      btn.className = active
        ? `ctrl-btn py-2 rounded-lg flex items-center justify-center gap-1 ${isNoneBtn ? 'text-[11px] font-medium' : ''} bg-violet-600 text-white cursor-pointer`
        : `ctrl-btn py-2 rounded-lg flex items-center justify-center gap-1 ${isNoneBtn ? 'text-[11px] font-medium' : ''} text-zinc-400 hover:text-white cursor-pointer`;
    });

    dom.windowHeader.classList.remove(
      'tl-style-filled',
      'tl-style-outline',
      'tl-style-grayscale',
      'tl-style-hidden'
    );
    dom.windowHeader.classList.add(`tl-style-${currentStyle}`);
    dom.trafficLights.style.display = currentStyle === 'hidden' ? 'none' : 'inline-flex';
  }

  function renderBackgroundSwatches() {
    dom.bgSwatchesGrid.innerHTML = '';
    BG_PRESETS.forEach((preset) => {
      const swatch = document.createElement('button');
      swatch.type = 'button';
      swatch.title = preset.name;
      swatch.setAttribute('aria-label', preset.name);
      const isSelected = state.background === preset.css;
      swatch.className = `h-8 rounded-lg border transition transform hover:scale-105 cursor-pointer relative overflow-hidden ${
        isSelected ? 'border-white ring-2 ring-violet-400 scale-105' : 'border-white/15'
      } ${preset.isTransparent ? 'transparent-checker' : ''}`;
      if (!preset.isTransparent) {
        swatch.style.background = preset.css;
      } else {
        swatch.innerHTML = `<span class="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white/90 drop-shadow">∅</span>`;
      }
      swatch.addEventListener('click', () => {
        state.background = preset.css;
        renderBackgroundSwatches();
        applyVisualSettings();
        if (preset.isTransparent) {
          notify('Background removed (transparent PNG/SVG)');
        }
      });
      dom.bgSwatchesGrid.appendChild(swatch);
    });
  }

  function applyCustomGradient() {
    const css = `linear-gradient(${state.gradAngle}deg, ${state.gradColorA} 0%, ${state.gradColorB} 100%)`;
    state.background = css;
    dom.gradAngleValue.textContent = `${state.gradAngle}°`;
    renderBackgroundSwatches();
    applyVisualSettings();
  }

  function updateDimensionsLabel() {
    const rect = dom.exportCanvas.getBoundingClientRect();
    const w = Math.round(rect.width);
    const h = Math.round(rect.height);
    const scale = state.exportScale;
    dom.canvasDimensionsLabel.textContent = `${w} × ${h}px (${w * scale} × ${h * scale}px @ ${scale}x)`;
  }

  // =====================================================================
  // 8B. BATCH NUMERICAL SEQUENCE GENERATOR
  // =====================================================================
  let batchTokens = [];
  let batchGeneratedItems = [];
  let isBatchRunning = false;

  function scanNumericTokens(codeText) {
    const tokens = [];
    const regex = /-?\b\d+(?:\.\d+)?\b/g;
    let match;
    while ((match = regex.exec(codeText)) !== null) {
      const raw = match[0];
      const numVal = Number(raw);
      if (Number.isFinite(numVal)) {
        const lineNum = codeText.slice(0, match.index).split('\n').length;
        tokens.push({
          index: tokens.length,
          raw,
          value: numVal,
          start: match.index,
          end: match.index + raw.length,
          line: lineNum,
          isFloat: raw.includes('.')
        });
      }
    }
    return tokens;
  }

  function formatSteppedNumber(val, templateToken, stepIsFloat) {
    if ((templateToken && templateToken.isFloat) || stepIsFloat) {
      const decPlaces = Math.max(
        templateToken && templateToken.isFloat ? (templateToken.raw.split('.')[1] || '').length : 0,
        1
      );
      return Number(val.toFixed(Math.min(decPlaces, 4))).toString();
    }
    return String(Math.round(val));
  }

  function populateBatchNumberTokens() {
    const prevSelected = parseInt(dom.batchNumberSelect.value, 10);
    batchTokens = scanNumericTokens(activeTab().code);
    dom.batchNumberSelect.innerHTML = '';

    if (batchTokens.length === 0) {
      const opt = document.createElement('option');
      opt.value = '-1';
      opt.textContent = 'No numbers found in code';
      dom.batchNumberSelect.appendChild(opt);
      dom.batchCountBadge.textContent = '0 nums';
      dom.btnGenerateBatch.disabled = true;
      dom.btnGenerateBatch.classList.add('opacity-50', 'cursor-not-allowed');
      return;
    }

    dom.btnGenerateBatch.disabled = false;
    dom.btnGenerateBatch.classList.remove('opacity-50', 'cursor-not-allowed');
    dom.batchCountBadge.textContent = `${batchTokens.length} found`;

    batchTokens.forEach((tok, idx) => {
      const opt = document.createElement('option');
      opt.value = String(idx);
      opt.textContent = `#${idx + 1}: "${tok.raw}" (line ${tok.line})`;
      dom.batchNumberSelect.appendChild(opt);
    });

    if (!Number.isNaN(prevSelected) && prevSelected >= 0 && prevSelected < batchTokens.length) {
      dom.batchNumberSelect.value = String(prevSelected);
    } else {
      const smartIdx = batchTokens.findIndex((t) => t.value !== 0 && t.value !== 1000);
      dom.batchNumberSelect.value = String(smartIdx >= 0 ? smartIdx : 0);
      const chosen = batchTokens[smartIdx >= 0 ? smartIdx : 0];
      dom.batchStartInput.value = String(chosen.value);
    }

    updateBatchSequencePreview();
  }

  function updateBatchSequencePreview() {
    const startVal = parseFloat(dom.batchStartInput.value);
    const stepVal = parseFloat(dom.batchStepInput.value);
    const countVal = Math.max(2, Math.min(15, parseInt(dom.batchCountInput.value, 10) || 3));
    dom.batchCountInput.value = String(countVal);

    const safeStart = Number.isFinite(startVal) ? startVal : 1;
    const safeStep = Number.isFinite(stepVal) ? stepVal : 1;
    const selectedIdx = parseInt(dom.batchNumberSelect.value, 10);
    const templateTok = batchTokens[selectedIdx] || null;
    const stepIsFloat = !Number.isInteger(safeStep);

    const previewVals = [];
    for (let i = 0; i < Math.min(countVal, 4); i++) {
      previewVals.push(formatSteppedNumber(safeStart + i * safeStep, templateTok, stepIsFloat));
    }
    if (countVal > 4) {
      previewVals.push('…', formatSteppedNumber(safeStart + (countVal - 1) * safeStep, templateTok, stepIsFloat));
    }
    dom.batchPreviewRange.textContent = previewVals.join(' → ') || '—';
  }

  function buildCodeWithReplacedNumber(originalCode, targetToken, newNumStr, replaceAllSame) {
    if (!targetToken) return originalCode;
    if (replaceAllSame) {
      const escapedRaw = targetToken.raw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const allRegex = new RegExp(`(^|[^\\d.])(${escapedRaw})(?=$|[^\\d.])`, 'g');
      return originalCode.replace(allRegex, (_, prefix) => `${prefix}${newNumStr}`);
    }
    return (
      originalCode.slice(0, targetToken.start) +
      newNumStr +
      originalCode.slice(targetToken.end)
    );
  }

  function triggerDownloadDataUrl(dataUrl, filename) {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
  }

  function renderBatchResultCards() {
    dom.batchResultsList.innerHTML = '';
    if (batchGeneratedItems.length === 0) return;

    const dlAllRow = document.createElement('div');
    dlAllRow.className = 'flex items-center justify-between pb-1';
    const label = document.createElement('span');
    label.className = 'text-[10px] text-zinc-400';
    label.textContent = `${batchGeneratedItems.length} images ready:`;
    const dlAllBtn = document.createElement('button');
    dlAllBtn.type = 'button';
    dlAllBtn.className = 'text-[10px] font-semibold text-emerald-300 hover:text-emerald-200 underline cursor-pointer';
    dlAllBtn.textContent = 'Download all';
    dlAllBtn.addEventListener('click', async () => {
      for (let i = 0; i < batchGeneratedItems.length; i++) {
        const item = batchGeneratedItems[i];
        triggerDownloadDataUrl(item.dataUrl, item.filename);
        await new Promise((r) => setTimeout(r, 180));
      }
      notify(`Downloaded ${batchGeneratedItems.length} batch images`);
    });
    dlAllRow.appendChild(label);
    dlAllRow.appendChild(dlAllBtn);
    dom.batchResultsList.appendChild(dlAllRow);

    batchGeneratedItems.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'flex items-center justify-between gap-2 bg-zinc-950/90 border border-white/[0.07] rounded-lg px-2.5 py-1.5';

      const left = document.createElement('div');
      left.className = 'flex items-center gap-2 min-w-0';

      const thumb = document.createElement('img');
      thumb.src = item.dataUrl;
      thumb.alt = item.filename;
      thumb.className = 'w-8 h-6 rounded object-cover border border-white/10 shrink-0';

      const titleSpan = document.createElement('span');
      titleSpan.className = 'text-[11px] font-mono text-zinc-200 truncate';
      titleSpan.textContent = `#${item.stepIndex + 1} (${item.valueText})`;

      left.appendChild(thumb);
      left.appendChild(titleSpan);

      const saveBtn = document.createElement('button');
      saveBtn.type = 'button';
      saveBtn.className = 'text-[10px] font-semibold px-2 py-0.5 rounded bg-violet-600/25 hover:bg-violet-600/40 text-violet-200 border border-violet-500/30 shrink-0 cursor-pointer';
      saveBtn.textContent = 'PNG';
      saveBtn.addEventListener('click', () => {
        triggerDownloadDataUrl(item.dataUrl, item.filename);
        notify(`Saved ${item.filename}`);
      });

      row.appendChild(left);
      row.appendChild(saveBtn);
      dom.batchResultsList.appendChild(row);
    });
  }

  async function runBatchSequenceGeneration() {
    if (isBatchRunning) return;
    if (typeof window.htmlToImage === 'undefined') {
      notify('Export library unavailable — check connection');
      return;
    }

    const tab = activeTab();
    batchTokens = scanNumericTokens(tab.code);
    const selIdx = parseInt(dom.batchNumberSelect.value, 10);
    const targetToken = batchTokens[selIdx] || batchTokens[0];

    if (!targetToken) {
      notify('Add a number in your code first');
      return;
    }

    const startVal = Number.isFinite(parseFloat(dom.batchStartInput.value))
      ? parseFloat(dom.batchStartInput.value)
      : targetToken.value;
    const stepVal = Number.isFinite(parseFloat(dom.batchStepInput.value))
      ? parseFloat(dom.batchStepInput.value)
      : 1;
    const countVal = Math.max(2, Math.min(15, parseInt(dom.batchCountInput.value, 10) || 3));
    const replaceAllSame = Boolean(dom.batchReplaceAllSame.checked);
    const stepIsFloat = !Number.isInteger(stepVal);

    const originalCode = tab.code;
    const baseName = (tab.title || 'codesnap').replace(/\.[^.]+$/, '') || 'codesnap';

    isBatchRunning = true;
    batchGeneratedItems = [];
    dom.batchResultsList.innerHTML = '';
    dom.batchProgressWrap.classList.remove('hidden');
    dom.btnGenerateBatch.disabled = true;

    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    dom.exportCanvas.classList.add('is-exporting');
    if (document.activeElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }

    try {
      for (let i = 0; i < countVal; i++) {
        const pct = Math.round(((i + 0.35) / countVal) * 100);
        dom.batchProgressLabel.textContent = `Rendering ${i + 1} of ${countVal}...`;
        dom.batchProgressPct.textContent = `${pct}%`;
        dom.batchProgressBar.style.width = `${pct}%`;

        const nextNumStr = formatSteppedNumber(startVal + i * stepVal, targetToken, stepIsFloat);
        tab.code = buildCodeWithReplacedNumber(originalCode, targetToken, nextNumStr, replaceAllSame);
        dom.codeEditor.value = tab.code;
        renderCodeAndGutter();

        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

        const rect = dom.exportCanvas.getBoundingClientRect();
        const width = Math.max(1, Math.round(rect.width));
        const height = Math.max(1, Math.round(rect.height));

        const dataUrl = await window.htmlToImage.toPng(dom.exportCanvas, {
          width,
          height,
          pixelRatio: state.exportScale,
          backgroundColor: state.background === 'transparent' ? null : undefined,
          cacheBust: true
        });

        const safeValSlug = nextNumStr.replace(/[^a-zA-Z0-9._-]/g, '_');
        batchGeneratedItems.push({
          stepIndex: i,
          valueText: nextNumStr,
          filename: `${baseName}-${safeValSlug}-${state.exportScale}x.png`,
          dataUrl
        });

        const donePct = Math.round(((i + 1) / countVal) * 100);
        dom.batchProgressPct.textContent = `${donePct}%`;
        dom.batchProgressBar.style.width = `${donePct}%`;
      }

      renderBatchResultCards();
      notify(`Generated ${batchGeneratedItems.length} images!`);
    } catch (err) {
      console.error('Batch generation error:', err);
      notify('Batch generation encountered an error');
    } finally {
      tab.code = originalCode;
      dom.codeEditor.value = originalCode;
      dom.exportCanvas.classList.remove('is-exporting');
      renderCodeAndGutter();
      populateBatchNumberTokens();
      isBatchRunning = false;
      dom.btnGenerateBatch.disabled = false;
    }
  }

  // =====================================================================
  // 9. EXPORT (PNG / SVG / COPY IMAGE)
  // =====================================================================
  async function captureSnapshot(mode) {
    if (typeof window.htmlToImage === 'undefined') {
      notify('Export library unavailable — check connection');
      return;
    }

    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
    renderCodeAndGutter();

    const rect = dom.exportCanvas.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));
    const baseName = (activeTab().title || 'codesnap').replace(/\.[^.]+$/, '') || 'codesnap';

    dom.exportCanvas.classList.add('is-exporting');
    if (document.activeElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }

    try {
      const isTransparent = state.background === 'transparent';
      const opts = {
        width,
        height,
        pixelRatio: state.exportScale,
        backgroundColor: isTransparent ? null : undefined,
        cacheBust: true
      };

      if (mode === 'png') {
        const dataUrl = await window.htmlToImage.toPng(dom.exportCanvas, opts);
        const link = document.createElement('a');
        link.download = `${baseName}-${state.exportScale}x.png`;
        link.href = dataUrl;
        link.click();
        notify(`Exported ${baseName}-${state.exportScale}x.png`);
      } else if (mode === 'svg') {
        const dataUrl = await window.htmlToImage.toSvg(dom.exportCanvas, {
          width,
          height,
          backgroundColor: isTransparent ? null : undefined,
          cacheBust: true
        });
        const link = document.createElement('a');
        link.download = `${baseName}.svg`;
        link.href = dataUrl;
        link.click();
        notify(`Exported ${baseName}.svg`);
      } else if (mode === 'copy') {
        if (!navigator.clipboard || typeof ClipboardItem === 'undefined') {
          notify('Clipboard image API unsupported in this browser');
          return;
        }
        const blob = await window.htmlToImage.toBlob(dom.exportCanvas, opts);
        if (!blob) {
          notify('Could not generate image blob');
          return;
        }
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        notify('Copied image to clipboard!');
      }
    } catch (err) {
      console.error('Export error:', err);
      notify('Export failed — try another scale or SVG');
    } finally {
      dom.exportCanvas.classList.remove('is-exporting');
    }
  }

  // =====================================================================
  // 10. EVENT WIRING & INITIALIZATION
  // =====================================================================
  function syncInputsFromState() {
    const current = activeTab();
    dom.windowTitleInput.value = current.title;
    dom.languageSelect.value = current.language;
    dom.codeEditor.value = current.code;
    dom.themeSelect.value = state.theme;
    dom.radiusSlider.value = state.radius;
    dom.shadowSlider.value = state.shadow;
    dom.startLineInput.value = state.startLine;
    dom.fontFamilySelect.value = state.fontFamily;
    dom.fontSizeSlider.value = state.fontSize;
    dom.gradColorA.value = state.gradColorA;
    dom.gradColorB.value = state.gradColorB;
    dom.gradAngleSlider.value = state.gradAngle;
    dom.gradAngleValue.textContent = `${state.gradAngle}°`;
    dom.paddingSlider.value = state.padding;
    dom.aspectSelect.value = state.aspect;
    dom.exportScaleSelect.value = String(state.exportScale);
  }

  function bindEvents() {
    dom.codeEditor.addEventListener('input', handleCodeInput);

    dom.codeEditor.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const el = dom.codeEditor;
        const start = el.selectionStart;
        const end = el.selectionEnd;
        const val = el.value;
        const indent = '  ';

        if (!e.shiftKey) {
          el.value = val.slice(0, start) + indent + val.slice(end);
          el.selectionStart = el.selectionEnd = start + indent.length;
        } else {
          const lineStart = val.lastIndexOf('\n', start - 1) + 1;
          const prefix = val.slice(lineStart, start);
          const removeCount = prefix.startsWith('  ') ? 2 : prefix.startsWith(' ') ? 1 : 0;
          if (removeCount > 0) {
            el.value = val.slice(0, lineStart) + val.slice(lineStart + removeCount);
            el.selectionStart = Math.max(lineStart, start - removeCount);
            el.selectionEnd = Math.max(lineStart, end - removeCount);
          }
        }
        handleCodeInput();
      }
    });

    dom.windowTitleInput.addEventListener('input', (e) => {
      renameTab(state.activeTabId, e.target.value, 'sidebar');
    });

    dom.btnAutoDetectNow.addEventListener('click', () => {
      const tab = activeTab();
      tab.languagePinned = false;
      const detected = detectLanguageFromCode(tab.code) || 'javascript';
      tab.language = detected;
      dom.languageSelect.value = detected;
      const ext = LANG_TO_DEFAULT_EXT[detected];
      if (ext) {
        tab.title = replaceOrSetExtension(tab.title, ext);
        dom.windowTitleInput.value = tab.title;
        renderTabs();
      }
      renderCodeAndGutter();
      notify(`Detected ${detected} (.${ext || 'txt'})`);
    });

    dom.btnUnlockAutoLang.addEventListener('click', () => {
      const tab = activeTab();
      tab.languagePinned = false;
      handleCodeInput();
      notify('Auto-detection re-enabled');
    });

    dom.languageSelect.addEventListener('change', (e) => {
      const tab = activeTab();
      tab.language = e.target.value;
      tab.languagePinned = true;
      renderTabs();
      renderCodeAndGutter();
    });

    dom.themeSelect.addEventListener('change', (e) => {
      state.theme = e.target.value;
      applyVisualSettings();
    });

    dom.trafficStyleGroup.addEventListener('click', (e) => {
      const btn = e.target.closest('.ctrl-btn');
      if (!btn || !btn.dataset.controls) return;
      state.controls = btn.dataset.controls;
      renderTrafficLights();
    });

    if (dom.toggleFileLogo) {
      dom.toggleFileLogo.addEventListener('click', () => {
        state.showFileLogo = !state.showFileLogo;
        renderTabs();
        applyVisualSettings();
      });
    }

    if (dom.toggleWatermark) {
      dom.toggleWatermark.addEventListener('click', () => {
        state.showWatermark = !state.showWatermark;
        applyVisualSettings();
      });
    }

    dom.radiusSlider.addEventListener('input', (e) => {
      state.radius = parseInt(e.target.value, 10);
      applyVisualSettings();
    });

    dom.shadowSlider.addEventListener('input', (e) => {
      state.shadow = parseInt(e.target.value, 10);
      applyVisualSettings();
    });

    const flipLineNumbers = () => {
      state.lineNumbers = !state.lineNumbers;
      applyVisualSettings();
      notify(state.lineNumbers ? 'Line numbers added' : 'Line numbers removed');
    };

    dom.toggleLineNumbers.addEventListener('click', flipLineNumbers);
    dom.btnAddRemoveLines.addEventListener('click', flipLineNumbers);

    dom.startLineInput.addEventListener('input', (e) => {
      state.startLine = Math.max(1, parseInt(e.target.value, 10) || 1);
      renderCodeAndGutter();
    });

    dom.fontFamilySelect.addEventListener('change', (e) => {
      state.fontFamily = e.target.value;
      renderCodeAndGutter();
    });

    dom.fontSizeSlider.addEventListener('input', (e) => {
      state.fontSize = parseInt(e.target.value, 10);
      applyVisualSettings();
    });

    dom.btnNoBg.addEventListener('click', () => {
      state.background = state.background === 'transparent' ? BG_PRESETS[1].css : 'transparent';
      renderBackgroundSwatches();
      applyVisualSettings();
      notify(state.background === 'transparent' ? 'Background removed (transparent)' : 'Gradient background restored');
    });

    dom.btnShuffleBg.addEventListener('click', () => {
      const pool = BG_PRESETS.filter((p) => !p.isTransparent && p.css !== state.background);
      const pick = pool[Math.floor(Math.random() * pool.length)] || BG_PRESETS[1];
      state.background = pick.css;
      renderBackgroundSwatches();
      applyVisualSettings();
      notify(`Background: ${pick.name}`);
    });

    dom.gradColorA.addEventListener('input', (e) => {
      state.gradColorA = e.target.value;
      applyCustomGradient();
    });

    dom.gradColorB.addEventListener('input', (e) => {
      state.gradColorB = e.target.value;
      applyCustomGradient();
    });

    dom.gradAngleSlider.addEventListener('input', (e) => {
      state.gradAngle = parseInt(e.target.value, 10);
      applyCustomGradient();
    });

    dom.paddingSlider.addEventListener('input', (e) => {
      state.padding = parseInt(e.target.value, 10);
      applyVisualSettings();
    });

    dom.aspectSelect.addEventListener('change', (e) => {
      state.aspect = e.target.value;
      applyVisualSettings();
    });

    dom.btnRefreshBatchNumbers.addEventListener('click', () => {
      populateBatchNumberTokens();
      notify('Scanned numbers in code');
    });

    dom.batchNumberSelect.addEventListener('change', () => {
      const tok = batchTokens[parseInt(dom.batchNumberSelect.value, 10)];
      if (tok) {
        dom.batchStartInput.value = String(tok.value);
      }
      updateBatchSequencePreview();
    });

    dom.batchStartInput.addEventListener('input', updateBatchSequencePreview);
    dom.batchStepInput.addEventListener('input', updateBatchSequencePreview);
    dom.batchCountInput.addEventListener('input', updateBatchSequencePreview);
    dom.btnGenerateBatch.addEventListener('click', runBatchSequenceGeneration);

    dom.exportScaleSelect.addEventListener('change', (e) => {
      state.exportScale = parseInt(e.target.value, 10) || 2;
      updateDimensionsLabel();
    });

    if (dom.vibePresetsRow) {
      dom.vibePresetsRow.addEventListener('click', (e) => {
        const btn = e.target.closest('.vibe-btn');
        if (!btn || !btn.dataset.vibe) return;
        const cfg = VIBE_CONFIGS[btn.dataset.vibe];
        if (!cfg) return;
        Object.assign(state, cfg);
        syncInputsFromState();
        renderBackgroundSwatches();
        applyVisualSettings();
        notify(`Applied ${btn.textContent} vibe`);
      });
    }

    dom.btnReset.addEventListener('click', () => {
      state = createDefaultState();
      batchGeneratedItems = [];
      dom.batchResultsList.innerHTML = '';
      dom.batchProgressWrap.classList.add('hidden');
      syncInputsFromState();
      renderBackgroundSwatches();
      renderTabs();
      applyVisualSettings();
      populateBatchNumberTokens();
      notify('Reset to defaults');
    });

    dom.btnExportPng.addEventListener('click', () => captureSnapshot('png'));
    dom.btnExportSvg.addEventListener('click', () => captureSnapshot('svg'));
    dom.btnCopyImage.addEventListener('click', () => captureSnapshot('copy'));

    window.addEventListener('resize', () => {
      renderCodeAndGutter();
    });

    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        captureSnapshot('png');
      }
    });
  }

  function init() {
    syncInputsFromState();
    renderBackgroundSwatches();
    renderTabs();
    applyVisualSettings();
    populateBatchNumberTokens();
    bindEvents();

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        renderCodeAndGutter();
        populateBatchNumberTokens();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
