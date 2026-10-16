import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RouteOff({ size = 24, ...props }: IconProps) {
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
      <path d="M9.873 17L14 17C14.7956 17 15.5587 16.6839 16.1213 16.1213C16.5118 15.7308 17.145 15.7308 17.5355 16.1213C17.926 16.5118 17.926 17.145 17.5355 17.5355C16.5979 18.4732 15.3261 19 14 19L9.873 19C9.3694 20.9503 7.4942 22.2219 5.496 21.9681C3.4978 21.7143 2 20.0143 2 18C2 15.9857 3.4978 14.2857 5.496 14.0319C7.4942 13.7781 9.3694 15.0497 9.873 17Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M18 12.3431L18 3M15 6L18 3L21 6" strokeOpacity="0.4"/>
      <path d="M2 2L22 22"/>
    </svg>
  )
}
