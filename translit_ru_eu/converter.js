const upper = 'АБВГДЕЁЖЗИКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
const lower = 'абвгдеёжзиклмнопрстуфхцчшщъыьэюя';
const upperValues = ['A', '6', 'B', 'r', 'D', 'E', 'E', ')I(', '3', 'u', 'K', 'Jl', 'M', 'H', 'O', 'n', 'p', 'C', 'T', 'Y', 'F', 'X', 'u', '4', 'W', 'W', '', 'bl', 'b', 'E', 'I-O', '9l'];
const lowerValues = ['a', '6', 'B', 'r', 'g', 'e', 'e', ')l(', '3', 'u', 'k', 'Jl', 'm', 'H', 'o', 'n', 'p', 'c', 'T', 'y', 'f', 'x', 'u', '4', 'w', 'w', '', 'bl', 'b', 'e', 'l-o', '9l'];
const replacements = new Map([...Array.from(upper, (letter, i) => [letter, upperValues[i]]), ...Array.from(lower, (letter, i) => [letter, lowerValues[i]])]);

function convert(text) {
  return Array.from(text, letter => replacements.has(letter) ? replacements.get(letter) : letter).join('');
}

if (typeof document !== 'undefined') {
  const table = document.getElementById('mapping');
  for (const row of [Array.from(upper), upperValues, Array.from(lower), lowerValues]) {
    const tr = table.insertRow();
    for (const value of row) tr.insertCell().textContent = value;
  }
  const input = document.getElementById('text');
  const result = document.getElementById('result');
  document.getElementById('form').addEventListener('submit', event => {
    event.preventDefault();
    result.value = convert(input.value);
  });
  result.addEventListener('focus', () => result.select());
  document.getElementById('copy').addEventListener('click', async () => {
    const status = document.getElementById('copy-status');
    if (!result.value) {
      status.textContent = 'Нет результата для копирования';
      return;
    }
    try {
      await navigator.clipboard.writeText(result.value);
      status.textContent = 'Скопировано';
    } catch {
      result.select();
      status.textContent = 'Не удалось скопировать. Нажмите Ctrl+C';
    }
  });
  input.addEventListener('input', () => { document.getElementById('copy-status').textContent = ''; });
  input.value = new URLSearchParams(location.search).get('text') || '';
  result.value = convert(input.value);
}

if (typeof module !== 'undefined') module.exports = { convert };
