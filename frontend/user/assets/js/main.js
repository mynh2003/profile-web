import { main } from './ui.js'
import { fetchProfile, fetchContacts, fetchSkills, fetchTestimonials } from './api.js'
import { renderSkills, renderTestimonials, renderContact, renderFooter, renderOverlay } from './render.js'

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 1. Gọi hiệu ứng UI (navigation, slide, validate...)
        

        // 2. Gọi API và render dữ liệu động
        const profile = await fetchProfile();
        const contacts = await fetchContacts();
        const skills = await fetchSkills();
        const testimonials = await fetchTestimonials();

        document.getElementById('global-overlay').innerHTML = renderOverlay(profile);
        document.getElementById('skill-cards').innerHTML =  renderSkills(skills);
        document.getElementById('testimonial-cards').innerHTML = renderTestimonials(testimonials);
        document.getElementById('contact__info').innerHTML = renderContact(contacts);
        document.getElementById('footer__list').innerHTML = renderFooter(contacts);

        main();
    } catch (err) {
        console.error("❌ Lỗi khi load dữ liệu trang:", err);

        // Hiển thị thông báo lỗi lên UI nếu cần
        document.body.innerHTML += `<p style="color:red;text-align:center;">Lỗi khi tải dữ liệu: ${err.code || ''}</p>`;
    }
});