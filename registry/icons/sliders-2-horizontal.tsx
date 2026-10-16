import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Sliders2Horizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M6 7C6 5.3431 7.3431 4 9 4L11 4C12.6569 4 14 5.3431 14 7C14 8.6569 12.6569 10 11 10L9 10C7.3431 10 6 8.6569 6 7ZM10 17C10 15.3431 11.3431 14 13 14L15 14C16.6569 14 18 15.3431 18 17C18 18.6569 16.6569 20 15 20L13 20C11.3431 20 10 18.6569 10 17ZM3 7H6M14 7H21M3 17H10M18 17H21"/>
    </svg>
  )
}
