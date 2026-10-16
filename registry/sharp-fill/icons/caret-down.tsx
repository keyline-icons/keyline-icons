import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CaretDown({ size = 24, ...props }: IconProps) {
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
      <path d="M11.544 17.7413L5.0727 6.7841C4.8674 6.4365 5.1213 6 5.5287 6L18.4713 6C18.8787 6 19.1326 6.4365 18.9273 6.7841L12.456 17.7413C12.2523 18.0862 11.7477 18.0862 11.544 17.7413Z" fill="currentColor" stroke="none"/>
      <path d="M12 18L5 6L19 6L12 18Z"/>
    </svg>
  )
}
