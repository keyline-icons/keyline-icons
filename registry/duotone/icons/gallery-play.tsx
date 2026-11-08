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
      <path d="M19 6C20.6569 6 22 7.34 22 9V19C22 20.66 20.6569 22 19 22H5C3.3432 22 2 20.66 2 19V9C2 7.34 3.3431 6 5 6H19ZM19 2C19.5523 2 20 2.45 20 3C20 3.55 19.5523 4 19 4H5C4.4477 4 4 3.55 4 3C4 2.45 4.4477 2 5 2H19Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M9.3477 10.24C9.8679 9.93 10.5628 9.9 11.1445 10.29L14.8965 12.85C15.7005 13.39 15.7003 14.61 14.8965 15.15L11.1445 17.71C10.5994 18.08 9.9024 18.05 9.3955 17.79C8.919 17.5 8.5407 16.89 8.502 16.29L8.5 11.77C8.5004 11.12 8.8361 10.55 9.3477 10.24Z" fill="currentColor"/>
    </svg>
  )
}
