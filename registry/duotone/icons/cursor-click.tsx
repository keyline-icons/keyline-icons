import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CursorClick({ size = 24, ...props }: IconProps) {
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
      <path d="M8.31707 10.1904C7.94409 9.01818 9.06221 7.93216 10.2184 8.31736L21.9762 12.2334C23.2896 12.6714 23.3568 14.5046 22.0768 15.0361L17.2321 17.0459L14.8454 22.1386C14.2677 23.3711 12.4749 23.257 12.0612 21.958L8.31707 10.1904Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12.1748 5.7626L13.9549 3.9872M7.8824 4.6963L6.9812 2M4.704 7.8671L2 6.9681M5.7726 12.148L3.9925 13.9234"/>
    </svg>
  )
}
