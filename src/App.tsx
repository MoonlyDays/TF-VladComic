import TF2Logo from './assets/tf_logo.png';
import { useEffect, useRef, useState } from 'react';
import { comicImageUrl, parseHash, range } from './helpers.ts';
import { useLocation } from 'react-router-dom';
import { useKeyPress } from './useKeyPress.ts';
import { Transition } from '@headlessui/react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import './index.css';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

import.meta.glob('./assets/pages/*.png');

const PRELOAD_AHEAD = 4;
const FIRST_PAGE = 0;
const TOTAL_PAGES = 73;

function App() {
    const { hash } = useLocation();

    const loadingVisibleTimeout = useRef<number>();
    const [initialLoading, setInitialLoading] = useState(false);
    const [loadingVisible, setLoadingVisible] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(FIRST_PAGE);
    const [currentImageUrl, setCurrentImageUrl] = useState<string>();
    const [preloadImageUrls, setPreloadImageUrls] = useState<string[]>();

    const nextPage = () => {
        gotoPageHash(currentPage + 1);
    };

    const prevPage = () => {
        gotoPageHash(currentPage - 1);
    };

    const gotoPageHash = (page: number) => {
        if (page < FIRST_PAGE) page = FIRST_PAGE;
        if (page > TOTAL_PAGES) page = TOTAL_PAGES;

        location.hash = `#${page}`;
    };

    useEffect(() => {
        const page = parseHash(hash, FIRST_PAGE);
        if (page < FIRST_PAGE || page > TOTAL_PAGES) {
            gotoPageHash(currentPage);
            return;
        }

        setCurrentPage(page);
        setInitialLoading(true);
    }, [hash]);

    useEffect(() => {
        setImageLoading(true);
        setLoadingVisible(false);

        loadingVisibleTimeout.current = setTimeout(() => {
            setLoadingVisible(true);
        }, 500);

        setCurrentImageUrl(comicImageUrl(currentPage));
        const preloadImages = range(0, PRELOAD_AHEAD)
            .map((n) => comicImageUrl(currentPage + n))
            .filter((url) => url !== undefined) as string[];
        setPreloadImageUrls(preloadImages);
    }, [currentPage]);

    const handleLoaded = () => {
        setImageLoading(false);
        setLoadingVisible(false);

        if (loadingVisibleTimeout.current) {
            clearInterval(loadingVisibleTimeout.current);
            loadingVisibleTimeout.current = undefined;
        }
    };

    useKeyPress(nextPage, [' ', 'ArrowRight', 'Enter']);
    useKeyPress(prevPage, ['ArrowLeft']);

    return (
        <div className="w-full max-w-5xl">
            <div className="flex h-28 items-center justify-between">
                <img src={TF2Logo} alt="Team Fortress 2 Logo" />
            </div>
            <div className="flex justify-between p-2 font-bold text-amber-500">
                <button className="flex items-center gap-2" onClick={prevPage}>
                    <BiChevronLeft />
                    Previous
                </button>
                <button className="flex items-center gap-2" onClick={nextPage}>
                    Next
                    <BiChevronRight />
                </button>
            </div>
            <div
                className="relative h-[86rem] w-full overflow-hidden"
                onClick={nextPage}
            >
                {initialLoading && (
                    <>
                        <Transition show={imageLoading}>
                            <div className="duration-400 data-closed:bg-transparent pointer-events-none absolute z-10 flex h-full w-full items-center justify-center bg-black bg-black/40 transition">
                                <AiOutlineLoading3Quarters
                                    className={
                                        'animate-spin text-6xl text-white transition-opacity ' +
                                        (loadingVisible ? '' : 'opacity-0')
                                    }
                                />
                            </div>
                        </Transition>

                        {currentImageUrl && (
                            <img
                                onLoad={handleLoaded}
                                className="h-full w-full cursor-pointer object-contain"
                                alt="Comic Reader"
                                src={currentImageUrl}
                            />
                        )}

                        {preloadImageUrls &&
                            preloadImageUrls.map((url, index) => (
                                <img
                                    key={index}
                                    alt="Hidden Preload"
                                    className="h-0 w-0"
                                    src={url}
                                />
                            ))}
                    </>
                )}
            </div>
            <div className="flex justify-between p-2 font-bold text-amber-500">
                <button className="flex items-center gap-2" onClick={prevPage}>
                    <BiChevronLeft />
                    Previous
                </button>
                <button className="flex items-center gap-2" onClick={nextPage}>
                    Next
                    <BiChevronRight />
                </button>
            </div>
            <div className="mb-16 mt-8 flex flex-col items-center gap-8 text-white">
                <div className="flex h-[72px] w-[600px] items-center justify-center bg-[url(./assets/infobar.png)] font-sans text-xl">
                    Жмите на картинку или на пробел для перехода дальше
                </div>

                <div className="flex flex-col gap-4 text-center">
                    <div className="text-gray-400">
                        <p>&copy; No Mood No Friends, 2025</p>
                        <p>&copy; Moonly Days, издание и платформа, 2025</p>
                        <p>
                            &copy; Valve Corporation, all rights reserved.
                            Valve, the Valve logo, Steam, the Steam logo, Team
                            Fortress, the Team Fortress logo are trademarks
                            and/or registered trademarks of Valve Corporation.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
