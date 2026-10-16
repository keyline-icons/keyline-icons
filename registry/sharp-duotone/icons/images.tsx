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
      <path d="M6.4472 14.2764L7 14L15 10.0001L21 13L21.5528 13.2764"/>
      <path d="M12 7C12 7.5523 11.5523 8 11 8C10.4477 8 10 7.5523 10 7C10 6.4477 10.4477 6 11 6C11.5523 6 12 6.4477 12 7Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
