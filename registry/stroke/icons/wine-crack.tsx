import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function WineCrack({ size = 24, ...props }: IconProps) {
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
      <path d="M12 16H14.4144C15.4065 16 16.3719 15.67 17.1655 15.07C18.7811 13.84 19.4137 11.68 18.7236 9.76L16.4146 3.32C16.1313 2.53 15.391 2 14.5619 2H12.5M12 16H9.58568C8.59348 16 7.62818 15.67 6.83448 15.07C5.21898 13.84 4.58628 11.68 5.27638 9.76L7.58538 3.32C7.86858 2.53 8.60908 2 9.43798 2H12.5M12 16V22M12.5 2L11.25 5.5L13.5 7.5L11.5 11M12 22H9.04288M12 22H14.9571"/>
    </svg>
  )
}
