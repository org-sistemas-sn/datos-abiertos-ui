import { createContext, useContext, useState } from "react";

const SectionContext = createContext();

export const useSectionContext = () => useContext(SectionContext);

export const SectionProvider = ({ children }) => {
    const [selectedSection, setSelectedSection] = useState(null);
    const [selectedTheme, setSelectedTheme] = useState(null);
    const [hasOneTheme, setHasOneTheme] = useState(null)

    return (
        <SectionContext.Provider value={{
            selectedSection,
            setSelectedSection,
            selectedTheme,
            setSelectedTheme,
            hasOneTheme,
            setHasOneTheme
        }}>
            {children}
        </SectionContext.Provider>
    );
};
