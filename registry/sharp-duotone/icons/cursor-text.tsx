import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CursorText({ size = 24, ...props }: IconProps) {
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
      <path d="M2 3.5H13.9583M2 8.1006H6.9875M2 12.7011H6.9875" strokeOpacity="0.4"/>
      <path d="M9.31097 10.3752C8.96482 9.25452 10.0066 8.07664 11.2241 8.49437L11.2231 8.49535L20.9838 11.8411C22.2927 12.2898 22.3471 14.1241 21.0864 14.6633L17.1616 16.3401L15.2133 20.6194C14.6354 21.8879 12.8276 21.7484 12.4223 20.4377L9.31097 10.3752Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
