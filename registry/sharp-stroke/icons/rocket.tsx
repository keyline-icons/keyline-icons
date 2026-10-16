import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Rocket({ size = 24, ...props }: IconProps) {
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
      <path d="M6.8103 13.5269L10.4731 17.1897L10.4731 19.9368L16.7303 17.6475L16.7303 12.7638C20.0352 10.4262 21.9999 6.63 21.9999 2.5819C21.9999 2.3922 21.9956 2.2025 21.987 2.013C21.7975 2.0044 21.6078 2.0001 21.4181 2.0001C17.37 2.0001 13.5738 3.9648 11.2362 7.2697L6.3525 7.2697L4.0632 13.5269L6.8103 13.5269ZM10.4731 17.1897L16.7303 12.7638M6.8103 13.5269L11.2362 7.2697M2.0001 21.9999L4.4054 21.8679C5.5497 21.8051 6.4454 20.8589 6.4454 19.7129C6.4454 18.5209 5.4791 17.5546 4.2871 17.5546C3.1411 17.5546 2.1949 18.4503 2.1321 19.5946L2.0001 21.9999Z"/>
    </svg>
  )
}
