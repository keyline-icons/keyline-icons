import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignStartHorizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M22 2H2M18 6H16C14.8954 6 14 6.895 14 8V12C14 13.105 14.8954 14 16 14H18C19.1046 14 20 13.105 20 12V8C20 6.895 19.1046 6 18 6ZM8 6H6C4.8954 6 4 6.895 4 8V20C4 21.105 4.8954 22 6 22H8C9.1046 22 10 21.105 10 20V8C10 6.895 9.1046 6 8 6Z"/>
    </svg>
  )
}
