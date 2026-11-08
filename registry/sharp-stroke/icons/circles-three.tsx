import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CirclesThree({ size = 24, ...props }: IconProps) {
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
      <path d="M17.582 10.22L17.659 10C17.88 9.37 18 8.7 18 8C18 4.69 15.314 2 12 2C8.686 2 6 4.69 6 8C6 10.7 7.788 12.99 10.247 13.74L10.424 13.79M6.419 10.19L6 10.34C3.67 11.17 2 13.39 2 16C2 19.31 4.686 22 8 22C9.433 22 10.749 21.5 11.781 20.66L12.01 20.47M16 22C12.686 22 10 19.31 10 16C10 12.69 12.686 10 16 10C19.314 10 22 12.69 22 16C22 19.31 19.314 22 16 22Z"/>
    </svg>
  )
}
