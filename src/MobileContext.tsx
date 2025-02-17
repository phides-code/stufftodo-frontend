import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';

interface MobileState {
    isMobile: boolean;
}

const MobileContext = createContext<MobileState>({
    isMobile: false,
});

interface MobileProviderProps {
    children: ReactNode;
}

export interface StyledComponentMobileProp {
    $isMobile: boolean;
}

const MobileProvider = ({ children }: MobileProviderProps) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const detectMobile = () => {
            const mobileThreshold = 768; // Threshold for isMobile devices (adjust as needed)

            setIsMobile(window.innerWidth < mobileThreshold);
        };

        // Function to check if the window is resized
        const handleResize = () => {
            detectMobile();
        };

        detectMobile();

        window.addEventListener('resize', handleResize);

        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <MobileContext.Provider value={{ isMobile }}>
            {children}
        </MobileContext.Provider>
    );
};

export { MobileContext, MobileProvider };
