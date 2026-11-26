import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ImageSearch({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M11 2H3C2.448 2 2 2.448 2 3V21C2 21.552 2.448 22 3 22H21C21.552 22 22 21.552 22 21V13C22 12.448 21.552 12 21 12H12V3C12 2.448 11.552 2 11 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 3H3V21H21V12M3 18L9 12L13 16L17 13L21 17M19.268 7.268L21.293 9.293M20 5.5C20 6.881 18.881 8 17.5 8C16.119 8 15 6.881 15 5.5C15 4.119 16.119 3 17.5 3C18.881 3 20 4.119 20 5.5Z"/>
      <path d="M9.5 7.5C9.5 8.328 8.828 9 8 9C7.172 9 6.5 8.328 6.5 7.5C6.5 6.672 7.172 6 8 6C8.828 6 9.5 6.672 9.5 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
