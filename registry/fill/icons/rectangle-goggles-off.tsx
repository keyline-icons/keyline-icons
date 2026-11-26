import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RectangleGogglesOff({ size = 24, ...props }: IconProps) {
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
      <path d="M19 19L16.9612 19C16.0499 19 15.188 18.5857 14.6187 17.8742L11.9999 14.6009L9.3814 17.8741C8.812 18.5857 7.9501 19 7.0388 19L4 19C2.3432 19 1 17.6569 1 16L1 8C1 6.3431 2.3431 5 4 5L5 5ZM21.2678 17.0251L10.9498 6.7071C10.7688 6.5262 10.6569 6.2762 10.6569 6C10.6569 5.4477 11.1046 5 11.6569 5L12 5L20 5C21.6569 5 23 6.3432 23 8L23 16C23 16.1661 22.9865 16.329 22.9605 16.4878C22.8799 16.9592 22.4693 17.318 21.9749 17.318C21.6988 17.318 21.4488 17.2061 21.2678 17.0251Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M2 2L22 22"/>
    </svg>
  )
}
