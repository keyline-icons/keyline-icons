import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CloudSun({ size = 24, ...props }: IconProps) {
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
      <path d="M10 23C7.7909 23 6 21.2091 6 19C6 17.1481 7.2712 15.5383 9.0727 15.109C9.509 12.4509 11.8063 10.5 14.5 10.5C17.1937 10.5 19.491 12.4509 19.9273 15.109C21.7288 15.5383 23 17.1481 23 19C23 21.2091 21.2091 23 19 23L10 23Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M8.0499 11.8567L7.6787 10.9281C7.5606 10.6329 7.5 10.3179 7.5 10C7.5 8.6193 8.6193 7.5 10 7.5C10.5583 7.5 11.1004 7.6868 11.5402 8.0308L12.3279 8.6468M4.5 10L1 10M5.6967 5.6967L4.0503 4.0503M10 4.5L10 1M14.3033 5.6967L15.9497 4.0503"/>
    </svg>
  )
}
