import { createClient } from "@sanity/client";

export const staticClient = createClient({
  projectId: "rrejw8n1",
  dataset: "production",
  apiVersion: "2023-06-19", // use current UTC date - see "specifying API version"!
  useCdn: true, // `false` if you want to ensure fresh data
});