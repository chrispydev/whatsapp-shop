import { createClient } from "@sanity/client";

export const sanityClient = createClient({
    projectId: "5jpf3dr5",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: true,
});
