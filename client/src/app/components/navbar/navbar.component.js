window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 200) {
      navbar.classList.add('fixed');
  } else {
      navbar.classList.remove('fixed');
  }
});
