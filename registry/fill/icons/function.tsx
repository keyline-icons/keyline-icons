import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Function({ size = 24, ...props }: IconProps) {
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
      <path d="M5 20.076C5.5658 20.6663 6.348 21 7.1657 21C8.5051 21 9.6823 20.1121 10.0502 18.8242L13.9498 5.1758C14.3177 3.8879 15.4949 3 16.8343 3C17.652 3 18.4342 3.3337 19 3.924M8.5 10L16.5 10" fill="none"/>
    </svg>
  )
}
