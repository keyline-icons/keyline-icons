import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CloudPackage({ size = 24, ...props }: IconProps) {
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
      <path d="M3.2986 15.9844L3 15.6458C2.3556 14.915 2 13.9743 2 13C2 10.7909 3.7909 9 6 9C6 5.6863 8.6863 3 12 3C15.3137 3 18 5.6863 18 9C20.2091 9 22 10.7909 22 13C22 13.9743 21.6444 14.915 21 15.6458L20.7014 15.9844" strokeOpacity="0.4"/>
      <path d="M12 11.738L17 14.118L17 18.618L12 20.998L7 18.618L7 14.118ZM7.0024 14.1374L12 16.618L16.9976 14.1374M12 16.618L12 21"/>
    </svg>
  )
}
