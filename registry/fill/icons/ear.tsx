import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Ear({ size = 24, ...props }: IconProps) {
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
      <path d="M5 9C5 5.134 8.134 2 12 2C15.866 2 19 5.134 19 9C19 13.4936 15.4839 12.0806 14 19.5C13.5 22 11.821 22 11 22C9.3431 22 8 20.6569 8 19M14.5 9C14.5 7.6193 13.3807 6.5 12 6.5C10.6193 6.5 9.5 7.6193 9.5 9L9.5 11" fill="none"/>
    </svg>
  )
}
