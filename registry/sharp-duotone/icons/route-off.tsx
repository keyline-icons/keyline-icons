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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M9.873 17L18 17L18 19L9.873 19C9.3694 20.9503 7.4942 22.2219 5.496 21.9681C3.4978 21.7143 2 20.0143 2 18C2 15.9857 3.4978 14.2857 5.496 14.0319C7.4942 13.7781 9.3694 15.0497 9.873 17Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M18 13.3431L18 3M14.7071 6.2929L18 3L21.2929 6.2929" strokeOpacity="0.4"/>
      <path d="M1.7071 1.7071L22.2929 22.2929"/>
    </svg>
  )
}
