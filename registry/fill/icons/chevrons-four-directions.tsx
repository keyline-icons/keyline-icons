import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChevronsFourDirections({ size = 24, ...props }: IconProps) {
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
      <path d="M5.2929 15.5L2.1464 12.35C1.9512 12.16 1.9512 11.84 2.1464 11.65L5.2929 8.5M8.5 18.71L11.6464 21.85C11.8417 22.05 12.1583 22.05 12.3536 21.85L15.5 18.71M15.5 5.29L12.3536 2.15C12.1583 1.95 11.8417 1.95 11.6464 2.15L8.5 5.29M18.7071 15.5L21.854 12.35C22.049 12.16 22.049 11.84 21.854 11.65L18.7071 8.5"/>
    </svg>
  )
}
