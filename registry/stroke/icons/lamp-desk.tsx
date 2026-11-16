import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LampDesk({ size = 24, ...props }: IconProps) {
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
      <path d="M10.171 3.25L9.982 3.439C9.396 4.025 9.396 4.975 9.982 5.561C10.263 5.842 10.418 6.223 10.434 6.621C10.496 8.083 10.761 9.643 11.067 10.922C11.381 12.235 12.833 12.474 13.73 11.465L18.521 6.075C19.282 5.219 19.145 3.889 18.043 3.577C16.536 3.15 14.835 3.204 13.66 3.369C13.196 3.434 12.72 3.299 12.389 2.968C11.855 2.434 10.987 2.434 10.453 2.968L10.171 3.25ZM10.171 3.25L8.921 2M10.481 7.3L5.692 13.036C5.469 13.321 5.431 13.717 5.595 14.062L6.989 17M7.402 17H10.694C11.512 17 12.247 17.498 12.551 18.257L12.951 19.257C13.476 20.571 12.509 22 11.094 22H7.002C5.587 22 4.62 20.571 5.145 19.257L5.545 18.257C5.849 17.498 6.584 17 7.402 17Z"/>
    </svg>
  )
}
