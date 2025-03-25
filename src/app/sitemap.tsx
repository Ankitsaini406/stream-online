
export default async function sitemap() {

    const apiPoint = process.env.NODE_ENV === "development" ? process.env.API_URL : process.env.HOST_URL;

    const staticPages = [
        {
            url: `${apiPoint}movies`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${apiPoint}tv-series`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${apiPoint}animes`,
            lastModified: new Date().toISOString(),
        },
    ];

    return [
        {
            url: `${apiPoint}`,
            lastModified: new Date(),
        },
        ...staticPages,
    ]
}