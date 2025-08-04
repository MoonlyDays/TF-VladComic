export function comicImageUrl(page: number) {
    return (
        comicImageWithExtension(page, 'png') ||
        comicImageWithExtension(page, 'jpg')
    );
}

function comicImageWithExtension(page: number, extension: string) {
    const href = new URL(`./assets/pages/${page}.${extension}`, import.meta.url)
        .href;
    return href.endsWith('/undefined') ? undefined : href;
}

export function parseHash(hash: string, defaultPage: number): number {
    return hash !== '' ? Number(hash.slice(1)) : defaultPage;
}

export function range(from: number, to: number) {
    const out = [];
    for (let i = from; i < to; i++) {
        out.push(i);
    }
    return out;
}
