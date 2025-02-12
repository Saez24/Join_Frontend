function renderContactSummary(color, name, email, phone, uniqueId) {
    return `
    <div class="main-contacts-text">
        <h1>Contacts</h1>
        <div class="vertical-line"></div>
        <h2>Better with a team</h2>
        <div class="horizontal-line"></div>
    </div>
    <div id="contactSummary">
        <div id="backArrow" class="arrow-icon" onclick="closeContactInformation()"><img src="assets/img/arrow_left.png"></div>
        <div class="contact-summary-headline">
            <div class="contact-summary-initials" style="background-color: ${color};">${getInitials(name)}</div>
            <div class="contact-summary-headline-rightside">
                <div class="contact-summary-headline-name">${name}</div>
                <div class="edit-and-delete">
                    <div id="edit${uniqueId}" class="edit-and-delete-row" onclick="openEditContactOverlay('${name}', '${email}', '${phone}', '${color}', '${uniqueId}')">
                        <img src="assets/img/contacts-edit.png" alt="edit">Edit
                    </div>
                    <div id="delete${uniqueId}" class="edit-and-delete-row" onclick="openDeleteContactOverlay('${uniqueId}')">
                        <img src="assets/img/contacts-delete.png" alt="delete">Delete
                    </div>
                </div>
                <button onclick="burgerSlideInFromRight()" class="contact-burger-menu" id="contactBurgerMenuIcon">
                    <img src="assets/img/contacts-burger-menu.png" alt="add contact" class="burger-menu-icon">
                </button>
            </div>
        </div>
        <div class="contact-summary-contact-information">Contact Information</div>
        <div class="contact-summary-mail-and-phone">
            <div><b>Email</b></div>
            <span>${email}</span>
            <div><b>Phone</b></div>
            <span>${phone}</span>
        </div>
    </div>
    <!-- BURGER MENU EDIT AND DELETE -->
    <div class="burger-menu-overlay" id="burgerMenu">
        <div class="burgermenu-row" onclick="openEditContactOverlay('${name}', '${email}', '${phone}', '${color}', '${uniqueId}')">
            <img class="burgermenu-menu-icon" src="assets/img/contacts-edit.png">
            Edit
        </div>
        <div class="burgermenu-row" onclick="openDeleteContactOverlay('${uniqueId}')">
            <img class="burgermenu-menu-icon" src="assets/img/contacts-delete.png">
            Delete
        </div>
    </div>
    `;
}


function renderContacts(data) {
    const container = document.getElementById('contactForString');
    container.innerHTML = ''; // Leert den Container
    // Kontakte nach Anfangsbuchstaben gruppieren
    const groupedContacts = groupByInitial(data);

    // HTML-Inhalt für jeden Buchstaben und Kontakt generieren
    for (let initial in groupedContacts) {
        if (groupedContacts.hasOwnProperty(initial)) {
            container.innerHTML += `
                <div class="capital-category">${initial}</div>
                <div class="dividing-line"></div>
            `;

            // Kontakte innerhalb der Gruppe
            groupedContacts[initial].forEach(contact => {
                const randomColor = getRandomColor(); // Zufällige Farbe für Initialen
                const initials = getInitials(contact.first_name, contact.last_name); // Initialen generieren
                container.innerHTML += `
                    <div class="contact-row" id="${contact.id}" 
                         onclick="renderContactInformation('${contact.first_name} ${contact.last_name}', '${contact.email}', '${randomColor}', '${contact.phone}', '${contact.id}')">
                        <div class="initials" style="background-color: ${randomColor}">
                            ${initials}
                        </div>
                        <div class="name-and-email">
                            <div class="contact-name-row">${contact.first_name} ${contact.last_name}</div>
                            <div class="contact-email-row">${contact.email}</div>
                        </div>
                    </div>
                `;
            });
        }
    }
}
