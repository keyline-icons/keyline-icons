import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Dress({ size = 24, ...props }: IconProps) {
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
      <path d="M8.237 1.02C8.507 0.97 8.857 1.02 9.083 1.18C9.343 1.37 9.498 1.67 9.499 1.99V2.49C9.499 3.87 10.619 4.99 12 4.99C13.381 4.99 14.5 3.87 14.501 2.49V1.99C14.501 1.67 14.706 1.33 14.962 1.15C15.204 1.01 15.555 0.95 15.82 1.04L18.821 2.04C19.295 2.2 19.566 2.74 19.48 3.22L17.543 9.99L20.967 21.72C21.044 21.98 20.981 22.31 20.844 22.55C20.655 22.8 20.32 23 20.005 23H3.995C3.719 23 3.416 22.84 3.229 22.65C3.04 22.39 2.945 22.02 3.033 21.72L6.455 9.99L4.533 3.27C4.386 2.75 4.671 2.21 5.178 2.04L8.237 1.02Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M17.828 8.99L17.541 9.99L17.836 10.99H6.16L6.453 9.99L6.168 8.99H17.828Z" fill="currentColor"/>
    </svg>
  )
}
