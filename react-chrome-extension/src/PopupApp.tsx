// src/PopupApp.tsx
import React, { useEffect, useState } from "react";
import HighlightList from "./components/HighlightList";
import { useMemo } from 'react';
export default function PopupApp() {
    const [highlights, setHighlights] = useState([]);

    useEffect(() => {
        chrome.storage.local.get("highlights", ({ highlights = [] }) => {
            setHighlights(highlights);
        });
    }, []);

    if (!highlights.length) {
        return <p>No highlights yet—select some text on any page!</p>;
    }

    return (
        <>
            <h1>Saved Highlights</h1>
            <HighlightList highlights={highlights} />;
        </>
    );
}
