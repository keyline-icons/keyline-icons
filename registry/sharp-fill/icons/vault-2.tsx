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
      <path d="M12.099 10C12.921 10.09 13.706 10.68 13.925 11.46L13.965 11.63L13.988 11.79V11.79L13.991 11.81L14 11.99V12.01L13.991 12.19C13.901 13.14 13.032 13.9 12.089 14C11.056 14 10.102 13.07 9.997 12.07L10.011 11.8C10.113 10.79 11.064 10 12.099 10Z" fill="currentColor"/>
      <path d="M21 2C21.552 2 22 2.45 22 3V21C22 21.55 21.552 22 21 22H3C2.448 22 2 21.55 2 21V3C2 2.45 2.448 2 3 2H21ZM14.029 8.55C13.528 8.27 12.879 8.05 12.274 8.01L11.996 8C11.289 8 10.543 8.23 9.967 8.55L7.414 6L6 7.41L8.553 9.97C8.229 10.54 8 11.29 8 12L8.01 12.28L8.046 12.6C8.125 13.04 8.339 13.65 8.554 14.03L5.999 16.58L7.413 18L9.968 15.44C10.544 15.77 11.289 16 11.997 16L12.28 15.99L12.55 15.96C12.999 15.89 13.646 15.66 14.031 15.44L16.586 18L18 16.59L15.444 14.03C15.726 13.53 15.949 12.88 15.99 12.27L16 12C16 11.29 15.769 10.55 15.445 9.97L17.999 7.41L16.585 6L14.029 8.55Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
