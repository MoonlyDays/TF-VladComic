import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { Panel, Screen, buttonClass, secondaryButtonClass } from './components/Panel.tsx';
import { CREDITS_VIDEO, INTRO_VIDEO } from './media.ts';
import { ComicReader } from './stages/ComicReader.tsx';
import { LanguageSelect } from './stages/LanguageSelect.tsx';
import { PasswordGate } from './stages/PasswordGate.tsx';
import { VideoStage } from './stages/VideoStage.tsx';

type Stage = 'password' | 'language' | 'intro' | 'comic' | 'credits' | 'end';

function App() {
    const [stage, setStage] = useState<Stage>('password');
    const navigate = useNavigate();

    const startComic = () => {
        navigate({ hash: '' }, { replace: true });
        setStage('comic');
    };

    switch (stage) {
        case 'password':
            return <PasswordGate onUnlock={() => setStage('language')} />;

        case 'language':
            return <LanguageSelect onSelect={() => setStage('intro')} />;

        case 'intro':
            return (
                <VideoStage
                    src={INTRO_VIDEO}
                    placeholder="Здесь будет поздравительный ролик"
                    onDone={startComic}
                />
            );

        case 'comic':
            return <ComicReader onFinish={() => setStage('credits')} />;

        case 'credits':
            return (
                <VideoStage
                    src={CREDITS_VIDEO}
                    placeholder="Здесь будут заключительные титры"
                    onDone={() => setStage('end')}
                />
            );

        case 'end':
            return (
                <Screen>
                    <Panel className="flex w-[480px] flex-col items-center gap-6 text-center">
                        <h1 className="text-3xl font-bold tracking-wide text-amber-500 uppercase">
                            Конец
                        </h1>
                        <div className="flex gap-4">
                            <button type="button" className={buttonClass} onClick={startComic}>
                                Перечитать
                            </button>
                            <button
                                type="button"
                                className={secondaryButtonClass}
                                onClick={() => setStage('language')}
                            >
                                С начала
                            </button>
                        </div>
                    </Panel>
                </Screen>
            );
    }
}

export default App;
