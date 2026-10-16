import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Toggles({ size = 24, ...props }: IconProps) {
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
      <path d="M8 1L16 1C18.7614 1 21 3.2386 21 6C21 8.7614 18.7614 11 16 11L8 11C5.2386 11 3 8.7614 3 6C3 3.2386 5.2386 1 8 1ZM8 13L16 13C18.7614 13 21 15.2386 21 18C21 20.7614 18.7614 23 16 23L8 23C5.2386 23 3 20.7614 3 18C3 15.2386 5.2386 13 8 13Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M8 2L16 2C18.2091 2 20 3.7909 20 6C20 8.2091 18.2091 10 16 10L8 10M16 22L8 22C5.7909 22 4 20.2091 4 18C4 15.7909 5.7909 14 8 14L16 14M12 6C12 8.2091 10.2091 10 8 10C5.7909 10 4 8.2091 4 6C4 3.7909 5.7909 2 8 2C10.2091 2 12 3.7909 12 6ZM20 18C20 20.2091 18.2091 22 16 22C13.7909 22 12 20.2091 12 18C12 15.7909 13.7909 14 16 14C18.2091 14 20 15.7909 20 18Z"/>
    </svg>
  )
}
