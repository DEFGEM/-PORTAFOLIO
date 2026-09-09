// Portafolio Cristopher Muñoz — interacciones
const roles = ['Ciberseguridad', 'Inteligencia Artificial', 'Desarrollo Full-Stack', 'TI & Soporte'];
let ri = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed');
function typeLoop() {
  const word = roles[ri];
  typedEl.textContent = word.slice(0, ci);
  if (!deleting) {
    if (ci < word.length) { ci++; setTimeout(typeLoop, 65); }
    else { deleting = true; setTimeout(typeLoop, 1600); }
  } else {
    if (ci > 0) { ci--; setTimeout(typeLoop, 35); }
    else { deleting = false; ri = (ri + 1) % roles.length; setTimeout(typeLoop, 300); }
  }
}
typeLoop();

// Menú móvil
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Filtros de proyectos
const filterBtns = document.querySelectorAll('#filters button');
const projects = document.querySelectorAll('.project');
filterBtns.forEach(btn => btn.addEventListener('click', () => {
  filterBtns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const f = btn.dataset.filter;
  projects.forEach(p => {
    const show = f === 'all' || (p.dataset.tags || '').includes(f);
    p.style.display = show ? 'flex' : 'none';
  });
}));

// Año
document.getElementById('year').textContent = new Date().getFullYear();

// Formulario -> mailto
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const subject = encodeURIComponent('Contacto portafolio — ' + fd.get('nombre'));
  const body = encodeURIComponent(fd.get('mensaje') + '\n\n— ' + fd.get('nombre') + ' (' + fd.get('email') + ')');
  window.location.href = `mailto:cristophermp3g@gmail.com?subject=${subject}&body=${body}`;
});

// Copiar email
document.getElementById('copyEmail').addEventListener('click', async (e) => {
  try {
    await navigator.clipboard.writeText('cristophermp3g@gmail.com');
    e.currentTarget.innerHTML = '<i class="fa-solid fa-check"></i> ¡Copiado!';
    setTimeout(() => e.currentTarget.innerHTML = '<i class="fa-solid fa-copy"></i> Copiar email', 2000);
  } catch { alert('Email: cristophermp3g@gmail.com'); }
});
