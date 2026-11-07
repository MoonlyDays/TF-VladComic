import type { ReactNode } from 'react';
import TF2Logo from '../assets/tf_logo.png';

/** Экран-заставка: логотип сверху и тёмная панель по центру. */
export function Screen({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen w-full max-w-5xl flex-col items-center">
            <div className="flex h-28 w-full items-center">
                <img src={TF2Logo} alt="Team Fortress 2 Logo" />
            </div>
            <div className="flex w-full flex-1 items-start justify-center pt-16 pb-16">
                {children}
            </div>
        </div>
    );
}

export function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
    return (
        <div
            className={
                'rounded-md border border-stone-700 bg-stone-900/90 p-10 text-stone-100 shadow-2xl ' +
                className
            }
        >
            {children}
        </div>
    );
}

export const buttonClass =
    'rounded bg-[#cf6a32] px-6 py-3 font-bold tracking-wide text-white uppercase transition hover:bg-[#e07a40] active:translate-y-px disabled:opacity-50';

export const secondaryButtonClass =
    'rounded border border-stone-600 px-6 py-3 font-bold tracking-wide text-stone-300 uppercase transition hover:border-stone-400 hover:text-white';
