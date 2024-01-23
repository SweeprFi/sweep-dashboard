export const config = { path: "*" };
export default async (req, { geo }) => {
 if (geo.country.code == "BR") {
     const url = new URL('https://www.sweepr.finance/unavailable');
     return Response.redirect(url);
 }
};


