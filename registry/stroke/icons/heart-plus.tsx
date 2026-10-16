import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HeartPlus({ size = 24, ...props }: IconProps) {
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
      <path d="M21.6195 11C21.8649 10.2852 22 9.538 22 8.75C22 5.5743 19.3138 3 16 3C14.5 3 13.1574 3.5459 12 4.5C10.8426 3.5459 9.5 3 8 3C4.6862 3 2 5.5743 2 8.75C2 13.75 7.4376 17.1033 12 21M19 15V21M16 18H22"/>
    </svg>
  )
}
