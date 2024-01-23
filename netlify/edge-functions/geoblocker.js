export const config = { path: "*" };
export default async (req, { geo }) => {
 if (geo.country.code == "US") {
     const url = new URL('https://www.sweepr.finance/unavailable');
     return Response.redirect(url);
 }
};


