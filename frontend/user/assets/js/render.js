function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function renderSkills(skills) {
    return `
      ${skills.map(skill => `
        <div class="skill-card">
            <div class="skill-card_icon">
                <img src="${skill.thumb}" alt="${skill.name}">
            </div>
            <h3 class="skill-card_title">${skill.name}</h3>
            <ul class="skill-card_list">
                ${skill.list.map(item => `
                        <li class="skill-card_item">${item}</li>
                    `).join('')}
            </ul>
        </div>
        `).join('')}
    `
}

export function renderProject(projects) {
    return `
        ${projects.map(project => `
            <div class="project-card">
                <div class="project-card__image"> <img src=${project.thumb} alt="${project.title}"></div>
                <div class="project-card__content">
                    <h3 class="project-card__title">${project.title}</h3>
                    <p class="project-card__p">Role: ${project.role}</p>
                    <p class="project-card__p">Technologies:</p>
                    <ul class="project-card__techs">
                        ${Object.entries(project.technologies).map(([key, arr]) => `
                                <li class="project-card__tech">${capitalize(key)}: ${arr.join(', ')}</li>
                            `).join('')}
                    </ul>
                    <p class="project-card__p">Description: ${project.description}</p>
                    <div class="project-card__links">
                        <div class="project-card__icon"><i class="fa-regular fa-hand-point-right"></i></div>
                        ${Object.entries(project.links).map(([key, string]) => `
                                <a class="project-card__link" target="_blank" href="${string}">${capitalize(key)}</a>
                            `).join('')}
                    </div>
                </div>
            </div>
        `).join('')}
    `
}

export function renderTestimonials(testimonials) {
    return `
        ${testimonials.map((tes, index) => `
             <div class="testimonial-card card" data-index=${index}>
                    <div class="testimonial-card__info">
                        <div class="testimonial-info__avatar"><img src=${tes.avatar} alt="user image"></div>
                        <h3 class="testimonial-info__name">${tes.name}</h3>
                        <p class="testimonial-info__role">(${tes.role})</p>
                    </div>
                    <div class="testimonial-card__content">
                        <p class="testimonial-content__description">“${tes.message}"</p>
                    </div>
                </div>    
        `).join('')}
    `
}

export function renderContact(contacts) {
    const neededContacts = ['email', 'github', 'phone'];

    const filteredContacts = contacts.filter(c => neededContacts.includes(c.name));

    return `
        <h2 class="contact__title">Let's Connect</h2>
        <p class="contact__description">Got a project in mind or need support? I’m here to help you bring your ideas
            to life.</p>
        <ul class="contact__list">
            ${filteredContacts.map((c, index) => `
                <li class="contact__item" data-index=${index}>
                    <i class="${c.name === 'github' ? "fa-brands" : 'fa-solid'} ${c.name === 'email' ? 'fa-envelope' : 'fa-' + c.name}"></i>
                    <span class="contacct__text">${c.link}</span>
                </li>    
            `).join('')}
        </ul>
    `
}

export function renderFooter(contacts) {
    return `
        ${contacts.filter(c => c.name != 'phone').map((c, index) => `
            <li class="footer__item" data-index=${index}>
                <a class="footer__link" href=${c.link}>
                    <div class="footer__icon"><img src="${c.logo}" alt="${capitalize(c.name)} logo"></div>
                    <span class="footer__text">${capitalize(c.name)}</span>
                </a>
            </li>    
        `).join('')}
    `
}

// export function renderAboutDetails() {
//     return `
//         <div id="overlay-about" class="overlay-box hidden">
//                 <h3 class="overlay-content__title">About details</h3>
//                 <div class="content__container">
//                     <div class="content-info">
//                         <div class="content-info__avatar"><img src="./images/avatar.jpg" alt=""></div>
//                         <div class="content-info__name">Le Binh Minh</div>
//                     </div>
//                     <div class="content-controls">
//                         <ul class="controls">
//                             <li class="control-item" aria-selected="false">introduction</li>
//                             <li class="control-item" aria-selected="true">picture</li>
//                         </ul>
//                         <div id="control-bottom-line"></div>
//                     </div>


