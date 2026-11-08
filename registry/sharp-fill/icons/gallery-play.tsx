import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GalleryPlay({ size = 24, ...props }: IconProps) {
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
      <path d="M21 6C21.552 6 22 6.45 22 7V21C22 21.55 21.552 22 21 22H3C2.448 22 2 21.55 2 21V7C2 6.45 2.448 6 3 6H21ZM10.062 9.56C9.757 9.35 9.305 9.35 8.978 9.53C8.798 9.66 8.557 10.04 8.5 10.26V17.74C8.57 18.01 8.782 18.37 9.032 18.5C9.359 18.67 9.757 18.65 10.062 18.44L15.376 14.83C15.613 14.66 15.792 14.23 15.828 13.95C15.771 13.71 15.584 13.31 15.376 13.17L10.062 9.56Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
      <path d="M20 2V4H4V2H20Z" fill="currentColor"/>
    </svg>
  )
}
