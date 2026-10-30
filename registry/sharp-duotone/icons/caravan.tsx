import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Caravan({ size = 24, ...props }: IconProps) {
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
      <path d="M20 15L20 18C20 18.5523 19.5523 19 19 19L2 19C1.4477 19 1 18.5523 1 18L1 4C1 3.4477 1.4477 3 2 3L19 3C19.5523 3 20 3.4477 20 4L20 13L23 13L23 15L20 15Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 7L6 7C6.5523 7 7 7.4477 7 8L7 12C7 12.5523 6.5523 13 6 13L3 13L3 7ZM9 13.1L9 8C9 7.4477 9.4477 7 10 7L15 7C15.5523 7 16 7.4477 16 8L16 17L12.9 17C12.4979 15.0365 10.9635 13.5021 9 13.1Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M10 18C10 19.1046 9.1046 20 8 20C6.8954 20 6 19.1046 6 18C6 16.8954 6.8954 16 8 16C9.1046 16 10 16.8954 10 18Z" fill="none"/>
    </svg>
  )
}
