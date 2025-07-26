import TF2Logo from './assets/tf_logo.png';
import Title from './assets/title.png';
import './index.css';
import { useEffect, useRef, useState } from 'react';
import { comicImageUrl, parseHash, range } from './helpers.ts';
import { useLocation } from 'react-router-dom';
import { useKeyPress } from './useKeyPress.ts';
import { Transition } from '@headlessui/react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import.meta.glob('./assets/pages/*.png');

const PRELOAD_AHEAD = 4;
const TOTAL_PAGES = 4;

function App() {
    const { hash } = useLocation();

    const loadingVisibleTimeout = useRef<number>();
    const [initialLoading, setInitialLoading] = useState(false);
    const [loadingVisible, setLoadingVisible] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [currentImageUrl, setCurrentImageUrl] = useState<string>();
    const [preloadImageUrls, setPreloadImageUrls] = useState<string[]>();

    const nextPage = () => {
        gotoPageHash(currentPage + 1);
    };

    const prevPage = () => {
        gotoPageHash(currentPage - 1);
    };

    const gotoPageHash = (page: number) => {
        if (page < 1) page = 1;
        if (page > TOTAL_PAGES) page = TOTAL_PAGES;

        location.hash = `#${page}`;
    };

    useEffect(() => {
        const page = parseHash(hash);
        if (page < 1 || page > TOTAL_PAGES) {
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
            .map(n => comicImageUrl(currentPage + n))
            .filter(url => url !== undefined) as string[];
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
                <img src={Title} alt="The Days Have Worn Away" />
            </div>
            <div className="h-[48rem] w-full overflow-hidden relative" onClick={nextPage}>
                {initialLoading && (
                    <>
                        <Transition show={imageLoading}>
                            <div
                                className="absolute z-10 duration-400 transition w-full h-full pointer-events-none bg-black bg-black/40 data-closed:bg-transparent flex justify-center items-center">
                                <AiOutlineLoading3Quarters
                                    className={'text-6xl text-white transition-opacity animate-spin ' + (loadingVisible ? '' : 'opacity-0')} />
                            </div>
                        </Transition>

                        {currentImageUrl && (
                            <img
                                onLoad={handleLoaded}
                                className="object-contain w-full h-full cursor-pointer"
                                alt="Comic Reader"
                                src={currentImageUrl}
                            />
                        )}

                        {preloadImageUrls && preloadImageUrls.map((url, index) => (
                            <img
                                key={index}
                                alt="Hidden Preload"
                                className="w-0 h-0"
                                src={url}
                            />
                        ))}
                    </>
                )}
            </div>

            <div className="mb-16 mt-8 flex flex-col items-center gap-8 text-white">
                <div
                    className="flex h-[72px] w-[600px] items-center justify-center bg-[url(./assets/infobar.png)] font-sans text-xl">
                    Жмите на картинку или на пробел для перехода дальше
                </div>

                <div className="flex flex-col gap-4 text-center">
                    <div>
                        <p>
                            Оригинал:{' '}
                            <a
                                href="https://www.teamfortress.com/tf07_thedayshavewornaway/"
                                className="text-amber-500"
                            >
                                teamfortress.com/tf07_thedayshavewornaway
                            </a>
                            . Авторы перевода: Alabes,{' '}
                            <a href="https://t.me/moonlygroup" className="text-amber-500">
                                Moonly Days
                            </a>
                            .
                        </p>
                        <p>
                            Это фанатский перевод. Мы не связаны с Valve Corporation или
                            порталом &quot;Авторский Комикс&quot;.
                        </p>
                    </div>
                    <div className="text-gray-400">
                        <p>
                            &copy; Valve Corporation, Team Fortress 2, комикс &quot;The Days Have
                            Worn Away&quot;, 2024
                        </p>
                        <p>&copy; Alabes, перевод текстов, 2024</p>
                        <p>&copy; Moonly Days, издание и платформа, 2024</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
