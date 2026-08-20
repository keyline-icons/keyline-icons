/**
 * See `./opengraph-image.tsx`: same card, under the name X looks for.
 *
 * `generateImageMetadata` rather than `alt`, because this segment's alt names
 * the icon and a static export cannot see the route's params.
 */
export {
  default,
  generateImageMetadata,
  size,
  contentType,
} from "./opengraph-image"
