import { useState, useEffect } from 'react';

export function useTimelineData() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/data/timeline.json')
            .then(res => {
                if (!res.ok) throw new Error('Failed to load timeline data');
                return res.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading timeline data:', err);
                setError(err);
                setLoading(false);
            });
    }, []);

    return { data, loading, error };
}
