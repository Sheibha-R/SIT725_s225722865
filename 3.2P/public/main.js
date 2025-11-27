// main.js
// Fetch events from /api/events and render Materialize cards

document.addEventListener('DOMContentLoaded', () => {
  const eventsRow = document.getElementById('events-row');
  const errorMsg = document.getElementById('error-msg');

  // Helper to create one event card
  function createEventCard(event) {
    const col = document.createElement('div');
    col.className = 'col s12 m6 l4';

    const card = document.createElement('div');
    card.className = 'card medium';

    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';

    const title = document.createElement('span');
    title.className = 'card-title';
    title.textContent = event.name;

    const date = document.createElement('p');
    date.innerHTML = `<i class="material-icons tiny">date_range</i> ${event.date}`;

    const location = document.createElement('p');
    location.innerHTML = `<i class="material-icons tiny">place</i> ${event.location}`;

    const desc = document.createElement('p');
    desc.className = 'grey-text text-darken-1';
    desc.textContent = event.description;

    cardContent.appendChild(title);
    cardContent.appendChild(date);
    cardContent.appendChild(location);
    cardContent.appendChild(document.createElement('br'));
    cardContent.appendChild(desc);

    card.appendChild(cardContent);
    col.appendChild(card);

    return col;
  }

  // Fetch events from the server
  fetch('/api/events')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((events) => {
      eventsRow.innerHTML = ''; // clear content

      events.forEach((event) => {
        const card = createEventCard(event);
        eventsRow.appendChild(card);
      });
    })
    .catch((error) => {
      console.error('Error fetching events:', error);
      errorMsg.style.display = 'block';
    });
});
