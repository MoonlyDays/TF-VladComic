type FlagProps = { className?: string };

const svgProps = {
    preserveAspectRatio: 'xMidYMid slice',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true,
} as const;

export function FlagRussia({ className }: FlagProps) {
    return (
        <svg {...svgProps} className={className} viewBox="0 0 9 6">
            <rect width="9" height="2" fill="#fff" />
            <rect y="2" width="9" height="2" fill="#0039a6" />
            <rect y="4" width="9" height="2" fill="#d52b1e" />
        </svg>
    );
}

export function FlagUkraine({ className }: FlagProps) {
    return (
        <svg {...svgProps} className={className} viewBox="0 0 3 2">
            <rect width="3" height="1" fill="#0057b7" />
            <rect y="1" width="3" height="1" fill="#ffd700" />
        </svg>
    );
}

export function FlagUK({ className }: FlagProps) {
    return (
        <svg {...svgProps} className={className} viewBox="0 0 60 30">
            <clipPath id="flag-uk-t">
                <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
            </clipPath>
            <rect width="60" height="30" fill="#012169" />
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
            <path
                d="M0,0 L60,30 M60,0 L0,30"
                clipPath="url(#flag-uk-t)"
                stroke="#c8102e"
                strokeWidth="4"
            />
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
            <path d="M30,0 v30 M0,15 h60" stroke="#c8102e" strokeWidth="6" />
        </svg>
    );
}

export function FlagGeorgia({ className }: FlagProps) {
    const small = [
        [65, 40],
        [235, 40],
        [65, 160],
        [235, 160],
    ];

    return (
        <svg {...svgProps} className={className} viewBox="0 0 300 200">
            <rect width="300" height="200" fill="#fff" />
            <rect x="130" width="40" height="200" fill="#ff0000" />
            <rect y="80" width="300" height="40" fill="#ff0000" />
            {small.map(([x, y]) => (
                <path
                    key={`${x}-${y}`}
                    fill="#ff0000"
                    transform={`translate(${x} ${y})`}
                    d="M-4,-20 Q0,-17 4,-20 L4,-4 L20,-4 Q17,0 20,4 L4,4 L4,20 Q0,17 -4,20 L-4,4 L-20,4 Q-17,0 -20,-4 L-4,-4 Z"
                />
            ))}
        </svg>
    );
}
