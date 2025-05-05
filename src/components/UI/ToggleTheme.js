import React, { useEffect, useState } from 'react';
import styles from './ToggleTheme.module.css';

function ToggleTheme() {
    const [theme, setTheme] = useState('dark');
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className={styles.toggleTheme}>
            <button onClick={toggleTheme} className={styles.toggleButton}>
                {theme === 'light' ? '🌙 Dark' : '☀️'}
            </button>
        </div>
    );
}

export default ToggleTheme;