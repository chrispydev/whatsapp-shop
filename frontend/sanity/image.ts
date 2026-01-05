import {
    createImageUrlBuilder,
    type SanityImageSource,
} from "@sanity/image-url";
import { sanityClient } from "./client";

// The primary builder API is now named createImageUrlBuilder
const builder = createImageUrlBuilder(sanityClient);

// Use SanityImageSource for better type safety instead of 'any'
export const urlFor = (source: SanityImageSource) => {
    return builder.image(source).width(400).height(300).url();
};
