import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Hotel({ size = 24, ...props }: IconProps) {
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
      <path d="M11.662 1.03C11.879 0.98 12.246 0.98 12.447 1.08L23 6.37L22.105 8.16L21 7.6V21H23V23H1V21H3V7.6L1.895 8.16L1 6.37L11.662 1.03ZM12 16.99C10.896 16.99 10.001 17.89 10 19V21H14V19C13.999 17.89 13.104 16.99 12 16.99ZM8 11.99C7.448 11.99 7 12.44 7 12.99C7.001 13.54 7.448 13.99 8 13.99C8.552 13.99 8.999 13.54 9 12.99C9 12.44 8.552 11.99 8 11.99ZM16 11.99C15.448 11.99 15 12.44 15 12.99C15.001 13.54 15.448 13.99 16 13.99C16.552 13.99 16.999 13.54 17 12.99C17 12.44 16.552 11.99 16 11.99ZM8 7.98C7.448 7.98 7 8.43 7 8.99C7.001 9.54 7.448 9.99 8 9.99C8.552 9.99 8.999 9.54 9 8.99C9 8.43 8.552 7.98 8 7.98ZM12 7.98C11.448 7.98 11 8.43 11 8.99C11.001 9.54 11.448 9.99 12 9.99C12.552 9.99 12.999 9.54 13 8.99C13 8.43 12.552 7.98 12 7.98ZM16 7.98C15.448 7.98 15 8.43 15 8.99C15.001 9.54 15.448 9.99 16 9.99C16.552 9.99 16.999 9.54 17 8.99C17 8.43 16.552 7.98 16 7.98Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
