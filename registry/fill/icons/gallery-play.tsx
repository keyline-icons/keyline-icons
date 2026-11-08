import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GalleryPlay({ size = 24, ...props }: IconProps) {
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
      <path d="M19 6C20.6569 6 22 7.34 22 9V19C22 20.66 20.6569 22 19 22H5C3.3432 22 2 20.66 2 19V9C2 7.34 3.3431 6 5 6H19ZM11.1445 10.29C10.5625 9.9 9.8682 9.93 9.3477 10.24C8.8358 10.55 8.5 11.12 8.5 11.77L8.5024 16.29C8.5432 16.89 8.8696 17.47 9.3477 17.76C9.8682 18.07 10.5625 18.1 11.1445 17.71L14.8965 15.15C15.7008 14.61 15.7008 13.39 14.8965 12.85L11.1445 10.29Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
      <path d="M19 2C19.5523 2 20 2.45 20 3C20 3.55 19.5523 4 19 4H5C4.4477 4 4 3.55 4 3C4 2.45 4.4477 2 5 2H19Z" fill="currentColor"/>
    </svg>
  )
}
