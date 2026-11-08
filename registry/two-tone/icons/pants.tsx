import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Pants({ size = 24, ...props }: IconProps) {
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
      <path d="M16.8551 1.0037C17.829 1.0037 18.5797 1.7335 18.7519 2.6132L21.9373 18.9876C22.2491 20.5871 21.2761 22.2665 19.609 22.5764L17.4974 22.9563C16.0389 23.2162 14.7055 22.2865 14.2817 20.907L11.9993 13.4995L9.7169 20.907C9.293 22.2865 7.9598 23.2162 6.5012 22.9563L4.3896 22.5764C2.7225 22.2665 1.7494 20.5871 2.0613 18.9876L5.2467 2.6132C5.4188 1.7335 6.1698 1.0037 7.1435 1.0037H16.8551Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M18.6003 7.0617L20.9564 19.1776C21.1757 20.2972 20.4828 21.3968 19.4325 21.5867L17.321 21.9666C16.4126 22.1366 15.5289 21.5568 15.2377 20.6071L12.8878 12.9897C12.6034 12.06 11.3965 12.06 11.1121 12.9897L8.7623 20.6071C8.471 21.5568 7.5874 22.1366 6.6789 21.9666L4.5675 21.5867C3.5172 21.3968 2.8243 20.2972 3.0436 19.1776L5.3997 7.0617L5.5967 6.052L6.2284 2.8031C6.3195 2.3433 6.7016 2.0034 7.1441 2.0034H16.8559C17.2984 2.0034 17.6804 2.3433 17.7716 2.8031L18.4032 6.052L18.6003 7.0617ZM5.3997 7.0617H18.6003"/>
    </svg>
  )
}
