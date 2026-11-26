import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleBraces({ size = 24, ...props }: IconProps) {
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
      <path d="M23 12C23 18.075 18.0751 23 12 23C5.9249 23 1 18.075 1 12C1 5.925 5.9249 1 12 1C18.0751 1 23 5.925 23 12Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 2C17.5228 2 22 6.477 22 12C22 17.523 17.5228 22 12 22C6.4771 22 2 17.523 2 12C2 6.477 6.4771 2 12 2Z"/>
      <path d="M10 7C9.4477 7 9 7.448 9 8V10.482C9 10.747 8.8947 11.002 8.7071 11.189L8.0732 11.823C8.0264 11.87 8 11.934 8 12C8 12.066 8.0264 12.13 8.0732 12.177L8.7071 12.811C8.8947 12.998 9 13.253 9 13.518V16C9 16.552 9.4477 17 10 17M14 7C14.5523 7 15 7.448 15 8V10.482C15 10.747 15.1054 11.002 15.2929 11.189L15.9268 11.823C15.9737 11.87 16 11.934 16 12C16 12.066 15.9737 12.13 15.9268 12.177L15.2929 12.811C15.1054 12.998 15 13.253 15 13.518V16C15 16.552 14.5523 17 14 17"/>
    </svg>
  )
}