//                 </div>
//             </div>
//     `
// }


export function renderOverlay(profile) {
    return `
    <div class="overlay-wrapper">
        <div id="overlay-about" class="overlay-box hidden">
                <div class="overlay-container">
                    <div class="overlay-info">
                        <div class="overlay-info__avatar"><img src=${profile.avatar} alt=${profile.name}></div>
                        <div class="overlay-info__name">${profile.name}</div>
                    </div>
                    <div class="overlay-controls">
                        <ul class="controls">
                            ${profile.tab.map(t => ` <li class="control-item" data-tab=${t.name} ><p>${capitalize(t.name)}</p></li> `).join('')}
                        </ul>
                        <div id="control-bottom-line"></div>
                    </div>
                    <div class="overlay-content scroll-hidden"></div>
                </div>
            </div>
            <div id="overlay-viewCV" class="overlay-box hidden">
                <h3 class="overlay__title">My CV</h3>
                <div class="overlay-container scroll-hidden">
                    <iframe class="content__iframe" src="./images/LeBinhMinh_FrontendDeveloperIntern_CV.pdf" ></iframe>
                </div>
            </div> 
            <button id="close-overlay" class="btn--icon"><i class="fa-solid fa-xmark"></i></button>
    </div>
    `
}

export function renderIntroductionContent(data) {
    const introductionContent = `
        <ul class="content-list">
            <li class="list__item">
                <span class="item__icon"><i class="fa-solid fa-cake-candles"></i></span>
                <p class="item_paragraph">${data.dob}</p>
            </li>
            <li class="list__item">
                <span class="item__icon"><i class="fa-solid fa-location-dot"></i></span>
                <p class="item_paragraph">${data.address}</p>
            </li>
            <li class="list__item">
                <span class="item__icon"><i class="fa-solid fa-house"></i></span>
                <p class="item_paragraph">${data.hometown}</p>
            </li>
            <li class="list__item">
                <span class="item__icon"><i class="fa-solid fa-school"></i></span>
                <p class="item_paragraph">${data.uni}</p>
            </li>
        </ul>
        <div class="content-text">
            <p class="text__pragraph">${data.description}</p>
        </div>
    `
    return introductionContent
}

export function renderEducationContent(data) {
    const educationContent = `
        <ul class="content-list">
            <li class="list__item">
                <span class="item__icon"><i class="fa-solid fa-school"></i></span>
                <p class="item_paragraph">${data.uni}</p>
            </li>
            <li class="list__item">
                <span class="item__icon"><i class="fa-solid fa-laptop-code"></i></span>
                <p class="item_paragraph">${data.course}</p>
            </li>
            <li class="list__item">
                <span class="item__icon"><i class="fa-solid fa-book-open"></i></span>
                <p class="item_paragraph">${data.gpa}</p>
            </li>
            <li class="list__item">
                <span class="item__icon"><i class="fa-solid fa-graduation-cap"></i></span>
                <p class="item_paragraph">${data.graduationYear}</p>
            </li>
        </ul>
    `

    return educationContent
}

export function renderPictureContent(data) {

    if(Array.isArray(data)){
        return `
        <div id="gird-picture" class="gird-wrapper">
            ${data.map(item => `
                    <div class="grid__item">
                        <div class="item-container">
                            <img class="item__img" src=${item} alt=""/>
                        </div>
                    </div>
                `).join('')}
        </div>
    `
    }
    else{
        return `
        <div id="gird-picture" class="gird-wrapper">
            <div class="grid__item">
                <div class="item-container">
                    <img class="item__img" src=${data} alt=""/>
                </div>
            </div>
        </div>
    `
    }
}