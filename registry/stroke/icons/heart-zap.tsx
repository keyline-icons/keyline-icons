import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HeartZap({ size = 24, ...props }: IconProps) {
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
      <path d="M14 3.34C13.2837 3.6 12.6156 3.99 12 4.5C10.8426 3.55 9.5 3 8 3C4.6862 3 2 5.57 2 8.75C2 13.75 7.4376 17.1 12 21C15.1446 18.31 18.705 15.89 20.6141 13M21 3L18 6H22L19 9"/>
    </svg>
  )
}
