import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Ski({ size = 24, ...props }: IconProps) {
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
      <path d="M3 17L21 21" fill="none" strokeOpacity="0.4"/>
      <path d="M13 9L9.9056 12.0944C9.4456 12.5544 9.5404 13.3242 10.0983 13.659L12.8571 15.3143C13.4286 15.6572 13.5111 16.4527 13.022 16.9055L11 18.7778M12 10L16 12" fill="none"/>
      <path d="M17 4C17 5.1046 16.1046 6 15 6C13.8954 6 13 5.1046 13 4C13 2.8954 13.8954 2 15 2C16.1046 2 17 2.8954 17 4Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
