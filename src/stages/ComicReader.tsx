import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import TF2Logo from '../assets/tf_logo.png';
import { PRELOAD_AHEAD, SPINNER_DELAY_MS } from '../config.ts';
import { clamp, parseHash } from '../helpers.ts';
import { PAGES } from '../media.ts';
import { useKeyPress } from '../useKeyPress.ts';

const FIRST_PAGE = 0;
const LAST_PAGE = Math.max(PAGES.length - 1, FIRST_PAGE);

export function ComicReader({ onFinish }: { onFinish: () => void }) {
    const { hash } = useLocation();
    const navigate = useNavigate();

    const requestedPage = parseHash(hash, FIRST_PAGE);
    const page = clamp(requestedPage, FIRST_PAGE, LAST_PAGE);
    const imageUrl = PAGES[page];

    const gotoPage = useCallback(
        (target: number, replace = false) => navigate({ hash: `#${target}` }, { replace }),
        [navigate],
    );

    // Хэш вне диапазона (например, #999) поправляем на ближайшую существующую страницу.
    useEffect(() => {
        if (requestedPage !== page) gotoPage(page, true);
    }, [requestedPage, page, gotoPage]);

    const nextPage = () => (page >= LAST_PAGE ? onFinish() : gotoPage(page + 1));
    const prevPage = () => page > FIRST_PAGE && gotoPage(page - 1);

    useKeyPress(nextPage, [' ', 'ArrowRight', 'Enter']);
    useKeyPress(prevPage, ['ArrowLeft']);

    const [loadedUrl, setLoadedUrl] = useState<string>();
    const [slowUrl, setSlowUrl] = useState<string>();
    const loading = loadedUrl !== imageUrl;
    const spinnerVisible = loading && slowUrl === imageUrl;

    useEffect(() => {
        const timer = setTimeout(() => setSlowUrl(imageUrl), SPINNER_DELAY_MS);
        return () => clearTimeout(timer);
    }, [imageUrl]);

    const preloadUrls = PAGES.slice(page + 1, page + 1 + PRELOAD_AHEAD);
    const isLast = page >= LAST_PAGE;

    const navigation = (
        <div className="flex justify-between p-2 font-bold text-amber-500">
            <button
                type="button"
                className="flex items-center gap-2 disabled:opacity-30"
                onClick={prevPage}
                disabled={page <= FIRST_PAGE}
            >
                <BiChevronLeft />
                Назад
            </button>
            <span className="text-stone-400">
                {page + 1} / {PAGES.length}
            </span>
            <button type="button" className="flex items-center gap-2" onClick={nextPage}>
                {isLast ? 'К титрам' : 'Дальше'}
                <BiChevronRight />
            </button>
        </div>
    );

    return (
        <div className="w-full max-w-5xl">
            <div className="flex h-28 items-center justify-between">
                <img src={TF2Logo} alt="Team Fortress 2 Logo" />
            </div>

            {navigation}

            <div className="relative h-[86rem] w-full overflow-hidden" onClick={nextPage}>
                {imageUrl ? (
                    <>
                        <Transition show={loading}>
                            <div className="pointer-events-none absolute z-10 flex h-full w-full items-center justify-center bg-black/40 transition duration-400 data-closed:bg-transparent">
                                <AiOutlineLoading3Quarters
                                    className={
                                        'animate-spin text-6xl text-white transition-opacity ' +
                                        (spinnerVisible ? '' : 'opacity-0')
                                    }
                                />
                            </div>
                        </Transition>

                        <img
                            key={imageUrl}
                            onLoad={() => setLoadedUrl(imageUrl)}
                            className="h-full w-full cursor-pointer object-contain"
                            alt={`Страница ${page + 1}`}
                            src={imageUrl}
                        />

                        {preloadUrls.map((url) => (
                            <img key={url} alt="" className="hidden" src={url} />
                        ))}
                    </>
                ) : (
                    <div className="flex h-full items-center justify-center text-xl text-stone-400">
                        Страниц пока нет
                    </div>
                )}
            </div>

            {navigation}

            <div className="mt-8 mb-16 flex flex-col items-center gap-8 text-white">
                <div className="flex h-[72px] w-[600px] items-center justify-center bg-[url(./assets/infobar.png)] font-sans text-xl">
                    Жмите на картинку или на пробел для перехода дальше
                </div>

                <div className="flex flex-col gap-4 text-center">
                    <div className="text-gray-400">
                        <p>&copy; No Mood No Friends, 2025</p>
                        <p>&copy; Moonly Days, издание и платформа, 2025</p>
                        <p>
                            &copy; Valve Corporation, all rights reserved. Valve, the Valve logo,
                            Steam, the Steam logo, Team Fortress, the Team Fortress logo are
                            trademarks and/or registered trademarks of Valve Corporation.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
