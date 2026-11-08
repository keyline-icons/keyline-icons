import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Beef({ size = 24, ...props }: IconProps) {
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
      <path d="M2 12C2 13.657 3.343 15 5 15C5.495 15 5.983 14.877 6.42 14.643C7.293 14.174 8.269 13.928 9.26 13.928C10.461 13.928 11.635 14.289 12.63 14.964C13.624 15.639 14.798 16 16 16C19.314 16 22 13.314 22 10M2 12C2 11.204 2.316 10.441 2.879 9.879L6.879 5.879C7.441 5.316 8.204 5 9 5C9.474 5 9.941 5.112 10.363 5.328C10.645 5.471 10.957 5.546 11.273 5.546C11.698 5.546 12.112 5.411 12.454 5.16C13.483 4.406 14.725 4 16 4C19.314 4 22 6.686 22 10M2 12V16C2 17.657 3.343 19 5 19C5.495 19 5.983 18.877 6.42 18.643C7.293 18.174 8.269 17.928 9.26 17.928C10.461 17.928 11.635 18.289 12.63 18.964C13.624 19.639 14.798 20 16 20C19.314 20 22 17.314 22 14V10M18 10C18 11.105 17.105 12 16 12C14.895 12 14 11.105 14 10C14 8.895 14.895 8 16 8C17.105 8 18 8.895 18 10Z"/>
    </svg>
  )
}
