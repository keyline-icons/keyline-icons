import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Images({ size = 24, ...props }: IconProps) {
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
      <path d="M7 2L21 2C21.5523 2 22 2.4477 22 3L22 17C22 17.5523 21.5523 18 21 18L7 18C6.4477 18 6 17.5523 6 17L6 3C6 2.4477 6.4477 2 7 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 7L3 21L17 21" strokeOpacity="0.4"/>
      <path d="M8 13.5L14.5528 10.2237C14.8343 10.0829 15.1657 10.0829 15.4472 10.2237L20 12.5L20 15C20 15.5523 19.5523 16 19 16L9 16C8.4477 16 8 15.5523 8 15L8 13.5ZM12 7C12 7.5523 11.5523 8 11 8C10.4477 8 10 7.5523 10 7C10 6.4477 10.4477 6 11 6C11.5523 6 12 6.4477 12 7Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
