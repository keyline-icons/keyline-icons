import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleRadical({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2C17.5228 2 22 6.4772 22 12C22 17.5228 17.5228 22 12 22C6.4772 22 2 17.5228 2 12C2 6.4772 6.4772 2 12 2Z"/>
      <path d="M7.3125 12.9375L8.2267 12.328C8.4841 12.1564 8.834 12.2574 8.9604 12.5397L10.2367 15.3902C10.4308 15.8237 11.0633 15.7677 11.1782 15.3068L12.843 8.629C12.8985 8.4063 13.0986 8.25 13.3282 8.25L16.6875 8.25"/>
    </svg>
  )
}
