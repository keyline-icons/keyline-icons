import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function DeleteForward({ size = 24, ...props }: IconProps) {
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
      <path d="M13 9L10 12M10 12L7 15M10 12L7 9M10 12L13 15M21.736 11.32L15.5942 4.65C15.2155 4.23 14.6817 4 14.1222 4H5C3.3431 4 2 5.34 2 7V17C2 18.66 3.3431 20 5 20H14.1222C14.6817 20 15.2155 19.77 15.5942 19.35L21.736 12.68C22.088 12.29 22.088 11.71 21.736 11.32Z"/>
    </svg>
  )
}
