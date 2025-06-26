const BASE_URL = 'http://localhost:3000/LeBinhMinh';

async function fetchWithCheck(url) {
    const res = await fetch(url);
    if (!res.ok) {
        throw {
            code: res.status,
            name: 'FetchError',
            httpError: true,
            message: `Failed to fetch: ${url}`
        };
    }
    return await res.json();
}

export async function fetchProfile() {
    return await fetchWithCheck(`${BASE_URL}/profile`);
}

export async function fetchTabByName(name) {
    try {
        const res = await fetch(`${BASE_URL}/profile/tab/${name}`)

        return res.json()
    } catch (err) {
        console.log("error: " + err.message)
        return
    }
}

export async function fetchSkills() {
    return await fetchWithCheck(`${BASE_URL}/skill`);
}

export async function fetchProjects(limit, lastId, hasdMore) {
    if (!hasdMore) return;
    const query = new URLSearchParams({
        limit,
        ...(lastId && { lastId }),
    });
    return await fetchWithCheck(`${BASE_URL}/project?${query.toString()}`);
}

export async function fetchContacts() {
    return await fetchWithCheck(`${BASE_URL}/contact`);
}

export async function fetchTestimonials() {
    return await fetchWithCheck(`${BASE_URL}/testimonial`);
}
