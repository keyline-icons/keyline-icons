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
      <path d="M21 6C21.552 6 22 6.45 22 7V21C22 21.55 21.552 22 21 22H3C2.448 22 2 21.55 2 21V7C2 6.45 2.448 6 3 6H21ZM20 2V4H4V2H20Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M13.092 16.06L17.093 13.06L20 15.96V20H4V16.96L9 11.96L13.092 16.06Z" fill="currentColor"/>
      <path d="M13.5 10C14.328 10 15 10.67 15 11.5C15 12.33 14.328 13 13.5 13C12.672 13 12 12.33 12 11.5C12 10.67 12.672 10 13.5 10Z" fill="currentColor"/>
    </svg>
  )
}
