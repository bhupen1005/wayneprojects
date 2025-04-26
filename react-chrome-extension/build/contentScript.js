// contentScript.js
window.addEventListener('mouseup', () => {
  const selection = window.getSelection();
  const text = selection?.toString().trim();
  if (text) {
    const range = selection.getRangeAt(0);
    const span = document.createElement('span');
    span.style.backgroundColor = 'yellow';
    span.style.cursor = 'pointer';
    range.surroundContents(span);

    chrome.storage.local.get('highlights', (data) => {
      const existing = data.highlights || [];
      chrome.storage.local.set({
        highlights: [...existing, text]
      });
    });
  }
});
