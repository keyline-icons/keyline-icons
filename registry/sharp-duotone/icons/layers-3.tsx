import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Layers3({ size = 24, ...props }: IconProps) {
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
      <path d="M11.634 1.069C11.908 0.961 12.219 0.98 12.481 1.124L22.481 6.624C22.801 6.8 23 7.135 23 7.5C23 7.865 22.801 8.2 22.481 8.376L12.481 13.876C12.181 14.041 11.818 14.041 11.518 13.876L1.519 8.376C1.199 8.2 1 7.865 1 7.5C1 7.135 1.199 6.8 1.519 6.624L11.519 1.124L11.634 1.069Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M22.481 15.624C22.801 15.8 23 16.135 23 16.5C23 16.865 22.801 17.2 22.481 17.376L12.481 22.876C12.182 23.041 11.818 23.041 11.519 22.876L1.519 17.376C1.199 17.2 1 16.865 1 16.5C1 16.135 1.199 15.8 1.519 15.624L1.941 15.391L10.554 20.128L10.725 20.216C11.59 20.622 12.601 20.592 13.444 20.129L13.445 20.128L22.059 15.391L22.481 15.624Z" fill="currentColor"/>
      <path d="M22.482 11.124C22.802 11.3 23 11.635 23 12C23 12.364 22.802 12.7 22.482 12.876L12.481 18.376C12.181 18.541 11.818 18.541 11.518 18.376L1.519 12.876C1.199 12.7 1 12.365 1 12C1 11.635 1.199 11.3 1.519 11.124L1.941 10.891L10.554 15.628L10.725 15.716C11.59 16.122 12.601 16.092 13.444 15.629L13.445 15.628L22.058 10.891L22.482 11.124Z" fill="currentColor"/>
    </svg>
  )
}
