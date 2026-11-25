import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FilterDashedPanel({ size = 24, ...props }: IconProps) {
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
      <path d="M3 6C3 4.34315 4.34315 3 6 3M10 3H13M20 7V6C20 4.34315 18.6569 3 17 3M7 20H6C4.34315 20 3 18.6569 3 17M3 10V13" strokeOpacity="0.4"/>
      <path d="M16 10L19.9981 10C20.8795 10 21.5526 10.542 21.8397 11.22C22.1269 11.8979 22.0479 12.7585 21.4347 13.3916L19 15.905L19 19.1743C19 19.7683 18.6495 20.3064 18.1059 20.5464L15.1061 21.8715C14.6112 22.0903 14.0794 22.0157 13.6812 21.7563C13.283 21.4969 13 21.0406 13 20.4995L13 15.905L10.5653 13.3916C9.9521 12.7585 9.8731 11.8979 10.1603 11.22C10.4474 10.542 11.1205 10 12.0019 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
