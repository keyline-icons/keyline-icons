import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlowDocuments({ size = 24, ...props }: IconProps) {
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
      <path d="M6 17L6 9L22 9L22 16.536L20.5 15.6699C19.7399 15.231 18.8777 15 18 15C16.4262 15 14.9443 15.741 14 17C13.0557 18.259 11.5738 19 10 19C8.4262 19 6.9443 18.259 6 17ZM2 13L2 5L16 5"/>
    </svg>
  )
}
