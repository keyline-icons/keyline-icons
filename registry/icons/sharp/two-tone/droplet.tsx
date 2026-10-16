import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Droplet({ size = 24, ...props }: IconProps) {
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
      <path d="M17.9629 8.6666C19.2747 10.1334 20 12.0322 20 14C20 18.4183 16.4183 22 12 22C7.5817 22 4 18.4183 4 14C4 12.0322 4.7253 10.1334 6.0371 8.6666L12 1.9999L17.9629 8.6666Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M17.2175 9.3333C18.3654 10.6167 19 12.2782 19 14C19 17.866 15.866 21 12 21C8.134 21 5 17.866 5 14C5 12.2782 5.6346 10.6167 6.7825 9.3333L12 3.5L17.2175 9.3333Z" fill="none" strokeLinejoin="miter"/>
    </svg>
  )
}
