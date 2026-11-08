import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TextInsert({ size = 24, ...props }: IconProps) {
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
      <path d="M11.684 4.52C11.885 4.71 12 4.97 12 5.25C12 5.53 11.885 5.79 11.684 5.98L8.968 8.53L7.6 7.07L8.471 6.25H4V10H2V5.25C2 4.7 2.448 4.25 3 4.25H8.472L7.628 3.46L8.995 2L11.684 4.52Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M22 22H2V20H22V22ZM22 16H2V14H22V16ZM22 10H14V8H22V10ZM22 4H14V2H22V4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
