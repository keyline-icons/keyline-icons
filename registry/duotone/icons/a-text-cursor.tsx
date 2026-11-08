import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ATextCursor({ size = 24, ...props }: IconProps) {
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
      <path d="M2 18.0007L3.7857 13.0007L6.0583 6.6676C6.3743 5.7827 7.6257 5.7827 7.9417 6.6676L10.2143 13.0007L12 18.0007M10.2143 13.0007H3.7857" strokeOpacity="0.4"/>
      <path d="M19 6.8C18.6667 6.35 17.6 5 16 5M19 6.8C19.3333 6.35 20.4 5 22 5M19 6.8V17.2M19 17.2C19.3333 17.65 20.4 19 22 19M19 17.2C18.6667 17.65 17.6 19 16 19"/>
    </svg>
  )
}
