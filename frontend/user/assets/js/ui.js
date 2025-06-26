import { fetchProjects, fetchTabByName } from './api.js'
import { renderProject, renderIntroductionContent, renderEducationContent, renderPictureContent } from './render.js'


export function setupOverlayEvents() {
    // ====== HANDLE OVERLAY =====
    const overlay = document.getElementById('global-overlay');
    const closeBtn = document.getElementById('close-overlay');
    const openBtns = document.querySelectorAll('[data-overlay]');
    const mainContainer = document.getElementById('main-container');


    const controlItem = overlay.querySelectorAll('.control-item')
    const controlBottomLine = document.getElementById('control-bottom-line')

    const overlayContent = overlay.querySelector('.overlay-content')

    let activeItem = controlItem[0]
    activeItem.classList.add('selected')

    openBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-overlay')
            const targetBox = document.getElementById(`overlay-${targetId}`)
            const attribute = btn.getAttribute('data-overlay')

            document.querySelectorAll('.overlay-box').forEach(box => {
                box.classList.remove('active')
            })


            targetBox.classList.add('active')
            overlay.classList.add('show')
            mainContainer.classList.add('blurred')

            if (attribute === 'about') {
                updateLinePosition(activeItem)
                updateTabContent(activeItem.getAttribute('data-tab'))
            }

        })
    })

    closeBtn.addEventListener('click', () => {
        overlay.classList.remove('show')
        mainContainer.classList.remove('blurred')
    })


    // ===== HANDLE HOVER CONTROL ITEM =====
    const updateLinePosition = (target) => {
        const width = target.offsetWidth
        const left = target.offsetLeft
        controlBottomLine.style.width = width + 'px'
        controlBottomLine.style.transform = `translateX(${left}px)`
    }

    

    const updateTabContent = async (name) => {
        try {
            const tab = await fetchTabByName(name)

            switch (name) {
                case 'introduction': overlayContent.innerHTML = renderIntroductionContent(tab.content)
                    break
                case 'education': overlayContent.innerHTML = renderEducationContent(tab.content)
                    break
                case 'picture': overlayContent.innerHTML = renderPictureContent(tab.content)
                    break
                default: console.log('not tab')
            }
        }catch(err){
            console.log("error: " + err.message)
        }
        
    }

    updateLinePosition(activeItem)

    controlItem.forEach(item => {
        item.addEventListener('mouseenter', () => {
            updateLinePosition(item)
        })

        item.addEventListener('mouseleave', () => {
            updateLinePosition(activeItem)
        })

        item.addEventListener('click', () => {
            if (item !== activeItem) {
                activeItem.classList.remove('selected')
                item.classList.add('selected')
                activeItem = item;
                updateTabContent(activeItem.getAttribute('data-tab'))
                updateLinePosition(activeItem)
            }
        })
    })

}




// ===== HANDLE NAVIGATION =====
const navLinks = document.querySelectorAll(".nav__link")
let activeLink = document.querySelector('.nav__link.active')

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (activeLink) activeLink.classList.remove('active')
        link.classList.add('active')
        activeLink = link
    })
})

// ===== HANDLE SEEMORE PROJECT =====
let isExpanded = false;
let hasMore = true
let lastId = null
let limit = 2

const sectionProject = document.getElementById('project-section')
const projectCards = document.getElementById('project-cards')
const projectBtn = sectionProject.querySelector('.btn')

const loadProject = async () => {
    try {
        const data = await fetchProjects(limit, lastId, hasMore)
        const newProjects = data.projects
        hasMore = data.hasMore
        lastId = data.projects.at(-1)?._id

        projectCards.innerHTML = renderProject(newProjects)


    } catch (err) {
        console.error("❌ Error loading project:", err.message);
    }
};


