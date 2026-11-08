import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { BiChevronLeft, BiChevronRight, BiX } from 'react-icons/bi';
import { buttonClass, Panel, Screen } from '../components/Panel.tsx';
import { GALLERY } from '../media.ts';
import { useKeyPress } from '../useKeyPress.ts';

/** Галерея артов после комикса: сетка 2×2, клик открывает арт на весь экран. */
export function Gallery({ onDone }: { onDone: () => void }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const isOpen = openIndex !== null;
    const count = GALLERY.length;

    const step = (delta: number) =>
        setOpenIndex((index) => (index === null ? index : (index + delta + count) % count));

    useKeyPress(() => isOpen && step(1), ['ArrowRight']);
    useKeyPress(() => isOpen && step(-1), ['ArrowLeft']);

    return (
        <Screen>
            <Panel className="flex w-full max-w-4xl flex-col items-center gap-8">
                <h1 className="text-3xl font-bold tracking-wide text-amber-500 uppercase">
                    Арты
                </h1>

                <div className="grid w-full grid-cols-2 gap-4">
                    {GALLERY.map((url, index) => (
                        <button
                            key={url}
                            type="button"
                            onClick={() => setOpenIndex(index)}
                            className="group aspect-square overflow-hidden rounded border border-stone-700 bg-stone-950 transition hover:border-amber-500"
                        >
                            <img
                                src={url}
                                alt={`Арт ${index + 1}`}
                                loading="lazy"
                                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                            />
                        </button>
                    ))}
                </div>

                <button type="button" className={buttonClass} onClick={onDone}>
                    Далее
                </button>
            </Panel>

            <Dialog open={isOpen} onClose={() => setOpenIndex(null)} className="relative z-50">
                <div className="fixed inset-0 bg-black/90" aria-hidden="true" />
                <DialogPanel
                    className="fixed inset-0 flex items-center justify-center p-4 sm:px-20"
                    onClick={(event) => event.target === event.currentTarget && setOpenIndex(null)}
                >
                    {isOpen && (
                        <img
                            src={GALLERY[openIndex]}
                            alt={`Арт ${openIndex + 1}`}
                            className="max-h-full max-w-full object-contain"
                        />
                    )}

                    <button
                        type="button"
                        aria-label="Закрыть"
                        className="absolute top-4 right-4 text-4xl text-stone-300 hover:text-white"
                        onClick={() => setOpenIndex(null)}
                    >
                        <BiX />
                    </button>
                    {count > 1 && (
                        <>
                            <button
                                type="button"
                                aria-label="Предыдущий арт"
                                className="absolute top-1/2 left-2 -translate-y-1/2 text-5xl text-stone-300 hover:text-white"
                                onClick={() => step(-1)}
                            >
                                <BiChevronLeft />
                            </button>
                            <button
                                type="button"
                                aria-label="Следующий арт"
                                className="absolute top-1/2 right-2 -translate-y-1/2 text-5xl text-stone-300 hover:text-white"
                                onClick={() => step(1)}
                            >
                                <BiChevronRight />
                            </button>
                        </>
                    )}
                </DialogPanel>
            </Dialog>
        </Screen>
    );
}
