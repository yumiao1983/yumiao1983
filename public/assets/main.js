/* TravelNDC landing page interactions: expandable product panels, scroll reveals and mobile navigation. */
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.menu-toggle');
  toggle?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.textContent = isOpen ? '×' : '☰';
  });
  document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open'); toggle?.setAttribute('aria-expanded', 'false'); if (toggle) toggle.textContent = '☰';
  }));

  const screenCopy = {
    offers: ['Offer studio', 'Shanghai <span>→</span> Copenhagen', 'Suggested journey'],
    service: ['Service desk', 'Change made simple', 'Passenger request'],
    insights: ['Demand lens', 'Where the journey grows', 'Revenue opportunity'],
    content: ['Content studio', 'A story worth booking', 'Destination campaign']
  };
  document.querySelectorAll('.feature').forEach(item => item.addEventListener('click', () => {
    document.querySelectorAll('.feature').forEach(feature => { feature.classList.remove('active'); feature.querySelector('i').textContent = '+'; });
    item.classList.add('active'); item.querySelector('i').textContent = '−';
    const copy = screenCopy[item.dataset.screen];
    if (copy) {
      document.querySelector('.mock-nav span:nth-child(2)').textContent = copy[0];
      document.querySelector('.mock-title h3').innerHTML = copy[1];
      document.querySelector('.mock-title p').textContent = copy[2];
    }
  }));

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

  // Individually supplied airline logos, rendered in equal display boxes.
  const airlinePartners = [
    ['Singapore Airlines','singapore'], ['Cathay Pacific','cathay'], ['Qatar Airways','qatar'], ['Etihad Airways','etihad'], ['Emirates','emirates'], ['Finnair','finnair'],
    ['Lufthansa','lufthansa'], ['Austrian Airlines','austrian'], ['Brussels Airlines','brussels'], ['Swiss','swiss'], ['Air France','air-france'],
    ['British Airways','british-airways'], ['United Airlines','united'], ['American Airlines','american'], ['Alaska Airlines','alaska'], ['Turkish Airlines','turkish'], ['KLM','klm'],
    ['Vueling','vueling'], ['Scoot','scoot'], ['Iberia','iberia'], ['Ethiopian Airlines','ethiopian'], ['Airlink','airlink'], ['EVA Air','eva'],
    ['Air China','air-china'], ['China Eastern Airlines','china-eastern'], ['China Southern Airlines','china-southern'], ['XiamenAir','xiamenair'], ['Spring Airlines','spring'],
    ['Air Macau','air-macau'], ['Juneyao Air','juneyao'], ['Shenzhen Airlines','shenzhen'], ['Hebei Airlines','hebei'], ['9 Air','9air']
  ];
  const logoTrack = document.querySelector('.logo-wall-track');
  if (logoTrack) {
    [...airlinePartners, ...airlinePartners].forEach(([name, filename], index) => {
      const logo = document.createElement('img');
      logo.className = 'airline-logo';
      logo.src = `assets/airlines/${filename}.png`;
      logo.setAttribute('role', 'listitem');
      logo.alt = name;
      if (index >= airlinePartners.length) logo.setAttribute('aria-hidden', 'true');
      logoTrack.appendChild(logo);
    });
  }

  document.querySelector('.prompt')?.addEventListener('submit', event => {
    event.preventDefault();
    const input = event.currentTarget.querySelector('input');
    if (input.value.trim()) { input.value = ''; input.placeholder = 'Your journey is being shaped…'; }
  });
});
