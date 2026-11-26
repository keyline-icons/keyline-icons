import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HockeyPuck({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M19.442 18.757C17.488 19.539 14.856 20 12 20C9.144 20 6.512 19.539 4.558 18.757C3.583 18.367 2.727 17.878 2.099 17.284C1.468 16.687 1 15.916 1 15V9C1 8.084 1.468 7.313 2.099 6.716C2.727 6.122 3.583 5.633 4.558 5.243C6.512 4.461 9.144 4 12 4C14.856 4 17.488 4.461 19.442 5.243C20.417 5.633 21.273 6.122 21.901 6.716C22.532 7.313 23 8.084 23 9V15C23 15.916 22.532 16.687 21.901 17.284C21.273 17.878 20.417 18.367 19.442 18.757Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M19.442 12.757C17.488 13.539 14.856 14 12 14C9.144 14 6.512 13.539 4.558 12.757C3.583 12.367 2.727 11.878 2.099 11.283C1.468 10.687 1 9.916 1 9C1 8.084 1.468 7.313 2.099 6.716C2.727 6.122 3.583 5.633 4.558 5.243C6.512 4.461 9.144 4 12 4C14.856 4 17.488 4.461 19.442 5.243C20.417 5.633 21.273 6.122 21.901 6.716C22.532 7.313 23 8.084 23 9C23 9.916 22.532 10.687 21.901 11.283C21.273 11.878 20.417 12.367 19.442 12.757Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
