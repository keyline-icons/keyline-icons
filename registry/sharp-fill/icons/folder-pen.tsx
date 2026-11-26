import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FolderPen({ size = 24, ...props }: IconProps) {
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
      <path d="M9.384 20H3V4H9.5L12 6.5H21V8.562"/>
      <path d="M14.757 13.219L16.879 11.097C17.441 10.535 18.204 10.219 19 10.219C20.657 10.219 22 11.562 22 13.219C22 14.014 21.684 14.777 21.121 15.34L16.879 19.583C16.758 19.703 16.609 19.791 16.445 19.837L12.492 20.962C12.403 20.987 12.311 21 12.219 21C11.667 21 11.219 20.552 11.219 20C11.219 19.907 11.232 19.815 11.257 19.726L12.381 15.773C12.428 15.61 12.515 15.46 12.636 15.34L14.757 13.219Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
