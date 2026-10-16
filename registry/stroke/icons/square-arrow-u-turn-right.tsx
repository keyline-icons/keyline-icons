import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareArrowUTurnRight({ size = 24, ...props }: IconProps) {
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
      <path d="M6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6C3 4.34315 4.34315 3 6 3Z"/>
      <path d="M15.6993 10.5H11.0797C9.37884 10.5 8 11.8431 8 13.5C8 15.1569 9.37884 16.5 11.0797 16.5H12.1063M13.1329 7.5L15.8497 10.1464C16.0501 10.3417 16.0501 10.6583 15.8497 10.8536L13.1329 13.5"/>
    </svg>
  )
}
