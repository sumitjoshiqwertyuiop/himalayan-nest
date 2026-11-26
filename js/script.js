/* Himalayan Nest – interactions. Content data lives at the top so it is easy to edit. */
'use strict';

/* ---------- Data ---------- */
const TBC = 'Distance to be confirmed';
const rooms = [
  { id:'deluxe', name:'Deluxe Mountain View Room', img:'room-deluxe', guests:2, price:'₹2,500', amenities:['Mountain view','Wi-Fi','Hot water','Balcony'],
    text:'A bright room with a balcony facing the hills.', more:'Queen bed, private bathroom and a seating nook for morning tea.' },
  { id:'family', name:'Family Room', img:'room-family', guests:4, price:'₹3,800', amenities:['2 beds','Wi-Fi','Hot water','Garden access'],
    text:'Spacious room for families, close to the garden.', more:'Two double beds, extra bedding on request and room for luggage.' },
  { id:'kumaoni', name:'Traditional Kumaoni Stay', img:'room-kumaoni', guests:3, price:'₹2,200', amenities:['Local décor','Home meals','Hot water','Courtyard'],
    text:'Stone-and-wood style room inspired by Kumaoni village homes.', more:'Warm wooden interiors and a courtyard for evening conversation.' }
];
const facilities = [['📶','Free Wi-Fi','Reliable connection for guests'],['🚗','Parking','Space for cars on site'],['🏔️','Mountain View','Ridge views from the property'],['🍲','Home-cooked Food','Fresh Kumaoni meals'],
  ['🚿','Hot Water','Available in all rooms'],['🛏️','Comfortable Rooms','Clean, quiet and warm'],['🌿','Garden Area','Space to sit and unwind'],['🧭','Local Travel Assistance','Help planning day trips']];
const places = [
  { name:'Dunagiri Temple', img:'dunagiri', dist:'Approx. 15 km', time:'To be confirmed', q:'Dunagiri Temple, Dwarahat',
    intro:'Hilltop shrine to the goddess Durga in the form of Dunagiri Devi.', sig:'One of Uttarakhand’s well-known Shakti shrines, set among forested ridges with wide Himalayan views.' },
  { name:'Pandukholi', img:'pandukholi', dist:TBC, time:'To be confirmed', q:'Pandukholi, Dwarahat',
    intro:'A quiet forest area known for its peaceful meadows and oak-deodar woods.', sig:'Local tradition links the place with the Pandavas of the Mahabharata; it is also valued as a calm place for meditation.' },
  { name:'Kukuchina', img:'kukuchina', dist:TBC, time:'To be confirmed', q:'Kukuchina, Dwarahat',
    intro:'A scenic hill spot near Dwarahat, popular for nature and views.', sig:'Natural landscape interest. Please confirm access and facilities locally.' },
  { name:'Dwarahat Ancient Temples', img:'dwarahat-temples', dist:'In Dwarahat town', time:'Local visit', q:'Dwarahat temples, Almora',
    intro:'A cluster of old stone temples in Dwarahat itself.', sig:'Built in the Katyuri period (roughly 9th–13th century), they show the early Kumaoni temple style.' },
  { name:'Jageshwar Dham', img:'jageshwar', dist:TBC, time:'To be confirmed', q:'Jageshwar Dham, Almora',
    intro:'A valley of ancient stone temples among deodar forest, dedicated mainly to Shiva.', sig:'A major pilgrimage site with temples from roughly the 9th–13th centuries and a notable archaeological heritage.' },
  { name:'Katarmal Sun Temple', img:'katarmal', dist:TBC, time:'To be confirmed', q:'Katarmal Sun Temple, Almora',
    intro:'A medieval temple dedicated to the Sun god, near Almora.', sig:'Traditionally dated to around the 9th century, it is among the few sun temples in India and is known for fine stone carving.' }
];
const gallery = [['exterior','Homestay exterior'],['room-deluxe','Comfortable rooms'],['mountains','Himalayan mountain views'],['food','Kumaoni food'],
  ['village','Local village lifestyle'],['dunagiri','Nearby temples'],['landscape','Natural landscapes'],['katarmal','Heritage temple']];
const img = n => `images/${n}.svg`;
const $ = s => document.querySelector(s);

/* ---------- Render content ---------- */
$('#roomGrid').innerHTML = rooms.map(r => `
  <article class="card reveal"><img src="${img(r.img)}" alt="Illustration of the ${r.name}" loading="lazy">
    <div class="card__b"><h3>${r.name}</h3><p>${r.text}</p>
      <p class="meta"><span>Up to ${r.guests} guests</span><span class="price">${r.price} / night <small>(illustrative)</small></span></p>
      <ul class="chips">${r.amenities.map(a => `<li>${a}</li>`).join('')}</ul>
      <button class="btn btn--green" data-room="${r.id}">View Details</button></div></article>`).join('');
$('#facilityGrid').innerHTML = facilities.map(f => `<div class="fac reveal"><b aria-hidden="true">${f[0]}</b><strong>${f[1]}</strong><span>${f[2]}</span></div>`).join('');
$('#destGrid').innerHTML = places.map(p => `
  <article class="card dest reveal"><img src="${img(p.img)}" alt="Illustration for ${p.name}" loading="lazy">
    <div class="card__b"><button class="dest__t" aria-expanded="false"><h3>${p.name}</h3></button><p>${p.intro}</p>
      <div class="more"><p>${p.sig}</p></div>
      <p class="meta"><span>📍 ${p.dist}</span><span>⏱ ${p.time}</span></p>
      <a class="btn btn--green" target="_blank" rel="noopener" href="https://www.openstreetmap.org/search?query=${encodeURIComponent(p.q)}">Explore Location</a></div></article>`).join('');
