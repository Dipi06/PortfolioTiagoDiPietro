(function(){
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('contact-feedback');
  const submissionsEl = document.getElementById('submissions');
  const storageKey = 'portfolio_contacts_v1';

  if(!form) return;

  function getStored(){
    try{
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : [];
    }catch(e){
      return [];
    }
  }

  function store(contact){
    const arr = getStored();
    arr.push(contact);
    try{ localStorage.setItem(storageKey, JSON.stringify(arr)); }catch(e){console.warn('no se pudo guardar en localStorage', e)}
  }

  //esc sencillo para evitar inyeccion al insertar datos
  function escapeHtml(str){
    if(!str) return '';
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
  }

  function renderSubmission(contact){
    if(!submissionsEl) return;
    const card = document.createElement('div');
    card.className = 'submission-card';

    const when = new Date(contact.createdAt).toLocaleString();

    submissionsEl.insertBefore(card, submissionsEl.firstChild);
  }

  //renderizar envios almacenados al cargar
  (function initRender(){
    const stored = getStored();
    if(stored && stored.length && submissionsEl){
      stored.slice().reverse().forEach(renderSubmission);
    }
  })();

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const nombre = (form.querySelector('#nombre') && form.querySelector('#nombre').value || '').trim();
    const email = (form.querySelector('#email') && form.querySelector('#email').value || '').trim();
    const telefono = (form.querySelector('#telefono') && form.querySelector('#telefono').value || '').trim();

    //validacion
    if(!nombre){
      alert('Por favor ingresa tu nombre.');
      return;
    }
    if(!email){
      alert('Por favor ingresa tu email.');
      return;
    }

    const contact = { nombre, email, telefono, createdAt: new Date().toISOString() };

    //guardar
    store(contact);

    //alerta
    alert('Gracias por tu contacto, ' + nombre + '!');

    //mensaje en DOM
    if(feedback){
      feedback.textContent = 'Gracias por tu contacto, ' + nombre + '. Tus datos se han recibido.';
      setTimeout(()=>{ feedback.textContent = ''; }, 6000);
    }

    //mostrar los datos en la lista
    renderSubmission(contact);

    //limpiar form
    form.reset();
  });
})();