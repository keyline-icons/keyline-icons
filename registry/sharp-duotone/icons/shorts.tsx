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
      <path d="M19.999 3C20.551 3 20.999 3.45 20.999 4V7.9L22.981 18.75C23.03 19.02 22.965 19.29 22.806 19.52C22.666 19.71 22.417 19.86 22.188 19.91L14.35 20.99C13.855 21.06 13.385 20.75 13.25 20.27L12.004 15.82L10.661 20.29C10.518 20.76 10.048 21.06 9.559 20.99L1.857 19.87C1.623 19.84 1.369 19.67 1.213 19.5C1.055 19.28 0.969 18.97 1.018 18.7L2.999 7.91V4C2.999 3.45 3.447 3 3.999 3H19.999Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M9.001 7V9H2.801L3.001 7.91V7H9.001ZM21.001 7V7.9L21.2 9H15.001V7H21.001Z" fill="currentColor"/>
    </svg>
  )
}
