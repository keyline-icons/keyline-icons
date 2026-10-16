import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Plane({ size = 24, ...props }: IconProps) {
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
      <path d="M12.3777 6.8957L3.7367 5.2027L2.002 7.2022L8.4518 12.5M12.3777 6.8957M12.3777 6.8957L16.7849 3.6942C18.3007 2.5931 20.1262 2.0001 21.9998 2.0001C22 3.8248 21.3976 5.5984 20.2864 7.0458L16.9641 11.3727M12.3777 6.8957L6 16L2.631 16.6981L7.43 21.3248L8 18L16.9641 11.3727M11.5 15.5L17.1622 21.9981L19.2093 20.2862L16.9641 11.3727" fill="none"/>
    </svg>
  )
}
