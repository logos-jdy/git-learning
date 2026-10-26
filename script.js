// 체크 상태는 현재 브라우저에 저장됩니다.
const STORAGE_KEY = 'qa-checklist-completed';
const checkboxes = [...document.querySelectorAll('#checklist input[type="checkbox"]')];
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const resetButton = document.getElementById('reset-button');

function loadCompleted() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function updateProgress() {
  const completed = checkboxes.filter(checkbox => checkbox.checked);
  progressBar.value = completed.length;
  progressText.textContent = `${completed.length} / ${checkboxes.length} 완료`;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(completed.map(item => item.dataset.task)));
}

const savedTasks = loadCompleted();
checkboxes.forEach(checkbox => {
  checkbox.checked = savedTasks.includes(checkbox.dataset.task);
  checkbox.addEventListener('change', updateProgress);
});
resetButton.addEventListener('click', () => {
  checkboxes.forEach(checkbox => { checkbox.checked = false; });
  updateProgress();
});
updateProgress();
