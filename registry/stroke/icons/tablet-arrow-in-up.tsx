import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TabletArrowInUp({ size = 24, ...props }: IconProps) {
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
      <path d="M22 10V7C22 5.34315 20.6569 4 19 4H5C3.34315 4 2 5.34315 2 7V17C2 18.6569 3.34315 20 5 20H12M19 20V14M22 17L19 14L16 17"/>
      <path d="M13.5 8.5C13.5 9.3284 12.8284 10 12 10C11.1716 10 10.5 9.3284 10.5 8.5C10.5 7.6716 11.1716 7 12 7C12.8284 7 13.5 7.6716 13.5 8.5Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
