import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Vault2({ size = 24, ...props }: IconProps) {
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
      <path d="M21 2C21.552 2 22 2.45 22 3V21C22 21.55 21.552 22 21 22H3C2.448 22 2 21.55 2 21V3C2 2.45 2.448 2 3 2H21Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M18 7.42L15.457 9.96L15.684 10.44C15.762 10.62 15.827 10.82 15.878 11.01L15.959 11.39L15.992 11.73L16.001 12C16.001 12.65 15.727 13.5 15.453 14.04L18.001 16.59L16.587 18L14.031 15.45C13.529 15.73 12.88 15.95 12.274 15.99L12.003 16C11.293 16 10.546 15.77 9.968 15.45L7.414 18L6 16.59L8.554 14.03C8.308 13.59 8.097 13.02 8.031 12.5L8.01 12.28L8.001 12C8.001 11.29 8.231 10.55 8.554 9.97L6.001 7.42L7.415 6L9.968 8.56C10.546 8.23 11.294 8 12.003 8L12.274 8.01L12.501 8.03C13.022 8.1 13.592 8.31 14.031 8.55L16.585 6L18 7.42ZM12 10C10.966 10 10.114 10.79 10.012 11.8L9.997 12.07C10.102 13.08 10.969 14 12 14L12.208 13.99C13.149 13.89 13.912 13.01 14.004 12.07L13.991 11.79C13.892 10.86 13.144 10.11 12.208 10.01L12 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
