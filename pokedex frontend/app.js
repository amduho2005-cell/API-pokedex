// ---------- config ----------
const API_URL = 'http://localhost:3000';

// Los 18 tipos, embebidos directo aquí (no como archivo aparte) para que
// este front funcione con solo abrir index.html — sin servidor, sin Python.
const TYPE_NAMES = [
  'Normal', 'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug',
  'Ghost', 'Steel', 'Fire', 'Water', 'Grass', 'Electric', 'Psychic',
  'Ice', 'Dragon', 'Dark', 'Fairy'
];

// ---------- state ----------
let allPokemon = [];
let activeType = null;
let searchTerm = '';
let visibleCount = 48;
const PAGE_SIZE = 48;

const typeColor = (type) => `var(--t-${type.toLowerCase()})`;

// ---------- dom refs ----------
const grid = document.getElementById('grid');
const emptyState = document.getElementById('emptyState');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const searchInput = document.getElementById('searchInput');
const typeChips = document.getElementById('typeChips');
const resultCount = document.getElementById('resultCount');

const detailPanel = document.getElementById('detailPanel');
const detailScrim = document.getElementById('detailScrim');
const detailClose = document.getElementById('detailClose');
const detailContent = document.getElementById('detailContent');

// ---------- load data ----------
async function init() {
  try {
    const pokeRes = await fetch(`${API_URL}/pokemon`);
    if (!pokeRes.ok) throw new Error('API respondió con error');
    allPokemon = await pokeRes.json();
  } catch (err) {
    grid.innerHTML = `<p class="empty">No se pudo conectar con la API en <code>${API_URL}</code>.
      Verifica que el backend esté corriendo (<code>npm run dev</code> en la carpeta <code>pokedex-api</code>)
      y que no haya otro proceso usando el puerto 3000.</p>`;

    return;
  }

  buildTypeChips();
  render();
}

// ---------- type chips ----------
function buildTypeChips() {
  const allChip = makeChip('Todos', null);
  typeChips.appendChild(allChip);
  TYPE_NAMES.forEach((name) => typeChips.appendChild(makeChip(name, name)));
  updateChipState();
}

function makeChip(label, value) {
  const btn = document.createElement('button');
  btn.className = 'chip';
  btn.textContent = label;
  btn.setAttribute('aria-pressed', 'false');
  btn.addEventListener('click', () => {
    activeType = value;
    visibleCount = PAGE_SIZE;
    updateChipState();
    render();
  });
  btn.dataset.value = value ?? '__all__';
  return btn;
}

function updateChipState() {
  [...typeChips.children].forEach((chip) => {
    const isActive = chip.dataset.value === (activeType ?? '__all__');
    chip.setAttribute('aria-pressed', String(isActive));
  });
}

// ---------- filtering ----------
function getFiltered() {
  const term = searchTerm.trim().toLowerCase();
  return allPokemon.filter((p) => {
    const matchesType = !activeType || p.type.includes(activeType);
    const matchesTerm =
      !term ||
      p.name.english.toLowerCase().includes(term) ||
      String(p.id).padStart(3, '0').includes(term) ||
      String(p.id) === term;
    return matchesType && matchesTerm;
  });
}

// ---------- render grid ----------
function render() {
  const filtered = getFiltered();
  resultCount.textContent = `${filtered.length} registro${filtered.length === 1 ? '' : 's'}`;

  const slice = filtered.slice(0, visibleCount);
  grid.innerHTML = '';

  emptyState.hidden = filtered.length !== 0;

  slice.forEach((p) => grid.appendChild(makeCard(p)));

  loadMoreBtn.hidden = visibleCount >= filtered.length;
}

function makeCard(p) {
  const card = document.createElement('button');
  card.className = 'card';
  card.innerHTML = `
    <span class="card__num num">#${String(p.id).padStart(3, '0')}</span>
    <img class="card__img" src="${p.image.thumbnail}" alt="${p.name.english}" loading="lazy">
    <p class="card__name">${p.name.english}</p>
    <div class="card__types">
      ${p.type.map((t) => badge(t)).join('')}
    </div>
  `;
  card.addEventListener('click', () => openDetail(p));
  return card;
}

