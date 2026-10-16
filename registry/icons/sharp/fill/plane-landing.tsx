import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PlaneLanding({ size = 24, ...props }: IconProps) {
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
      <path d="M2.1615 11.7991L1.6664 7.4688C1.5954 6.8485 2.104 6.3156 2.727 6.3575L4.1425 6.4527C4.4596 6.474 4.7477 6.6448 4.9186 6.9128L6.4106 9.2529L9.0546 9.5464L8.0207 4.1888C7.8951 3.5352 8.431 2.9436 9.0937 3.0042L11.9955 3.2694C12.3399 3.3008 12.6436 3.508 12.7985 3.8172L16.0887 10.3826L18.3404 10.8175C18.8354 10.9135 19.3021 11.0821 19.7293 11.3104C20.1562 11.5386 20.5429 11.826 20.8798 12.1596C21.2167 12.4931 21.5043 12.8734 21.7331 13.2879C21.9618 13.7025 22.132 14.152 22.2331 14.6238C22.3343 15.0959 22.366 15.5891 22.3187 16.0897C22.266 16.6464 21.7672 17.0517 21.2115 16.9894L5.6619 15.2438C5.0569 15.1756 4.4922 14.9719 4.0002 14.6646C3.5089 14.3576 3.0891 13.9467 2.7724 13.4619C2.4553 12.9766 2.2411 12.4164 2.1632 11.8136C2.1626 11.8088 2.162 11.8039 2.1615 11.7991Z" fill="currentColor" stroke="none"/>
      <path d="M1 20L23 20" fill="none"/>
    </svg>
  )
}
