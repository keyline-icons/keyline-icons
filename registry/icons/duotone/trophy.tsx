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
      <path d="M6 5H4C2.8954 5 2 5.8954 2 7V9C2 10.1046 2.8954 11 4 11H6M18 5H20C21.1046 5 22 5.8954 22 7V9C22 10.1046 21.1046 11 20 11H18M12 15V19" strokeOpacity="0.4"/>
      <path d="M15 1C17.2092 1 19 2.79094 19 5V9C19 12.866 15.866 16 12 16C8.13402 16 5 12.866 5 9V5C5 2.79092 6.79092 1 9 1H15Z" fill="currentColor" stroke="none"/>
      <path d="M9 19H15C16.6569 19 18 20.3432 18 22H6C6 20.3432 7.3432 19 9 19Z"/>
    </svg>
  )
}
