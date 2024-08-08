import { createClient } from "@sanity/client";

export const staticClient = createClient({
  projectId: "rrejw8n1",
  dataset: "production",
  apiVersion: "2023-06-19", // use current UTC date - see "specifying API version"!
  useCdn: true, // `false` if you want to ensure fresh data
});

export const dynamicClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-02-17", // use current UTC date - see "specifying API version"!
  token: process.env.SANITY_TOKEN,
  useCdn: false, // `false` if you want to ensure fresh data
});