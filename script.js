// script.js

// Fetch skills from API and render them
async function loadSkills() {
  try {
    const skills = await fetchSkills(); // Your API call
    renderSkills(skills);
  } catch (error) {
    console.error('Error loading skills:', error);
  }
}

// Render skills in the UI
function renderSkills(skills) {
  const skillsContainer = document.getElementById('skills-container');
  skillsContainer.innerHTML = ''; // Clear previous entries

  skills.forEach(skill => {
    const skillElement = document.createElement('div');
    skillElement.className = 'skill-card'; // Keep your existing class
    skillElement.innerHTML = `
      <h3>${skill.title}</h3>
      <p>Category: ${skill.category}</p>
      <p>Price: $${skill.price}</p>
      <p>${skill.description}</p>
    `;
    skillsContainer.appendChild(skillElement);
  });

  // Re-add your click listener to dynamically created cards
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('click', () => {
      alert('More info about ' + card.querySelector('h3').textContent);
    });
  });
}

// Handle form submission to create a new skill
const form = document.getElementById('create-skill-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const newSkill = {
    title: formData.get('title'),
    category: formData.get('category'),
    price: Number(formData.get('price')),
    description: formData.get('description')
  };

  try {
    await createSkill(newSkill); // Send to your API
    form.reset();                // Clear the form
    loadSkills();                // Reload skills including the new one
  } catch (error) {
    console.error('Error creating skill:', error);
  }
});

// Load skills on page load
document.addEventListener('DOMContentLoaded', () => {
  loadSkills();
});
