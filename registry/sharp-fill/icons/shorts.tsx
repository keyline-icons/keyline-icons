import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Shorts({ size = 24, ...props }: IconProps) {
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
      <path d="M19.998 3C20.55 3 20.998 3.45 20.998 4V7H14.997V9H21.198L22.981 18.75C23.03 19.02 22.965 19.3 22.805 19.52C22.665 19.71 22.417 19.86 22.188 19.91L14.348 20.99C13.853 21.06 13.383 20.75 13.248 20.27L12.002 15.82L10.659 20.29C10.516 20.76 10.045 21.06 9.556 20.99L1.854 19.87C1.619 19.84 1.365 19.67 1.209 19.5C1.051 19.28 0.965 18.97 1.014 18.7L2.795 9H8.996V7H2.995V4C2.995 3.45 3.443 3 3.996 3H19.998Z" fill="currentColor"/>
    </svg>
  )
}
