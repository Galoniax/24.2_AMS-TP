function loadComponent(componentName, targetId) {
  const componentUrl = `/src/app/components/${componentName}/${componentName}.component.html`;

  fetch(componentUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('La respuesta de la red no fue correcta');
      }
      return response.text();
    })
    .then(data => {
      document.getElementById(targetId).innerHTML = data;
      loadComponentScripts(componentName);
    })
    .catch(error => console.error('Error al cargar el componente:', error));
}

function loadComponentScripts(componentName) {
  const script = document.createElement('script');
  const scriptUrl = `/src/app/components/${componentName}/${componentName}.component.js`;
  script.src = scriptUrl;

  script.onload = () => {
    console.log(`${componentName} script cargado.`);
  };
  script.onerror = () => {
    console.error(`Error al cargar el script de ${componentName}.`);
  };

  document.body.appendChild(script);
}
