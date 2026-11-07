import { useState, type FormEvent } from 'react';
import { PASSWORD } from '../config.ts';
import { Panel, Screen, buttonClass } from '../components/Panel.tsx';

const normalize = (value: string) => value.trim().toLocaleLowerCase('ru');

export function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
    const [value, setValue] = useState('');
    const [attempt, setAttempt] = useState(0);
    const [error, setError] = useState(false);

    const submit = (event: FormEvent) => {
        event.preventDefault();
        if (normalize(value) === normalize(PASSWORD)) {
            onUnlock();
            return;
        }
        setError(true);
        setAttempt((n) => n + 1);
        setValue('');
    };

    return (
        <Screen>
            <Panel className="w-[480px]">
                <form key={attempt} onSubmit={submit} className={error ? 'animate-shake' : ''}>
                    <h1 className="mb-2 text-2xl font-bold tracking-wide text-amber-500 uppercase">
                        Доступ ограничен
                    </h1>
                    <p className="mb-6 text-stone-400">Введите пароль, чтобы продолжить.</p>

                    <input
                        type="password"
                        autoFocus
                        autoComplete="off"
                        value={value}
                        onChange={(event) => {
                            setValue(event.target.value);
                            setError(false);
                        }}
                        placeholder="Пароль"
                        aria-label="Пароль"
                        aria-invalid={error}
                        className={
                            'mb-2 w-full rounded border bg-stone-950 px-4 py-3 text-lg text-white outline-none focus:border-amber-500 ' +
                            (error ? 'border-red-600' : 'border-stone-700')
                        }
                    />
                    <p className="mb-6 h-5 text-sm text-red-500" role="alert">
                        {error ? 'Неверный пароль' : ''}
                    </p>

                    <button type="submit" className={buttonClass + ' w-full'} disabled={!value}>
                        Войти
                    </button>
                </form>
            </Panel>
        </Screen>
    );
}
