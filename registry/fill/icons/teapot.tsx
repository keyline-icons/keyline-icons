import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Teapot({ size = 24, ...props }: IconProps) {
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
      <path d="M7.1172 9.6963C8.3918 8.634 10.1214 8 12 8C13.8786 8 15.6082 8.634 16.8828 9.6963C18.1596 10.7602 19 12.2775 19 14L19 18C19 19.6569 17.6569 21 16 21L8 21C6.3431 21 5 19.6569 5 18L5 14C5 12.2775 5.8404 10.7602 7.1172 9.6963Z" fill="currentColor" stroke="none"/>
      <path d="M18 16.5C20 16.5 18.5 11.5 22 11M6.2764 12.5H4C2.8954 12.5 2 13.3954 2 14.5C2 15.6046 2.8954 16.5 4 16.5H6M9 9.5V7C9 5.89543 9.89543 5 11 5H12M15 9.5V7C15 5.89543 14.1046 5 13 5H12M12 5V4"/>
    </svg>
  )
}
