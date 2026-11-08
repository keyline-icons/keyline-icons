import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GalleryImage({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M19 6C20.6569 6 22 7.34 22 9V19C22 20.66 20.6569 22 19 22H5C3.3432 22 2 20.66 2 19V9C2 7.34 3.3431 6 5 6H19ZM19 2C19.5523 2 20 2.45 20 3C20 3.55 19.5523 4 19 4H5C4.4477 4 4 3.55 4 3C4 2.45 4.4477 2 5 2H19Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M7.2324 13.73C8.0866 12.88 9.4068 12.77 10.377 13.41L10.566 13.55L10.7695 13.73L12.8201 15.78C12.9938 15.9 13.2664 15.93 13.4404 15.8L15.3604 14.36C16.3568 13.61 17.7492 13.71 18.627 14.59L19.9414 15.91C19.9789 15.94 20 15.99 20 16.05V19C20 19.52 19.5591 19.95 19.0548 20H5C4.4477 20 4 19.55 4 19V17.05C4 16.99 4.0211 16.94 4.0586 16.91L7.2324 13.73Z" fill="currentColor"/>
      <path d="M13.711 10C14.3352 10.18 15 10.82 15 11.5C15 12.28 14.333 12.92 13.5766 13C12.7482 13 12 12.33 12 11.5C12 10.67 12.8826 10 13.711 10Z" fill="currentColor"/>
    </svg>
  )
}
