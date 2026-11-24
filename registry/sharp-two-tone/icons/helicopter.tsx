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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M13.1056 9L19.2112 9C19.5685 9 19.8986 9.1906 20.0772 9.5L22.866 14.3303C22.9538 14.4823 23 14.6548 23 14.8303L23 18C23 18.5523 22.5523 19 22 19L11.6189 19C11.2616 19 10.9315 18.8094 10.7529 18.5L6.134 10.5C6.0462 10.348 6 10.1755 6 10C6 9.4477 6.4477 9 7 9Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 6L7 6L21 6L22 6M14 6L14 10M21.5207 14L16.5207 14L15.5207 14M7 10L19.2112 10L22 14.8303L22 18L11.6189 18ZM2 10L7 10M2 6L2 7L2 13L2 14"/>
    </svg>
  )
}
