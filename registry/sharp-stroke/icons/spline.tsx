import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Spline({ size = 24, ...props }: IconProps) {
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
      <path d="M2 14L6 14L6 18L2 18ZM18 6L22 6L22 10L18 10ZM6 16C15 16 9 8 18 8" fill="none"/>
      <path d="M17.5 17C17.5 17.8285 16.8285 18.5 16 18.5C15.1715 18.5 14.5 17.8285 14.5 17C14.5 16.1715 15.1715 15.5 16 15.5C16.8285 15.5 17.5 16.1715 17.5 17ZM9.5 7C9.5 7.8285 8.8285 8.5 8 8.5C7.1715 8.5 6.5 7.8285 6.5 7C6.5 6.1715 7.1715 5.5 8 5.5C8.8285 5.5 9.5 6.1715 9.5 7Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
