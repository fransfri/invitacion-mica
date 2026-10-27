const invitation = window.INVITATION;

document.querySelectorAll('[data-event-date]').forEach((element) => { element.textContent = invitation.date; });
document.querySelectorAll('[data-event-time]').forEach((element) => { element.textContent = invitation.time; });
document.querySelectorAll('[data-event-venue]').forEach((element) => {
  element.textContent = invitation.venue;
  if (invitation.venueUrl) {
    element.href = invitation.venueUrl;
    element.target = '_blank';
    element.rel = 'noopener noreferrer';
  }
});
document.querySelectorAll('[data-event-address]').forEach((element) => { element.textContent = invitation.address; });
document.querySelectorAll('[data-event-note]').forEach((element) => { element.textContent = invitation.note; });
document.querySelectorAll('[data-event-deadline]').forEach((element) => { element.textContent = invitation.deadline; });
document.querySelectorAll('[data-celebrant]').forEach((element) => { element.textContent = invitation.celebrant; });
document.title = `El cumple de ${invitation.celebrant}`;

const menuLinks = [...document.querySelectorAll('.camera-nav a')];
const sections = menuLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    menuLinks.forEach((link) => {
      if (link.getAttribute('href') === `#${entry.target.id}`) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach((section) => sectionObserver.observe(section));

const form = document.querySelector('#rsvp-form');
const status = document.querySelector('#form-status');
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  status.removeAttribute('data-state');

  if (!invitation.rsvpEndpoint) {
    status.dataset.state = 'error';
    status.textContent = 'El formulario esta listo, pero falta conectar la planilla. Revisa README.md.';
    return;
  }

  submitButton.disabled = true;
  submitButton.querySelector('span').textContent = 'Enviando...';
  status.textContent = '';

  try {
    const formData = new FormData(form);
    const responseData = new URLSearchParams();
    for (const [key, value] of formData.entries()) responseData.set(key, value.toString());
    responseData.set('submittedAt', new Date().toISOString());
    await fetch(invitation.rsvpEndpoint, { method: 'POST', mode: 'no-cors', body: responseData });
    status.dataset.state = 'success';
    status.textContent = 'Gracias, tu respuesta fue enviada. Nos vemos en la fiesta.';
    form.reset();
  } catch {
    status.dataset.state = 'error';
    status.textContent = 'No se pudo enviar. Revisa tu conexion e intenta de nuevo.';
  } finally {
    submitButton.disabled = false;
    submitButton.querySelector('span').textContent = 'Confirmar asistencia';
  }
});