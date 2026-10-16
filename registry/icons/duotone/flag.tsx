import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Flag({ size = 24, ...props }: IconProps) {
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
      <path d="M3 13.3739C3 14.1691 3.4711 14.8888 4.2 15.2069C5.3986 15.73 6.6922 16 8 16C9.5593 16 11.0947 15.6162 12.4706 14.8824C13.5568 14.303 14.7689 14 16 14C16.805 14 17.6047 14.1296 18.3684 14.3838C18.5721 14.4516 18.7853 14.4861 19 14.4861C20.1046 14.4861 21 13.5907 21 12.4861L21 3.6261C21 2.8309 20.5289 2.1112 19.8 1.7931C18.6014 1.27 17.3078 1 16 1C14.4407 1 12.9053 1.3838 11.5294 2.1176C10.4432 2.697 9.2311 3 8 3C6.7689 3 5.5568 2.697 4.4706 2.1176C4.3258 2.0404 4.1641 2 4 2C3.4477 2 3 2.4477 3 3L3 13.3739Z" fill="currentColor" stroke="none"/>
      <path d="M4 3L4 22" strokeOpacity="0.4"/>
    </svg>
  )
}
