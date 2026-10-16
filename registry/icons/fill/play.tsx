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
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M5 6C5 4.8436 5.6646 3.7902 6.7083 3.2923C7.752 2.7944 8.989 2.9407 9.8877 3.6684L18.2585 10.4456C18.7275 10.8253 19 11.3965 19 12C19 12.6035 18.7275 13.1747 18.2585 13.5544L9.8877 20.3316C8.989 21.0593 7.752 21.2056 6.7083 20.7077C5.6646 20.2098 5 19.1564 5 18Z" fill="currentColor"/>
    </svg>
  )
}
