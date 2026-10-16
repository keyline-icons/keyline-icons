import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Play({ size = 24, ...props }: IconProps) {
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
      <path d="M5 6C5 4.8436 5.6646 3.7902 6.7083 3.2923C7.752 2.7944 8.989 2.9407 9.8877 3.6684L18.2585 10.4456C18.7275 10.8253 19 11.3965 19 12C19 12.6035 18.7275 13.1747 18.2585 13.5544L9.8877 20.3316C8.989 21.0593 7.752 21.2056 6.7083 20.7077C5.6646 20.2098 5 19.1564 5 18Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 6C6 5.2291 6.4431 4.5268 7.1389 4.1949C7.8347 3.8629 8.6593 3.9605 9.2585 4.4456L17.6292 11.2228C17.8638 11.4127 18 11.6983 18 12C18 12.3017 17.8638 12.5873 17.6292 12.7772L9.2585 19.5544C8.6593 20.0395 7.8347 20.1371 7.1389 19.8051C6.4431 19.4732 6 18.7709 6 18Z"/>
    </svg>
  )
}
