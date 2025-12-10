// public/main.js
// Fetch events from /api/events and render Materialize cards
// with images, live search, and a simple "favourite" toggle.

let allEvents = [];

document.addEventListener('DOMContentLoaded', () => {
  const eventsRow = document.getElementById('events-row');
  const errorMsg = document.getElementById('error-msg');
  const searchInput = document.getElementById('search');

  // Helper to render a list of events as cards
  function renderEvents(events) {
    eventsRow.innerHTML = '';

    if (!events || events.length === 0) {
      const noResult = document.createElement('p');
      noResult.className = 'center-align grey-text text-darken-1';
      noResult.textContent = 'No events match your search.';
      eventsRow.appendChild(noResult);
      return;
    }

    events.forEach((event) => {
      const col = document.createElement('div');
      col.className = 'col s12 m6 l4';

      col.innerHTML = `
        <div class="card medium event-card hoverable">
          <div class="card-image">
            <img src="${event.imageUrl}" alt="${event.name}">
            <span class="card-title event-card-title">${event.name}</span>
            <a class="btn-floating halfway-fab waves-effect waves-light red favourite-btn" title="Mark as favourite">
              <i class="material-icons">favorite_border</i>
            </a>
          </div>
          <div class="card-content">
            <p>
              <i class="material-icons tiny">date_range</i>
              ${event.date}
            </p>
            <p>
              <i class="material-icons tiny">place</i>
              ${event.location}
            </p>
            <p class="grey-text text-darken-1">
              ${event.description}
            </p>
          </div>
        </div>
      `;

      const card = col.querySelector('.event-card');
      const favBtn = col.querySelector('.favourite-btn');
      const favIcon = favBtn.querySelector('i');

      // Toggle favourite state (simple front-end interaction)
      favBtn.addEventListener('click', () => {
        card.classList.toggle('favourite');
        favIcon.textContent = card.classList.contains('favourite')
          ? 'favorite'
          : 'favorite_border';
      });

      eventsRow.appendChild(col);
    });
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
      allEvents = events || [];
      renderEvents(allEvents);
    })
    .catch((error) => {
      console.error('Error fetching events:', error);
      errorMsg.style.display = 'block';
    });

  // Live search: filter by name or location
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const term = searchInput.value.toLowerCase().trim();

      if (!term) {
        // Empty search -> show all events
        renderEvents(allEvents);
        return;
      }

      const filtered = allEvents.filter((event) => {
        const nameMatch = event.name.toLowerCase().includes(term);
        const locationMatch = event.location.toLowerCase().includes(term);
        return nameMatch || locationMatch;
      });

      renderEvents(filtered);
    });
  }
});
