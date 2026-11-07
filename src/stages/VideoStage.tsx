import { Panel, Screen, buttonClass, secondaryButtonClass } from '../components/Panel.tsx';

type VideoStageProps = {
    src: string | undefined;
    /** Подпись заглушки, пока ролика нет. */
    placeholder: string;
    onDone: () => void;
};

export function VideoStage({ src, placeholder, onDone }: VideoStageProps) {
    if (!src) {
        return (
            <Screen>
                <Panel className="flex w-full max-w-3xl flex-col items-center gap-8 text-center">
                    <div className="flex aspect-video w-full items-center justify-center rounded border-2 border-dashed border-stone-600 text-xl text-stone-400">
                        {placeholder}
                    </div>
                    <button type="button" className={buttonClass} onClick={onDone}>
                        Дальше
                    </button>
                </Panel>
            </Screen>
        );
    }

    return (
        <Screen>
            <div className="flex w-full flex-col items-center gap-6">
                <video
                    key={src}
                    src={src}
                    autoPlay
                    controls
                    playsInline
                    onEnded={onDone}
                    className="aspect-video w-full rounded bg-black shadow-2xl"
                />
                <button type="button" className={secondaryButtonClass} onClick={onDone}>
                    Пропустить
                </button>
            </div>
        </Screen>
    );
}
