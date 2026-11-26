import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Signpost({ size = 24, ...props }: IconProps) {
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
      <path d="M12.412 3H18.824C19.048 3 19.266 3.075 19.442 3.214L22.618 5.714C22.859 5.904 22.999 6.194 22.999 6.5C22.999 6.806 22.859 7.096 22.618 7.286L19.442 9.786C19.266 9.924 19.048 10 18.824 10H6C5.448 10 5 9.552 5 9V4C5 3.448 5.448 3 6 3H12.412ZM11.588 19H5.176C4.952 19 4.734 18.924 4.558 18.786L1.382 16.286C1.141 16.096 1.001 15.807 1.001 15.5C1.001 15.193 1.141 14.904 1.382 14.714L4.558 12.214C4.734 12.076 4.952 12 5.176 12H18C18.552 12 19 12.448 19 13V18C19 18.552 18.552 19 18 19H11.588Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M12 1V4M12 9V13M12 18V22M7 22H17"/>
    </svg>
  )
}
