import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Trophy({ size = 24, ...props }: IconProps) {
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
      <path d="M9 2H15C16.65685 2 18 3.34315 18 5V9C18 12.31371 15.31371 15 12 15C8.68629 15 6 12.31371 6 9V5C6 3.34315 7.34315 2 9 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M9 2H15C16.65685 2 18 3.34315 18 5V9C18 12.31371 15.31371 15 12 15C8.68629 15 6 12.31371 6 9V5C6 3.34315 7.34315 2 9 2ZM6 5H4C2.89543 5 2 5.89543 2 7V9C2 10.10457 2.89543 11 4 11H6M18 5H20C21.10457 5 22 5.89543 22 7V9C22 10.10457 21.10457 11 20 11H18M12 15V19M9 19H15C16.65685 19 18 20.34315 18 22H6C6 20.34315 7.34315 19 9 19Z"/>
    </svg>
  )
}
