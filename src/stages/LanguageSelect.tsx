import { useCallback, useEffect, useState, type ComponentType } from 'react';
import { FlagGeorgia, FlagRussia, FlagUK, FlagUkraine } from '../components/Flags.tsx';
import screamerImage from '../assets/media/screamer.png';
import { Panel, Screen } from '../components/Panel.tsx';
import { SCREAMER_DURATION_MS } from '../config.ts';
// Звук скримера временно отключён.
// import { playScream } from '../scream.ts';

type Language = {
    id: string;
    name: string;
    /** Заголовок, пока курсор над флагом. У грузинского его нет: там скример. */
    prompt?: string;
    Flag: ComponentType<{ className?: string }>;
};

const LANGUAGES: Language[] = [
    { id: 'ru', name: 'Русский', prompt: 'Выберите язык', Flag: FlagRussia },
    { id: 'uk', name: 'Українська', prompt: 'Оберіть мову', Flag: FlagUkraine },
    { id: 'en', name: 'English', prompt: 'Viberite Yazik', Flag: FlagUK },
    { id: 'ka', name: 'ქართული', Flag: FlagGeorgia },
];

const DEFAULT_PROMPT = LANGUAGES[0].prompt;

export function LanguageSelect({ onSelect }: { onSelect: () => void }) {
    const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
    const [screaming, setScreaming] = useState(false);
    const stopScreaming = useCallback(() => setScreaming(false), []);

    const choose = (language: Language) => {
        if (language.id === 'ka') {
            // playScream();
            setScreaming(true);
            return;
        }
        onSelect();
    };

    return (
        <Screen>
            <Panel className="w-full max-w-3xl text-center">
                <h1 className="mb-10 h-9 text-3xl font-bold tracking-wide text-amber-500 uppercase">
                    {prompt}
                </h1>
                <div className="grid grid-cols-4 gap-6">
                    {LANGUAGES.map((language) => (
                        <button
                            key={language.id}
                            type="button"
                            aria-label={language.name}
                            title={language.name}
                            onClick={() => choose(language)}
                            onMouseEnter={() => language.prompt && setPrompt(language.prompt)}
                            onFocus={() => language.prompt && setPrompt(language.prompt)}
                            className="group aspect-[3/2] overflow-hidden rounded border-2 border-stone-700 shadow-lg transition hover:-translate-y-1 hover:border-amber-500 focus-visible:border-amber-500 focus-visible:outline-none"
                        >
                            <language.Flag className="h-full w-full transition group-hover:scale-105" />
                        </button>
                    ))}
                </div>
            </Panel>

            {screaming && <Screamer onDone={stopScreaming} />}
        </Screen>
    );
}

function Screamer({ onDone }: { onDone: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onDone, SCREAMER_DURATION_MS);
        return () => clearTimeout(timer);
    }, [onDone]);

    return (
        <div className="fixed inset-0 z-50 flex animate-flash items-center justify-center overflow-hidden">
            <div className="animate-jitter">
                <img
                    src={screamerImage}
                    alt=""
                    className="h-screen w-screen animate-screamer object-contain"
                />
            </div>
        </div>
    );
}
