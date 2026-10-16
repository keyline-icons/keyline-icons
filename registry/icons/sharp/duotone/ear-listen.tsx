import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function EarListen({ size = 24, ...props }: IconProps) {
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
      <path d="M5 10L5 9C5 5.134 8.134 2 12 2C15.866 2 19 5.134 19 9C19 13.4936 15.4839 12.0806 14 19.5C13.5 22 11.821 22 11 22C9.7285 22 8.5952 21.1985 8.1715 19.9997L7.9358 19.333" strokeOpacity="0.4"/>
      <path d="M14.5 10L14.5 9C14.5 7.6193 13.3807 6.5 12 6.5C10.6193 6.5 9.5 7.6193 9.5 9L9.5 11L9.5 12M1.8944 16.2889L2 16.5L3 18.5L3.2764 19.0528M4.7236 12.9472L5 13.5L6.5 16.5L6.7764 17.0528M19.5281 1.6667L19.8262 2C20.8096 3.0994 21.5503 4.3937 22 5.7984L22.0476 5.9472"/>
    </svg>
  )
}