projectBtn.addEventListener('click', async () => {
    try {
        if (!isExpanded) {
            const data = await fetchProjects(limit, lastId, hasMore)
            const newProjects = data.projects
            hasMore = data.hasMore
            lastId = data.projects.at(-1)?._id

            projectCards.insertAdjacentHTML('beforeend', renderProject(newProjects))

            projectBtn.scrollIntoView({ behavior: 'smooth', block: 'end' });

            if (!hasMore) {
                projectBtn.textContent = 'hide less'
                isExpanded = true
            }
        }
        else {
            const data = await fetchProjects(limit, null, true)
            const newProjects = data.projects
            hasMore = data.hasMore
            lastId = data.projects.at(-1)?._id
            isExpanded = false

            projectBtn.textContent = 'see more'
            projectCards.innerHTML = renderProject(newProjects)

            projectBtn.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    } catch (err) {
        console.log("error: " + err.message)
    }
})


// ===== VALIDATOR CLASS =====
function validator(formSelector) {
    var _this = this
    var formRules = {}

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement
            }
            element = element.parentElement
        }
    }

    var validateRules = {
        required: function (value) {
            return value ? undefined : "Please enter this field."
        },
        email: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : "Please enter a valid email address."
        },
        phone: function (value) {
            var regex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/;
            return regex.test(value) ? undefined : 'Please enter a valid phone number.'
        },
        min: function (min) {
            return function (value) {
                return value.length >= min ? undefined : `Please enter at least ${min} characters.`
            }
        }
    };

    var formElement = document.querySelector(formSelector)

    if (formElement) {
        var inputs = formElement.querySelectorAll('[name],[rules]')
        inputs.forEach(input => {
            var rules = input.getAttribute('rules').split('|')
            rules.forEach(rule => {


                var ruleInfo
                var isRuleHasValue = rule.includes(':')

                if (isRuleHasValue) {
                    ruleInfo = rule.split(':')
                    rule = ruleInfo[0]
                }
                var ruleFunc = validateRules[rule]

                if (isRuleHasValue) {
                    ruleFunc = ruleFunc(ruleInfo[1])
                }


                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc)
                } else {
                    formRules[input.name] = [ruleFunc]
                }

                input.onblur = handleValidate
                input.oninput = handleClearError

            })

        })
    }

    function handleValidate(event) {
        var rules = formRules[event.target.name]
        var errorMessage
        for (var rule of rules) {
            errorMessage = rule(event.target.value)
            if (errorMessage) break
        }

        if (errorMessage) {
            const formField = getParent(event.target, '.contact-form__field')
            if (formField) {
                formField.classList.add('invalid')
                var formMessage = formField.querySelector('.contact-form__message')
                if (formMessage) {
                    formMessage.innerHTML = errorMessage
                }
            }
        }

        return !errorMessage
    }

    function handleClearError(event) {
        const formField = getParent(event.target, '.contact-form__field');
        if (formField.classList.contains('invalid')) {
            formField.classList.remove('invalid')
            var formMessage = formField.querySelector('.contact-form__message')
            if (formMessage) {
                formMessage.innerHTML = ''
            }
        }
    }

    formElement.onsubmit = function (event) {
        event.preventDefault()

        var inputs = formElement.querySelectorAll('[name],[rules]')
        var isValid = true
        inputs.forEach(input => {
            if (!handleValidate({ target: input })) {
                isValid = false
            }
        })

        if (isValid) {
            if (typeof _this.onSubmit === 'function') {
                var enableInput = formElement.querySelectorAll('[name]');
                var formValue = Array.from(enableInput).reduce(function (values, input) {
                    switch (input.type) {
                        case 'radio':
                            values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value
                            break;
                        case 'checkbox':
                            if (!input.matches(':checked')) {
                                values[input.name] = ''
                                return values
                            }
                            if (!Array.isArray(values[input.name])) {
                                values[input.name] = [];
                            }

                            values[input.name].push(input.value)
                            break;
                        case 'file':
                            values[input.name] = input.files
                            break;
                        default:
                            values[input.name] = input.value
                    }

                    return values
                }, {})
                _this.onSubmit(formValue)
            } else {
                formElement.submit()
            }

            formElement.reset()
        }
    }
}

// ====== SLIDE CLASS =====
function slideAnimation(sliderSection, countVisible) {
    if (!countVisible) {
        console.log('Not countVisible!')
        return
    }

    const slideContainer = sliderSection.querySelector('[data-slider-container]')
    const cards = slideContainer.querySelectorAll('.card')
    const btnPrev = sliderSection.querySelector('[data-slider-btn="prev"]')
    const btnNext = sliderSection.querySelector('[data-slider-btn="next"]')
    const pageNumber = sliderSection.querySelector('[data-slider-page]')

    let currentIndex = 0
    let translateX = 0

    const updateSlide = () => {
        const cardWidth = cards[0].offsetWidth + 20
        translateX = currentIndex * cardWidth
        slideContainer.style.transform = `translateX(-${translateX}px)`
        pageNumber.innerHTML = `${Math.ceil(currentIndex / countVisible) + 1}/${Math.ceil(cards.length / countVisible)}`
    }

    btnPrev.addEventListener('click', () => {
        currentIndex = Math.max(currentIndex - countVisible, 0)
        updateSlide()
    })

    btnNext.addEventListener('click', () => {
        currentIndex = Math.min(currentIndex + countVisible, cards.length - countVisible)
        updateSlide()
    })

    window.addEventListener('resize', updateSlide);
    updateSlide();

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            cards.forEach(item => {
                if (item === card) item.classList.add('card-active');
                else item.classList.add('card-hidden');
            });
        });

        card.addEventListener('mouseleave', () => {
            cards.forEach(item => {
                item.classList.remove('card-active');
                item.classList.remove('card-hidden');
            });
        });
    });
}

// ====== MAIN ======

export function main() {
    setupOverlayEvents()

    slideAnimation(document.querySelector('#testimonial-section'), 3)

    loadProject()

    var formContact = new validator('#contact__form')
    formContact.onSubmit = function (formData) {
        console.log(formData)
    }
}
