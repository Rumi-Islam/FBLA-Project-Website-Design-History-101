import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  // PASTE YOUR FULL TOKEN HERE TEMPORARILY
  config: { 
    token: 'eyJhcGlLZXkiOiJza19saXZlX2Y4OWRlOWMyODNiY2IzM2M2Y2FiZTdjMTkwZWU0OGMxYzczODYwZDI1MDBkYmJmYzRiMDliNGEyZGJlMjg5Y2QiLCJhcHBJZCI6IjdjZDhybHY5ODciLCJyZWdpb25zIjpbInNlYTEiXX0=' 
  },
});