function badge(type) {
  return `<span class="badge" style="background:${typeColor(type)}">${type}</span>`;
}

// ---------- detail panel ----------
function openDetail(p) {
  detailContent.innerHTML = detailMarkup(p);
  detailPanel.dataset.open = 'true';
  detailPanel.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // wire evolution links
  detailContent.querySelectorAll('[data-evo-id]').forEach((el) => {
    el.addEventListener('click', () => {
      const target = allPokemon.find((x) => String(x.id) === el.dataset.evoId);
      if (target) openDetail(target);
    });
  });
}

function closeDetail() {
  detailPanel.dataset.open = 'false';
  detailPanel.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

detailScrim.addEventListener('click', closeDetail);
detailClose.addEventListener('click', closeDetail);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeDetail();
});

function statLabel(key) {
  const map = {
    HP: 'PS',
    Attack: 'Ataque',
    Defense: 'Defensa',
    'Sp. Attack': 'At. Esp.',
    'Sp. Defense': 'Def. Esp.',
    Speed: 'Velocidad',
  };
  return map[key] || key;
}

function detailMarkup(p) {
  const mainType = p.type[0];
  const statsHtml = Object.entries(p.base)
    .map(([key, val]) => {
      const pct = Math.min(100, (val / 200) * 100);
      return `
        <div class="stat-row">
          <span>${statLabel(key)}</span>
          <span class="stat-track"><span class="stat-fill" style="width:${pct}%;background:${typeColor(mainType)}"></span></span>
          <span class="num">${val}</span>
        </div>`;
    })
    .join('');

  const abilitiesHtml = (p.profile.ability || [])
    .map(
      ([name, hidden]) =>
        `<span class="ability-pill${hidden === 'true' ? ' hidden-ability' : ''}">${name}${hidden === 'true' ? ' (oculta)' : ''}</span>`
    )
    .join('');

  const evoHtml = buildEvolutionLine(p);

  return `
    <p class="d-num num">#${String(p.id).padStart(3, '0')}</p>
    <h2 class="d-name" id="detailName">${p.name.english}</h2>
    <p class="d-species">${p.species}</p>
    <img class="d-img" src="${p.image.hires || p.image.sprite}" alt="${p.name.english}">
    <div class="d-types">${p.type.map(badge).join('')}</div>

    <p class="d-desc">${p.description}</p>

    <p class="d-section-title">Estadísticas base</p>
    ${statsHtml}

    <div class="d-meta">
      <div><span>Altura</span>${p.profile.height}</div>
      <div><span>Peso</span>${p.profile.weight}</div>
    </div>

    <p class="d-section-title">Habilidades</p>
    <div class="d-abilities">${abilitiesHtml || '<span class="ability-pill">—</span>'}</div>

    ${evoHtml}
  `;
}

function buildEvolutionLine(p) {
  const prev = p.evolution && p.evolution.prev;
  const next = p.evolution && p.evolution.next;
  if (!prev && !next) return '';

  let html = '<p class="d-section-title">Evolución</p>';

  if (prev) {
    const [id, condition] = prev;
    const mon = allPokemon.find((x) => String(x.id) === String(id));
    if (mon) {
      html += `
        <div class="evo-row">
          <button class="evo-link" data-evo-id="${mon.id}">
            <img src="${mon.image.thumbnail}" alt="${mon.name.english}">
            <span>${mon.name.english}</span>
          </button>
          <span class="evo-condition">→ ${condition}</span>
        </div>`;
    }
  }

  if (next) {
    next.forEach(([id, condition]) => {
      const mon = allPokemon.find((x) => String(x.id) === String(id));
      if (!mon) return;
      html += `
        <div class="evo-row">
          <span class="evo-condition">${condition} →</span>
          <button class="evo-link" data-evo-id="${mon.id}">
            <img src="${mon.image.thumbnail}" alt="${mon.name.english}">
            <span>${mon.name.english}</span>
          </button>
        </div>`;
    });
  }

  return html;
}

// ---------- events ----------
searchInput.addEventListener('input', (e) => {
  searchTerm = e.target.value;
  visibleCount = PAGE_SIZE;
  render();
});

loadMoreBtn.addEventListener('click', () => {
  visibleCount += PAGE_SIZE;
  render();
});

init();
