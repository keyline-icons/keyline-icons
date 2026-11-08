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
      <path d="M21 6C21.552 6 22 6.45 22 7V21C22 21.55 21.552 22 21 22H3C2.448 22 2 21.55 2 21V7C2 6.45 2.448 6 3 6H21ZM20 2V4H4V2H20Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M9.033 9.5C9.36 9.33 9.757 9.35 10.062 9.56L15.376 13.17C15.649 13.36 15.813 13.67 15.813 14C15.813 14.33 15.649 14.64 15.376 14.83L10.062 18.44C9.757 18.65 9.36 18.67 9.033 18.5C8.748 18.35 8.545 18 8.5 17.69V10.38C8.5 10.01 8.706 9.67 9.033 9.5Z" fill="currentColor"/>
    </svg>
  )
}
