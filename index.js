//Part 1
// Select and cache the <main> element in a variable named mainEl.
const mainEl = document.querySelector('main');

// Set the background color of mainEl to the value stored in the --main-bg CSS custom property.
// Hint: Assign a string that uses the CSS var() function like this: 'var(--main-bg)'.
mainEl.style.backgroundColor = 'var(--main-bg)';

// Set the content of mainEl to <h1>DOM Manipulation</h1>. There are a variety of ways to do this; pick whichever one that you think works best in this situation.
mainEl.innerHTML = '<h1>DOM Manipulation</h1>';

// Add a class of flex-ctr to mainEl.
// Hint: Use the Element.classList API.
mainEl.classList.add('flex-ctr');


//Part 2
// Select and cache the <nav id="top-menu"> element in a variable named topMenuEl.
const topMenuEl = document.getElementById('top-menu');

// Set the height of the topMenuEl element to be 100%.
topMenuEl.style.height = '100%'

// Set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property.
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)'

// Add a class of flex-around to topMenuEl.
topMenuEl.classList.add('flex-around')

//Part 3
// Menu data structure
var menuLinks = [
    {text: 'about', href: '/about'},
    {text: 'catalog', href: '#', subLinks: [
      {text: 'all', href: '/catalog/all'},
      {text: 'top selling', href: '/catalog/top'},
      {text: 'search', href: '/catalog/search'},
    ]},
    {text: 'orders', href: '#' , subLinks: [
      {text: 'new', href: '/orders/new'},
      {text: 'pending', href: '/orders/pending'},
      {text: 'history', href: '/orders/history'},
    ]},
    {text: 'account', href: '#', subLinks: [
      {text: 'profile', href: '/account/profile'},
      {text: 'sign out', href: '/account/signout'},
    ]},
  ];
// Iterate over the entire menuLinks array and for each "link" object:
// Create an <a> element.
// On the new element, add an href attribute with its value set to the href property of the "link" object.
// Set the new element's content to the value of the text property of the "link" object.
// Append the new element to the topMenuEl element.
menuLinks.forEach((link) => {
    const anchorEl = document.createElement('a');
    anchorEl.setAttribute('href', `${link.href}`);
    anchorEl.textContent = `${link.text}`;
    topMenuEl.append(anchorEl);
});

// =============================== ALAB 316.3.1 ======================
//Part 3
// Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl.
// Set the height subMenuEl element to be "100%".
// Set the background color of subMenuEl to the value stored in the --sub-menu-bg CSS custom property.
// Add the class of flex-around to the subMenuEl element.

const subMenuEl = document.getElementById('sub-menu');
subMenuEl.style.height = '100%';
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';
subMenuEl.classList.add('flex-around');

// Now, change the position of the submenu to temporarily hide it. Later, we will make the submenu appear dynamically based on user interaction:
// Set the CSS position property of subMenuEl to the value of absolute.
// Set the CSS top property of subMenuEl to the value of 0.
subMenuEl.style.position = 'absolute';
subMenuEl.style.top = '0';

//Part 4
// Select and cache the all of the <a> elements inside of topMenuEl in a variable named topMenuLinks.
// Attach a delegated 'click' event listener to topMenuEl.
// The first line of code of the event listener function should call the event object's preventDefault() method.
// The second line of code of the function should immediately return if the element clicked was not an <a> element.
// Log the content of the <a> to verify the handler is working.
// The event listener should add the active class to the <a> element that was clicked, unless it was already active, in which case it should remove it.
// The event listener should remove the active class from each other <a> element in topMenuLinks - whether the active class exists or not.
// Hint: Removing a non-existent class from an element does not cause an error!
const topMenuLinks = document.querySelectorAll('a');

topMenuEl.addEventListener('click', handleClick)

function handleClick (e) {
    e.preventDefault();
    if (e.srcElement.nodeName !== 'A'){
        return;
    } else {
        let link = e.target;
        let wasActive = link.classList.contains('active');
        // if the link that was clicked is active, remove the active class and hide the menu
        if(wasActive) {
            link.classList.remove('active')
            subMenuEl.style.top = '0';
            return
        }

        //if any other links are active, remove the class
        topMenuLinks.forEach(link => link.classList.remove('active'));
        
        //add the class active to the menu link that was clicked
        link.classList.add('active');
        
        //find the index of the clicked link in menuLinks
        const menuLinkIndex = menuLinks.findIndex(l => l.text === link.textContent )
        const subLinks = menuLinks[menuLinkIndex].subLinks;
        if(link.classList.contains('active')){
            if (subLinks) {
                buildSubmenu(subLinks);
                subMenuEl.style.top = '100%';
            } else {
                subMenuEl.style.top = '0';
            }
        }

    }

    // The submenu needs to be dynamic based on the clicked link. To facilitate that, we will create a helper function called buildSubmenu that does the following:
    // Clear the current contents of subMenuEl.
    // Iterate over the subLinks array, passed as an argument, and for each "link" object:
    // Create an <a> element.
    // Add an href attribute to the <a>, with the value set by the href property of the "link" object.
    // Set the element's content to the value of the text property of the "link" object.
    // Append the new element to the subMenuEl.
    function buildSubmenu (subLinks) {
        subMenuEl.innerHTML = '';
        subLinks.forEach(link => {
            const subLink = document.createElement('a');
            subLink.setAttribute('href', `${link.href}`);
            subLink.textContent = `${link.text}`;
            subMenuEl.appendChild(subLink);
        })

    }

}

subMenuEl.addEventListener('click', handleSubMenuClick);

function handleSubMenuClick(e) {
    e.preventDefault();
    if (e.srcElement.nodeName !== 'A'){
        return;
    }
    subMenuEl.style.top = '0';
    topMenuLinks.forEach(link => link.classList.remove('active'));
    mainEl.innerHTML = `<h1>${e.target.textContent}</h1>`;

}