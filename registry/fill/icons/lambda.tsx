import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Lambda({ size = 24, ...props }: IconProps) {
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
      <path d="M5 5.5C5 4.1193 6.1193 3 7.5 3C8.6348 3 9.6273 3.7644 9.9171 4.8616L13.222 17.3749C13.9562 20.1546 17.802 20.4095 18.8966 17.7511L19 17.5M11.5383 11L5 21" fill="none"/>
    </svg>
  )
}
