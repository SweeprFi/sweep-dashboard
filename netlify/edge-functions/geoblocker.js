export default async (req, { geo }) => {
    if (geo.country.code === "US") {
        const url = new URL("/forbidden", req.url);
        return Response.redirect(url);
    }
};
