// Elemental Synthesis Lab - Game Logic

const ELEMENTS = [
  {id:1, name:'Hydrogen', symbol:'H', price:50, radioactive:false, atomicNum:1, difficulty:1},
  {id:2, name:'Helium', symbol:'He', price:80, radioactive:false, atomicNum:2, difficulty:2},
  {id:3, name:'Lithium', symbol:'Li', price:120, radioactive:false, atomicNum:3, difficulty:3},
  {id:4, name:'Beryllium', symbol:'Be', price:150, radioactive:false, atomicNum:4, difficulty:3},
  {id:5, name:'Boron', symbol:'B', price:180, radioactive:false, atomicNum:5, difficulty:4},
  {id:6, name:'Carbon', symbol:'C', price:200, radioactive:false, atomicNum:6, difficulty:4},
  {id:7, name:'Nitrogen', symbol:'N', price:220, radioactive:false, atomicNum:7, difficulty:5},
  {id:8, name:'Oxygen', symbol:'O', price:240, radioactive:false, atomicNum:8, difficulty:5},
  {id:26, name:'Iron', symbol:'Fe', price:500, radioactive:false, atomicNum:26, difficulty:8},
  {id:29, name:'Copper', symbol:'Cu', price:600, radioactive:false, atomicNum:29, difficulty:9},
  {id:79, name:'Gold', symbol:'Au', price:2000, radioactive:false, atomicNum:79, difficulty:15},
  {id:92, name:'Uranium', symbol:'U', price:5000, radioactive:true, atomicNum:92, difficulty:20}
];

const LAB_PROJECTS = [
  {id:1, name:'Water Lighter', desc:'Combine H + O', elements:['H','O'], reward:100, icon:'💧'},
  {id:2, name:'Iron Hammer', desc:'Synthesize Fe', elements:['Fe'], reward:300, icon:'⚒️'},
  {id:3, name:'Golden Ring', desc:'Create Au compound', elements:['Au'], reward:1000, icon:'💍'}
];

const REACTIONS = {
  'H+O': {product:'H2O', name:'Water', reward:150},
  'C+O': {product:'CO2', name:'Carbon Dioxide', reward:200},
  'H+N': {product:'NH3', name:'Ammonia', reward:180},
  'He+He': {product:'He2', name:'Helium Compound', reward:300}
};

let gameState = {
  credits: 1000,
  score: 0,
  inventory: {H: 0, He: 0, Li: 0, Be: 0, B: 0, C: 0, N: 0, O: 0, Fe: 0, Cu: 0, Au: 0, U: 0},
  achievements: [],
  completedProjects: [],
  mergedSlots: {1: null, 2: null}
};

function initGame() {
  renderStore();
  renderAchievements();
  renderLabProjects();
  updateUI();
}

function buyElement(elementId) {
  const el = ELEMENTS.find(e => e.id === elementId);
  if(gameState.credits >= el.price) {
    gameState.credits -= el.price;
    gameState.inventory[el.symbol]++;
    gameState.score += el.difficulty * 10;
    updateUI();
    checkAchievements(el);
    alert(`✓ Bought ${el.name}!`);
  } else {
    alert('Not enough credits!');
  }
}

function renderStore() {
  const grid = document.getElementById('storeGrid');
  grid.innerHTML = '';
  ELEMENTS.forEach(el => {
    const card = document.createElement('div');
    card.className = 'element-card';
    card.onclick = () => buyElement(el.id);
    card.innerHTML = `
      <div class="element-symbol">${el.symbol}</div>
      <div class="element-name">${el.name}</div>
      <div class="element-price">${el.price} ⭐</div>
    `;
    grid.appendChild(card);
  });
}

function 84
  (slotNum) {
  const symbols = Object.keys(gameState.inventory).filter(s => gameState.inventory[s] > 0);
  if(symbols.length === 0) {
    alert('No elements in inventory!');
    return;
  }
  const symbol = prompt(`Available: ${symbols.join(', ')}\nEnter element symbol:`);
   if(!symbol) return;
   symbol = symbol.toUpperCase();147
  
    gameState.mergedSlots[slotNum] = symbol;
    const slot = document.getElementById(`slot${slotNum}`);
    slot.textContent = symbol;
    slot.classList.add('filled');
  }
}

