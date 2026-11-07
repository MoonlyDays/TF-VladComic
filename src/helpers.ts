/** Номер страницы из `#12`, либо `fallback`, если хэш пустой или кривой. */
export function parseHash(hash: string, fallback: number): number {
    if (hash === '' || hash === '#') return fallback;
    const page = Number(hash.slice(1));
    return Number.isInteger(page) ? page : fallback;
}

export function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}
