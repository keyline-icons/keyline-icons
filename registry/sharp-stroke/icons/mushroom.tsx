import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Mushroom({ size = 24, ...props }: IconProps) {
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
      <path d="M12 13L2 13L2 12C2 6.4772 6.4772 2 12 2C17.5228 2 22 6.4772 22 12L22 13ZM9.5 13L8 22L16 22L14.5 13" fill="none"/>
      <path d="M8 9C8 9.5523 7.5523 10 7 10C6.4477 10 6 9.5523 6 9C6 8.4477 6.4477 8 7 8C7.5523 8 8 8.4477 8 9ZM12 6.5C12 7.0523 11.5523 7.5 11 7.5C10.4477 7.5 10 7.0523 10 6.5C10 5.9477 10.4477 5.5 11 5.5C11.5523 5.5 12 5.9477 12 6.5ZM17 8.5C17 9.3284 16.3284 10 15.5 10C14.6716 10 14 9.3284 14 8.5C14 7.6716 14.6716 7 15.5 7C16.3284 7 17 7.6716 17 8.5Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
