import { useEffect, useState } from "react";
import formatTimestamp from "./formatTimestamp";
export default function ({ timestamp }) {
    const [time, setTime] = useState(formatTimestamp(timestamp));
    useEffect(() => {
        const call = () => setTime(formatTimestamp(timestamp));
        const inter = setInterval(call, (() => {
            const { result } = time;
            let i = 1000;
            if (result.includes('minute')) i = 60000;
            else if (
                result.includes('jour') ||
                result.includes('semaine') ||
                result.includes('mois') ||
                result.includes('année')
            ) i = (60000 * 60) * 24;
            return i
        })());
        return () => clearInterval(inter)
    }, [])
    return <span className="timestamp tlp top"
        data-title={time.full}
    >{time.result}</span>
}