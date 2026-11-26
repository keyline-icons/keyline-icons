import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PictureInPictureOff({ size = 24, ...props }: IconProps) {
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
      <path d="M20.7781 20.898C20.53 20.965 20.2691 21 20 21H14C12.3432 21 11 19.657 11 18V14C11 13.202 11.3115 12.477 11.8195 11.939L20.7781 20.898ZM21.2929 17.05L16.9498 12.707C16.7688 12.526 16.6569 12.276 16.6569 12C16.6569 11.448 17.1046 11 17.6569 11H20C21.6569 11 23 12.343 23 14V16.343C23 16.895 22.5523 17.343 22 17.343C21.7239 17.343 21.4739 17.231 21.2929 17.05Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M22 8V7C22 5.343 20.6569 4 19 4H9.6569M4.1285 4.128C2.8967 4.502 2 5.646 2 7V17C2 18.657 3.3432 20 5 20H8" strokeOpacity="0.4"/>
      <path d="M2 2L22 22"/>
    </svg>
  )
}
