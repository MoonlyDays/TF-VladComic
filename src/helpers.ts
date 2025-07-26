export function comicImageUrl(page: number) {
    const href = new URL(`./assets/pages/${page}.png`, import.meta.url).href;
    return href.endsWith('/undefined') ? undefined : href;
}

export function parseHash(hash: string): number {
    return hash ? Number(hash.slice(1)) : 1;
}

export function range(from: number, to: number) {
    const out = [];
    for (let i = from; i < to; i++) {
        out.push(i)
    }
    return out;
}