import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Helicopter({ size = 24, ...props }: IconProps) {
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
      <path d="M12.2396 9L17.4793 9C18.9084 9 20.2288 9.7624 20.9433 11L22.5311 13.75C22.8383 14.2821 23 14.8857 23 15.5C23 17.433 21.433 19 19.5 19L12.7735 19C11.7017 19 10.7114 18.4282 10.1755 17.5L6.134 10.5C6.0462 10.348 6 10.1755 6 10C6 9.4477 6.4477 9 7 9Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M22.9641 15L21.5207 15L16.5207 15C15.9684 15 15.5207 14.5523 15.5207 14C15.5207 13.4477 15.9684 13 16.5207 13L21.5207 13L22.0981 13L22.5311 13.75C22.7543 14.1367 22.9008 14.5611 22.9641 15Z" fill="currentColor" stroke="none"/>
      <path d="M7 6L21 6M14 6L14 10M2 10L7 10M2 7L2 13"/>
    </svg>
  )
}
