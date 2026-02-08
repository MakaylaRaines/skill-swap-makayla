document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('click', () => {
    alert('More info about ' + card.querySelector('h3').textContent);
  });
});
