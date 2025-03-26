"use client";
import Script from "next/script";

const GA_TRACKING_ID = "G-RPSKH6LNS3"; // Replace with your GA ID

const GoogleAnalytics = () => {
    return (
        <>
            {/* Load gtag.js script asynchronously */}
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />

            {/* Initialize gtag */}
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `,
                }}
            />
        </>
    );
};

export default GoogleAnalytics;
