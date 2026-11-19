import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Sticker({ size = 24, ...props }: IconProps) {
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
      <path d="M23 12C23 5.9249 18.0751 1 12 1C5.9249 1 1 5.9249 1 12C1 18.0751 5.9249 23 12 23C12.2652 23 12.5196 22.8946 12.7071 22.7071L22.7071 12.7071C22.8946 12.5196 23 12.2652 23 12Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M22 12C22 6.4772 17.5228 2 12 2C6.4772 2 2 6.4772 2 12C2 17.5228 6.4772 22 12 22M22 12C21.3475 11.8374 20.6776 11.7552 20.0052 11.7552C15.4489 11.7552 11.7552 15.4489 11.7552 20.0052C11.7552 20.6776 11.8374 21.3475 12 22M22 12L12 22"/>
    </svg>
  )
}
