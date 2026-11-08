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
      <path d="M22 20V22H2V20H22ZM22 14V16H2V14H22ZM8.995 2L11.684 4.52C11.885 4.71 12 4.97 12 5.25C12 5.53 11.885 5.79 11.684 5.98L8.967 8.53L7.6 7.07L8.249 6.46L8.471 6.25H4V10H2V5.25C2 4.7 2.448 4.25 3 4.25H8.472L8.25 4.04L7.627 3.46L8.995 2Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M22 8V10H14V8H22ZM22 2V4H14V2H22Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M8.995 2L11.684 4.52C11.885 4.71 12 4.97 12 5.25C12 5.53 11.885 5.79 11.684 5.98L8.967 8.53L7.6 7.07L8.249 6.46L8.471 6.25H4V10H2V5.25C2 4.7 2.448 4.25 3 4.25H8.472L8.25 4.04L7.627 3.46L8.995 2Z" fill="currentColor"/>
    </svg>
  )
}
