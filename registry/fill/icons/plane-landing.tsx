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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M2.1632 11.8136L1.6721 8.0119C1.611 7.5389 1.7804 7.0936 2.0861 6.785C2.3916 6.4767 2.8334 6.3043 3.3038 6.3574L3.9515 6.4303C4.1768 6.4556 4.39 6.5315 4.5767 6.6481C4.7634 6.7647 4.9248 6.9227 5.0464 7.1135L6.4107 9.2528L9.0418 9.5449L8.0749 4.7671C7.9765 4.2792 8.1302 3.8062 8.4355 3.4752C8.7405 3.1445 9.1977 2.9542 9.6893 3.0095L11.7487 3.2413C12.0014 3.2698 12.2373 3.3615 12.4378 3.5015C12.6383 3.6415 12.8056 3.8313 12.9193 4.0581L16.0887 10.3826L18.3404 10.8175C18.8354 10.9135 19.3021 11.0821 19.7293 11.3104C20.1562 11.5386 20.5429 11.826 20.8798 12.1596C21.2167 12.4931 21.5043 12.8734 21.7331 13.2879C21.9618 13.7025 22.132 14.152 22.2331 14.6238C22.3343 15.0959 22.366 15.5891 22.3187 16.0897C22.266 16.6464 21.7672 17.0517 21.2115 16.9894L5.6619 15.2438C5.0569 15.1756 4.4922 14.9719 4.0002 14.6646C3.5089 14.3576 3.0891 13.9467 2.7724 13.4619C2.4553 12.9766 2.2411 12.4164 2.1632 11.8136Z" fill="currentColor" stroke="none"/>
      <path d="M2 20L22 20" fill="none"/>
    </svg>
  )
}
