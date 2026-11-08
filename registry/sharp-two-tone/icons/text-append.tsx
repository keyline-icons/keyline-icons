import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TextAppend({ size = 24, ...props }: IconProps) {
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
      <path d="M4 17.75H8.471L7.6 16.93L8.968 15.47L11.684 18.02C11.885 18.21 12 18.47 12 18.75C12 19.03 11.885 19.29 11.684 19.48L8.995 22L7.628 20.54L8.472 19.75H3C2.448 19.75 2 19.3 2 18.75V14H4V17.75Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M22 10H2V8H22V10ZM22 4H2V2H22V4ZM22 22H14V20H22V22ZM22 16H14V14H22V16Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
