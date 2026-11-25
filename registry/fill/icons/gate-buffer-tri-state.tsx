import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GateBufferTriState({ size = 24, ...props }: IconProps) {
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
      <path d="M13.4712 9.7516L17.9712 12.2516C18.6062 12.6044 19 13.2736 19 14C19 14.7264 18.6062 15.3956 17.9713 15.7483L8.9712 20.7484C8.6741 20.9134 8.3397 21 8 21C6.8954 21 6 20.1046 6 19L6 9C6 7.8954 6.8954 7 8 7C8.3397 7 8.6741 7.0866 8.9712 7.2516Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M2 14L7 14M18 14L22 14M13 4L13 10.6338"/>
    </svg>
  )
}
