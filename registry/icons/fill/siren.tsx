import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Siren({ size = 24, ...props }: IconProps) {
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
      <path d="M6 16L6 13C6 9.6863 8.6863 7 12 7C15.3137 7 18 9.6863 18 13L18 16L19 16C20.1046 16 21 16.8954 21 18L21 20C21 21.1046 20.1046 22 19 22L5 22C3.8954 22 3 21.1046 3 20L3 18C3 16.8954 3.8954 16 5 16L6 16ZM5 18L5 20L19 20L19 18L5 18Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M5.636 6.636L4.9289 5.9289M12 4L12 3M18.364 6.636L19.0711 5.9289"/>
    </svg>
  )
}
