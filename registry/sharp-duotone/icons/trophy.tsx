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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M6 5H2V11H6.3249M18 5H22V11H17.6751M12 15V19" strokeOpacity="0.4"/>
      <path d="M18 1C18.5523 1 19 1.44772 19 2V9C19 12.866 15.866 16 12 16C8.13402 16 5 12.866 5 9V2C5 1.44772 5.44772 1 6 1H18Z" fill="currentColor" stroke="none"/>
      <path d="M6 19H18V22H6V19Z"/>
    </svg>
  )
}