$('#galleryGrid').innerHTML = gallery.map((g, i) => `<button data-i="${i}" aria-label="View larger: ${g[1]}"><img src="${img(g[0])}" alt="Illustration: ${g[1]}" loading="lazy"><span>${g[1]}</span></button>`).join('');
rooms.forEach(r => $('#room').insertAdjacentHTML('beforeend', `<option>${r.name}</option>`));
$('#year').textContent = new Date().getFullYear();

/* ---------- Navigation: sticky style, mobile menu, active link ---------- */
const nav = $('#nav'), menu = $('#menu'), burger = $('#burger'), toTop = $('#toTop');
const setMenu = open => { menu.classList.toggle('open', open); burger.setAttribute('aria-expanded', open); };
burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.addEventListener('click', e => { if (e.target.tagName === 'A') setMenu(false); });
const links = [...menu.querySelectorAll('a:not(.btn)')];
const onScroll = () => {
  nav.classList.toggle('solid', scrollY > 40 || menu.classList.contains('open'));
  toTop.hidden = scrollY < 600;
  let cur = '';
  document.querySelectorAll('main section[id]').forEach(s => { if (scrollY + 120 >= s.offsetTop) cur = s.id; });
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
};
addEventListener('scroll', onScroll, { passive: true }); onScroll();
toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

/* ---------- Scroll reveal ---------- */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ---------- Destination cards: tap title to expand ---------- */
document.addEventListener('click', e => {
  const t = e.target.closest('.dest__t');
  if (t) { const c = t.closest('.dest'); const o = c.classList.toggle('open'); t.setAttribute('aria-expanded', o); }
  const rb = e.target.closest('[data-room]');
  if (rb) {
    const r = rooms.find(x => x.id === rb.dataset.room);
    $('#roomBody').innerHTML = `<h3>${r.name}</h3><p>${r.more}</p><p><strong>${r.price} / night</strong> (illustrative price). Sleeps up to ${r.guests}.</p>`;
    $('#roomDialog').showModal();
  }
});

/* ---------- Lightbox ---------- */
const lb = $('#lightbox'); let idx = 0;
const showLb = i => { idx = (i + gallery.length) % gallery.length; $('#lbImg').src = img(gallery[idx][0]); $('#lbImg').alt = gallery[idx][1]; $('#lbCap').textContent = gallery[idx][1]; };
$('#galleryGrid').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { showLb(+b.dataset.i); lb.hidden = false; $('#lbClose').focus(); } });
$('#lbClose').onclick = () => lb.hidden = true;
$('#lbPrev').onclick = () => showLb(idx - 1);
$('#lbNext').onclick = () => showLb(idx + 1);
lb.addEventListener('click', e => { if (e.target === lb) lb.hidden = true; });
addEventListener('keydown', e => {
  if (lb.hidden) return;
  if (e.key === 'Escape') lb.hidden = true; if (e.key === 'ArrowLeft') showLb(idx - 1); if (e.key === 'ArrowRight') showLb(idx + 1);
});

/* ---------- Booking form validation (frontend only) ---------- */
const form = $('#bookForm'), today = new Date().toISOString().split('T')[0];
form.checkin.min = form.checkout.min = today;
const rules = {
  name: v => v.trim().length >= 2 || 'Enter your full name.',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email address.',
  phone: v => /^[+\d][\d\s-]{7,14}$/.test(v.trim()) || 'Enter a valid phone number (8–15 digits).',
  guests: v => (+v >= 1 && +v <= 12) || 'Guests must be between 1 and 12.',
  checkin: v => (v && v >= today) || 'Choose a check-in date from today onwards.',
  checkout: v => (v && v > form.checkin.value) || 'Check-out must be after check-in.',
  room: v => !!v || 'Choose a room.'
};
const check = k => {
  const f = form[k], res = rules[k](f.value), ok = res === true;
  f.classList.toggle('bad', !ok); f.setAttribute('aria-invalid', !ok);
  f.closest('.f').querySelector('.err').textContent = ok ? '' : res; return ok;
};
Object.keys(rules).forEach(k => form[k].addEventListener('blur', () => check(k)));
form.checkin.addEventListener('change', () => { form.checkout.min = form.checkin.value || today; if (form.checkout.value) check('checkout'); });
form.addEventListener('submit', e => {
  e.preventDefault();
  const valid = Object.keys(rules).map(check).every(Boolean);   // run all checks so every error shows
  const msg = $('#formMsg');
  if (!valid) { msg.hidden = true; form.querySelector('.bad')?.focus(); return; }
  // Future backend: send new FormData(form) with fetch('/api/enquiry', { method:'POST', body })
  msg.textContent = `Thank you, ${form.name.value.trim()}. Your enquiry looks complete. This is a demonstration, so no reservation was made and nothing was sent.`;
  msg.hidden = false; form.reset(); form.guests.value = 2;
});
