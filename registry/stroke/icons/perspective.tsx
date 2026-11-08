import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Perspective({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2V12M12 12V22M12 12H2M12 12H22M5 9.62V14.49C5 15.38 5.592 16.17 6.4506 16.41L16.4506 19.27C17.7282 19.64 19 18.68 19 17.35V7.47C19 6.2 17.826 5.25 16.5809 5.52L6.5809 7.66C5.6588 7.86 5 8.67 5 9.62Z"/>
    </svg>
  )
}
