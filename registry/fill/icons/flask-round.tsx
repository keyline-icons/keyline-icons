import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlaskRound({ size = 24, ...props }: IconProps) {
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
      <path d="M10.5 1L13.5 1C14.6046 1 15.5 1.8954 15.5 3L15.5 7.8063C18.2529 9.1456 20 11.9386 20 15C20 19.4183 16.4183 23 12 23C7.5817 23 4 19.4183 4 15C4 11.9386 5.7471 9.1456 8.5 7.8063L8.5 3C8.5 1.8954 9.3954 1 10.5 1ZM10.5 3L10.5 7.8063C10.5 8.5716 10.0632 9.2698 9.375 9.6047C7.3103 10.6092 6 12.7039 6 15L18 15C18 12.7039 16.6897 10.6092 14.625 9.6047C13.9368 9.2698 13.5 8.5716 13.5 7.8063L13.5 3L10.5 3Z" fill="currentColor" stroke="none"/>
      <path d="M8 2L16 2" fill="none"/>
    </svg>
  )
}
