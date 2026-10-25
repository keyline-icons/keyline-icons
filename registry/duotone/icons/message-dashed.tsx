import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MessageDashed({ size = 24, ...props }: IconProps) {
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
      <path d="M2.1558 12.4066C2.0521 11.9423 2 11.4716 2 11C2 10.5284 2.0521 10.0577 2.1558 9.5934M4.2415 5.9526C4.8943 5.3104 5.6678 4.7532 6.5342 4.3007M10.585 3.0805C11.0537 3.0269 11.5265 3 12 3C12.4735 3 12.9463 3.0269 13.415 3.0805M17.4658 4.3007C18.3322 4.7532 19.1057 5.3104 19.7585 5.9526M21.8442 9.5934C21.9479 10.0577 22 10.5284 22 11C22 11.4716 21.9479 11.9423 21.8442 12.4066M19.7585 16.0474C19.1057 16.6896 18.3322 17.2468 17.4658 17.6993M13.415 18.9195C12.9463 18.9731 12.4735 19 12 19C11.1845 19 10.3721 18.9202 9.5808 18.7624L5 21L4.5686 16.353C4.4564 16.2534 4.3473 16.1514 4.2415 16.0474" fill="none"/>
    </svg>
  )
}
