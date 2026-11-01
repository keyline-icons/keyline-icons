import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlagOff({ size = 24, ...props }: IconProps) {
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
      <path d="M14.2154 14.2154C13.6083 14.3641 13.0221 14.5882 12.4706 14.8824C11.0947 15.6162 9.5593 16 8 16C6.4407 16 4.9053 15.6162 3.5294 14.8824C3.2035 14.7086 3 14.3693 3 14L3 3L14.2154 14.2154ZM6.6134 2.8707C7.0706 2.9567 7.5348 3 8 3C9.2311 3 10.4432 2.697 11.5294 2.1176C12.9053 1.3838 14.4407 1 16 1C17.5593 1 19.0947 1.3838 20.4706 2.1176C20.7965 2.2914 21 2.6307 21 3L21 14C21.0001 14.5523 20.5524 15.0001 20.0001 15.0001C19.8359 15.0001 19.6743 14.9597 19.5294 14.8824C19.0496 14.6265 18.5434 14.4235 18.0197 14.2771L6.6134 2.8707Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M4 14C5.2311 14.6566 6.6048 15 8 15C9.3952 15 10.7689 14.6566 12 14C12.4514 13.7593 12.9219 13.5606 13.4056 13.4056M4 4L4 23M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
