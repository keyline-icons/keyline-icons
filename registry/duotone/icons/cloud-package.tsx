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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M3 15.6458C2.3556 14.915 2 13.9743 2 13C2 10.7909 3.7909 9 6 9C6 5.6863 8.6863 3 12 3C15.3137 3 18 5.6863 18 9C20.2091 9 22 10.7909 22 13C22 13.9743 21.6444 14.915 21 15.6458" strokeOpacity="0.4"/>
      <path d="M16.8507 14.2103C16.7548 14.0552 16.6166 13.9263 16.4472 13.8416L12.4472 11.8416C12.1657 11.7009 11.8343 11.7009 11.5528 11.8416L7.5528 13.8416C7.3834 13.9263 7.2452 14.0552 7.1494 14.2103M16.8507 14.2103C16.9465 14.3654 17 14.5467 17 14.7361V18C17 18.3788 16.786 18.725 16.4472 18.8944L12.4472 20.8944C12.3064 20.9648 12.1532 21 12 21M16.8507 14.2103L12 16.618M16.8507 14.2103L16.8507 14.2103M12 21C11.8468 21 11.6936 20.9648 11.5528 20.8944L7.5528 18.8944C7.214 18.725 7 18.3788 7 18V14.7361C7 14.5467 7.0535 14.3654 7.1494 14.2103M12 21V16.618M7.1494 14.2103L7.1493 14.2103M7.1494 14.2103L12 16.618"/>
    </svg>
  )
}
