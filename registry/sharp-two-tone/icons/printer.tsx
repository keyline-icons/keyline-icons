import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Printer({ size = 24, ...props }: IconProps) {
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
      <path d="M6 1L14 1C14.2652 1 14.5196 1.1054 14.7071 1.2929L18.7071 5.2929C18.8946 5.4804 19 5.7348 19 6L19 9L22 9C22.5523 9 23 9.4477 23 10L23 19C23 19.5523 22.5523 20 22 20L19 20L19 22C19 22.5523 18.5523 23 18 23L6 23C5.4477 23 5 22.5523 5 22L5 20L2 20C1.4477 20 1 19.5523 1 19L1 10C1 9.4477 1.4477 9 2 9L5 9L5 2C5 1.4477 5.4477 1 6 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 19L2 19L2 10L22 10L22 19L18 19M6 10L6 2L14 2L18 6L18 10M6 15L18 15L18 22L6 22L6 15Z" fill="none"/>
    </svg>
  )
}
