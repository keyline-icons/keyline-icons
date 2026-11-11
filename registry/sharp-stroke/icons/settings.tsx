import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Settings({ size = 24, ...props }: IconProps) {
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
      <path d="M10.042 2L9.553 6L8.138 6.83L5.698 5.78C5.016 5.49 4.227 5.76 3.857 6.41L3 8.64L5.693 11.16V12.71L3 15.36L4.505 18.73L8.138 17.17L9.553 18L10.042 22H13.955L14.445 18L15.859 17.16L18.3 18.22C18.982 18.51 19.771 18.24 20.141 17.59L20.998 15.36L18.306 12.84V11.29L20.998 8.64L19.493 5.27L15.859 6.84L14.445 6L13.955 2H10.042ZM12 9.5C13.381 9.5 14.5 10.619 14.5 12C14.5 13.381 13.381 14.5 12 14.5C10.619 14.5 9.5 13.381 9.5 12C9.5 10.619 10.619 9.5 12 9.5Z"/>
    </svg>
  )
}
