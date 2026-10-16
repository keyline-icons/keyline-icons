import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FileText({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M14 1C14.2652 1 14.5195 1.1054 14.707 1.293L20.707 7.293C20.8946 7.4805 21 7.7348 21 8L21 18C21 20.7614 18.7614 23 16 23L8 23C5.2386 23 3 20.7614 3 18L3 6C3 3.2386 5.2386 1 8 1L14 1ZM8 16C7.4477 16 7 16.4477 7 17C7 17.5523 7.4477 18 8 18L16 18C16.5523 18 17 17.5523 17 17C17 16.4477 16.5523 16 16 16L8 16ZM8 12C7.4477 12 7 12.4477 7 13C7 13.5523 7.4477 14 8 14L12 14C12.5523 14 13 13.5523 13 13C13 12.4477 12.5523 12 12 12L8 12ZM14 5C14 6.6568 15.3431 8 17 8L18.5858 8L14 3.4142L14 5Z" fill="currentColor"/>
    </svg>
  )
}
