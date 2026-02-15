const THEME_KEY = 'prefs_theme';
const LIST_KEY = 'prefs_list';

let items = [];

function saveTheme(theme){
  localStorage.setItem(THEME_KEY, theme);
}

function saveList(){
  localStorage.setItem(LIST_KEY, JSON.stringify(items));
}

function applyTheme(theme){
  document.documentElement.setAttribute('data-theme', theme);
}

function renderList(){
  const ul = document.getElementById('itemsList');
  ul.innerHTML = '';
  items.forEach((it, idx)=>{
    const li = document.createElement('li');
    li.textContent = it;
    ul.appendChild(li);
  });
}

function addItemFromInput(){
  const input = document.getElementById('newItem');
  const val = input.value.trim();
  if(!val) return;
  items.push(val);
  input.value = '';
  saveList();
  renderList();
}

document.addEventListener('DOMContentLoaded', ()=>{
  // init theme
  const select = document.getElementById('themeSelect');
  const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
  select.value = savedTheme;
  applyTheme(savedTheme);

  select.addEventListener('change', (e)=>{
    const t = e.target.value;
    applyTheme(t);
    saveTheme(t);
  });

  // init list
  items = JSON.parse(localStorage.getItem(LIST_KEY) || '[]');
  renderList();

  document.getElementById('addBtn').addEventListener('click', ()=>{
    addItemFromInput();
  });

  document.getElementById('newItem').addEventListener('keydown', (e)=>{
    if(e.key === 'Enter') addItemFromInput();
  });
});
