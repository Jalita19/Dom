const menuLinks = [
  { text: 'about', href: '/about' },
  { text: 'catalog', href: '#', subLinks: [
    { text: 'all', href: '/catalog/all' },
    { text: 'top selling', href: '/catalog/top' },
    { text: 'search', href: '/catalog/search' },
  ]},
  { text: 'orders', href: '#', subLinks: [
    { text: 'new', href: '/orders/new' },
    { text: 'pending', href: '/orders/pending' },
    { text: 'history', href: '/orders/history' },
  ]},
  { text: 'account', href: '#', subLinks: [
    { text: 'profile', href: '/account/profile' },
    { text: 'sign out', href: '/account/signout' },
  ]}
];

// Setup main element
const mainEl = document.querySelector('main');
mainEl.style.backgroundColor = 'var(--main-bg)';
mainEl.innerHTML = '<h1>DOM Manipulation</h1>';
mainEl.classList.add('flex-ctr');

// Setup top menu
const topMenuEl = document.querySelector('#top-menu');
topMenuEl.style.height = '100%';
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';
topMenuEl.classList.add('flex-around');

// Add links to top menu
menuLinks.forEach(link => {
  const linkEl = document.createElement('a');
  linkEl.href = link.href;
  linkEl.textContent = link.text;
  topMenuEl.appendChild(linkEl);
});

// Setup sub-menu
const subMenuEl = document.querySelector('#sub-menu');
subMenuEl.style.height = '100%';
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';
subMenuEl.classList.add('flex-around');

// Build sub-menu
const buildSubmenu = (subLinks) => {
  subMenuEl.innerHTML = '';
  subLinks.forEach(sublink => {
    const subLinkEl = document.createElement('a');
    subLinkEl.href = sublink.href;
    subLinkEl.textContent = sublink.text;
    subMenuEl.appendChild(subLinkEl);
  });
};

// Handle top menu clicks
topMenuEl.addEventListener('click', event => {
  event.preventDefault();
  if (event.target.matches('a')) {
    const clickedText = event.target.textContent;
    topMenuEl.querySelectorAll('a').forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');

    const clickedLink = menuLinks.find(link => link.text === clickedText);
    if (clickedLink?.subLinks) {
      subMenuEl.style.top = '0';
      buildSubmenu(clickedLink.subLinks);
    } else {
      subMenuEl.style.top = '-100%';
      subMenuEl.innerHTML = '';
    }
  }// If the ABOUT link is clicked, an <h1>About</h1> should be displayed.
  if (event.target.textContent === "about") {
    mainEl.innerHTML= "<h1>About</h1>";
  }
});

// Handle sub-menu clicks
subMenuEl.addEventListener('click', event => {
  event.preventDefault();
  if (event.target.matches('a')) {
    mainEl.innerHTML = `<h1>${event.target.textContent}</h1>`;
    subMenuEl.style.top = '-100%';
    topMenuEl.querySelectorAll('a').forEach(link => link.classList.remove('active'));
  }
});