function performMerge() {
  const {1: el1, 2: el2} = gameState.mergedSlots;
  if(!el1 || !el2) {
    alert('Select two elements!');
    return;
  }
  
  gameState.inventory[el1]--;
  gameState.inventory[el2]--;
  
  const key = `${el1}+${el2}` in REACTIONS ? `${el1}+${el2}` : `${el2}+${el1}`;
  const reaction = REACTIONS[key];
  
  const resultDiv = document.getElementById('mergeResult');
  if(reaction) {
    gameState.credits += reaction.reward;
    gameState.score += reaction.reward / 2;
    resultDiv.innerHTML = `✓ Success! Created <strong>${reaction.name}</strong>! +${reaction.reward} credits`;
    resultDiv.style.color = '#00ff00';
  } else {
    resultDiv.innerHTML = `✗ No reaction occurred.`;
    resultDiv.style.color = '#ff6b6b';
  }
  resultDiv.style.display = 'block';
  gameState.mergedSlots = {1: null, 2: null};
  document.getElementById('slot1').textContent = 'Select Element 1';
  document.getElementById('slot2').textContent = 'Select Element 2';
  document.getElementById('slot1').classList.remove('filled');
  document.getElementById('slot2').classList.remove('filled');
  updateUI();
}

function renderLabProjects() {
  const container = document.getElementById('labProjects');
  container.innerHTML = '';
  LAB_PROJECTS.forEach(proj => {
    const completed = gameState.completedProjects.includes(proj.id);
    const card = document.createElement('div');
    card.className = 'achievement';
    card.innerHTML = `
      <div class="achievement-name">${proj.icon} ${proj.name}</div>
      <div class="achievement-desc">${proj.desc}</div>
      <div class="achievement-desc" style="margin-top:10px;">Reward: ${proj.reward} ⭐</div>
      <button onclick="147
      ${proj.id})" style="margin-top:10px; padding:8px 15px; background:#00d4ff; border:none; color:#000; border-radius:5px; cursor:pointer;" ${completed ? 'disabled' : ''}>
        ${completed ? '✓ Completed' : 'Complete Project'}
      </button>
    `;
    container.appendChild(card);
  });
}

function completeProject(projId) {
  const proj = LAB_PROJECTS.find(p => p.id === projId);
   if(!proj) { alert('Project not found!'); return; }
  const hasElements = proj.elements.every(el => gameState.inventory[el] > 0);
  if(hasElements && !gameState.completedProjects.includes(projId)) {
    proj.elements.forEach(el => gameState.inventory[el]--);
    gameState.completedProjects.push(projId);
    gameState.credits += proj.reward;
    gameState.score += proj.reward;
    renderLabProjects();
    updateUI();
    alert(`✓ Project Complete! +${proj.reward} credits!`);
  } else {
    alert('You need: ' + proj.elements.join(', '));
  }
}

function checkAchievements(el) {
  const achievementId = `elem_${el.id}`;
  if(!gameState.achievements.includes(achievementId)) {
    gameState.achievements.push(achievementId);
    gameState.score += el.difficulty * 50;
    let type = 'Basic';
    if(el.radioactive) type = '⚠️ Radioactive';
    else if(el.atomicNum > 50) type = '🏆 Heavy';
    alert(`Achievement Unlocked! ${type} Element: ${el.name}`);
  }
}

function renderAchievements() {
  const container = document.getElementById('achievementsList');
  container.innerHTML = '';
  const unlockedElements = ELEMENTS.filter(el => gameState.achievements.includes(`elem_${el.id}`));
  if(unlockedElements.length === 0) {
    container.innerHTML = '<div style="color:#ffaa00;">Buy elements to unlock achievements!</div>';
    return;
  }
  unlockedElements.forEach(el => {
    const ach = document.createElement('div');
    ach.className = 'achievement';
    ach.innerHTML = `
      <div class="achievement-name">${el.symbol} - ${el.name}</div>
      <div class="achievement-desc">Atomic #${el.atomicNum} | Difficulty: ${'⭐'.repeat(Math.min(el.difficulty, 5))}</div>
      <div class="achievement-desc">Type: ${el.radioactive ? '⚠️ Radioactive' : '✓ Stable'}</div>
    `;
    container.appendChild(ach);
  });
}

function renderInventory() {
  const container = document.getElementById('inventoryList');
  container.innerHTML = '';
  Object.entries(gameState.inventory).forEach(([symbol, count]) => {
    if(count > 0) {
      const el = ELEMENTS.find(e => e.symbol === symbol);
      const item = document.createElement('div');
      item.className = 'inventory-item';
      item.innerHTML = `<span>${el.name} (${symbol})</span><span style="font-weight:bold;">×${count}</span>`;
      container.appendChild(item);
    }
  });
  if(Object.values(gameState.inventory).every(v => v === 0)) {
    container.innerHTML = '<div style="color:#ffaa00;">Empty inventory. Buy elements from the store!</div>';
  }
}

215
  (screenName) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenName).classList.add('active');
  document.querySelectorAll('.menu-button').forEach(b => b.classList.remove('active'));
 if(event && event.target) event.target.classList.add('active');
  
  if(screenName === 'inventory') renderInventory();
  else if(screenName === 'achievements') renderAchievements();
}

function updateUI() {
  document.getElementById('credits').textContent = gameState.credits;
  document.getElementById('score').textContent = gameState.score;
}

window.addEventListener('DOMContentLoaded', initGame);
