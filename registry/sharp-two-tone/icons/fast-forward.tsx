import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FastForward({ size = 24, ...props }: IconProps) {
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
      <path d="M2.5784 5.1863L11.0367 11.1843C11.5988 11.5829 11.5988 12.4171 11.0367 12.8157L2.5784 18.8137C1.9162 19.2833 1 18.8098 1 17.998L1 6.002C1 5.1902 1.9162 4.7167 2.5784 5.1863ZM14.5999 5.2019L22.5999 11.1999C23.1334 11.5999 23.1334 12.4001 22.5999 12.8001L14.5999 18.7981C13.9406 19.2924 13 18.822 13 17.998L13 6.002C13 5.178 13.9406 4.7076 14.5999 5.2019Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 6.002L10.4583 12L2 17.998L2 6.002ZM14 6.002L22 12L14 17.998L14 6.002Z"/>
    </svg>
  )
}
