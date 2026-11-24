import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Snorkel({ size = 24, ...props }: IconProps) {
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
      <path d="M10 7L18 7C18.5523 7 19 7.4477 19 8L19 15C19 15.5523 18.5523 16 18 16L12.5 16C12.2348 16 11.9804 15.8946 11.7929 15.7071L10 13.9L8.2071 15.7071C8.0196 15.8946 7.7652 16 7.5 16L2 16C1.4477 16 1 15.5523 1 15L1 8C1 7.4477 1.4477 7 2 7Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M22 4L22 19L10 19L9 19"/>
    </svg>
  )
}
