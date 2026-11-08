import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Ghost({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C16.971 1 21 5.03 21 10V21H20L19.105 21.45L18.874 20.98C18.572 20.38 17.956 20 17.281 20C16.298 20 15.5 20.8 15.5 21.78V23H13.5V21.5C13.5 20.67 12.828 20 12 20C11.172 20 10.5 20.67 10.5 21.5V23H8.5V21.78C8.5 20.8 7.702 20 6.719 20C6.044 20 5.428 20.38 5.126 20.98L4.895 21.45L4 21H3V10C3 5.03 7.029 1 12 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M14.5 23V21.78C14.5 20.25 15.745 19 17.281 19C18.335 19 19.298 19.6 19.769 20.54L20 21V10C20 5.58 16.418 2 12 2C7.582 2 4 5.58 4 10V21L4.231 20.54C4.702 19.6 5.665 19 6.719 19C8.255 19 9.5 20.25 9.5 21.78V23M9 8V11M15 8V11M14.5 23V21.5C14.5 20.12 13.381 19 12 19C10.619 19 9.5 20.12 9.5 21.5V23"/>
    </svg>
  )
}
