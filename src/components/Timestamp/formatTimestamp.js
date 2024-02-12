



export default function (timestamp) {
    const messageDate = new Date(timestamp);
    return {
        result: (() => {
            const
                config = {
                    now: Date.now(),
                    prefixFromNow: 'dans',
                    suffixAgo: 'il y a',
                    justNow: "à l'instant",
                    blank: ''
                },
                intervals = {
                    an: 60 * 60 * 24 * 365,
                    mois: 60 * 60 * 24 * 30,
                    semaine: 60 * 60 * 24 * 7,
                    jour: 60 * 60 * 24,
                    heure: 60 * 60,
                    minute: 60,
                    seconde: 1
                },
                timeNames = {
                    an: 'année',
                    mois: 'mois',
                    semaine: 'semaine',
                    jour: 'jour',
                    heure: 'heure',
                    minute: 'minute',
                    seconde: 'seconde'
                };
            const
                time = messageDate.getTime(),
                difference = Math.abs(config.now - time) / 1000;
            for (const [unit, seconds] of Object.entries(intervals)) {
                const interval = Math.floor(difference / seconds);
                if (interval >= 1) {
                    return (
                        config[(config.now < time ? 'prefixFromNow' : 'suffixAgo')] + ' ' +
                        interval + ' ' +
                        timeNames[unit] + (interval === 1 ? '' : 's')
                    ).trim();
                }
            }
            return config.justNow
        })(),
        full: new Date(timestamp).toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            hour: 'numeric',
            minute: 'numeric'
        })
    }
}