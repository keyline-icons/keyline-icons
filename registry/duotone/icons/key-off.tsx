import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function KeyOff({ size = 24, ...props }: IconProps) {
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
      <path d="M12.6446 12.7646C12.4705 12.9115 12.2456 13 12 13H10.9C10.4367 15.2822 8.4189 17 6 17C3.2386 17 1 14.7614 1 12C1 9.2386 3.2386 7 6 7C6.3336 7 6.6597 7.0326 6.975 7.095L12.6446 12.7646ZM21 11H22C22.5523 11 23 11.4477 23 12C23 12.5523 22.5523 13 22 13V15.3431C22 15.8954 21.5523 16.3431 21 16.3431C20.4477 16.3431 20 15.8954 20 15.3431V13H17.6569C17.1046 13 16.6569 12.5523 16.6569 12C16.6569 11.4477 17.1046 11 17.6569 11H21Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 2L22 22"/>
    </svg>
  )
}
