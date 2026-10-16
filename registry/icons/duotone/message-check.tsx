import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MessageCheck({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2 C17.8553 2 23 5.8327 23 11 C23 16.1673 17.8553 20 12 20 C11.2351 20 10.4723 19.9337 9.7236 19.8047 L5.4385 21.8984 C5.1434 22.0425 4.7961 22.0329 4.5098 21.8721 C4.2235 21.7112 4.0344 21.4197 4.0039 21.0928 L3.6084 16.8252 C1.9521 15.2269 1 13.1718 1 11 C1 5.8327 6.1447 2 12 2 Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M9 11L11 13L15 9"/>
    </svg>
  )
}
