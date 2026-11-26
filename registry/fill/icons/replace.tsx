import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Replace({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M13 7H21M18 10L21 7L18 4M11 17H3M6 20L3 17L6 14"/>
      <path d="M6 3C8.209 3 10 4.7909 10 7C10 9.2091 8.209 11 6 11C3.791 11 2 9.2091 2 7C2 4.7909 3.791 3 6 3ZM16 13H20C21.105 13 22 13.8954 22 15V19C22 20.1046 21.105 21 20 21H16C14.895 21 14 20.1046 14 19V15C14 13.8954 14.895 13 16 13Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
