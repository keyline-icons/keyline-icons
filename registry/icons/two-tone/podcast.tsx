import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Podcast({ size = 24, ...props }: IconProps) {
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
      <path d="M18.9282 15C19.6304 13.7839 20 12.4043 20 11C20 6.5817 16.4183 3 12 3C7.5817 3 4 6.5817 4 11C4 12.4043 4.3697 13.7839 5.0718 15" strokeOpacity="0.4"/>
      <path d="M15.4641 13C15.8152 12.3919 16 11.7022 16 11C16 8.7909 14.2091 7 12 7C9.7909 7 8 8.7909 8 11C8 11.7022 8.1848 12.3919 8.5359 13M12 15L12 21"/>
      <path d="M13 11C13 11.5523 12.5523 12 12 12C11.4477 12 11 11.5523 11 11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
