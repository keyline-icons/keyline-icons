import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BotDroplet({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M18.4944 7.7692C20.1022 9.4451 21 11.6776 21 14C21 18.9706 16.9706 23 12 23C7.0294 23 3 18.9706 3 14C3 11.6776 3.8978 9.4451 5.5056 7.7692L12 1L18.4944 7.7692Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M9.8705 10.7535L10.5816 15.4178M13.8248 10.1507L14.5359 14.815"/>
    </svg>
  )
}
