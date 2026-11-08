/**
 * Фоновая предзагрузка роликов при первом заходе на страницу.
 *
 * Файлы скачиваются целиком через fetch и превращаются в blob-URL, чтобы
 * ролик стартовал мгновенно, без буферизации. Качаем по очереди: сначала
 * интро (оно понадобится раньше), потом титры.
 */

const ready = new Map<string, string>();

async function preloadOne(url: string) {
    try {
        const response = await fetch(url);
        if (!response.ok) return;
        const blob = await response.blob();
        ready.set(url, URL.createObjectURL(blob));
    } catch {
        // Не получилось — ролик просто будет грузиться по сети при показе.
    }
}

/** Запускает предзагрузку по порядку. Повторные вызовы для тех же URL игнорируются. */
export async function preloadVideos(urls: (string | undefined)[]) {
    for (const url of urls) {
        if (url && !ready.has(url)) await preloadOne(url);
    }
}

/** Blob-URL, если ролик уже скачан, иначе исходный URL (будет стримиться). */
export function resolveVideo(url: string | undefined): string | undefined {
    return url && (ready.get(url) ?? url);
}
