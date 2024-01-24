const ENABLED = true;
export const config = { path: "*" };

export default async (_req, { geo }) => {
    if (ENABLED && geo.country.code == "US") {
        const url = new URL('https://www.sweepr.finance/unavailable');
        return Response.redirect(url);
    }
};
