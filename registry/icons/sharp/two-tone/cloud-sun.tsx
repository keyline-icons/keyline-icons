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
      <path d="M10 23L19 23C21.2091 23 23 21.2091 23 19C23 17.1481 21.7288 15.5383 19.9273 15.109C19.491 12.4509 17.1937 10.5 14.5 10.5C11.8063 10.5 9.509 12.4509 9.0727 15.109C7.2712 15.5383 6 17.1481 6 19C6 21.2091 7.7909 23 10 23Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M10 22L19 22C20.6569 22 22 20.6569 22 19C22 17.3431 20.6569 16 19 16C19 13.5147 16.9853 11.5 14.5 11.5C12.0147 11.5 10 13.5147 10 16C8.3431 16 7 17.3431 7 19C7 20.6569 8.3431 22 10 22ZM8.0499 11.8567L7.6787 10.9281C7.5606 10.6329 7.5 10.3179 7.5 10C7.5 8.6193 8.6193 7.5 10 7.5C10.5583 7.5 11.1004 7.6868 11.5402 8.0308L12.3279 8.6468M4.5 10L1 10M5.6967 5.6967L4.0503 4.0503M10 4.5L10 1M14.3033 5.6967L15.9497 4.0503"/>
    </svg>
  )
}
