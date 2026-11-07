/**
 * Страницы комикса и медиафайлы подхватываются из папок автоматически,
 * поэтому, чтобы их заменить, достаточно положить новые файлы в эти папки.
 */

const pageModules = import.meta.glob<string>('./assets/pages/*.{png,jpg,jpeg,webp}', {
    eager: true,
    query: '?url',
    import: 'default',
});

const mediaModules = import.meta.glob<string>('./assets/media/*', {
    eager: true,
    query: '?url',
    import: 'default',
});

function baseName(path: string) {
    const file = path.slice(path.lastIndexOf('/') + 1);
    const dot = file.lastIndexOf('.');
    return dot === -1 ? file : file.slice(0, dot);
}

/** URL страниц по порядку: 0.png, 1.jpg, 2.png, … (сортировка по номеру в имени). */
export const PAGES: string[] = Object.entries(pageModules)
    .map(([path, url]) => ({ order: Number(baseName(path)), url }))
    .filter((page) => Number.isFinite(page.order))
    .sort((a, b) => a.order - b.order)
    .map((page) => page.url);

function findMedia(name: string): string | undefined {
    const entry = Object.entries(mediaModules).find(([path]) => baseName(path) === name);
    return entry?.[1];
}

/** Поздравительный ролик: src/assets/media/intro.mp4 (или .webm) */
export const INTRO_VIDEO = findMedia('intro');

/** Финальные титры: src/assets/media/credits.mp4 (или .webm) */
export const CREDITS_VIDEO = findMedia('credits');

/** Звук скримера: src/assets/media/screamer-sound.mp3 (или .ogg/.wav) */
export const SCREAMER_SOUND = findMedia('screamer-sound');
