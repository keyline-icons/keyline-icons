import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BabyGirl({ size = 24, ...props }: IconProps) {
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
      <path d="M15.8 4.2C18 4.2 20 6.7 20 10.5C21.1046 10.5 22 11.6193 22 13C22 14.3807 21.1046 15.5 20 15.5L20 15.738C20 17.3 19 18.9 17.45 20.1C15.9 21.3 13.94 22 12 22C10.06 22 8.1 21.3 6.55 20.1C5 18.9 4 17.3 4 15.738L4 15.5C2.8954 15.5 2 14.3807 2 13C2 11.6193 2.8954 10.5 4 10.5C4 6.7 6 4.2 8.2 4.2M12 4.2L8.2 2L8.2 6.4ZM12 4.2L15.8 2L15.8 6.4ZM9 12.6L9 13.6M15 12.6L15 13.6M10.5 17.45C11 17.8 11.5 17.95 12 17.95C12.5 17.95 13 17.8 13.5 17.45" fill="none"/>
    </svg>
  )
}
